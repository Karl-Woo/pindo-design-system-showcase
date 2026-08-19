<template>
  <pd-doc-shell active-path="navbar-page">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">导航栏</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">pd-navbar 在 uv-navbar 基础上封装了安全区适配、自动返回以及可自定义的插槽。</text>
      </view>

      <!-- Default -->
      <text class="h3">默认</text>
      <text class="desc">返回按钮 + 标题</text>
      <pd-card variant="outlined" padding="none">
        <view class="navbar-preview">
          <view class="navbar-preview__back">
            <uv-icon name="arrow-left" size="20" />
          </view>
          <text class="navbar-preview__title">页面标题</text>
        </view>
      </pd-card>

      <!-- No Back -->
      <text class="h3">无返回按钮</text>
      <text class="desc">仅显示标题，用于根页面</text>
      <pd-card variant="outlined" padding="none">
        <view class="navbar-preview">
          <text class="navbar-preview__title navbar-preview__title--center">首页</text>
        </view>
      </pd-card>

      <!-- Custom Slots -->
      <text class="h3">自定义插槽</text>
      <text class="desc">城市胶囊 + 操作按钮图标</text>
      <pd-card variant="outlined" padding="none">
        <view class="navbar-preview">
          <view class="navbar-preview__back">
            <uv-icon name="arrow-left" size="20" />
          </view>
          <view class="navbar-preview__pill">
            <uv-icon name="map" size="14" />
            <text class="navbar-preview__pill-text">上海</text>
          </view>
          <view class="navbar-preview__action">
            <uv-icon name="search" size="20" />
          </view>
        </view>
      </pd-card>

      <!-- Progress variant -->
      <text class="h3">步骤进度</text>
      <text class="desc"
        >分段进度条作为导航栏的一部分固定常显（跟团流程 4
        步），滚动内容时始终可见。传 progressSegments +
        progressCurrent（= currentStep + 1）。</text
      >
      <pd-card variant="outlined" padding="none">
        <view class="navbar-preview navbar-preview--flush">
          <view class="navbar-preview__back">
            <uv-icon name="arrow-left" size="20" />
          </view>
          <text class="navbar-preview__title navbar-preview__title--center"
            >寄出快递</text
          >
          <view class="navbar-preview__action">
            <uv-icon name="close" size="20" />
          </view>
        </view>
        <view class="navbar-preview__progress">
          <pd-progress :segments="4" :current="1" />
        </view>
      </pd-card>

      <!-- Features -->
      <text class="h3">特性</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="安全区适配" subtitle="自动适配状态栏高度" divider />
        <pd-list-item title="固定定位" subtitle="滚动时始终固定在顶部" divider />
        <pd-list-item title="自动返回" subtitle="点击左侧按钮自动返回上一页" divider />
        <pd-list-item title="自定义事件" subtitle="可触发 @back 与 @right-click" />
      </pd-card>

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
          <text class="prop-name">showBack</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">bgColor</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'#fff'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">border</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">fixed</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">placeholder</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">progressSegments</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">0</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">progressCurrent</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">0</text>
        </view>
      </view>

      <!-- Events -->
      <text class="h3">事件</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">事件</text>
          <text class="prop-h">参数</text>
          <text class="prop-h">触发时机</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">back</text>
          <text class="prop-type">—</text>
          <text class="prop-default">点击返回按钮</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 默认导航栏</text>
        <text class="code-line">&lt;pd-navbar title="Settings" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 无返回按钮（根页面）</text>
        <text class="code-line">&lt;pd-navbar title="Home" :showBack="false" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 自定义插槽</text>
        <text class="code-line">&lt;pd-navbar&gt;</text>
        <text class="code-line">  &lt;template #center&gt;</text>
        <text class="code-line">    &lt;view class="location-pill"&gt;Shanghai&lt;/view&gt;</text>
        <text class="code-line">  &lt;/template&gt;</text>
        <text class="code-line">  &lt;template #right&gt;</text>
        <text class="code-line">    &lt;uv-icon name="search" /&gt;</text>
        <text class="code-line">  &lt;/template&gt;</text>
        <text class="code-line">&lt;/pd-navbar&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 步骤进度导航栏（进度固定常显）</text>
        <text class="code-line">&lt;pd-navbar title="寄出快递" :progress-segments="4" :progress-current="1" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">始终开启 safeAreaInsetTop，避免内容与状态栏重叠。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">右侧插槽放置的操作图标不要超过 2 个，更多操作请改用菜单弹层。</text>
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

.navbar-preview {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 $pd-space-2;
  background: $pd-surface-primary;
  border-bottom: 1rpx solid $pd-border-light;
  &__back { width: 60rpx; display: flex; align-items: center; }
  &__title {
    @include pd-type(heading-3); color: $pd-text-primary; flex: 1;
    &--center { text-align: center; }
  }
  &__pill {
    display: flex; align-items: center; gap: 8rpx;
    background: $pd-surface-secondary; padding: 8rpx 20rpx; border-radius: $pd-radius-pill;
    flex: 1; justify-content: center;
  }
  &__pill-text { @include pd-type(body-sm); color: $pd-text-primary; }
  &__action { width: 60rpx; display: flex; align-items: center; justify-content: flex-end; }
  &--flush { border-bottom: none; }
  &__progress {
    background: $pd-surface-primary;
    padding: $pd-space-half $pd-space-1 $pd-space-1;
    border-bottom: 1rpx solid $pd-border-light;
  }
}
</style>
