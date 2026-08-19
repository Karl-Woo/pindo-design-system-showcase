<template>
  <view
    class="pd-page"
    :class="[`pd-page--bg-${bg}`, { 'pd-page--padded': padding, 'pd-page--safe-bottom': safeBottom }]"
    :style="rootStyle"
  >
    <view class="pd-page__body">
      <slot />
    </view>
    <view v-if="$slots.footer && !hideFooter" class="pd-page__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'pd-page',
  props: {
    bg: {
      type: String,
      default: 'secondary',
      validator: (v) => ['primary', 'secondary'].includes(v)
    },
    padding: { type: Boolean, default: true },
    safeBottom: { type: Boolean, default: true },
    // Height of a FIXED navbar sitting above this page, EXCLUDING the status bar
    // (pd-page adds the device status bar itself). When set, caps min-height to
    // `100vh - statusBar - topOffset` so a fixed-navbar page whose content fits
    // the screen doesn't phantom-scroll by the navbar's height. Accepts a px
    // number or a CSS length string (e.g. 56 or '112rpx').
    topOffset: { type: [String, Number], default: 0 },
    // Hide the docked footer without unmounting the slot's owner. Use it to drop
    // the sticky bottom bar while a soft keyboard is open — on iOS a docked bar
    // fights the keyboard's page-adjust and ends up covering the focused input.
    // Toggle with the page's focus state (e.g. :hide-footer="inputFocused").
    hideFooter: { type: Boolean, default: false }
  },
  data() {
    return { statusBarH: 0 }
  },
  mounted() {
    this.statusBarH = uni.getSystemInfoSync().statusBarHeight || 0
  },
  computed: {
    rootStyle() {
      const t = this.topOffset
      if (!t || t === 0 || t === '0') return {}
      const off = typeof t === 'number' ? t + 'px' : t
      return { minHeight: `calc(100vh - ${this.statusBarH}px - ${off})` }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &--bg-primary {
    background-color: $pd-surface-primary;
  }

  &--bg-secondary {
    background-color: $pd-surface-secondary;
  }

  &--padded {
    .pd-page__body {
      padding-left: $pd-space-2;
      padding-right: $pd-space-2;
    }
  }

  &__body {
    flex: 1;
  }

  &__footer {
    position: sticky;
    bottom: 0;
    background-color: $pd-surface-primary;
    border-top: 1rpx solid $pd-border-divider;
    padding: $pd-space-1-5 $pd-space-2;
    z-index: $pd-z-sticky;
  }

  // Dock safe-area = max(dock pad, safe-inset), NOT additive — see the
  // pd-safe-bottom-min mixin. The 12px bottom shows on non-notched screens;
  // on a notched phone the ~34pt inset absorbs it (no stacked dead space).
  &--safe-bottom .pd-page__footer {
    @include pd-safe-bottom-min($pd-space-1-5);
  }
}
</style>
