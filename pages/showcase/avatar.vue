<template>
  <pd-doc-shell active-path="avatar">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">头像</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">用户头像，加载失败时回退到账户占位图标。pd-avatar-group 用于重叠堆叠的成员头像，超出 max 折叠为 +N。</text>
      </view>

      <!-- Sizes -->
      <text class="h3">尺寸</text>
      <view class="demo-row">
        <view class="cell"><pd-avatar :src="img" size="sm" /><text class="desc">sm 64</text></view>
        <view class="cell"><pd-avatar :src="img" size="md" /><text class="desc">md 88</text></view>
        <view class="cell"><pd-avatar :src="img" size="lg" /><text class="desc">lg 128</text></view>
      </view>

      <!-- Shape + fallback -->
      <text class="h3">形状与回退</text>
      <view class="demo-row">
        <view class="cell"><pd-avatar :src="img" size="md" /><text class="desc">circle</text></view>
        <view class="cell"><pd-avatar :src="img" size="md" shape="rounded" /><text class="desc">rounded</text></view>
        <view class="cell"><pd-avatar src="" size="md" /><text class="desc">无图回退</text></view>
        <view class="cell"><pd-avatar :src="img" size="md" bordered /><text class="desc">bordered</text></view>
      </view>

      <!-- Avatar group -->
      <text class="h3">头像组（重叠堆叠）</text>
      <view class="demo-col">
        <view class="demo-row2"><pd-avatar-group :avatars="few" :size="48" /><text class="desc">3 个</text></view>
        <view class="demo-row2"><pd-avatar-group :avatars="many" :size="48" :max="5" /><text class="desc">12 个 → +8</text></view>
      </view>

      <!-- In context -->
      <text class="h3">实际场景</text>
      <pd-card variant="outlined" padding="lg">
        <view class="ctx">
          <pd-avatar-group :avatars="many" :size="36" :max="5" />
          <text class="ctx-text"><text class="ctx-strong">12</text> 人已跟团</text>
        </view>
      </pd-card>

      <!-- Props -->
      <text class="h3">属性 · pd-avatar</text>
      <view class="token-card">
        <view class="prop-header"><text class="prop-h">属性</text><text class="prop-h">类型</text><text class="prop-h">默认值</text></view>
        <view class="prop-row"><text class="prop-name">src</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">size</text><text class="prop-type">String | Number</text><text class="prop-default">'md'</text></view>
        <view class="prop-row"><text class="prop-name">shape</text><text class="prop-type">String</text><text class="prop-default">'circle'</text></view>
        <view class="prop-row"><text class="prop-name">bordered</text><text class="prop-type">Boolean</text><text class="prop-default">false</text></view>
      </view>

      <text class="h3">属性 · pd-avatar-group</text>
      <view class="token-card">
        <view class="prop-header"><text class="prop-h">属性</text><text class="prop-h">类型</text><text class="prop-h">默认值</text></view>
        <view class="prop-row"><text class="prop-name">avatars</text><text class="prop-type">Array</text><text class="prop-default">[]</text></view>
        <view class="prop-row"><text class="prop-name">size</text><text class="prop-type">String | Number</text><text class="prop-default">'sm'</text></view>
        <view class="prop-row"><text class="prop-name">max</text><text class="prop-type">Number</text><text class="prop-default">5</text></view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line">&lt;pd-avatar :src="user.avatar" size="md" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 重叠成员头像，超出折叠为 +N</text>
        <text class="code-line">&lt;pd-avatar-group :avatars="users" :size="36" :max="5" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">堆叠头像保持 bordered 白环，使重叠处仍可区分。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要手写 border-radius:50% 的 image 做头像；用 pd-avatar 以获得回退占位。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    const img =
      'https://api.pindo.info/storage/default/20260109/thumbnail(1)fc7faef2bd96a197060de172793d580d7fbb233f.png'
    return {
      img,
      few: [img, img, img],
      many: Array.from({ length: 12 }, () => img)
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

.demo-col { display: flex; flex-direction: column; gap: $pd-space-2; }
.demo-row { display: flex; align-items: flex-start; gap: $pd-space-3; flex-wrap: wrap; }
.demo-row2 { display: flex; align-items: center; gap: $pd-space-2; }
.cell { display: flex; flex-direction: column; align-items: center; gap: $pd-space-1; }

.ctx { display: flex; align-items: center; gap: $pd-space-1-5; }
.ctx-text { @include pd-type(caption); color: $pd-text-tertiary; }
.ctx-strong { color: $pd-brand-500; font-weight: $pd-font-medium; }
</style>
