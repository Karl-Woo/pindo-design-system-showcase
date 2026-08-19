<template>
  <pd-doc-shell active-path="spacing">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row"><text class="pg-header__title">间距</text><pd-badge variant="label" color="success" text="稳定" /></view>
        <text class="pg-header__desc">所有间距基于 8px（16rpx）栅格。徽章等紧凑元素允许使用 4px 的半步进。</text>
      </view>

      <text class="h3">尺度</text>
      <view class="token-card">
        <view v-for="s in scale" :key="s.token" class="space-row">
          <text class="space-token mono">{{ s.token }}</text>
          <view class="space-bar" :style="{ width: s.rpx }" />
          <text class="space-val mono">{{ s.px }}</text>
        </view>
      </view>

      <text class="h3">应用场景</text>
      <text class="desc">间距 token 在常见布局模式中的应用。</text>
      <view class="token-card">
        <view v-for="p in patterns" :key="p.pattern" class="ctx-row">
          <text class="ctx-name">{{ p.pattern }}</text>
          <text class="ctx-val mono">{{ p.token }}</text>
        </view>
      </view>

      <!-- Anatomy -->
      <text class="h3">卡片结构</text>
      <view class="anatomy">
        <view class="anatomy-box">
          <view class="anatomy-inner">
            <view class="anatomy-line" /><view class="anatomy-line anatomy-line--short" />
          </view>
          <text class="anatomy-label-top">space-2 (32rpx)</text>
          <text class="anatomy-label-side">space-2</text>
        </view>
      </view>

      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// SCSS token</text></text>
        <text class="code-line">padding: $pd-space-2;         <text class="code-comment">// 32rpx</text></text>
        <text class="code-line">gap: $pd-space-1;             <text class="code-comment">// 16rpx</text></text>
        <text class="code-line">margin-bottom: $pd-space-3;   <text class="code-comment">// 48rpx</text></text>
      </view>

      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">始终对齐到最近的栅格刻度，不要使用 15rpx、22rpx 等任意数值。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">容器水平内边距统一使用 space-2（32rpx）。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要在同一组件中混用 px 和 rpx，请统一使用 rpx。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      scale: [
        { token: 'space-0.5', px: '4px', rpx: '8rpx' },
        { token: 'space-1', px: '8px', rpx: '16rpx' },
        { token: 'space-1.5', px: '12px', rpx: '24rpx' },
        { token: 'space-2', px: '16px', rpx: '32rpx' },
        { token: 'space-3', px: '24px', rpx: '48rpx' },
        { token: 'space-4', px: '32px', rpx: '64rpx' },
        { token: 'space-5', px: '40px', rpx: '80rpx' },
        { token: 'space-6', px: '48px', rpx: '96rpx' },
        { token: 'space-8', px: '64px', rpx: '128rpx' },
        { token: 'space-10', px: '80px', rpx: '160rpx' }
      ],
      patterns: [
        { pattern: '容器内边距', token: 'space-2 (32rpx)' },
        { pattern: '卡片内部内边距', token: 'space-3 (48rpx)' },
        { pattern: '列表项之间', token: 'space-1 (16rpx)' },
        { pattern: '表单字段之间', token: 'space-3 (48rpx)' },
        { pattern: '区块垂直间距', token: 'space-5 (80rpx)' },
        { pattern: '图标与标签间距', token: 'space-1 (16rpx)' },
        { pattern: '按钮水平内边距', token: 'space-3 (48rpx)' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.space-row { display: flex; align-items: center; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.space-token { @include pd-type(body-sm); color: $pd-text-secondary; width: 150rpx; flex-shrink: 0; }
.space-bar { height: 24rpx; background: $pd-brand-500; border-radius: $pd-radius-xs; margin-right: $pd-space-1; }
.space-val { @include pd-type(body-sm); color: $pd-text-placeholder; flex-shrink: 0; }

.ctx-row { @include pd-flex-between; padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.ctx-name { @include pd-type(body-sm); color: $pd-text-secondary; }
.ctx-val { @include pd-type(body-sm); color: $pd-text-placeholder; }

.anatomy { padding: $pd-space-2; }
.anatomy-box {
  position: relative; border: 2rpx dashed $pd-brand-500; border-radius: $pd-radius-md; padding: $pd-space-2;
}
.anatomy-inner { background: $pd-surface-secondary; border-radius: $pd-radius-sm; padding: $pd-space-1-5; }
.anatomy-line { height: 16rpx; background: $pd-border-light; border-radius: $pd-radius-xs; margin-bottom: $pd-space-1; &--short { width: 60%; margin-bottom: 0; } }
.anatomy-label-top { @include pd-type(body-sm); color: $pd-brand-500; position: absolute; top: -24rpx; left: $pd-space-2; background: $pd-surface-secondary; padding: 0 $pd-space-half; }
.anatomy-label-side { @include pd-type(body-sm); color: $pd-brand-500; position: absolute; right: -8rpx; top: 50%; transform: translateY(-50%) rotate(90deg); background: $pd-surface-secondary; padding: 0 $pd-space-half; }

</style>
