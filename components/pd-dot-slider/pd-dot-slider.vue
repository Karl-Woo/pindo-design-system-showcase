<template>
  <view class="pd-dot-slider" :class="{ 'pd-dot-slider--disabled': disabled }">
    <!-- 顶部数值 -->
    <view class="pd-dot-slider__label">
      <text class="pd-dot-slider__label-value">{{ currentLabel }}</text>
      <text v-if="unit" class="pd-dot-slider__label-unit">{{ unit }}</text>
    </view>

    <!-- 滑动条 -->
    <view
      class="pd-dot-slider__track-wrap"
      @click="_onTrackClick"
    >
      <!-- 横向轨道 -->
      <view class="pd-dot-slider__track" />

      <!-- 4 个圆点 -->
      <view
        v-for="(item, index) in options"
        :key="index"
        class="pd-dot-slider__dot"
        :style="{ left: _percent(index) }"
      />

      <!-- 滑块手柄（小药丸） -->
      <view
        class="pd-dot-slider__handle"
        :style="{ left: _percent(currentIndex) }"
        @touchstart.stop="_onTouchStart"
        @touchmove.stop.prevent="_onTouchMove"
        @touchend.stop="_onTouchEnd"
        @touchcancel.stop="_onTouchEnd"
      />
    </view>
  </view>
</template>

<script>
/**
 * pd-dot-slider —— 四档（或 N 档）离散滑块
 *
 * 视觉规格 1:1 复刻 Figma node-id 127:1691（Q2需求 / 重量预估）：
 *   - 轨道：高 8px(16rpx)，颜色 #D9D9D9
 *   - 圆点：7.35px(≈14rpx)，颜色 #979797，4 个均匀分布
 *   - 手柄：41x25(82rpx x 50rpx) 白色 + 4px(8rpx) 内描边 #CB1D45，圆角 16(32rpx)
 *   - 顶部数字：品牌红 #CB1D45，加粗，单位字号略小
 *
 * 行为：
 *   - 滑块只能停在圆点上（snap）
 *   - 顶部数字根据当前圆点位置切换
 *   - 落点时触发 `change` / `update:modelValue`，可在外层调用接口写入后端
 *   - 宽度 100% 自适应父容器
 *
 * Props:
 *   value / v-model    : 当前选中索引（0 ~ options.length-1）
 *   options            : 显示文本数组（字符串），或带后端值的对象数组：
 *                        ['0-2','2-5','5-10','10+']
 *                        [{label:'0-2',value:1.2}, {label:'2-5',value:3.3}, ...]
 *                        当 options 为对象数组时，每一档 `value` 是要发送给
 *                        后端的真实数值（如「估算单均重」kg）；显示给用户的
 *                        依然是 `label`。
 *   unit               : 单位（顶部数字旁边的小字），例：'kg'
 *   disabled
 *
 * Events:
 *   input(index)             : 兼容 v-model（Vue2）
 *   change(index, label, value)
 *                            : 落到某个圆点时触发。
 *                              - index : 当前选中的索引
 *                              - label : 显示给用户的文本（options[index].label
 *                                        或 options[index] 字符串本身）
 *                              - value : 要发送给后端的数值（options[index].value）；
 *                                        若 options 为字符串数组则等于 index。
 */
