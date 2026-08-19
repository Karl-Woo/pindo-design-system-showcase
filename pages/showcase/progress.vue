<template>
  <pd-doc-shell active-path="progress">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">进度条</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">线性进度条，用品牌渐变填充呈现完成比例。可直接传百分比，或由 current / max 计算（如拼团起运重量 23kg / 50kg）。传 segments 则切换为分段步骤模式（跟团流程 4 步进度条）。</text>
      </view>

      <!-- Percentages -->
      <text class="h3">百分比</text>
      <view class="demo-col">
        <pd-progress :value="25" />
        <pd-progress :value="60" />
        <pd-progress :value="100" />
      </view>

      <!-- With label -->
      <text class="h3">带读数</text>
      <view class="demo-col">
        <pd-progress :current="23" :max="50" label="23kg/50kg" />
        <pd-progress :current="40" :max="50" label="40kg/50kg" />
      </view>

      <!-- Segmented (step wizard) -->
      <text class="h3">分段（步骤进度）</text>
      <text class="ctx-label">传 segments 切换为分段模式；current = 已点亮的段数（1-based）。跟团流程「寄出快递 / 录入单号 …」4 步进度条即用此模式。</text>
      <view class="demo-col">
        <view class="demo-row"><text class="desc">1/4</text><pd-progress :segments="4" :current="1" /></view>
        <view class="demo-row"><text class="desc">2/4</text><pd-progress :segments="4" :current="2" /></view>
        <view class="demo-row"><text class="desc">4/4</text><pd-progress :segments="4" :current="4" /></view>
      </view>

      <!-- Interactive (advance / retreat animation) -->
      <text class="h3">交互（前进 / 倒退动画）</text>
      <text class="ctx-label">点「下一步 / 上一步」，观察分段填充动画：前进时从左往右填满，倒退时从右往左收回。</text>
      <view class="demo-col">
        <pd-progress :segments="4" :current="step" />
        <view class="seg-ctrl">
          <pd-button variant="secondary" text="上一步" :disabled="step <= 0" @click="stepPrev" />
          <text class="seg-ctrl__label">{{ step }} / 4</text>
          <pd-button variant="filled" text="下一步" :disabled="step >= 4" @click="stepNext" />
        </view>
      </view>

      <!-- Heights -->
      <text class="h3">高度</text>
      <view class="demo-col">
        <view class="demo-row"><text class="desc">sm</text><pd-progress :value="60" height="sm" /></view>
        <view class="demo-row"><text class="desc">md</text><pd-progress :value="60" height="md" /></view>
        <view class="demo-row"><text class="desc">lg</text><pd-progress :value="60" height="lg" /></view>
      </view>

      <!-- In context -->
      <text class="h3">实际场景</text>
      <pd-card variant="outlined" padding="lg">
        <text class="ctx-label">起运重量</text>
        <pd-progress :current="32" :max="50" label="32kg/50kg" />
      </pd-card>

      <!-- Props -->
      <text class="h3">属性</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view class="prop-row"><text class="prop-name">value</text><text class="prop-type">Number</text><text class="prop-default">-1</text></view>
        <view class="prop-row"><text class="prop-name">current</text><text class="prop-type">Number</text><text class="prop-default">0</text></view>
        <view class="prop-row"><text class="prop-name">max</text><text class="prop-type">Number</text><text class="prop-default">0</text></view>
        <view class="prop-row"><text class="prop-name">segments</text><text class="prop-type">Number</text><text class="prop-default">0</text></view>
        <view class="prop-row"><text class="prop-name">height</text><text class="prop-type">String | Number</text><text class="prop-default">'md'</text></view>
        <view class="prop-row"><text class="prop-name">label</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">animated</text><text class="prop-type">Boolean</text><text class="prop-default">true</text></view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 直接传百分比</text>
        <text class="code-line">&lt;pd-progress :value="60" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 由 current / max 计算 + 读数</text>
        <text class="code-line">&lt;pd-progress :current="23" :max="50" label="23kg/50kg" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 分段（步骤）：segments 段，current 段点亮</text>
        <text class="code-line">&lt;pd-progress :segments="4" :current="1" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">读数（如 23kg/50kg）放在 label 槽，与进度条同行右对齐。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要再在卡片里手写进度条 view；统一用 pd-progress，避免渐变 / 圆角漂移。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return { step: 1 }
  },
  methods: {
    stepNext() { if (this.step < 4) this.step++ },
    stepPrev() { if (this.step > 0) this.step-- }
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
.demo-row { display: flex; align-items: center; gap: $pd-space-2; }
.demo-row .desc { width: 48rpx; flex-shrink: 0; }
.ctx-label { @include pd-type(body-sm); color: $pd-text-secondary; display: block; margin-bottom: $pd-space-1; }
.seg-ctrl { display: flex; align-items: center; gap: $pd-space-2; margin-top: $pd-space-2; }
.seg-ctrl__label { @include pd-type(body-sm); color: $pd-text-secondary; flex: 1; text-align: center; }
</style>
