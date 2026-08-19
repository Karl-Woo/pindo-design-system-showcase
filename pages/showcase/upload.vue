<template>
  <pd-doc-shell active-path="upload">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">上传</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">带预览网格的图片上传组件。封装 uni.chooseImage，支持数量上限、删除和禁用状态。</text>
      </view>

      <!-- Default -->
      <text class="h3">默认（最多 9 张）</text>
      <pd-card variant="elevated">
        <pd-upload :files="files" @input="files = $event" />
        <text class="hint">{{ files.length }} / 9 张图片</text>
      </pd-card>

      <!-- Max 3 -->
      <text class="h3">限制数量（最多 3 张）</text>
      <pd-card variant="elevated">
        <pd-upload :files="small" :max="3" @input="small = $event" />
      </pd-card>

      <!-- Disabled -->
      <text class="h3">禁用</text>
      <pd-card variant="elevated">
        <pd-upload :files="disabledFiles" :disabled="true" />
      </pd-card>

      <!-- Props -->
      <text class="h3">Props</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">Prop</text>
          <text class="prop-h">Type</text>
          <text class="prop-h">Default</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">files</text>
          <text class="prop-type">Array</text>
          <text class="prop-default">[]</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">max</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">9</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">addText</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'Add'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">disabled</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">sourceType</text>
          <text class="prop-type">Array</text>
          <text class="prop-default">['album','camera']</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 使用 v-model 绑定</text>
        <text class="code-line">&lt;pd-upload v-model="files" :max="6" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 只读预览</text>
        <text class="code-line">&lt;pd-upload :files="files" :disabled="true" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">在后台压缩并上传 — 提交过程中在每个图块上显示加载中状态。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要在文件上传时阻塞界面，让用户可以继续滚动浏览。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      small: [],
      disabledFiles: [
        { url: 'https://picsum.photos/seed/pd1/200' },
        { url: 'https://picsum.photos/seed/pd2/200' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.hint { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-top: $pd-space-1; }

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
