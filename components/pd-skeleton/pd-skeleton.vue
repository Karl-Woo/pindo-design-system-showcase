<template>
  <view class="pd-skeleton" :class="{ 'pd-skeleton--animate': animate }">
    <!-- Custom layout via default slot -->
    <slot v-if="$slots.default" />

    <!-- Preset: avatar + title + n lines -->
    <template v-else-if="preset === 'list-item'">
      <view class="pd-skeleton__row">
        <view class="pd-skeleton__avatar pd-skeleton__bone" />
        <view class="pd-skeleton__stack">
          <view class="pd-skeleton__bone pd-skeleton__title" />
          <view class="pd-skeleton__bone pd-skeleton__line" />
        </view>
      </view>
    </template>

    <template v-else-if="preset === 'card'">
      <view class="pd-skeleton__bone pd-skeleton__image" />
      <view class="pd-skeleton__bone pd-skeleton__title" />
      <view class="pd-skeleton__bone pd-skeleton__line" />
      <view class="pd-skeleton__bone pd-skeleton__line pd-skeleton__line--short" />
    </template>

    <!-- Preset: text lines only -->
    <template v-else>
      <view
        v-for="n in rows"
        :key="n"
        class="pd-skeleton__bone pd-skeleton__line"
        :class="{ 'pd-skeleton__line--short': n === rows && lastShort }"
      />
    </template>
  </view>
</template>

<script>
export default {
  name: 'pd-skeleton',
  props: {
    preset: {
      type: String,
      default: 'text',
      validator: (v) => ['text', 'list-item', 'card'].includes(v)
    },
    rows: { type: Number, default: 3 },
    lastShort: { type: Boolean, default: true },
    animate: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';
@import '@/styles/animations.scss';

.pd-skeleton {
  display: flex;
  flex-direction: column;
  gap: $pd-space-1;

  &__bone {
    background-color: $pd-surface-secondary;
    border-radius: $pd-radius-xs;
  }

  &--animate &__bone {
    animation: pd-pulse $pd-duration-loop-slow $pd-ease-standard infinite;
  }

  &__row {
    display: flex;
    align-items: flex-start;
    gap: $pd-space-1-5;
  }

  &__avatar {
    width: 88rpx;
    height: 88rpx;
    border-radius: $pd-radius-circle;
    flex-shrink: 0;
  }

  &__stack {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $pd-space-1;
    padding-top: $pd-space-half;
  }

  &__image {
    width: 100%;
    height: 320rpx;
    border-radius: $pd-radius-md;
  }

  &__title {
    height: 32rpx;
    width: 60%;
    border-radius: $pd-radius-sm;
  }

  &__line {
    height: 24rpx;
    width: 100%;
    border-radius: $pd-radius-sm;

    &--short {
      width: 40%;
    }
  }
}
</style>
