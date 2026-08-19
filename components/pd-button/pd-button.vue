<template>
  <button
    class="pd-button"
    :class="rootClasses"
    :hover-class="interactive ? 'pd-button--pressed' : ''"
    :hover-stay-time="120"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-busy="loading"
    :aria-label="ariaLabel || null"
    :aria-pressed="ariaPressed"
    @click="handleClick"
  >
    <!-- Loading spinner (replaces all content) -->
    <view v-if="loading" class="pd-button__spinner">
      <uv-loading-icon :size="spinnerSize" :color="currentTextColor" />
    </view>

    <!-- Normal content (hidden when loading) -->
    <template v-if="!loading">
      <view
        v-if="$slots['icon-left'] || (icon && (iconPosition === 'left' || iconOnly))"
        :class="{ 'pd-button__icon-left': !iconOnly }"
      >
        <slot name="icon-left">
          <uv-icon
            :name="icon"
            :size="currentIconSize"
            :color="currentTextColor"
          />
        </slot>
      </view>
      <text v-if="!iconOnly && (text || $slots.default)" class="pd-button__text">
        <slot>{{ text }}</slot>
      </text>
      <view
        v-if="$slots['icon-right'] || (icon && iconPosition === 'right' && !iconOnly)"
        class="pd-button__icon-right"
      >
        <slot name="icon-right">
          <uv-icon
            :name="icon"
            :size="currentIconSize"
            :color="currentTextColor"
          />
        </slot>
      </view>
    </template>
  </button>
</template>

<script>
import { PD_TEXT_PRIMARY } from '@/styles/tokens.js'

