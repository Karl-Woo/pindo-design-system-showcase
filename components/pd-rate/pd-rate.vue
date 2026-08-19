<template>
  <view class="pd-rate" :class="{ 'pd-rate--readonly': readonly }">
    <view
      v-for="i in count"
      :key="i"
      class="pd-rate__star"
      :style="{ marginRight: i < count ? gapValue : 0 }"
      @click="onTap(i)"
    >
      <pd-icon :name="iconFor(i)" :size="size" :color="colorFor(i)" />
    </view>
  </view>
</template>

<script>
// pd-rate — star rating, display-first.
//
// Renders `count` stars (default 5) via pd-icon. Filled stars use the
// $pd-rating token (iOS systemYellow); empty stars use $pd-border-light so a
// hollow grey star reads as "not earned". Half steps render `star-half-full`
// when `allowHalf` is on.
//
// Display (default, readonly):
//   <pd-rate :value="4" />
// Interactive (e.g. a review-submit form):
//   <pd-rate v-model="score" :readonly="false" @change="onChange" />
//
// The review data this was built for is integer (".0分"), so allowHalf is off
// by default — turn it on for half-star displays.

import { PD_RATING, PD_BORDER_LIGHT } from '@/styles/tokens.js'

export default {
  name: 'pd-rate',
  // 声明所有对外事件，避免父组件监听器变成 fallthrough attribute 绑到根 <view> 上。
  // 本组件根是 <view>（不产生原生 input/change），所以当前不会双触发；这里是护栏——
  // 将来若把根换成原生表单元素，没有声明就会静默变成一次操作跑两遍。
  emits: ['input', 'change'],
  props: {
    // Current rating. v-model compatible (emits `input`).
    value: { type: Number, default: 0 },
    // Number of stars in the scale.
    count: { type: Number, default: 5 },
    // Display-only — taps do nothing. Default true (this is a display atom).
    readonly: { type: Boolean, default: true },
    // Allow half-star rendering (display) — uses star-half-full.
    allowHalf: { type: Boolean, default: false },
    // Star size — pd-icon token name ('sm'|'md'|'lg') or raw px number.
    size: { type: [String, Number], default: 'md' },
    // Inter-star gap. Token-ish rpx string ('4rpx') or a raw rpx number; pass
    // 0 for flush stars (compact rating chips).
    gap: { type: [String, Number], default: '4rpx' },
    // Override the filled-star color (e.g. a neutral grey rating chip). Empty
    // stars keep $pd-border-light. Defaults to the $pd-rating yellow.
    activeColor: { type: String, default: '' }
  },
  data() {
    return {
      ratingColor: PD_RATING,
      emptyColor: PD_BORDER_LIGHT
    }
  },
  computed: {
    gapValue() {
      return typeof this.gap === 'number' ? `${this.gap}rpx` : this.gap
    }
  },
  methods: {
    // Star `i` (1-based) is full when value >= i, half when allowHalf and
    // value rounds into the [i-1, i) half band, otherwise empty.
    iconFor(i) {
      if (this.value >= i) return 'star'
      if (this.allowHalf && this.value >= i - 0.5) return 'star-half-full'
      return 'star-outline' // empty stars render as a hollow outline, not a grey-filled star
    },
    colorFor(i) {
      // Full + half stars take the active color (rating yellow, or an override);
      // empty stars go grey. For a half star the single icon is active-colored
      // (star-half-full already depicts the empty half within the glyph).
      const active = this.activeColor || this.ratingColor
      if (this.value >= i) return active
      if (this.allowHalf && this.value >= i - 0.5) return active
      return this.emptyColor
    },
    onTap(i) {
      if (this.readonly) return
      this.$emit('input', i)
      this.$emit('change', i)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-rate {
  display: inline-flex;
  align-items: center;

  &__star {
    display: inline-flex;
    line-height: 0;
  }

  &:not(.pd-rate--readonly) .pd-rate__star {
    cursor: pointer;
  }
}
</style>
