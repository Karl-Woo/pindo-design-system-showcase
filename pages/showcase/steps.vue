<template>
  <pd-doc-shell active-path="steps">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">步骤条</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">用于顺序流程的进度指示器。横向适合向导式步骤，纵向适合时间线和订单追踪。</text>
      </view>

      <!-- Horizontal -->
      <text class="h3">横向</text>
      <pd-card variant="elevated">
        <pd-steps :steps="horizontalSteps" :current="currentH" />
        <view class="controls">
          <pd-button variant="secondary" text="上一步" :disabled="currentH === 0" @click="currentH--" />
          <pd-button variant="filled" text="下一步" :disabled="currentH === horizontalSteps.length - 1" @click="currentH++" />
        </view>
      </pd-card>

      <!-- Vertical (with descriptions) -->
      <text class="h3">纵向</text>
      <pd-card variant="elevated">
        <pd-steps :steps="verticalSteps" :current="2" direction="vertical" />
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
          <text class="prop-name">steps</text>
          <text class="prop-type">Array</text>
          <text class="prop-default">[]</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">current</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">0</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">direction</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'horizontal'</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 横向向导</text>
        <text class="code-line">&lt;pd-steps :steps="['Cart','Ship','Pay','Done']" :current="2" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 带描述的纵向时间线</text>
        <text class="code-line">&lt;pd-steps direction="vertical" :steps="steps" :current="2" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">步骤标题保持简短 — 控制在 2-4 个字。纵向布局可借助描述字段补充上下文。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">横向步骤不要超过 5 个 — 否则会显得拥挤，应改用纵向布局。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      currentH: 1,
      horizontalSteps: ['购物车', '配送', '付款', '完成'],
      verticalSteps: [
        { title: '订单已提交', description: '2026-04-14 09:32' },
        { title: '付款已收到', description: '2026-04-14 09:34' },
        { title: '已打包发货', description: '进行中' },
        { title: '正在派送', description: '待办' },
        { title: '已签收', description: '待办' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.controls { display: flex; justify-content: space-between; margin-top: $pd-space-3; }

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
