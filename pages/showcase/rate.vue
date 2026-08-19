<template>
  <pd-doc-shell active-path="rate">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">评分</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">星级评分。实心星使用 $pd-rating（iOS 系统黄），空心星使用 border-light。默认只读用于展示；可切换为交互模式用于评价提交。</text>
      </view>

      <!-- Display -->
      <text class="h3">展示（只读）</text>
      <view class="demo-col">
        <view class="demo-row"><pd-rate :value="5" /><text class="desc">5.0</text></view>
        <view class="demo-row"><pd-rate :value="4" /><text class="desc">4.0</text></view>
        <view class="demo-row"><pd-rate :value="3" /><text class="desc">3.0</text></view>
        <view class="demo-row"><pd-rate :value="0" /><text class="desc">0.0</text></view>
      </view>

      <!-- Half -->
      <text class="h3">半星</text>
      <view class="demo-row"><pd-rate :value="3.5" allow-half /><text class="desc">3.5（allow-half）</text></view>

      <!-- Sizes -->
      <text class="h3">尺寸</text>
      <view class="demo-col">
        <view class="demo-row"><text class="desc">sm</text><pd-rate :value="4" size="sm" /></view>
        <view class="demo-row"><text class="desc">md</text><pd-rate :value="4" size="md" /></view>
        <view class="demo-row"><text class="desc">lg</text><pd-rate :value="4" size="lg" /></view>
      </view>

      <!-- Interactive -->
      <text class="h3">交互模式</text>
      <view class="demo-row">
        <pd-rate v-model="score" :readonly="false" size="lg" @change="onChange" />
        <text class="desc">已选 {{ score }} 星</text>
      </view>

      <!-- In context -->
      <text class="h3">实际场景</text>
      <pd-card variant="outlined" padding="lg">
        <view class="rev-row">
          <pd-rate :value="5" size="sm" />
          <text class="rev-score">5.0分</text>
          <text class="rev-label">转运公司</text>
        </view>
        <view class="rev-row">
          <pd-rate :value="4" size="sm" />
          <text class="rev-score">4.0分</text>
          <text class="rev-label">拼团评价</text>
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
        <view class="prop-row"><text class="prop-name">value</text><text class="prop-type">Number</text><text class="prop-default">0</text></view>
        <view class="prop-row"><text class="prop-name">count</text><text class="prop-type">Number</text><text class="prop-default">5</text></view>
        <view class="prop-row"><text class="prop-name">readonly</text><text class="prop-type">Boolean</text><text class="prop-default">true</text></view>
        <view class="prop-row"><text class="prop-name">allowHalf</text><text class="prop-type">Boolean</text><text class="prop-default">false</text></view>
        <view class="prop-row"><text class="prop-name">size</text><text class="prop-type">String | Number</text><text class="prop-default">'md'</text></view>
        <view class="prop-row"><text class="prop-name">gap</text><text class="prop-type">String | Number</text><text class="prop-default">'4rpx'</text></view>
        <view class="prop-row"><text class="prop-name">activeColor</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 展示评分</text>
        <text class="code-line">&lt;pd-rate :value="4" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 交互评分（评价提交）</text>
        <text class="code-line">&lt;pd-rate v-model="score" :readonly="false" @change="onChange" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">评分数字（"4.0分"）用中性文字色，不要染成星星的黄色——黄字在白底上对比度不足。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要用 PNG 星星图片或自定义黄色硬编码；统一用 pd-rate + $pd-rating。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return { score: 3 }
  },
  methods: {
    onChange(v) {
      this.score = v
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

.demo-col { display: flex; flex-direction: column; gap: $pd-space-1-5; }
.demo-row { display: flex; align-items: center; gap: $pd-space-2; }
.demo-row .desc { width: auto; flex-shrink: 0; }

.rev-row { display: flex; align-items: center; gap: $pd-space-1-5; margin-bottom: $pd-space-1; &:last-child { margin-bottom: 0; } }
.rev-score { @include pd-type(caption); color: $pd-text-secondary; } // neutral, per guideline (yellow text fails contrast)
.rev-label { @include pd-type(caption); color: $pd-text-tertiary; }
</style>
