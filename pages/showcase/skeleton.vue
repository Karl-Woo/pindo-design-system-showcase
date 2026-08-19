<template>
  <pd-doc-shell active-path="skeleton">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">骨架屏</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">在内容加载期间保持布局结构的占位组件，以 1.5 秒的微光动画提示加载状态。</text>
      </view>

      <!-- Text preset -->
      <text class="h3">文本（默认）</text>
      <pd-card variant="elevated">
        <pd-skeleton :rows="4" />
      </pd-card>

      <!-- List item preset -->
      <text class="h3">列表项</text>
      <pd-card variant="elevated">
        <pd-skeleton preset="list-item" />
        <view style="height: 24rpx;" />
        <pd-skeleton preset="list-item" />
      </pd-card>

      <!-- Card preset -->
      <text class="h3">卡片</text>
      <pd-card variant="elevated">
        <pd-skeleton preset="card" />
      </pd-card>

      <!-- Toggle demo -->
      <text class="h3">加载中 → 实际内容</text>
      <pd-card variant="elevated" padding="none">
        <view class="toggle-bar">
          <text class="toggle-bar__label">加载中</text>
          <pd-button
            variant="tonal"
            :text="loading ? '显示内容' : '显示骨架屏'"
            @click="loading = !loading"
          />
        </view>
        <view class="toggle-body">
          <pd-skeleton v-if="loading" preset="list-item" />
          <view v-else class="list-item">
            <image class="list-item__avatar" src="https://i.pravatar.cc/150?img=3" mode="aspectFill" />
            <view class="list-item__body">
              <text class="list-item__title">陈思琪</text>
              <text class="list-item__desc">最后消息于 2 分钟前</text>
            </view>
          </view>
        </view>
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
          <text class="prop-name">preset</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'text'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">rows</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">3</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">lastShort</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">animate</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">true</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 文本行</text>
        <text class="code-line">&lt;pd-skeleton :rows="3" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 列表行预设</text>
        <text class="code-line">&lt;pd-skeleton preset="list-item" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 带图片的卡片预设</text>
        <text class="code-line">&lt;pd-skeleton preset="card" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">骨架屏的形状应与真实内容保持一致，避免切换时出现布局跳动。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要为耗时不足 300ms 的加载显示骨架屏，闪烁的体验比不显示占位更差。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return { loading: true }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.toggle-bar { display: flex; align-items: center; justify-content: space-between; padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light;
  &__label { @include pd-type(overline); color: $pd-text-tertiary; }
}
.toggle-body { padding: $pd-space-2; }

.list-item { display: flex; align-items: center; gap: $pd-space-1-5;
  &__avatar { width: 88rpx; height: 88rpx; border-radius: 50%; }
  &__body { flex: 1; display: flex; flex-direction: column; gap: $pd-space-half; }
  &__title { @include pd-type(body-lg); color: $pd-text-primary; font-weight: $pd-font-semibold; }
  &__desc { @include pd-type(body-sm); color: $pd-text-tertiary; }
}

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
