<template>
  <pd-doc-shell active-path="elevation">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row"><text class="pg-header__title">层级阴影与圆角</text><pd-badge variant="label" color="success" text="稳定" /></view>
        <text class="pg-header__desc">层级阴影通过阴影营造纵深感；圆角定义界面形状语言；Z-index 管理元素叠放顺序。</text>
      </view>

      <!-- Elevation -->
      <text class="h3">层级级别</text>
      <view class="elev-grid">
        <view v-for="e in elevations" :key="e.level" class="elev-card" :style="{ boxShadow: e.shadow }">
          <text class="elev-level">{{ e.level }}</text>
          <text class="elev-name mono">{{ e.name }}</text>
          <text class="elev-usage">{{ e.usage }}</text>
        </view>
      </view>

      <!-- Radius -->
      <text class="h3">圆角</text>
      <view class="radius-grid">
        <view v-for="r in radii" :key="r.token" class="radius-item">
          <view class="radius-shape" :style="{ borderRadius: r.val }" />
          <text class="radius-token mono">{{ r.token }}</text>
          <text class="radius-val">{{ r.val }}</text>
        </view>
      </view>

      <!-- Z-Index -->
      <text class="h3">Z-Index 层级</text>
      <view class="token-card">
        <view v-for="z in zindex" :key="z.token" class="z-row">
          <text class="z-token mono">{{ z.token }}</text>
          <view class="z-bar" :style="{ width: z.width }" />
          <text class="z-val">{{ z.value }}</text>
          <text class="z-usage">{{ z.usage }}</text>
        </view>
      </view>

      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// 层级阴影混入</text></text>
        <text class="code-line">@include pd-elevation(2);  <text class="code-comment">// 卡片</text></text>
        <text class="code-line">@include pd-elevation(4);  <text class="code-comment">// 模态弹窗</text></text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 圆角 token</text></text>
        <text class="code-line">border-radius: $pd-radius-md;  <text class="code-comment">// 16rpx</text></text>
      </view>

      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">标准卡片使用 elevation-2；elevation-4 仅用于模态弹窗和底部抽屉。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要在同一元素上同时使用阴影和边框，二选其一。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      elevations: [
        { level: 0, name: 'elevation-0', shadow: 'none', usage: '扁平 / 描边' },
        { level: 1, name: 'elevation-1', shadow: '0 1px 4px rgba(0,0,0,0.08)', usage: '轻微提升' },
        { level: 2, name: 'elevation-2', shadow: '0 2px 8px rgba(0,0,0,0.10)', usage: '卡片' },
        { level: 3, name: 'elevation-3', shadow: '0 4px 16px rgba(0,0,0,0.12)', usage: '下拉菜单' },
        { level: '3↑', name: 'elevation-3-up', shadow: '0 -4px 16px rgba(0,0,0,0.12)', usage: '向上投影：压在图片上的 sheet' },
        { level: 4, name: 'elevation-4', shadow: '0 8px 24px rgba(0,0,0,0.16)', usage: '模态弹窗' }
      ],
      radii: [
        { token: 'radius-xs', val: '4rpx' },
        { token: 'radius-sm', val: '8rpx' },
        { token: 'radius-md', val: '16rpx' },
        { token: 'radius-lg', val: '24rpx' },
        { token: 'radius-xl', val: '32rpx' },
        { token: 'radius-pill', val: '200rpx' },
        { token: 'radius-circle', val: '50%' }
      ],
      zindex: [
        { token: 'z-base', value: '0', usage: '基础内容', width: '10rpx' },
        { token: 'z-raised', value: '1', usage: '高于同级元素', width: '12rpx' },
        { token: 'z-sticky', value: '100', usage: '吸顶头部', width: '80rpx' },
        { token: 'z-dropdown', value: '200', usage: '下拉菜单', width: '120rpx' },
        { token: 'z-overlay', value: '300', usage: '遮罩', width: '160rpx' },
        { token: 'z-modal', value: '400', usage: '模态弹窗', width: '200rpx' },
        { token: 'z-toast', value: '500', usage: '轻提示', width: '240rpx' },
        { token: 'z-tooltip', value: '600', usage: '气泡提示', width: '280rpx' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

// Elevation
.elev-grid { display: flex; flex-direction: column; gap: $pd-space-1-5; }
.elev-card {
  background: $pd-surface-primary; border-radius: $pd-radius-md; padding: $pd-space-2;
  &:first-child { border: 1rpx solid $pd-border-light; } // only level 0 gets border
}
.elev-level { @include pd-type(display-md); color: $pd-text-primary; font-weight: $pd-font-bold; display: block; }
.elev-name { @include pd-type(body-sm); color: $pd-text-placeholder; display: block; margin-top: $pd-space-half; }
.elev-usage { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-top: 4rpx; }

// Radius
.radius-grid { display: flex; flex-wrap: wrap; gap: $pd-space-2; }
.radius-item { @include pd-flex-col; align-items: center; gap: $pd-space-half; }
.radius-shape { width: 80rpx; height: 80rpx; background: $pd-brand-500; }
.radius-token { @include pd-type(body-sm); color: $pd-text-secondary; }
.radius-val { @include pd-type(body-sm); color: $pd-text-placeholder; }

// Z-Index
.z-row { display: flex; align-items: center; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.z-token { @include pd-type(body-sm); color: $pd-text-secondary; width: 150rpx; flex-shrink: 0; }
.z-bar { height: 16rpx; background: $pd-info; border-radius: $pd-radius-xs; margin-right: $pd-space-1; }
.z-val { @include pd-type(body-sm); color: $pd-brand-500; font-weight: $pd-font-semibold; width: 64rpx; flex-shrink: 0; }
.z-usage { @include pd-type(body-sm); color: $pd-text-tertiary; }

</style>
