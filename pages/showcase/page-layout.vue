<template>
  <pd-doc-shell active-path="page-layout">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">页面布局</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">pd-page 提供一致的页面结构，负责背景色、横向内边距及安全区感知的吸底底部。</text>
      </view>

      <!-- Anatomy -->
      <text class="h3">结构解析</text>
      <pd-card variant="outlined">
        <view class="anatomy">
          <view class="anatomy__bar anatomy__bar--status">
            <text class="anatomy__label">状态栏（安全区）</text>
          </view>
          <view class="anatomy__bar anatomy__bar--navbar">
            <text class="anatomy__label">pd-navbar</text>
          </view>
          <view class="anatomy__bar anatomy__bar--content">
            <text class="anatomy__label">内容区（可滚动）</text>
          </view>
          <view class="anatomy__bar anatomy__bar--footer">
            <text class="anatomy__label">底部插槽（安全区）</text>
          </view>
        </view>
      </pd-card>

      <!-- Background Variants -->
      <text class="h3">背景变体</text>
      <view class="bg-demos">
        <pd-card variant="outlined">
          <view class="bg-demo bg-demo--primary">
            <text class="bg-demo__label">bg="primary"</text>
            <text class="bg-demo__sub">白色背景</text>
          </view>
        </pd-card>
        <pd-card variant="outlined">
          <view class="bg-demo bg-demo--secondary">
            <text class="bg-demo__label">bg="secondary"</text>
            <text class="bg-demo__sub">灰色背景</text>
          </view>
        </pd-card>
      </view>

      <!-- Safe Area -->
      <text class="h3">安全区</text>
      <text class="desc">pd-page 会自动处理刘海屏等设备的安全区内边距。底部插槽包含底部安全区留白，避开 Home Indicator。</text>

      <!-- Props -->
      <text class="h3">Props</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">Prop</text>
          <text class="prop-h">Type</text>
          <text class="prop-h">Default</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">bg</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'primary'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">padding</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">safeBottom</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">topOffset</text>
          <text class="prop-type">String | Number</text>
          <text class="prop-default">0</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">hideFooter</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
      </view>

      <text class="desc"
        >topOffset：页面上方固定导航栏的高度（不含状态栏，pd-page 自己加）。设了它，
        min-height 扣成 100vh − 状态栏 − topOffset —— 固定导航栏页面内容不满一屏时就不会
        多出导航栏那一截可空滚动。传数值(px)或 CSS 长度，如 :top-offset="56"。</text
      >
      <text class="desc"
        >hideFooter：为 true 时不渲染吸底 footer。用于软键盘弹起时撤掉底部栏 —— iOS 上
        吸底栏会跟键盘抢位置、把聚焦的输入框盖住，撤掉后原生 adjust-position 就能把输入框
        干净地顶到键盘上方。用页面的聚焦状态驱动，如 :hide-footer="inputFocused"。</text
      >

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 含底部插槽的完整页面布局</text>
        <text class="code-line">&lt;pd-page bg="secondary"&gt;</text>
        <text class="code-line">  &lt;pd-navbar title="Checkout" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line">  &lt;view class="pg"&gt;</text>
        <text class="code-line">    &lt;!-- page content --&gt;</text>
        <text class="code-line">  &lt;/view&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line">  &lt;template #footer&gt;</text>
        <text class="code-line">    &lt;pd-button block&gt;Submit Order&lt;/pd-button&gt;</text>
        <text class="code-line">  &lt;/template&gt;</text>
        <text class="code-line">&lt;/pd-page&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 固定导航栏页面：扣掉导航栏高度，短内容不空滚动</text>
        <text class="code-line">&lt;pd-navbar :progress-segments="4" :progress-current="1" /&gt;</text>
        <text class="code-line">&lt;pd-page :top-offset="56"&gt; ... &lt;/pd-page&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">列表页和设置页使用 secondary（灰色）背景，让卡片与底色形成清晰对比。</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">把提交按钮等主操作放进底部插槽，确保滚动过程中始终可见。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
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

.anatomy {
  display: flex; flex-direction: column; gap: 4rpx;
  &__bar {
    display: flex; align-items: center; justify-content: center;
    border-radius: $pd-radius-sm;
    &--status { height: 60rpx; background: rgba(88,86,214,0.15); }
    &--navbar { height: 88rpx; background: $pd-info-bg-strong; }
    &--content { height: 240rpx; background: $pd-success-bg-strong; }
    &--footer { height: 100rpx; background: $pd-warning-bg-strong; }
  }
  &__label { @include pd-type(body-sm); color: $pd-text-secondary; }
}

.bg-demos { display: flex; flex-direction: column; gap: $pd-space-1-5; }
.bg-demo {
  height: 120rpx; border-radius: $pd-radius-sm; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8rpx;
  &--primary { background: #FFFFFF; }
  &--secondary { background: $pd-surface-secondary; }
  &__label { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; }
  &__sub { @include pd-type(body-sm); color: $pd-text-tertiary; }
}
</style>
