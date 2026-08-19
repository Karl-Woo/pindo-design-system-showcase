<template>
  <uv-popup
    ref="popup"
    :mode="mode"
    round="48rpx"
    bgColor="#FFFFFF"
    :safeAreaInsetBottom="mode === 'bottom'"
    :closeable="false"
    :closeOnClickOverlay="closeable"
    :overlay="true"
    @change="onPopupChange"
  >
    <!-- ── center 模式专用：全屏 touch 捕获层 ──────────────────────────────
         uv-popup 会给内容套一个 uv-transition 容器，其 style 由 mode 决定：
           bottom → {left,right,bottom:0}  只包住 sheet 本身
           top    → {left,right,top:0}     只包住顶条
           left/right → 全高但宽度=内容
           center → 🔴 {top,right,bottom,left:0}  ← 全屏 (uv-popup.vue center())
         center 的这个容器排在 uv-overlay 之后且自身不拦 touchmove ⇒ 手指落在面板
         外的暗区拖动，命中的是这个空壳，uv-overlay 上的 @touchmove.stop.prevent
         根本不 fire，背景页照滚。其余 mode 的暗区仍是遮罩本体，不受影响。
         🔴 不能改 uv-popup 源码修：seaFreight/.gitignore 忽略了 /uni_modules，
            改了提交不上去，重装依赖即丢。所以补在这里。
         放在 .pd-popup 之前：同栈内 z-index 都是 auto，按 DOM 序后画者在上，
         面板照常可点；捕获层只吃到暗区的事件。
         点击要自己转发成关闭 —— 它盖住了遮罩，uv-popup 的 closeOnClickOverlay
         收不到那一下了。 -->
    <view
      v-if="mode === 'center'"
      class="pd-popup-catcher"
      @touchmove.stop.prevent
      @click="onCatcherTap"
    />

    <!-- @touchmove.stop.prevent：App(iOS) 端锁背景滚动。uv-overlay 遮罩自己已拦，
         但 sheet 面板漏了——手指落在面板非滚动区拖动会穿透到底部页面。可滚内容区
         (__content) 用 @touchmove.stop 放行自身滚动、只阻断冒泡。与本仓库其它弹窗
         (orderDetail/myWallet 等) 同款 iOS 做法。H5 端另有 body position:fixed 锁滚。 -->
    <view class="pd-popup" :class="[`pd-popup--${mode}`]" @touchmove.stop.prevent>
      <!-- Drag handle (bottom mode only; hidden when mandatory).
           Wraps the visible bar in a wider touch target so users can swipe-down
           to close from anywhere along the top of the popup. -->
      <view
        v-if="mode === 'bottom' && closeable"
        class="pd-popup__drag-handle"
        @touchstart="onDragStart"
        @touchmove="onDragMove"
        @touchend="onDragEnd"
        @touchcancel="onDragEnd"
      >
        <view class="pd-popup__drag-bar" />
      </view>

      <!-- Close X — same pd-button ghost icon-only treatment in both modes.
           size="md" gives a 24px icon; the icon-only button floors its box to
           96rpx (48px) for the WCAG 2.5.5 / MD3 touch-target minimum.
           Position is mode-specific via the &--bottom / &--center modifiers. -->
      <view v-if="closeable" class="pd-popup__close-slot">
        <pd-button variant="ghost" icon="close" icon-only aria-label="关闭" @click="close" />
      </view>

      <!-- Header: title + optional subtitle stacked vertically with 12px gap.
           Then a 16px gap (content padding-top) to the content slot. -->
      <view v-if="title || subtitle" class="pd-popup__header">
        <slot name="header">
          <text v-if="title" class="pd-popup__title">{{ title }}</text>
          <text v-if="subtitle" class="pd-popup__subtitle">{{ subtitle }}</text>
        </slot>
      </view>

      <!-- Content -->
      <view
        class="pd-popup__content"
        :class="{
          'pd-popup__content--with-footer': $slots.footer,
          'pd-popup__content--empty': !$slots.default
        }"
        :style="contentStyle"
        @touchstart="measureContentScrollable"
        @touchmove="onContentTouchMove"
      >
        <!-- 量位包装层：拿「内容自然高 vs 容器可视高」判断内容区到底能不能滚，
             结论喂给 onContentTouchMove（见其注释）。本身不带任何样式，布局中性。 -->
        <view class="pd-popup__content-inner">
          <slot />
        </view>
      </view>

      <!-- Footer dock (action buttons). When provided, this absorbs bottom
           spacing duties: pd-popup__content drops its bottom padding and the
           footer sits 12px above uv-popup's safe-area inset. Result on iPhone:
           12pt (footer pad) + 34pt (safe-area) = 46pt below the buttons,
           matching the "mainstream" mature-app range. -->
      <view v-if="$slots.footer" class="pd-popup__footer">
        <slot name="footer" />
      </view>
    </view>
  </uv-popup>
