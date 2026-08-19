<template>
  <view
    class="pd-avatar"
    :class="[`pd-avatar--${shape}`, { 'pd-avatar--bordered': bordered }]"
    :style="{ width: boxSize, height: boxSize }"
  >
    <image
      v-if="src && !failed"
      class="pd-avatar__img"
      :class="`pd-avatar__img--${shape}`"
      :src="src"
      mode="aspectFill"
      @error="failed = true"
    />
    <view v-else class="pd-avatar__fallback" :class="`pd-avatar__fallback--${shape}`">
      <pd-icon name="account" :size="iconSize" color="placeholder" />
    </view>
  </view>
</template>

<script>
// pd-avatar — circular (or rounded) user image with a graceful fallback.
//
// When `src` is empty or fails to load, falls back to an account glyph on a
// neutral surface. Sizes follow the §11.11 image scale; pass a raw rpx number
// for off-scale needs (e.g. tight member rows).
//
//   <pd-avatar :src="user.avatar" size="md" />
//   <pd-avatar :src="user.avatar" :size="36" bordered />   <!-- 36rpx -->

const SIZE_MAP = { sm: 64, md: 88, lg: 128 } // rpx — §11.11 small / list-thumb / large

export default {
  name: 'pd-avatar',
  props: {
    src: { type: String, default: '' },
    // 'sm' | 'md' | 'lg', or a raw rpx number for off-scale sizes.
    size: { type: [String, Number], default: 'md' },
    // 'circle' (default) | 'rounded' (radius-sm corners).
    shape: { type: String, default: 'circle' },
    // White ring — used when avatars overlap a colored/photo backdrop or stack.
    bordered: { type: Boolean, default: false }
  },
  data() {
    return { failed: false }
  },
  computed: {
    sizeRpx() {
      if (typeof this.size === 'number') return this.size
      return SIZE_MAP[this.size] || SIZE_MAP.md
    },
    boxSize() {
      return `${this.sizeRpx}rpx`
    },
    iconSize() {
      // Fallback glyph ~56% of the box, in px for pd-icon's numeric size.
      return Math.round((this.sizeRpx * 0.56) / 2)
    }
  },
  watch: {
    src() {
      this.failed = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-avatar {
  position: relative;
  flex-shrink: 0;
  display: inline-block;

  // Root must carry the shape's radius too, so the `bordered` box-shadow ring
  // follows the avatar's outline. Without this the ring stays a square around
  // a circular image — and overlapping avatars show white vertical lines.
  &--circle {
    border-radius: $pd-radius-circle;
  }
  &--rounded {
    border-radius: $pd-radius-sm;
  }

  &--bordered {
    box-shadow: 0 0 0 2rpx $pd-surface-primary;
  }

  &__img,
  &__fallback {
    width: 100%;
    height: 100%;
    display: block;

    &--circle {
      border-radius: $pd-radius-circle;
    }
    &--rounded {
      border-radius: $pd-radius-sm;
    }
  }

  &__fallback {
    @include pd-flex-center;
    background: $pd-surface-secondary;
  }
}
</style>
