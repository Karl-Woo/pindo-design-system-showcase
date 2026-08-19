<template>
  <view class="pd-empty">
    <uv-icon :name="icon" size="80" :color="iconColor" class="pd-empty__icon" />
    <text class="pd-empty__text">{{ text }}</text>
    <slot name="action">
      <view v-if="actionText" class="pd-empty__action">
        <pd-button variant="secondary" :text="actionText" @click="$emit('action')" />
      </view>
    </slot>
  </view>
</template>

<script>
import { PD_TEXT_DISABLED } from '@/styles/tokens.js'

export default {
  name: 'pd-empty',
  // 规范：emit 什么就声明什么（DESIGN_SYSTEM §16.2）。
  // action 不是原生事件名，今天不会双触发；声明是为了不依赖
  // 「这个名字恰好不是原生的」这种需要每次重新论证的推理。
  emits: ['action'],
  props: {
    icon: { type: String, default: 'empty-data' },
    text: { type: String, default: '暂无数据' },
    actionText: { type: String, default: '' }
  },
  computed: {
    iconColor() {
      // = $pd-text-disabled / $pd-grey-500
      return PD_TEXT_DISABLED
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-empty {
  @include pd-flex-col;
  align-items: center;
  justify-content: center;
  padding: $pd-space-8 $pd-space-3;

  &__icon {
    margin-bottom: $pd-space-2;
  }

  &__text {
    @include pd-type(body-lg);
    color: $pd-text-tertiary;
    text-align: center;
  }

  &__action {
    margin-top: $pd-space-3;
  }
}
</style>