export default {
  name: 'pd-dot-slider',
  // 同 pd-rate：声明对外事件，防止 fallthrough 二次绑定。当前根是 <view>，护栏性质。
  emits: ['input', 'change'],
  props: {
    value: { type: Number, default: 0 },
    options: {
      type: Array,
      // 默认 4 档基于实际用户分布（推荐方案：用户友好 + 分布均衡）。
      // value 为每档的「估算单均重」(kg)，落点即作为后端真实数值发送。
      default: () => [
        { label: '0-2',  value: 1.2 },
        { label: '2-5',  value: 3.3 },
        { label: '5-10', value: 7.0 },
        { label: '10+',  value: 12.5 }
      ]
    },
    unit: { type: String, default: 'kg' },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      // 拖动中实时索引（不一定是落点）
      dragIndex: null,
      // 容器在视口中的左/宽，touchmove 时用
      _trackLeft: 0,
      _trackWidth: 0
    }
  },
  computed: {
    currentIndex () {
      return this.dragIndex !== null ? this.dragIndex : this._clamp(this.value)
    },
    currentLabel () {
      const opt = this.options[this.currentIndex]
      // options 项可以是字符串或 { label, value }
      return opt && typeof opt === 'object' ? opt.label : opt
    },
    // 当前档位对应的后端数值。
    // - options 为对象数组时取 opt.value
    // - options 为字符串数组时回退到 index（保持向后兼容）
    currentValue () {
      const opt = this.options[this.currentIndex]
      if (opt && typeof opt === 'object' && opt.value !== undefined) {
        return opt.value
      }
      return this.currentIndex
    }
  },
  methods: {
    _clamp (i) {
      const max = this.options.length - 1
      if (i < 0) return 0
      if (i > max) return max
      return i
    },
    // Position dots/handle so that at i=0 the handle's left edge aligns with
    // the track-wrap's left edge (and at i=max its right edge aligns) — no
    // overhang past the component bounds. 41rpx = half the handle's 82rpx width.
    _percent (i) {
      const max = this.options.length - 1
      if (max <= 0) return '41rpx'
      return `calc(41rpx + (100% - 82rpx) * ${i / max})`
    },
    // 点击轨道直接跳到最近的圆点
    _onTrackClick (e) {
      if (this.disabled) return
      // Use the (shortened) track itself as the reference rect so the math
      // matches the visible drag range.
      uni.createSelectorQuery()
        .in(this)
        .select('.pd-dot-slider__track')
        .boundingClientRect((rect) => {
          if (!rect) return
          const x = (e.detail && e.detail.x) || (e.touches && e.touches[0].clientX) || e.clientX
          const ratio = (x - rect.left) / rect.width
          const idx = this._snapByRatio(ratio)
          this._commit(idx)
        }).exec()
    },
    _onTouchStart (e) {
      if (this.disabled) return
      uni.createSelectorQuery()
        .in(this)
        .select('.pd-dot-slider__track')
        .boundingClientRect((rect) => {
          if (!rect) return
          this._trackLeft = rect.left
          this._trackWidth = rect.width
        }).exec()
    },
    _onTouchMove (e) {
      if (this.disabled) return
      if (!this._trackWidth) return
      const t = e.touches[0]
      const ratio = (t.clientX - this._trackLeft) / this._trackWidth
      this.dragIndex = this._snapByRatio(ratio)
    },
    _onTouchEnd () {
      if (this.disabled) return
      const idx = this.dragIndex
      this.dragIndex = null
      if (idx == null) return
      this._commit(idx)
    },
    _snapByRatio (ratio) {
      if (isNaN(ratio)) return this.currentIndex
      const max = this.options.length - 1
      if (ratio <= 0) return 0
      if (ratio >= 1) return max
      // 最近的圆点
      return Math.round(ratio * max)
    },
    _commit (idx) {
      idx = this._clamp(idx)
      const opt = this.options[idx]
      const label = opt && typeof opt === 'object' ? opt.label : opt
      const value = (opt && typeof opt === 'object' && opt.value !== undefined) ? opt.value : idx
      if (idx === this.value) {
        // 即使没变也广播一次，方便外层重发
        this.$emit('change', idx, label, value)
        return
      }
      this.$emit('input', idx)
      this.$emit('change', idx, label, value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';

/* 设计稿尺寸：单位 rpx (1rpx = 750/屏幕宽 px，375px 屏幕下 2rpx = 1px) */

.pd-dot-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32rpx; // Figma 16px

  // 顶部数值
  &__label {
    display: flex;
    align-items: baseline;
    color: $pd-brand-500;
    font-family: $pd-font-family;
    font-weight: $pd-font-bold;
    line-height: 1;
  }

  &__label-value {
    // 28px in Figma → 用最接近的 display token（$pd-display-md = 30px）。
    font-size: $pd-display-md;
    font-weight: $pd-font-bold;
  }

  &__label-unit {
    font-size: $pd-body-sm; // 14px
    margin-left: 6rpx;
    font-weight: $pd-font-bold;
  }

  // 轨道容器：响应式宽度，handle 和 dots 用 % 定位
  &__track-wrap {
    position: relative;
    width: 100%;
    height: 50rpx;       // 与 handle 高度一致 25px
    display: flex;
    align-items: center;
  }

  // 灰色轨道。两端各内缩 34rpx = 半个 handle 宽 (41rpx) - 半个圆点宽 (7rpx)，
  // 这样灰条恰好包住端点圆点的外缘，同时 handle 在端点时仍贴齐组件边缘。
  &__track {
    position: absolute;
    left: 34rpx;
    right: 34rpx;
    top: 50%;
    height: 16rpx;        // 8px
    background: $pd-grey-300;
    border-radius: 8rpx;
    transform: translateY(-50%);
  }

  // 圆点：嵌在灰条内部（z-index 高于轨道，居中对齐）。
  // 14rpx 正方形 + border-radius 50% → 完美圆形；
  // line-height 0 + display block 防止行高把元素撑高变椭圆。
  &__dot {
    position: absolute;
    top: 50%;
    width: 14rpx;         // 7.35px
    height: 14rpx;
    line-height: 0;
    display: block;
    border-radius: 50%;
    background: $pd-grey-600;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
  }

  // 滑块手柄（白色药丸+红边）
  &__handle {
    position: absolute;
    top: 50%;
    width: 82rpx;         // 41px
    height: 50rpx;        // 25px
    border-radius: 32rpx; // 16px
    background: $pd-surface-primary;
    box-sizing: border-box;
    border: 8rpx solid $pd-brand-500; // 4px inside-stroke
    transform: translate(-50%, -50%);
    z-index: 3;
    box-shadow: $pd-elevation-1;
    transition: left 0.18s ease;
  }

  // 拖动时取消 transition 避免延迟
  &__handle:active {
    transition: none;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
