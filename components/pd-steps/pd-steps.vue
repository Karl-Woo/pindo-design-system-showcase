<template>
  <view class="pd-steps" :class="`pd-steps--${direction}`">
    <view
      v-for="(step, index) in steps"
      :key="index"
      class="pd-steps__step"
      :class="[
        { 'pd-steps__step--active': index === current },
        { 'pd-steps__step--done': index < current }
      ]"
    >
      <view class="pd-steps__indicator-wrap">
        <view class="pd-steps__indicator">
          <uv-icon
            v-if="index < current"
            name="checkmark"
            size="12"
            color="#FFFFFF"
          />
          <text v-else class="pd-steps__indicator-num">{{ index + 1 }}</text>
        </view>
        <view
          v-if="index < steps.length - 1"
          class="pd-steps__connector"
        />
      </view>
      <view class="pd-steps__body">
        <text class="pd-steps__title">{{ step.title || step }}</text>
        <text v-if="step.description" class="pd-steps__desc">{{ step.description }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'pd-steps',
  props: {
    steps: { type: Array, default: () => [] },
    current: { type: Number, default: 0 },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-steps {
  // ── Horizontal ──
  &--horizontal {
    display: flex;
    align-items: flex-start;

    .pd-steps__step {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 0;
    }

    .pd-steps__indicator-wrap {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      position: relative;
    }

    .pd-steps__connector {
      position: absolute;
      top: 50%;
      left: 50%;
      right: -50%;
      height: 2rpx;
      background: $pd-border-divider;
      z-index: 0;
    }

    .pd-steps__step--done .pd-steps__connector {
      background: $pd-brand-500;
    }

    .pd-steps__body {
      margin-top: $pd-space-1;
      text-align: center;
      padding: 0 $pd-space-half;
    }

    .pd-steps__title {
      @include pd-type(body-sm);
      color: $pd-text-tertiary;
      display: block;
    }

    .pd-steps__step--active .pd-steps__title,
    .pd-steps__step--done .pd-steps__title {
      color: $pd-text-primary;
      font-weight: $pd-font-medium;
    }

    .pd-steps__desc {
      display: none;
    }
  }

  // ── Vertical ──
  &--vertical {
    display: flex;
    flex-direction: column;

    .pd-steps__step {
      display: flex;
      align-items: flex-start;
      padding-bottom: $pd-space-3;

      &:last-child { padding-bottom: 0; }
    }

    .pd-steps__indicator-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: $pd-space-1-5;
      align-self: stretch;
    }

    .pd-steps__connector {
      flex: 1;
      width: 2rpx;
      min-height: 24rpx;
      background: $pd-border-divider;
      margin-top: $pd-space-half;
    }

    .pd-steps__step--done .pd-steps__connector {
      background: $pd-brand-500;
    }

    .pd-steps__body {
      flex: 1;
      padding-top: 4rpx;
    }

    .pd-steps__title {
      @include pd-type(body-lg);
      color: $pd-text-tertiary;
      display: block;
    }

    .pd-steps__step--active .pd-steps__title,
    .pd-steps__step--done .pd-steps__title {
      color: $pd-text-primary;
      font-weight: $pd-font-medium;
    }

    .pd-steps__desc {
      @include pd-type(caption);
      color: $pd-text-tertiary;
      display: block;
      margin-top: $pd-space-half;
    }
  }

  // ── Indicator ──
  &__indicator {
    width: 48rpx;
    height: 48rpx;
    border-radius: $pd-radius-circle;
    border: 2rpx solid $pd-border-default;
    background: $pd-surface-primary;
    @include pd-flex-center;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  &__indicator-num {
    @include pd-type(caption);
    color: $pd-text-tertiary;
    font-weight: $pd-font-medium;
  }

  &__step--active &__indicator {
    background: $pd-brand-500;
    border-color: $pd-brand-500;

    .pd-steps__indicator-num {
      color: $pd-text-inverse;
    }
  }

  &__step--done &__indicator {
    background: $pd-brand-500;
    border-color: $pd-brand-500;
  }
}
</style>
