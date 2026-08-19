<template>
  <pd-doc-shell active-path="card">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">卡片</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">卡片用于聚合相关内容。三种变体控制视觉权重：elevated（阴影）、outlined（描边）、flat（灰色背景）。</text>
      </view>

      <!-- Variants -->
      <text class="h3">变体</text>

      <text class="desc">Elevated —— 阴影让卡片浮于背景之上</text>
      <pd-card variant="elevated">
        <text class="card-demo-text">带阴影的浮起卡片</text>
      </pd-card>

      <text class="desc">Outlined —— 通过细边框界定边界</text>
      <pd-card variant="outlined">
        <text class="card-demo-text">带描边的卡片</text>
      </pd-card>

      <text class="desc">Flat —— 灰色背景，无阴影也无边框</text>
      <pd-card variant="flat">
        <text class="card-demo-text">灰色背景的扁平卡片</text>
      </pd-card>

      <!-- Padding -->
      <text class="h3">内边距选项</text>

      <text class="desc">padding="none"</text>
      <pd-card variant="elevated" padding="none">
        <view class="card-demo-inner">
          <text class="card-demo-text">无内边距</text>
        </view>
      </pd-card>

      <text class="desc">padding="default"（标准）</text>
      <pd-card variant="elevated">
        <text class="card-demo-text">默认内边距</text>
      </pd-card>

      <text class="desc">padding="lg"</text>
      <pd-card variant="elevated" padding="lg">
        <text class="card-demo-text">大号内边距</text>
      </pd-card>

      <!-- Clickable -->
      <text class="h3">可点击卡片</text>
      <text class="desc">长按可观察反馈效果</text>
      <pd-card variant="elevated" clickable @click="onCardClick">
        <text class="card-demo-text">点我 —— 带按压反馈的可点击卡片</text>
      </pd-card>

      <!-- In Context -->
      <text class="h3">实际场景</text>
      <text class="desc">卡片中嵌入一个列表项</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="运单 #20260413" subtitle="上海 → 洛杉矶" arrow />
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
          <text class="prop-name">variant</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'elevated'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">padding</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'default'</text>
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
        <text class="code-line code-comment">// 浮起卡片（默认）</text>
        <text class="code-line">&lt;pd-card variant="elevated"&gt;</text>
        <text class="code-line">  &lt;text&gt;内容&lt;/text&gt;</text>
        <text class="code-line">&lt;/pd-card&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 可点击的描边卡片</text>
        <text class="code-line">&lt;pd-card variant="outlined" clickable @click="onTap"&gt;</text>
        <text class="code-line">  &lt;text&gt;点我&lt;/text&gt;</text>
        <text class="code-line">&lt;/pd-card&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">需要在视觉上突出的主要内容使用 elevated 变体。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要在同一张卡片上同时使用阴影和边框，二选一即可。</text>
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
    onCardClick() {
      uni.showToast({ title: '卡片已点击', icon: 'none' })
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

.card-demo-text { @include pd-type(body-sm); color: $pd-text-secondary; }
.card-demo-inner { padding: $pd-space-2; }
</style>