</template>

<script>
export default {
  name: 'pd-popup',
  // 规范：emit 什么就声明什么（DESIGN_SYSTEM §16.2）。
  // open/close 不是原生事件名，根又是 uv-popup，今天不会双触发；
  // 声明是为了不依赖「这个名字恰好不是原生的」这种需要每次重新论证的推理。
  emits: ['open', 'close'],
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    mode: {
      type: String,
      default: 'bottom',
      validator: (v) => ['bottom', 'center'].includes(v)
    },
    closeable: { type: Boolean, default: true },
    maxHeight: { type: String, default: '60vh' },
    // Min downward drag distance (in px) on the drag handle to dismiss the
    // bottom popup. Only applies when mode='bottom' and closeable=true.
    swipeCloseThreshold: { type: Number, default: 60 }
  },
  data() {
    return {
      dragStartY: null,
      dragOffset: 0,
      // ── 滚动穿透修复 state ───────────────────────────────────────
      // savedScrollY：打开弹窗那一刻的 window.scrollY，关闭时 scrollTo 回去
      // scrollLocked：重入保护 — 防止重复 open() 时第二次把 0 当作"原位置"
      savedScrollY: 0,
      scrollLocked: false,
      // 内容区当前是否真的可滚（打开时实测，见 measureContentScrollable）。
      // 决定 onContentTouchMove 要不要 stopPropagation。
      contentScrollable: false
    }
  },
  computed: {
    contentStyle() {
      if (this.mode === 'bottom') {
        return { maxHeight: this.maxHeight, overflowY: 'auto' }
      }
      return {}
    }
  },
  methods: {
    open() {
      this.$refs.popup.open()
    },
    close() {
      // close 事件由 onPopupChange 派发（无论是 programmatic close 还是
      // overlay 点击关闭，都会经过 uv-popup 的 change 事件）。这里不再
      // $emit('close')，避免 overlay 点击场景下被双发。
      this.$refs.popup.close()
    },
    /**
     * center 模式全屏捕获层的点击：等价于「点遮罩关闭」。
     * 捕获层盖住了 uv-overlay，uv-popup 的 closeOnClickOverlay 收不到那一下，
     * 这里补回来。语义与遮罩一致 —— closeable=false（强制弹窗）时点了不关。
     * close() 走 onPopupChange 派发 close 事件，与其它关闭路径同源、不会双发。
     */
    onCatcherTap() {
      if (this.closeable) this.close()
    },
    /**
     * 内容区 touchmove。
     *
     * 内容区**能滚** → 只阻断冒泡：父层 .pd-popup 的 @touchmove.stop.prevent 一旦
     *   收到事件就会 preventDefault，把内容区自己的原生滚动一起 kill 掉。
     * 内容区**不能滚** → 必须放行冒泡，让父层去 preventDefault。
     *
     * 🔴 别改回无条件 `@touchmove.stop`（2026-08-08 客服弹窗真机复现）：
     *    center 模式 contentStyle 返回 {}，既无 max-height 也无 overflow ⇒ 内容区
     *    结构上就不可滚；bottom 模式内容短时同理。这时 stopPropagation 会让父层
     *    收不到事件 ⇒ 没有任何人 preventDefault ⇒ iOS 把这次滑动链给最近的可滚
     *    祖先（页面）⇒ 手指在弹窗内容上拖，背景页跟着滚。
     */
    onContentTouchMove(e) {
      if (this.contentScrollable) e.stopPropagation()
    },
    /**
     * 实测内容区能否滚动：容器可视高 vs 包装层自然高。
     * center 模式 contentStyle 不给 overflow/max-height，结构上不可滚，直接判 false。
     * 🔴 除了 open 后量一次，还必须在内容区 touchstart 时重量一次：
     *    内容尺寸【会在打开期间变】—— 用户往 textarea 里打字就会把内容撑高。
     *    只在 open 时量的话，标志停在打开那一刻的 false，之后 onContentTouchMove
     *    不 stopPropagation ⇒ 事件冒到 .pd-popup 被 @touchmove.stop.prevent 拦下
     *    ⇒ 用户滚不动自己刚打的内容。2026-08-08 录入单号弹窗真机复现。
     *    touchstart 早于 touchmove，selectorQuery 通常在手指真正移动前就回来了；
     *    极端情况最多让本次手势的头一帧用旧值，下一帧自愈。
     */
    measureContentScrollable() {
      if (this.mode !== 'bottom') {
        this.contentScrollable = false
        return
      }
      const q = uni.createSelectorQuery().in(this)
      q.select('.pd-popup__content').boundingClientRect()
      q.select('.pd-popup__content-inner').boundingClientRect()
      q.exec((res) => {
        const box = res && res[0]
        const inner = res && res[1]
        // +1 容差：亚像素高度差不算可滚
        this.contentScrollable = !!(box && inner && inner.height > box.height + 1)
      })
    },
    /**
     * uv-popup change 事件统一入口。show=true 时锁背景滚动 + emit open；
     * show=false 时解锁 + emit close。覆盖三条关闭路径：
     *   1. pd-popup.close() 主动关
     *   2. overlay 点击（closeOnClickOverlay=true 时）
     *   3. swipe-down 触发的 this.close()
     */
    onPopupChange(e) {
      if (e && e.show) {
        this.lockScroll()
        // 内容渲染完再量。延时是等 uv-popup 的出场过渡跑完 —— 动画期间元素带
        // transform，boundingClientRect 量到的是过渡中的高度，会判错。
        this.$nextTick(() => setTimeout(() => this.measureContentScrollable(), 350))
        this.$emit('open')
      } else {
        this.unlockScroll()
        this.contentScrollable = false // 下次打开重新量，别把上一次的结论带过去
        this.$emit('close')
      }
    },
    /**
     * 滚动穿透修复（H5 限定）：把 body 设为 position:fixed + top=-scrollY，
     * 背景"冻"住。关闭时还原并 scrollTo 回原位置。
     *
     * 为什么不能只 overflow:hidden：iOS Safari 对 body overflow:hidden 是
     * 半残的——文档流不动，但 touch-drag 仍能触发 rubber-band。position:fixed
     * 才能真正脱离滚动上下文（react-modal / vant / element 同款做法）。
     *
     * ⚠️ 为什么只 #ifdef H5：uni-app App-Plus 的 Vue JS 跑在 JsCore/V8 桥接
     * 层，不直接跑在 webview 里 —— `window` / `document` 是 undefined。访问
     * 就崩。所以本方法在 App-Plus build 阶段被整体剥离。App(iOS) 端的背景锁滚
     * 已改由模板层 @touchmove.stop.prevent(.pd-popup) + @touchmove.stop(__content)
     * 实现（见 template 顶部注释），不依赖本方法。
     *
     * 重入保护：scrollLocked 防止重复 open() 时第二次 lock 把 savedScrollY
     * 覆盖成 0（之后关闭时会跳到顶部）。
     */
    lockScroll() {
      if (this.scrollLocked) return
      this.scrollLocked = true
      // #ifdef H5
      this.savedScrollY =
        window.scrollY || document.documentElement.scrollTop || 0
      const body = document.body
      body.style.position = 'fixed'
      body.style.top = `-${this.savedScrollY}px`
      body.style.left = '0'
      body.style.right = '0'
      body.style.overflow = 'hidden'
      // #endif
    },
    /**
     * 关闭时恢复 body 样式 + scrollTo 回原位置。
     * 内联样式清空（设为 ''）让 CSS 默认值生效；uv-popup 之后还会再把
     * overflow 设成 'visible'，结果一致（都让 body 可滚），无冲突。
     */
    unlockScroll() {
      if (!this.scrollLocked) return
      this.scrollLocked = false
      // #ifdef H5
      const body = document.body
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.overflow = ''
      window.scrollTo(0, this.savedScrollY)
      // #endif
    },
    onDragStart(e) {
      const touch = e.touches && e.touches[0]
      if (!touch) return
      this.dragStartY = touch.clientY
      this.dragOffset = 0
    },
    onDragMove(e) {
      if (this.dragStartY === null) return
      const touch = e.touches && e.touches[0]
      if (!touch) return
      const offset = touch.clientY - this.dragStartY
      // Only react to downward drag — upward should do nothing
      this.dragOffset = offset > 0 ? offset : 0
    },
    onDragEnd() {
      if (this.dragOffset >= this.swipeCloseThreshold) {
        this.close()
      }
      this.dragStartY = null
      this.dragOffset = 0
    }
  },
  // 兜底：如果组件在弹窗还开着的时候被销毁（路由跳转、v-if 切换等），
  // 此时 onPopupChange 不会再被触发，body 的 position:fixed 就会永远留在
  // DOM 上，下一个页面整个不能滚。beforeUnmount 强制 unlock 一次。
  beforeUnmount() {
    this.unlockScroll()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

// center 模式的全屏 touch 捕获层（见 template 顶部注释）。
// 透明、无 z-index —— 同栈内它排在 .pd-popup 之前，后画的面板天然盖在它上面。
// 尺寸与 uv-popup center 模式的 transition 容器一致（全屏 fixed）：
// 该容器有 transform(zoom 动画) 时它就是 fixed 的包含块，没有时包含块是视口，
// 两种情况下 inset:0 算出来都是整屏，所以不用管动画状态。
.pd-popup-catcher {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.pd-popup {
  // Bottom mode owns 24px top spacing ($pd-space-3 = 48rpx = 24px on the 750
  // design device). Center mode overrides to 16px below.
  padding-top: $pd-space-3;
  position: relative; // for absolutely-positioned drag handle and close slot

  &__drag-handle {
    // Full-width 24px touch zone (matches the popup's top padding) so the
    // user can swipe-down anywhere along the top to dismiss. Bar visually
    // centered inside via flex.
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $pd-space-3; // 48rpx = 24px on design device
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none; // we handle the drag ourselves
  }

  &__drag-bar {
    width: $pd-space-4;       // 64rpx = 32px
    height: $pd-space-half;   // 8rpx = 4px
    background-color: $pd-border-default;
    border-radius: $pd-radius-pill;
  }

  &__header {
    // Stack title + subtitle with 12px gap (Figma spec — $pd-space-1-5 = 24rpx = 12px).
    display: flex;
    flex-direction: column;
    gap: $pd-space-1-5;
    // rpx-based sides so the title aligns with pd-list-item children (which
    // also use $pd-space-2 internally) and modal-body wrappers in the showcase.
    // No bottom padding — the 16px gap to content is owned by content's padding-top.
    padding: 0 $pd-space-2;
  }

  &__title {
    @include pd-type(heading-3);
    color: $pd-text-primary;
  }

  &__subtitle {
    @include pd-type(body-sm);
    color: $pd-text-secondary;
  }

  &__close-slot {
    // Anchor the pd-button to the popup top-right corner. Mode-specific top
    // inset is set on the &--bottom / &--center modifiers below so the close
    // button visually aligns with each mode's top padding (24px / 16px).
    position: absolute;
    right: $pd-space-1;   // 16rpx = 8px from right edge
    z-index: 1;
  }

  // 16px top owns the gap from the header (per Figma: outer container gap-16,
  // tokenized as $pd-space-2 = 32rpx = 16px). 16px bottom keeps the last item
  // from sitting flush against the popup edge. Horizontal padding stays 0 —
  // children (pd-list-item, modal-body) own their own sides padding so they
  // align with the title's 16px sides.
  &__content {
    padding: $pd-space-2 0;
  }

  // When a footer slot is supplied, the content area owns the lower half of the
  // 24px content→button gap: 12px here + the dock's 12px padding-top = 24px in
  // bottom mode. Content children must NOT add their own bottom margin or it
  // stacks on top of this. (Center mode overrides to 8px below, since its dock
  // padding-top is 16px → 8 + 16 = 24px.)
  &__content--with-footer {
    padding-bottom: $pd-space-1-5;
  }

  // Header-only modal: text supplied via title/subtitle props with no default
  // slot, so the content area is empty. Drop its TOP padding so it doesn't add
  // dead space between the header and the dock — its bottom padding (above)
  // still supplies the 12px/8px lower half of the 24px header→button gap.
  &__content--empty {
    padding-top: 0;
  }

  // Footer dock — 12px top/bottom, 16px sides, 12px gap between buttons.
  // Children (typically 1–3 pd-buttons) auto-equalize via flex 1:1. iPhone
  // safe-area is added by uv-popup's safeAreaInsetBottom AFTER this footer,
  // so do NOT add env(safe-area-inset-bottom) here — that double-counted the
  // home-indicator clearance and produced ~92pt of bottom whitespace.
  //
  // :deep(*) is required because slot children carry the calling page's
  // scoped-style hash, not pd-popup's, so a plain `& > *` selector wouldn't
  // match them. Pattern is used in 9+ pages already; safe in this codebase.
  &__footer {
    display: flex;
    gap: $pd-space-1-5;
    padding: $pd-space-1-5 $pd-space-2;
    > :deep(*) {
      flex: 1 1 0;
      min-width: 0;
    }
  }

  &--bottom &__close-slot {
    // Vertically center the close button on the title text. Title sits at
    // popup_top + $pd-space-3 (24px). The icon-only button is 96rpx tall (48px
    // a11y touch box), the heading-3 line-height is 50rpx — shift up by
    // (96 - 50) / 2 = 23rpx so the icon center aligns with the title text center.
    top: calc(#{$pd-space-3} - 23rpx);
  }

  &--center {
    // 16px gap from screen edge on each side; px-based cap so it only binds on
    // tablet/desktop H5. Both values are literal pixels because uni-app's rpx
    // conversion inside calc() with vw produces inconsistent results.
    width: calc(100vw - 32px);
    max-width: 480px;
    // Per spec: center modal has 16px top spacing (vs 24px on bottom modal).
    padding-top: $pd-space-2;
  }

  &--center &__close-slot {
    // Same vertical-center alignment as bottom mode, but anchored to the
    // center modal's 16px top padding ($pd-space-2). Same 23rpx shift.
    top: calc(#{$pd-space-2} - 23rpx);
  }

  // Center mode gets no safe-area inset (only bottom mode does), so the dock's
  // 12px bottom sits too tight. Give the action buttons 16px above AND below
  // within the modal — matching the modal's 16px content rhythm. (Button gap
  // stays the shared 12px.)
  &--center &__footer {
    padding-top: $pd-space-2;
    padding-bottom: $pd-space-2;
  }

  // Center modal's dock padding-top is 16px (above the buttons), so the content
  // contributes 8px below → 8 + 16 = 24px content→button, matching bottom mode's
  // 24px (12 + 12).
  &--center &__content--with-footer {
    padding-bottom: $pd-space-1;
  }
}
</style>
