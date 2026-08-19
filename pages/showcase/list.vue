<template>
  <pd-doc-shell active-path="list">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">列表项</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">标准列表行，最小触摸区域 88rpx（44pt）。支持缩略图、副标题、箭头、分隔线以及自定义右侧插槽。</text>
      </view>

      <!-- Basic -->
      <text class="h3">基础列表项</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="消息通知" arrow divider />
        <pd-list-item title="语言" arrow divider />
        <pd-list-item title="关于" arrow />
      </pd-card>

      <!-- With Thumbnails -->
      <text class="h3">带缩略图</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item
          title="Pindo 快线"
          subtitle="海运服务"
          thumb="https://via.placeholder.com/88/CB1D45/FFFFFF?text=P"
          arrow
          divider
        />
        <pd-list-item
          title="环球物流"
          subtitle="空运服务"
          thumb="https://via.placeholder.com/88/CB1D45/FFFFFF?text=G"
          arrow
          divider
        />
        <pd-list-item
          title="快达货运"
          subtitle="次日达专线"
          thumb="https://via.placeholder.com/88/CB1D45/FFFFFF?text=F"
          arrow
        />
      </pd-card>

      <!-- Custom Right Slot -->
      <text class="h3">自定义右侧插槽</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="消息" divider>
          <template #right>
            <pd-badge variant="count" :value="5" />
          </template>
        </pd-list-item>
        <pd-list-item title="动态" divider>
          <template #right>
            <pd-badge variant="dot" />
          </template>
        </pd-list-item>
        <pd-list-item title="已完成">
          <template #right>
            <pd-badge variant="status" text="完成" color="success" />
          </template>
        </pd-list-item>
      </pd-card>

      <!-- In Context -->
      <text class="h3">实际场景</text>
      <text class="desc">设置风格的列表</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="账户" subtitle="管理您的个人资料" arrow divider clickable />
        <pd-list-item title="隐私" subtitle="控制您的数据" arrow divider clickable />
        <pd-list-item title="帮助与支持" subtitle="常见问题与联系方式" arrow clickable />
      </pd-card>

      <!-- Divider -->
      <text class="h3">pd-divider</text>
      <text class="desc">分组之间的水平分隔线，可承载行内文字。</text>
      <pd-card variant="elevated">
        <text class="inline-body">A 组内容</text>
        <pd-divider />
        <text class="inline-body">B 组内容</text>
        <pd-divider text="或" />
        <text class="inline-body">C 组内容</text>
      </pd-card>

      <text class="h3">pd-divider —— 垂直方向</text>
      <pd-card variant="elevated">
        <view class="inline-row">
          <text class="inline-body">标签</text>
          <pd-divider orientation="vertical" />
          <text class="inline-body">值</text>
          <pd-divider orientation="vertical" />
          <text class="inline-body">操作</text>
        </view>
      </pd-card>

      <!-- Props -->
      <text class="h3">Props</text>
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
          <text class="prop-name">subtitle</text>
          <text class="prop-type">String</text>
          <text class="prop-default">''</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">thumb</text>
          <text class="prop-type">String</text>
          <text class="prop-default">''</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">arrow</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">divider</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">clickable</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 基础列表项（带箭头）</text>
        <text class="code-line">&lt;pd-list-item title="设置" arrow /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 带缩略图和副标题</text>
        <text class="code-line">&lt;pd-list-item</text>
        <text class="code-line">  title="Pindo 快线"</text>
        <text class="code-line">  subtitle="海运"</text>
        <text class="code-line">  thumb="/static/logo.png"</text>
        <text class="code-line">  arrow</text>
        <text class="code-line">/&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 自定义右侧插槽</text>
        <text class="code-line">&lt;pd-list-item title="消息"&gt;</text>
        <text class="code-line">  &lt;template #right&gt;</text>
        <text class="code-line">    &lt;pd-badge variant="count" :value="5" /&gt;</text>
        <text class="code-line">  &lt;/template&gt;</text>
        <text class="code-line">&lt;/pd-list-item&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">保持 88rpx 的最小高度，确保移动端有舒适的触摸区域。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要在一个列表项里塞超过 3 行的文字。这种情况改用详情页。</text>
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

.inline-body { @include pd-type(body-lg); color: $pd-text-secondary; display: block; }
.inline-row { display: flex; align-items: center; }

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
