<template>
  <view
    class="pd-list-item"
    :class="{ 'pd-list-item--divider': divider }"
    :hover-class="clickable ? 'pd-list-item--pressed' : ''"
    :hover-stay-time="120"
    @click="$emit('click', $event)"
  >
    <!-- Left: thumbnail or slot -->
    <view v-if="thumb || $slots.left" class="pd-list-item__left">
      <slot name="left">
        <image
          v-if="thumb"
          :src="thumb"
          mode="aspectFill"
          class="pd-list-item__thumb"
        />
      </slot>
    </view>

    <!-- Content: title + subtitle or default slot -->
    <view class="pd-list-item__content">
      <slot>
        <text v-if="title" class="pd-list-item__title">{{ title }}</text>
        <text v-if="subtitle" class="pd-list-item__subtitle">{{ subtitle }}</text>
      </slot>
    </view>

    <!-- Right: slot or arrow -->
    <view v-if="arrow || $slots.right" class="pd-list-item__right">
      <slot name="right" />
      <uv-icon v-if="arrow" name="arrow-right" size="16" :color="arrowColor" />
    </view>
  </view>
</template>

<script>
import { PD_TEXT_DISABLED } from '@/styles/tokens.js'

export default {
  name: 'pd-list-item',
  // 必须声明 click：根 <view> 上有 @click="$emit('click', $event)"，而父组件写的
  // @click 若未被 emits「消费」，会作为 fallthrough attribute 再自动绑一次到根元素
  // —— 一次点击跑两遍 handler（同 pd-button 注释里的「点一下进两格」）。
  // 分享弹窗就是这么炸的：uni.share 连发两次，第二次回 [Share 微信:-95]。
  // 这里用 emits 而不是 pd-button 的 inheritAttrs:false，是为了保留 class/style 透传。
  // 排查记录见 Notes/微信分享-95排查-2026-07-31.md
  emits: ['click'],
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    thumb: { type: String, default: '' },
    arrow: { type: Boolean, default: false },
    divider: { type: Boolean, default: true },
    clickable: { type: Boolean, default: false }
  },
  computed: {
    arrowColor() {
      // = $pd-text-disabled / $pd-grey-500
      return PD_TEXT_DISABLED
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-list-item {
  display: flex;
  align-items: center;
  min-height: $pd-touch-lg;
  padding: $pd-space-1-5 $pd-space-2;
  background-color: $pd-surface-primary;
  transition: background-color $pd-duration-instant $pd-ease-standard;

  &--divider {
    border-bottom: 1rpx solid $pd-border-divider;
  }

  &--pressed {
    background-color: $pd-surface-hover;
  }

  &__left {
    flex-shrink: 0;
    margin-right: $pd-space-1-5;
  }

  &__thumb {
    width: $pd-touch-lg;
    height: $pd-touch-lg;
    border-radius: $pd-radius-sm;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  &__title {
    @include pd-type(body-lg);
    color: $pd-text-primary;
    @include pd-line-clamp(2);
  }

  &__subtitle {
    @include pd-type(caption);
    color: $pd-text-tertiary;
    margin-top: $pd-space-half;
    @include pd-line-clamp(1);
  }

  &__right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-left: $pd-space-1;
  }
}
</style>
