<template>
  <view class="pd-avatar-group">
    <view
      v-for="(a, idx) in shown"
      :key="idx"
      class="pd-avatar-group__item"
      :style="{ marginLeft: idx === 0 ? 0 : overlapMargin, zIndex: shown.length - idx }"
    >
      <pd-avatar :src="a" :size="size" bordered />
    </view>
    <view
      v-if="overflow > 0"
      class="pd-avatar-group__more"
      :style="{ width: boxSize, height: boxSize, marginLeft: shown.length ? overlapMargin : 0 }"
    >
      <text class="pd-avatar-group__more-text">+{{ overflow }}</text>
    </view>
  </view>
</template>

<script>
// pd-avatar-group — overlapping stack of avatars with a "+N" overflow chip.
//
// Caps the number of visible circles at `max` (the chip counts as one of
// them), so a long member list collapses to "● ● ● +12". Each avatar gets a
// white ring (via pd-avatar `bordered`) so overlaps stay legible.
//
//   <pd-avatar-group :avatars="users" :size="36" :max="5" />
//
// `avatars` items may be URL strings or objects ({ src | avatar | url }).

const SIZE_MAP = { sm: 64, md: 88, lg: 128 } // rpx — mirrors pd-avatar

export default {
  name: 'pd-avatar-group',
  props: {
    avatars: { type: Array, default: () => [] },
    size: { type: [String, Number], default: 'sm' },
    // Max circles shown, including the +N chip.
    max: { type: Number, default: 5 }
  },
  computed: {
    urls() {
      return this.avatars.map((a) =>
        typeof a === 'string' ? a : a && (a.src || a.avatar || a.url) || ''
      )
    },
    // When the list overflows, reserve the last slot for the +N chip.
    shown() {
      if (this.urls.length <= this.max) return this.urls
      return this.urls.slice(0, this.max - 1)
    },
    overflow() {
      if (this.urls.length <= this.max) return 0
      return this.urls.length - (this.max - 1)
    },
    sizeRpx() {
      if (typeof this.size === 'number') return this.size
      return SIZE_MAP[this.size] || SIZE_MAP.sm
    },
    boxSize() {
      return `${this.sizeRpx}rpx`
    },
    overlapMargin() {
      return `-${Math.round(this.sizeRpx * 0.3)}rpx`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-avatar-group {
  display: inline-flex;
  align-items: center;

  &__item {
    position: relative;
  }

  &__more {
    position: relative;
    @include pd-flex-center;
    flex-shrink: 0;
    background: $pd-surface-secondary;
    border-radius: $pd-radius-circle;
    box-shadow: 0 0 0 2rpx $pd-surface-primary;
  }

  &__more-text {
    // caption (12px) min for readable content; fits once avatars use a real
    // size step (sm 64rpx+). overline (10px) reserved for badge labels.
    @include pd-type(caption);
    color: $pd-text-tertiary;
    line-height: 1;
  }
}
</style>
