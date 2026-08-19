<template>
  <pd-doc-shell active-path="feedback">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">反馈提示</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">反馈类组件用于传达系统状态，包括空状态、加载指示、轻提示以及骨架屏占位。</text>
      </view>

      <!-- Empty State -->
      <text class="h3">空状态</text>
      <pd-card variant="elevated">
        <pd-empty text="还没有运单" actionText="创建运单" @action="onEmptyAction" />
      </pd-card>

      <!-- Custom Empty -->
      <text class="h3">自定义空状态</text>
      <pd-card variant="elevated">
        <pd-empty icon="search" text="没找到结果" />
      </pd-card>

      <!-- pd-empty Props / Events -->
      <text class="h3">pd-empty 属性</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">icon</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'empty-data'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">text</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'暂无数据'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">actionText</text>
          <text class="prop-type">String</text>
          <text class="prop-default">''（为空则不渲染按钮）</text>
        </view>
      </view>

      <text class="h3">pd-empty 事件</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">事件</text>
          <text class="prop-h">参数</text>
          <text class="prop-h">触发时机</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">action</text>
          <text class="prop-type">—</text>
          <text class="prop-default">点击操作按钮（需传 actionText）</text>
        </view>
      </view>

      <!-- Toast Demo -->
      <text class="h3">轻提示</text>
      <view class="demo-row">
        <pd-button @click="showTextToast">文本提示</pd-button>
        <pd-button @click="showSuccessToast">成功提示</pd-button>
      </view>

      <!-- Loading Demo -->
      <text class="h3">加载中</text>
      <pd-button @click="showLoading">显示加载（1 秒）</pd-button>

      <!-- Skeleton -->
      <text class="h3">骨架屏</text>
      <text class="desc">用于内容加载阶段的微光动画占位</text>
      <pd-card variant="elevated">
        <view class="skeleton-row">
          <view class="skeleton skeleton--circle" />
          <view class="skeleton-lines">
            <view class="skeleton skeleton--line skeleton--w60" />
            <view class="skeleton skeleton--line skeleton--w40" />
          </view>
        </view>
        <view class="skeleton skeleton--block" />
        <view class="skeleton skeleton--line skeleton--w80" />
        <view class="skeleton skeleton--line skeleton--w50" />
      </pd-card>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 带操作按钮的空状态（actionText 为空时不渲染按钮）</text>
        <text class="code-line">&lt;pd-empty</text>
        <text class="code-line">  icon="empty-data"</text>
        <text class="code-line">  text="还没有运单"</text>
        <text class="code-line">  actionText="创建运单"</text>
        <text class="code-line">  @action="onRetry"</text>
        <text class="code-line">/&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 轻提示</text>
        <text class="code-line">uni.showToast({ title: 'Saved', icon: 'success' })</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 加载中</text>
        <text class="code-line">uni.showLoading({ title: 'Loading...' })</text>
        <text class="code-line">uni.hideLoading()</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">空状态应提供操作按钮，让用户清楚下一步该做什么。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要为耗时不到 3 秒的操作显示全屏加载遮罩，应改用行内加载指示。</text>
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
    onEmptyAction() {
      uni.showToast({ title: '已点击操作按钮', icon: 'none' })
    },
    showTextToast() {
      uni.showToast({ title: '这是一条文本提示', icon: 'none' })
    },
    showSuccessToast() {
      uni.showToast({ title: '保存成功', icon: 'success' })
    },
    showLoading() {
      uni.showLoading({ title: '加载中...' })
      setTimeout(() => {
        uni.hideLoading()
      }, 1000)
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

.demo-row { display: flex; gap: $pd-space-2; flex-wrap: wrap; }

.skeleton-row { display: flex; align-items: center; gap: $pd-space-2; margin-bottom: $pd-space-2; }
.skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: $pd-space-1; }
.skeleton {
  background: $pd-surface-secondary;
  border-radius: $pd-radius-sm;
  animation: pulse 1.5s ease-in-out infinite;
  &--circle { width: 80rpx; height: 80rpx; border-radius: 50%; flex-shrink: 0; }
  &--line { height: 24rpx; }
  &--block { height: 200rpx; margin-bottom: $pd-space-2; border-radius: $pd-radius-md; }
  &--w80 { width: 80%; }
  &--w60 { width: 60%; }
  &--w50 { width: 50%; }
  &--w40 { width: 40%; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