export default {
  name: 'pd-button',
  // Root is a native <button>, so a parent's @click would fall through and
  // auto-bind to it AND fire again via our explicit $emit('click') — one tap =
  // two handler calls (the "点一下进两格" bug). Disable attr fallthrough so the
  // parent listener connects ONLY through the emit below; this also makes the
  // interactive/disabled guard actually gate the parent handler.
  inheritAttrs: false,
  // 规范：emit 什么就声明什么（DESIGN_SYSTEM §16.2）。这里 inheritAttrs:false
  // 已经挡住 fallthrough，声明是冗余的 —— 但「这个组件恰好安全」是一条每次
  // 重构（换根元素、加 v-bind="$attrs"）都要重新论证的推理，而失效时不会有
  // 任何报错帮忙定位。声明成本一行，就别留这个判断题。
  emits: ['click'],
  props: {
    variant: {
      type: String,
      default: 'filled',
      // 'plain' = transparent bg + neutral text/icon color (vs 'ghost' which is
      // transparent bg + brand-red text). Use for in-card toggles & secondary
      // navigation links where brand color would over-emphasize the action.
      validator: (v) => ['filled', 'tonal', 'secondary', 'ghost', 'plain', 'danger'].includes(v)
    },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (v) => ['left', 'right'].includes(v)
    },
    iconOnly: { type: Boolean, default: false },
    // Stack the icon above the text in a square button — for compact dock /
    // toolbar actions (e.g. 客服). Renders the icon-left slot/icon on top with
    // the text below in a 96rpx (48px) square.
    stack: { type: Boolean, default: false },
    // Accessible name for the native button — REQUIRED for icon-only buttons
    // (no visible text), e.g. aria-label="返回". Omitted when empty.
    ariaLabel: { type: String, default: '' },
    // Toggle state for buttons that toggle (e.g. a favorite/收藏 heart). Pass a
    // boolean; left null for non-toggle buttons so aria-pressed isn't emitted.
    ariaPressed: { type: [Boolean, String], default: null }
  },
  computed: {
    interactive() {
      return !this.disabled && !this.loading
    },
    rootClasses() {
      return [
        `pd-button--${this.variant}`,
        {
          'pd-button--block': this.block,
          'pd-button--disabled': this.disabled,
          'pd-button--loading': this.loading,
          'pd-button--icon-only': this.iconOnly,
          'pd-button--stack': this.stack
        }
      ]
    },
    currentTextColor() {
      if (this.variant === 'filled') return '#FFFFFF'
      // Danger uses $pd-error-text (#D70015, WCAG-AA on white) for both text
      // (set in SCSS) AND icon (this JS path) — the brighter $pd-error
      // (#FF3B30) is reserved for non-text UI elements like the outline.
      if (this.variant === 'danger') return '#D70015'
      if (this.variant === 'tonal') return '#CB1D45'
      if (this.variant === 'secondary') return '#CB1D45'
      if (this.variant === 'ghost') return '#CB1D45'
      if (this.variant === 'plain') return PD_TEXT_PRIMARY  // = $pd-grey-900
      return '#CB1D45'
    },
    currentIconSize() {
      // Single 48px button. A bare-icon button gets a larger 28px glyph; an icon
      // paired with text uses 24px so it sits proportionally beside body-lg.
      return this.iconOnly ? '28' : '24'
    },
    spinnerSize() {
      return '22'
    }
  },
  methods: {
    handleClick(e) {
      if (!this.interactive) return
      // uni-app H5 fires this handler twice for a single <button> tap (native
      // bubble + <uni-button>'s re-emitted click), so one tap would trigger
      // two @click. Collapse duplicate calls within the same tick to a single
      // emit — genuine taps are always more than a tick apart, so this never
      // swallows a real second click.
      if (this._clickLock) return
      this._clickLock = true
      this.$emit('click', e)
      setTimeout(() => { this._clickLock = false }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

// ── Reset native button ──
.pd-button {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  outline: none;
  margin: 0;
  background: none;
  padding: 0;
  font-family: $pd-font-family;
  box-sizing: border-box;

  // ── Single size — 96rpx (48px), the WCAG/MD3 minimum touch target ──
  // md (40px) and sm (36px) were removed: only this 48px tier clears 48px.
  // icon-only & stack override the box below; everything keeps the pill radius.
  height: 96rpx;
  min-width: 160rpx;
  padding: 0 $pd-space-3;
  border-radius: $pd-radius-pill;   // max radius → fully rounded "pill" edge

  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    transform $pd-duration-fast $pd-ease-standard,
    background-color $pd-duration-fast $pd-ease-standard,
    border-color $pd-duration-fast $pd-ease-standard,
    box-shadow $pd-duration-fast $pd-ease-standard;

  // Kill uni-button's default ::after border
  &::after {
    display: none !important;
  }

  &__icon-left { margin-right: $pd-space-half; }
  &__icon-right { margin-left: $pd-space-half; }
  &__spinner { display: flex; align-items: center; justify-content: center; }
  &__text {
    font-family: $pd-font-family;
    font-size: $pd-body-lg;
    font-weight: $pd-font-semibold;
    line-height: $pd-body-lg-lh;
    letter-spacing: $pd-body-lg-ls;
  }

  // ═══════════════════════════════════════════════
  // VARIANTS
  // ═══════════════════════════════════════════════

  // ── Filled (high-emphasis CTA) ──
  &--filled {
    background-color: $pd-brand-cta;
    .pd-button__text { color: $pd-text-inverse; }
  }
  &--filled#{&}--pressed {
    background-color: $pd-brand-600;
    @include pd-press-scale;
  }

  // ── Tonal (medium-emphasis, light brand fill — stronger tint for visibility) ──
  &--tonal {
    background-color: $pd-brand-150;
    .pd-button__text { color: $pd-brand-500; }
  }
  &--tonal#{&}--pressed {
    background-color: $pd-brand-200;
    @include pd-press-scale;
  }

  // ── Secondary (outlined, neutral grey border, brand-red text & icon) ──
  &--secondary {
    background-color: $pd-surface-primary;
    border: 2rpx solid $pd-border-default;
    .pd-button__text { color: $pd-brand-500; }
  }
  &--secondary#{&}--pressed {
    background-color: $pd-surface-secondary;
    border-color: $pd-border-default;
    @include pd-press-scale;
  }

  // ── Ghost (text-only, no background, no border) ──
  &--ghost {
    background-color: transparent;
    .pd-button__text { color: $pd-brand-500; }
  }
  &--ghost#{&}--pressed {
    background-color: $pd-brand-50;
    @include pd-press-scale;
  }

  // ── Plain (text-only, neutral color — for in-card toggles where brand red
  //         would over-emphasize the action; complements 'ghost'). ──
  &--plain {
    background-color: transparent;
    .pd-button__text { color: $pd-text-primary; }
  }
  &--plain#{&}--pressed {
    background-color: $pd-surface-hover;   // iOS-style press tint
    @include pd-press-scale;
  }

  // ── Danger (destructive, outlined red — uses outline to avoid height collapse) ──
  &--danger {
    background-color: $pd-error-bg;
    outline: 2rpx solid $pd-error;
    outline-offset: -2rpx;
    // Text uses the WCAG-AA-safe darker variant; the outline can stay on the
    // brighter $pd-error since it's a non-text UI element (3:1 threshold).
    .pd-button__text { color: $pd-error-text; }
  }
  &--danger#{&}--pressed {
    background-color: $pd-error-bg-strong;
    @include pd-press-scale;
  }

  // ═══════════════════════════════════════════════
  // ICON-ONLY
  // ═══════════════════════════════════════════════

  &--icon-only {
    min-width: unset;
    padding: 0;
    // a11y (WCAG 2.5.5 / MD3 48dp): a bare-icon button is a tap target, so the
    // touch box is a 96rpx (48px) square. With the base pill radius this renders
    // as a circle — the natural shape for an icon button.
    width: 96rpx;
    height: 96rpx;
  }

  // ═══════════════════════════════════════════════
  // STACK (icon above text, square — dock/toolbar action)
  // ═══════════════════════════════════════════════

  &--stack {
    flex-direction: column;
    gap: 0;   // Figma 278:633 — icon sits directly above the label, no gap.
    padding: 0;
    min-width: unset;
    // 96rpx (48px) square that pairs level with the CTA beside it. Per the
    // single-size + max-radius rule the dock action is now a full circle
    // (overrides the old Figma 278:633 12px rounded-square).
    width: 96rpx;
    height: 96rpx;
    border-radius: $pd-radius-pill;

    // Column layout: no horizontal gap, and collapse the icon wrapper to the
    // glyph's real height. Its inherited line-height otherwise leaves ~16rpx of
    // dead line-box below the icon that reads as a gap above the label.
    .pd-button__icon-left { margin-right: 0; display: flex; line-height: 0; }
    // Label sits under the icon. Figma 278:633 specs 10px Semibold (`overline`)
    // for the dock label — a DELIBERATE, dock-only exception to the §2 CJK-min
    // (12px) rule: two glyphs, never-wrapping, paired with the icon for meaning.
    // Do NOT copy `overline` onto readable CJK content anywhere else.
    .pd-button__text {
      font-size: $pd-overline;
      font-weight: $pd-font-semibold;
      line-height: $pd-overline-lh;
      letter-spacing: $pd-overline-ls;
    }
  }

  // ═══════════════════════════════════════════════
  // STATES
  // ═══════════════════════════════════════════════

  &--block {
    display: flex;
    width: 100%;
  }

  &:focus-visible {
    outline: 4rpx solid $pd-brand-500;
    outline-offset: 4rpx;
  }

  @media (hover: hover) {
    &--filled:hover:not(.pd-button--disabled):not(.pd-button--loading) {
      background-color: $pd-brand-600;
    }
    &--tonal:hover:not(.pd-button--disabled):not(.pd-button--loading) {
      background-color: $pd-brand-200;
    }
    &--secondary:hover:not(.pd-button--disabled):not(.pd-button--loading) {
      background-color: $pd-surface-secondary;
      border-color: $pd-text-placeholder;
    }
    &--ghost:hover:not(.pd-button--disabled):not(.pd-button--loading) {
      background-color: $pd-brand-50;
    }
    &--plain:hover:not(.pd-button--disabled):not(.pd-button--loading) {
      background-color: $pd-surface-hover;
    }
    &--danger:hover:not(.pd-button--disabled):not(.pd-button--loading) {
      background-color: $pd-error-bg-strong;
    }
  }

  &--disabled {
    pointer-events: none;
    cursor: not-allowed;

    // Filled/danger: swap to muted bg instead of opacity fade (stays visible)
    &.pd-button--filled {
      background-color: $pd-border-light;
      .pd-button__text { color: $pd-text-disabled; }
    }
    &.pd-button--danger {
      background-color: transparent;
      outline-color: $pd-border-light;
      .pd-button__text { color: $pd-text-disabled; }
    }

    // Tonal/secondary/ghost: opacity works well on lighter surfaces
    &.pd-button--tonal,
    &.pd-button--secondary,
    &.pd-button--ghost {
      opacity: $pd-opacity-disabled;
    }
  }

  &--loading {
    pointer-events: none;
    cursor: wait;
  }
}
</style>
