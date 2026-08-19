<template>
  <view
    class="pd-icon"
    :style="{
      width: boxSize,
      height: boxSize,
      color: resolvedColor
    }"
  >
    <view
      v-if="path"
      class="pd-icon__svg"
      :style="{
        width: boxSize,
        height: boxSize,
        backgroundColor: resolvedColor,
        '-webkit-mask': maskValue,
        mask: maskValue
      }"
    />
    <text v-else class="pd-icon__missing" :style="{ fontSize: missingFontSize }">?</text>
  </view>
</template>

<script>
// pd-icon — design-system icon primitive.
//
// Backed by Material Design Icons (Templarian/MaterialDesign) via a curated
// ~180-icon catalog at utils/mdi-icons.js. Renders the SVG path through a
// CSS mask on a solid-color view so `color` works without re-parsing SVG
// fills — keeps the component data-less for each call and plays nicely with
// uni-app H5's renderer (which has spotty reactivity on inline <svg> fill).
//
// Size prop (design-token names or a raw px number):
//   'sm' → 32rpx  (inline indicators)
//   'md' → 40rpx  (standard default)
//   'lg' → 48rpx  (navbar, prominent)
//
// Color prop accepts design-token names OR raw hex/rgb/hsl strings:
//   'primary' / 'secondary' / 'tertiary' / 'placeholder' / 'disabled'
//   'inverse' / 'brand' / 'success' / 'warning' / 'error' / 'info'
//
// Available icon names live in utils/mdi-icons.js — run the extraction script
// against @mdi/js to regenerate the catalog. Names use MDI kebab-case, e.g.
// 'home', 'chevron-right', 'truck-delivery', 'map-marker-outline'.

import { MDI_PATHS } from '@/utils/mdi-icons.js'
// Greys come from styles/tokens.js so they stay in lockstep with tokens.scss
// — when the grey scale changes, tokens.js is the single source of truth and
// this map updates automatically. Brand / semantic hex stay local since they
// don't change with grey scale revisions.
import {
  PD_TEXT_PRIMARY,
  PD_TEXT_SECONDARY,
  PD_TEXT_TERTIARY,
  PD_TEXT_PLACEHOLDER,
  PD_TEXT_DISABLED,
} from '@/styles/tokens.js'

const SIZE_MAP = {
  sm: { box: '32rpx', px: 16 },
  md: { box: '40rpx', px: 20 },
  lg: { box: '48rpx', px: 24 }
}

const COLOR_MAP = {
  primary: PD_TEXT_PRIMARY,
  secondary: PD_TEXT_SECONDARY,
  tertiary: PD_TEXT_TERTIARY,
  placeholder: PD_TEXT_PLACEHOLDER,
  disabled: PD_TEXT_DISABLED,
  inverse: '#FFFFFF',
  brand: '#CB1D45',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF'
}

export default {
  name: 'pd-icon',
  props: {
    name: { type: String, required: true },
    size: { type: [String, Number], default: 'md' },
    color: { type: String, default: 'secondary' }
  },
  computed: {
    sizeEntry() {
      if (typeof this.size === 'number') {
        return { box: `${this.size * 2}rpx`, px: this.size }
      }
      if (typeof this.size === 'string' && /^\d+$/.test(this.size)) {
        const n = parseInt(this.size, 10)
        return { box: `${n * 2}rpx`, px: n }
      }
      return SIZE_MAP[this.size] || SIZE_MAP.md
    },
    boxSize() { return this.sizeEntry.box },
    missingFontSize() { return this.sizeEntry.box },
    path() {
      return MDI_PATHS[this.name] || null
    },
    resolvedColor() {
      if (!this.color) return COLOR_MAP.secondary
      if (this.color.startsWith('#') || /^(rgb|hsl)/i.test(this.color)) {
        return this.color
      }
      return COLOR_MAP[this.color] || this.color
    },
    // Inline-SVG data URI used as a CSS mask. The SVG is a simple 24×24
    // viewBox with a single <path>; the `.pd-icon__svg` view is solid-filled
    // with the target color and the mask clips it to the icon shape. This
    // means a single color prop drives the icon fill — no runtime SVG DOM,
    // no fill-attr reactivity issues with uni-app.
    maskValue() {
      if (!this.path) return 'none'
      const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>` +
        `<path d='${this.path}'/></svg>`
      const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')
      return `url("data:image/svg+xml;utf8,${encoded}") center / contain no-repeat`
    }
  }
}
</script>

<style lang="scss" scoped>
.pd-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  flex-shrink: 0;

  &__svg {
    display: block;
    // The background-color + mask technique means the view is filled with
    // the color and the SVG path clips the visible area. No fill attr needed.
  }

  &__missing {
    font-family: 'SF Mono', Consolas, monospace;
    color: currentColor;
    opacity: 0.5;
    line-height: 1;
  }
}
</style>
