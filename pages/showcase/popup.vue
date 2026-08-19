<template>
  <pd-doc-shell active-path="popup" title="弹出层与对话框">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">弹出层与对话框</text>
          <pd-badge variant="status" text="稳定" />
        </view>
        <text class="pg-header__desc">pd-popup 在 uv-popup 基础上封装了拖拽条、统一的头部以及可滚动的内容区。底部弹层用于选择，居中对话框用于确认。</text>
      </view>

      <!-- Bottom Sheet -->
      <text class="h3">底部弹层</text>
      <pd-button @click="openBottom">打开底部弹层</pd-button>
      <pd-popup ref="bottomPopup" title="运单详情" mode="bottom">
        <pd-list-item title="起运地" subtitle="中国 上海" divider />
        <pd-list-item title="目的地" subtitle="美国 洛杉矶" divider />
        <pd-list-item title="重量" subtitle="2,500 公斤" divider />
        <pd-list-item title="状态" subtitle="运输中" />
      </pd-popup>

      <!-- Bottom Sheet — mandatory: no drag bar, no close X, no overlay click -->
      <text class="h3">底部弹层（强制确认）</text>
      <text class="desc">closeable=false 时拖拽条与关闭图标都隐藏，遮罩点击不再关闭，必须通过按钮做出选择。</text>
      <pd-button @click="openBottomMandatory">打开强制底部弹层</pd-button>
      <pd-popup
        ref="bottomMandatoryPopup"
        title="同意服务协议"
        subtitle="继续使用前，请先同意《服务协议》和《隐私政策》。同意后我们将开始为你撮合运输服务。"
        mode="bottom"
        :closeable="false"
      >
        <template #footer>
          <pd-button variant="secondary" block @click="declineTerms">不同意</pd-button>
          <pd-button block @click="acceptTerms">同意并继续</pd-button>
        </template>
      </pd-popup>

      <!-- Center Modal — closeable: close X visible, overlay click closes -->
      <text class="h3">居中对话框（可关闭）</text>
      <text class="desc">closeable=true（默认）时显示关闭图标，点击遮罩也可关闭。适合非阻塞的提示信息。</text>
      <pd-button @click="openCenterCloseable">打开可关闭对话框</pd-button>
      <pd-popup
        ref="centerCloseablePopup"
        title="预估费用"
        subtitle="本次运输预估费用为 ¥1,280，最终金额以打包称重后为准。"
        mode="center"
      >
        <template #footer>
          <pd-button block @click="closeCenterCloseable">知道了</pd-button>
        </template>
      </pd-popup>

      <!-- Center Modal — mandatory: no close X, no overlay-click-to-close -->
      <text class="h3">居中对话框（强制确认）</text>
      <text class="desc">closeable 同时控制关闭按钮与点击遮罩关闭。强制确认弹层设为 closeable=false，必须通过底部按钮做出选择。</text>
      <pd-button @click="openCenter">打开居中对话框</pd-button>
      <pd-popup
        ref="centerPopup"
        title="取消运单"
        subtitle="取消后运单将无法恢复，已支付的费用将原路退回。"
        mode="center"
        :closeable="false"
      >
        <template #footer>
          <pd-button variant="secondary" block @click="keepOrder">保留运单</pd-button>
          <pd-button block @click="cancelOrder">取消运单</pd-button>
        </template>
      </pd-popup>

      <!-- Selection List -->
      <text class="h3">选择列表</text>
      <pd-button @click="openList">选择国家</pd-button>
      <pd-popup ref="listPopup" title="选择国家" mode="bottom" closeable>
        <pd-list-item title="中国" clickable divider @click="selectCountry('中国')" />
        <pd-list-item title="美国" clickable divider @click="selectCountry('美国')" />
        <pd-list-item title="日本" clickable divider @click="selectCountry('日本')" />
        <pd-list-item title="韩国" clickable divider @click="selectCountry('韩国')" />
        <pd-list-item title="英国" clickable @click="selectCountry('英国')" />
      </pd-popup>

      <!-- Long Content (maxHeight) -->
      <text class="h3">长内容滚动</text>
      <text class="desc">通过 maxHeight 控制底部弹层最大高度，超出部分内容区可滚动。</text>
      <pd-button @click="openLong">打开长内容弹层</pd-button>
      <pd-popup ref="longPopup" title="服务条款" mode="bottom" max-height="75vh">
        <pd-list-item v-for="i in 12" :key="i" :title="`条款 ${i}`" :subtitle="`这是第 ${i} 条服务条款的简要说明，用来演示内容区滚动行为。`" :divider="i !== 12" />
      </pd-popup>

      <!-- Footer Slot — explicit demo of the action-dock API -->
      <text class="h3">底部按钮区（footer slot）</text>
      <text class="desc">把操作按钮放到 #footer 插槽里，pd-popup 自动处理 dock 内边距（底部弹层上下 12px / 居中对话框上下 16px / 左右均 16px）、按钮 1:1 等分（gap 12px）以及 iPhone 安全区。不要再在弹窗内手写一行 .modal-actions / .weight-actions —— 那会和组件自带的安全区重复，造成屏幕底部一大段空白。</text>
      <pd-button @click="openFooterDemo">打开 footer slot 示例</pd-button>
      <pd-popup
        ref="footerDemoPopup"
        title="确认下单"
        subtitle="提交后将进入打包流程，确认所有信息无误。"
        mode="bottom"
        :closeable="false"
      >
        <view class="footer-demo-body">
          <text class="footer-demo-body__line">收件人 · 张三 · 138****0000</text>
          <text class="footer-demo-body__line">目的地 · 美国 洛杉矶</text>
          <text class="footer-demo-body__line">预估重量 · 5–10 kg</text>
        </view>
        <template #footer>
          <pd-button variant="secondary" block @click="closeFooterDemo">取消</pd-button>
          <pd-button block @click="confirmFooterDemo">确认提交</pd-button>
        </template>
      </pd-popup>

      <!-- In Context -->
      <text class="h3">实际场景</text>
      <text class="desc">底部弹层适合选择列表和详情视图，居中对话框更适用于确认提示与简短的告警。</text>

      <!-- Props -->
      <text class="h3">属性</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">title</text>
          <text class="prop-type">String</text>
          <text class="prop-default">''</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">mode</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'bottom'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">closeable</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">maxHeight</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'60vh'</text>
        </view>
      </view>

      <!-- Slots -->
      <text class="h3">插槽</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">插槽</text>
          <text class="prop-h">用途</text>
          <text class="prop-h">备注</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">default</text>
          <text class="prop-type">弹窗主体内容</text>
          <text class="prop-default">列表 / 表单 / 自定义视图</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">header</text>
          <text class="prop-type">覆盖默认标题区</text>
          <text class="prop-default">不传则用 title / subtitle</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">footer</text>
          <text class="prop-type">底部按钮区 dock</text>
          <text class="prop-default">自动 8/16 padding + 1:1 等分 + safe-area</text>
        </view>
      </view>

      <!-- Events -->
      <text class="h3">事件</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">事件</text>
          <text class="prop-h">触发时机</text>
          <text class="prop-h">参数</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">@open</text>
          <text class="prop-type">弹层打开后</text>
          <text class="prop-default">—</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">@close</text>
          <text class="prop-type">X / 遮罩 / close() 关闭后（单一收口）</text>
          <text class="prop-default">—</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 通过 ref 控制底部弹层</text>
        <text class="code-line">&lt;pd-popup ref="popup" title="Title" mode="bottom"&gt;</text>
        <text class="code-line">  &lt;pd-list-item title="Option 1" /&gt;</text>
        <text class="code-line">&lt;/pd-popup&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 通过 ref 打开 / 关闭</text>
        <text class="code-line">this.$refs.popup.open()</text>
        <text class="code-line">this.$refs.popup.close()</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">底部弹层应保留拖拽条，便于用户感知可以下滑关闭。</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">需要用户必须做出选择时，使用 closeable=false 并在底部按钮区提供明确的操作。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要在居中对话框中放置较长的可滚动内容，应改用底部弹层或独立页面。</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">操作按钮一律放进 #footer 插槽，让 pd-popup 统一负责 dock 内边距、按钮等分与 iPhone 安全区。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要再在 default slot 里手写 .modal-actions / .weight-actions 之类的按钮排版 + env(safe-area-inset-bottom) —— 会和组件自带的安全区重复，造成屏幕底部多出约 34pt 空白。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    openBottom() {
      this.$refs.bottomPopup.open()
    },
    closeBottom() {
      this.$refs.bottomPopup.close()
    },
    openCenter() {
      this.$refs.centerPopup.open()
    },
    keepOrder() {
      this.$refs.centerPopup.close()
      uni.showToast({ title: '已保留运单', icon: 'none' })
    },
    cancelOrder() {
      this.$refs.centerPopup.close()
      uni.showToast({ title: '运单已取消', icon: 'none' })
    },
    openList() {
      this.$refs.listPopup.open()
    },
    selectCountry(name) {
      this.$refs.listPopup.close()
      uni.showToast({ title: '已选择 ' + name, icon: 'none' })
    },
    openLong() {
      this.$refs.longPopup.open()
    },
    openBottomMandatory() {
      this.$refs.bottomMandatoryPopup.open()
    },
    acceptTerms() {
      this.$refs.bottomMandatoryPopup.close()
      uni.showToast({ title: '已同意协议', icon: 'none' })
    },
    declineTerms() {
      this.$refs.bottomMandatoryPopup.close()
      uni.showToast({ title: '需要同意才能继续', icon: 'none' })
    },
    openCenterCloseable() {
      this.$refs.centerCloseablePopup.open()
    },
    closeCenterCloseable() {
      this.$refs.centerCloseablePopup.close()
    },
    openFooterDemo() {
      this.$refs.footerDemoPopup.open()
    },
    closeFooterDemo() {
      this.$refs.footerDemoPopup.close()
    },
    confirmFooterDemo() {
      this.$refs.footerDemoPopup.close()
      uni.showToast({ title: '已确认提交', icon: 'none' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

// Footer demo body — three info lines stacked with 16px sides padding to align
// with the popup header title. Pure showcase styling; not part of the DS.
.footer-demo-body { display: flex; flex-direction: column; gap: $pd-space-1; padding: 0 $pd-space-2; }
.footer-demo-body__line { @include pd-type(body-lg); color: $pd-text-secondary; }
</style>
