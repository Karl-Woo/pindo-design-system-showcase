<template>
  <view
    class="pd-divider"
    :class="[`pd-divider--${orientation}`, { 'pd-divider--with-content': hasContent }]"
  >
    <template v-if="orientation === 'horizontal' && hasContent">
      <view class="pd-divider__line" />
      <view class="pd-divider__content">
        <slot>
          <text class="pd-divider__text">{{ text }}</text>
        </slot>
      </view>
      <view class="pd-divider__line" />
    </template>
    <template v-else>
      <view class="pd-divider__line" />
    </template>
  </view>
</template>

<script>
export default {
  name: 'pd-divider',
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v)
    },
    text: { type: String, default: '' },
    inset: { type: Boolean, default: false }
  },
  computed: {
    hasContent() {
      return !!this.text || !!this.$slots.default
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-divider {
  &--horizontal {
    display: flex;
    align-items: center;
    width: 100%;
    margin: $pd-space-1 0;

    .pd-divider__line {
      flex: 1;
      height: 1rpx;
      background: $pd-border-divider;
    }
  }

  &--vertical {
    display: inline-flex;
    height: 32rpx;
    margin: 0 $pd-space-1;
    vertical-align: middle;

    .pd-divider__line {
      width: 1rpx;
      height: 100%;
      background: $pd-border-divider;
    }
  }

  &--with-content {
    .pd-divider__content {
      padding: 0 $pd-space-1-5;
    }

    .pd-divider__text {
      @include pd-type(caption);
      color: $pd-text-tertiary;
    }
  }
}
</style>
