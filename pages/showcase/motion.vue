<template>
  <pd-doc-shell active-path="motion">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row"><text class="pg-header__title">动效</text><pd-badge variant="label" color="success" text="稳定" /></view>
        <text class="pg-header__desc">动效 token 定义时长与缓动曲线，让全局动画拥有清晰目的与一致体验。</text>
      </view>

      <!-- Duration -->
      <text class="h3">时长</text>
      <view class="token-card">
        <view v-for="d in durations" :key="d.token" class="dur-row">
          <view class="dur-info">
            <text class="dur-token mono">{{ d.token }}</text>
            <text class="dur-val">{{ d.value }}</text>
          </view>
          <text class="dur-usage">{{ d.usage }}</text>
          <view class="dur-bar"><view class="dur-fill" :style="{ animationDuration: d.value }" /></view>
        </view>
      </view>

      <!-- Easing -->
      <text class="h3">缓动曲线</text>
      <text class="desc">基于 Material Design 3 标准曲线，每条曲线传达不同的意图。</text>
      <view class="token-card">
        <view v-for="e in easings" :key="e.token" class="ease-row">
          <text class="ease-token mono">{{ e.token }}</text>
          <text class="ease-bezier mono">{{ e.value }}</text>
          <text class="ease-feel">{{ e.feel }}</text>
        </view>
      </view>

      <!-- Live Demos -->
      <text class="h3">关键帧动画</text>
      <text class="desc">演示直接使用 styles/animations.scss 中的实用类（pd-spin、pd-pulse、pd-fade-enter 等），无需在组件内重新定义关键帧。</text>
      <!-- Wrapping in a keyed view forces the whole subtree to unmount/remount
           when animKey changes — uni-app H5's compiler hoists v-for `:key`
           expressions, so per-row key tricks don't trigger a remount. -->
      <view class="anim-grid" :key="'anim-grid-' + animKey">
        <view v-for="a in anims" :key="a.cls" class="anim-cell">
          <view :class="['anim-box', a.cls]" />
          <text class="anim-name mono">{{ a.cls }}</text>
          <text class="anim-desc">{{ a.desc }}</text>
        </view>
      </view>
      <view
        class="replay"
        hover-class="replay--pressed"
        :hover-stay-time="80"
        @click="replayAnims"
      >
        <text class="replay__text">重播一次性动画</text>
      </view>

      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// 过渡混入</text></text>
        <text class="code-line">@include pd-transition(background-color);</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 手动定义过渡</text></text>
        <text class="code-line">transition: transform $pd-duration-fast $pd-ease-standard;</text>
      </view>

      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">微交互使用 duration-fast（200ms）：按钮按下、开关切换、图标变化。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">进入视口的元素使用 ease-decelerate，让它们减速归位。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要在功能性 UI 中使用 ease-spring，它仅适用于点缀性、非关键的趣味时刻。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      animKey: 0, // bumped on replay to re-trigger one-shot animations
      durations: [
        { token: 'duration-instant',   value: '150ms',  usage: '悬停 / 按下反馈' },
        { token: 'duration-fast',      value: '200ms',  usage: '颜色 / 边框 / 微小过渡' },
        { token: 'duration-normal',    value: '300ms',  usage: '滑入、展开、抽屉' },
        { token: 'duration-slow',      value: '450ms',  usage: '页面切换、模态' },
        { token: 'duration-loop',      value: '1000ms', usage: '加载旋转（无限循环）' },
        { token: 'duration-loop-slow', value: '1500ms', usage: '骨架屏脉冲（无限循环）' }
      ],
      easings: [
        { token: 'ease-standard',   value: 'cubic-bezier(0.2,0,0,1)',         feel: '默认 — 高效、明确' },
        { token: 'ease-decelerate', value: 'cubic-bezier(0,0,0,1)',           feel: '进入 — 减速归位' },
        { token: 'ease-accelerate', value: 'cubic-bezier(0.3,0,1,1)',         feel: '退出 — 加速离开' },
        { token: 'ease-spring',     value: 'cubic-bezier(0.175,0.885,0.32,1.275)', feel: '弹性 — 徽章 pop-in、点赞反馈' },
        { token: 'ease-linear',     value: 'linear',                          feel: '匀速 — 仅限循环动画' }
      ],
      // Each item drives one swatch in the demo; `cls` is the animations.scss
      // utility class applied directly (no local @keyframes).
      anims: [
        { cls: 'pd-spin',          desc: '加载旋转（无限）' },
        { cls: 'pd-pulse',         desc: '骨架屏脉冲（无限）' },
        { cls: 'pd-fade-enter',    desc: '渐入（一次性）' },
        { cls: 'pd-slide-up-enter',  desc: '从下滑入（一次性）' },
        { cls: 'pd-slide-down-enter',desc: '从上滑入（一次性）' },
        { cls: 'pd-bounce-enter',  desc: '弹性 pop-in（一次性，spring）' }
      ]
    }
  },
  methods: {
    replayAnims() {
      this.animKey++ // changing key remounts the demo boxes, re-triggering animations
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

// Duration
.dur-row { padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.dur-info { display: flex; align-items: center; gap: $pd-space-1; }
.dur-token { @include pd-type(body-sm); color: $pd-text-primary; }
.dur-val { @include pd-type(body-sm); color: $pd-brand-500; font-weight: $pd-font-semibold; }
.dur-usage { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-top: 4rpx; }
.dur-bar { height: 8rpx; background: $pd-surface-secondary; border-radius: $pd-radius-pill; margin-top: $pd-space-1; overflow: hidden; }
.dur-fill { height: 100%; background: $pd-brand-500; border-radius: $pd-radius-pill; animation: bar-sweep 2s ease-in-out infinite; width: 0%; }
@keyframes bar-sweep { 0% { width: 0%; } 50% { width: 100%; } 100% { width: 0%; } }

// Easing
.ease-row { padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.ease-token { @include pd-type(body-sm); color: $pd-text-primary; display: block; }
.ease-bezier { @include pd-type(body-sm); color: $pd-text-placeholder; display: block; margin-top: 4rpx; }
.ease-feel { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-top: 4rpx; font-style: italic; }

// Animations — boxes adopt classes directly from animations.scss
// (.pd-spin, .pd-pulse, .pd-fade-enter, .pd-slide-*-enter, .pd-bounce-enter).
// No local @keyframes; the showcase dogfoods the design-system utilities.
.anim-grid { display: flex; gap: $pd-space-3; flex-wrap: wrap; }
.anim-cell { @include pd-flex-col; align-items: center; gap: $pd-space-half; flex: 0 0 144rpx; }
.anim-box  { width: 72rpx; height: 72rpx; background: $pd-brand-500; border-radius: $pd-radius-sm; }
.anim-name { @include pd-type(body-sm); color: $pd-text-secondary; word-break: break-all; text-align: center; }
.anim-desc { @include pd-type(body-sm); color: $pd-text-placeholder; text-align: center; }

.replay {
  display: inline-flex; align-items: center; justify-content: center;
  margin-top: $pd-space-2; padding: $pd-space-1 $pd-space-2;
  border: 1rpx solid $pd-border-default; border-radius: $pd-radius-pill;
  @include pd-transition(background-color);
  &--pressed { background: $pd-surface-hover; @include pd-press-scale; }
  &__text { @include pd-type(body-sm); color: $pd-text-secondary; font-weight: $pd-font-medium; }
}

</style>
