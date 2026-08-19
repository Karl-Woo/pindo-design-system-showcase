<template>
  <pd-doc-shell active-path="states">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">交互状态</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">每个可交互元素都会传达自身的当前状态。以下是 8 种标准视觉处理。</text>
      </view>

      <!-- State Matrix -->
      <text class="h3">状态矩阵</text>
      <pd-card variant="elevated" padding="none">
        <view class="state-row" v-for="state in states" :key="state.name">
          <view class="state-dot" :style="{ background: state.color }" />
          <view class="state-info">
            <text class="state-name">{{ state.name }}</text>
            <text class="state-treatment">{{ state.treatment }}</text>
          </view>
        </view>
      </pd-card>

      <!-- Live Button States -->
      <text class="h3">按钮状态实例</text>
      <view class="state-demos">
        <pd-button>默认</pd-button>
        <pd-button disabled>禁用</pd-button>
        <pd-button loading>加载中</pd-button>
      </view>

      <!-- Live Input States -->
      <text class="h3">输入框状态实例</text>
      <pd-card variant="elevated">
        <pd-input label="默认" placeholder="请在此输入..." v-model="defaultVal" />
        <view class="form-gap" />
        <pd-input label="错误" placeholder="无效输入" v-model="errorVal" error="该字段为必填项" />
        <view class="form-gap" />
        <pd-input label="禁用" placeholder="不可编辑" value="只读内容" disabled />
      </pd-card>

      <!-- Card Pressed -->
      <text class="h3">卡片按下状态</text>
      <text class="desc">按住卡片可查看按下状态</text>
      <pd-card variant="elevated" clickable>
        <text class="card-demo-text">可点击卡片 — 长按可查看状态变化</text>
      </pd-card>

      <!-- List Pressed -->
      <text class="h3">列表项按下状态</text>
      <text class="desc">按住列表项进行查看</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="可点击项 1" subtitle="按住查看按下状态" arrow clickable divider />
        <pd-list-item title="可点击项 2" subtitle="按住查看按下状态" arrow clickable />
      </pd-card>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 禁用按钮</text>
        <text class="code-line">&lt;pd-button disabled&gt;Submit&lt;/pd-button&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 加载中按钮</text>
        <text class="code-line">&lt;pd-button loading&gt;Saving...&lt;/pd-button&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 错误状态输入框</text>
        <text class="code-line">&lt;pd-input error="Required field" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 禁用态透明度方案</text>
        <text class="code-line">opacity: 0.38; pointer-events: none;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">每次交互都应给出即时视觉反馈，用户绝不应该怀疑自己是否点中。</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">禁用元素统一使用 0.38 透明度，这是设计系统的标准处理方式。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要把禁用元素从布局中移除。保留它们，用户才能理解完整的界面结构。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      defaultVal: '',
      errorVal: '',
      states: [
        { name: '默认', color: '#8B8B8B', treatment: '基础外观，无交互' },
        { name: '悬停', color: '#007AFF', treatment: '轻微背景色变化（仅桌面端）' },
        { name: '按下', color: '#0056B3', treatment: '缩放 0.98 + 背景加深' },
        { name: '聚焦', color: '#5856D6', treatment: '元素周围 2rpx 品牌色描边' },
        { name: '禁用', color: '#C2C2C2', treatment: '透明度 0.38，pointer-events: none' },
        { name: '加载中', color: '#FF9500', treatment: '加载图标取代文字，并禁用交互' },
        { name: '已选中', color: '#34C759', treatment: '品牌色填充或勾选标记' },
        { name: '错误', color: '#FF3B30', treatment: '红色描边 + 下方错误提示' }
      ]
    }
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

.state-row {
  display: flex; align-items: center; gap: $pd-space-2; padding: $pd-space-1-5 $pd-space-2;
  border-bottom: 1rpx solid $pd-border-light;
  &:last-child { border-bottom: none; }
}
.state-dot { width: 20rpx; height: 20rpx; border-radius: 50%; flex-shrink: 0; }
.state-info { flex: 1; }
.state-name { @include pd-type(body-sm); color: $pd-text-primary; font-weight: $pd-font-medium; display: block; }
.state-treatment { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-top: 4rpx; }

.state-demos { display: flex; gap: $pd-space-2; flex-wrap: wrap; }
.form-gap { height: $pd-space-2; }
.card-demo-text { @include pd-type(body-sm); color: $pd-text-secondary; }
</style>
