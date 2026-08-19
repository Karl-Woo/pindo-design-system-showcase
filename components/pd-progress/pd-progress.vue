<template>
  <view class="pd-progress">
    <!-- Segmented mode (segments > 0): N equal pills, the first `current`
         filled. Used by step wizards (e.g. 跟团流程 4 步进度条). -->
    <view v-if="segments > 0" class="pd-progress__segments">
      <view v-for="i in segments" :key="i" class="pd-progress__segment">
        <!-- Inner fill grows L→R on advance, recedes R→L on retreat
             (transform-origin left). Stable element + class toggle so the
             CSS transition runs on both directions. On mount `entered` flips
             false→true so the fills animate in from empty; fillStyle() adds a
             per-segment delay during that window → the load cascades L→R. -->
        <view
          class="pd-progress__segment-fill"
          :class="{
            'pd-progress__segment-fill--active': entered && i <= current,
            'pd-progress__segment-fill--animated': animated
          }"
          :style="fillStyle(i)"
        />
      </view>
    </view>
    <!-- Continuous mode: single gradient fill bar. -->
    <view v-else class="pd-progress__track" :style="{ height: trackHeight }">
      <view
        class="pd-progress__fill"
        :class="{ 'pd-progress__fill--animated': animated }"
        :style="{ width: pct + '%' }"
      />
    </view>
    <text v-if="label || $slots.label" class="pd-progress__label">
      <slot name="label">{{ label }}</slot>
    </text>
  </view>
</template>

<script>
// pd-progress — linear progress / fill bar.
//
// Extracted from the inline progress pattern that previously lived only inside
// pd-group-card (brand-500→400 gradient fill on a brand-50 pill track). Drive
// it either with a direct percentage (`:value`) or with `:current`/`:max`
// (e.g. weight progress: 23kg / 50kg). An optional trailing label slot/prop
// holds the "23kg/50kg"-style readout to the right of the bar.
//
//   <pd-progress :value="60" />
//   <pd-progress :current="23" :max="50" label="23kg/50kg" />
//   <pd-progress :current="w" :max="m"><template #label>…</template></pd-progress>

export default {
  name: 'pd-progress',
  props: {
    // Direct percentage (0–100). Takes precedence when >= 0.
    value: { type: Number, default: -1 },
    // Alternative: compute percentage from current / max.
    // In segmented mode this is instead the count of filled pills (1-based) —
    // for a step wizard pass `currentStep + 1`.
    current: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    // > 0 switches to segmented (stepped) mode: this many equal pills, the
    // first `current` filled brand-500, the rest border-light (Figma 345:1109).
    // 0 = continuous fill bar.  e.g. <pd-progress :segments="4" :current="1" />
    segments: { type: Number, default: 0 },
    // Bar thickness. Token name ('sm' | 'md' | 'lg') or a raw rpx number.
    height: { type: [String, Number], default: 'md' },
    // Trailing readout text (or use the #label slot for richer markup).
    label: { type: String, default: '' },
    // Disable the width transition (e.g. skeletons / reduced motion).
    animated: { type: Boolean, default: true }
  },
  data() {
    return {
      // Segmented entrance: fills start empty (entered=false) and flip to true
      // on mount so they animate in from scaleX(0). `staggering` gates the
      // per-segment delay so ONLY the on-load cascade is staggered — later
      // advance/retreat animate a single pill with no delay.
      entered: this.segments === 0,
      staggering: false,
      stagStepMs: 90
    }
  },
  computed: {
    pct() {
      let p
      if (this.value >= 0) {
        p = this.value
      } else if (this.max > 0) {
        p = (this.current / this.max) * 100
      } else {
        p = 0
      }
      return Math.min(100, Math.max(0, p))
    },
    trackHeight() {
      const map = { sm: '8rpx', md: '16rpx', lg: '24rpx' }
      if (typeof this.height === 'number') return `${this.height}rpx`
      return map[this.height] || this.height
    }
  },
  mounted() {
    // Segmented mode plays a one-time L→R cascade on load: paint at scaleX(0)
    // first, then flip `entered` so each active pill fills in with a staggered
    // delay. Clear `staggering` once the cascade finishes so later step changes
    // animate one pill at a time with no delay.
    if (this.segments > 0) {
      this.staggering = true
      setTimeout(() => { this.entered = true }, 30)
      const cascadeMs = 30 + this.segments * this.stagStepMs + 350
      setTimeout(() => { this.staggering = false }, cascadeMs)
    }
  },
  methods: {
    // Per-segment transition-delay — applied only during the on-load cascade
    // (staggering) and only when animating, so advance/retreat stay instant.
    fillStyle(i) {
      if (this.staggering && this.animated) {
        return { transitionDelay: (i - 1) * this.stagStepMs + 'ms' }
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-progress {
  display: flex;
  align-items: center;
  gap: $pd-space-1-5;
  width: 100%;

  &__track {
    flex: 1;
    min-width: 0;
    background: $pd-brand-50;
    border-radius: $pd-radius-pill;
    overflow: hidden;
  }

  // ── Segmented (stepped) mode ──
  // Row of equal pills separated by 8px; matches Figma 345:1109 (4px tall).
  &__segments {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: $pd-space-1;
  }

  &__segment {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 8rpx;
    background: $pd-border-light;
    border-radius: $pd-radius-pill;
    overflow: hidden; // clip the fill to the pill shape
  }

  // Directional fill: scaleX from the left edge so it grows L→R when a step
  // is entered and recedes R→L when stepped back.
  &__segment-fill {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $pd-brand-500;
    transform: scaleX(0);
    transform-origin: left center;

    &--active {
      transform: scaleX(1);
    }

    &--animated {
      transition: transform $pd-duration-normal $pd-ease-standard;
    }
  }

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, $pd-brand-500 0%, $pd-brand-400 100%);
    border-radius: $pd-radius-pill;

    &--animated {
      transition: width $pd-duration-normal $pd-ease-standard;
    }
  }

  &__label {
    flex-shrink: 0;
    // caption (12px) min — readable numeric content should never go below 12px;
    // overline (10px) is reserved for non-content uppercase Latin badge labels.
    @include pd-type(caption);
    color: $pd-text-tertiary;
    text-align: right;
  }
}
</style>
