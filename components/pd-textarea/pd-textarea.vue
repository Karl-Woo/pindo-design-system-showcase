<template>
  <pd-form-field
    :label="label"
    :required="required"
    :error="error"
    :helper="helper"
    :field-id="fieldId"
  >
    <view
      class="pd-textarea"
      :class="{
        'pd-textarea--error': !!error,
        'pd-textarea--focused': isFocused,
        'pd-textarea--disabled': disabled,
        'pd-textarea--has-count': showCount && maxlength > 0
      }"
    >
      <view class="pd-textarea__field">
        <textarea
          ref="native"
          class="pd-textarea__input"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxlength"
          :auto-height="autoHeight"
          :placeholder-style="placeholderStyle"
          :cursor-spacing="cursorSpacing"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <text
          v-if="showCount && maxlength > 0"
          class="pd-textarea__count"
        >{{ (modelValue || '').length }}/{{ maxlength }}</text>
      </view>
    </view>
  </pd-form-field>
</template>

<script>
import { PD_PLACEHOLDER_STYLE } from '@/styles/tokens.js'

export default {
  name: 'pd-textarea',
  emits: ['update:modelValue', 'focus', 'blur'],
  props: {
    label: { type: String, default: '' },
    error: { type: String, default: '' },
    helper: { type: String, default: '' },
    required: { type: Boolean, default: false },
    // v-model 走 Vue 3 原生契约（modelValue + update:modelValue）。
    // 曾经这里叫 `value` + emit('input')——那是 Vue 2 的写法，在 Vue 3 下
    // v-model 传进来的 modelValue 会落进 $attrs 而无人接收，导致用户输入
    // 永远同步不回父组件（pd-input 没踩到是因为它把 $attrs 转发给了内层
    // uv-input，歪打正着）。改动时别退回 `value`。
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    maxlength: { type: Number, default: -1 },
    showCount: { type: Boolean, default: false },
    // false = 固定高度，内容超出后【裁在框内】：程序性滚动（跟随光标）能动，
    // 但用户没法用手指滚回去看开头 —— 弹窗里滚的是弹窗、不是框内部。
    // 所以有长文可能的备注类字段一律传 true，让框随内容长高，
    // 由外层（页面 / pd-popup 内容区）承担滚动。配 maxlength 限制总高度。
    // 2026-08-08 录入单号备注真机踩过。
    autoHeight: { type: Boolean, default: false },
    // Optional id for the native textarea — enables label click-to-focus via
    // pd-form-field's <label for="...">. Forward a unique string if you want it.
    fieldId: { type: String, default: '' },
    // Distance (px) kept between the input and the soft keyboard when it opens.
    // Native <textarea> defaults to 0, which seats the input flush against the
    // keyboard — problematic on pages with a fixed bottom bar that then covers
    // it. Pass a value ≈ the fixed footer height to lift the input clear of both
    // the keyboard and the bar. Effective gap = min(input's distance-to-bottom,
    // cursorSpacing), so also give the input enough room below it to scroll.
    cursorSpacing: { type: [Number, String], default: 0 }
  },
  data() {
    return {
      isFocused: false,
      // Built from the JS token mirror — see styles/tokens.js for the contract.
      placeholderStyle: PD_PLACEHOLDER_STYLE
    }
  },
  mounted() {
    this.syncNativeAttrs()
  },
  updated() {
    this.syncNativeAttrs()
  },
  methods: {
    // uni-app compiles <textarea> to <uni-textarea> wrapping a native
    // <textarea>; template-bound aria-* and id land on the outer <uni-textarea>
    // element, not the real <textarea>. Set them imperatively on the native node.
    // H5-only: $refs.native.$el finds the <uni-textarea>; we query inside for
    // the real <textarea>. On native platforms there is no DOM and this is a
    // no-op (native a11y is driven by the uni-textarea props instead).
    syncNativeAttrs() {
      const ref = this.$refs.native
      const wrap = ref && ref.$el ? ref.$el : ref
      if (!wrap || typeof wrap.querySelector !== 'function') return
      const el = wrap.tagName === 'TEXTAREA' ? wrap : wrap.querySelector('textarea')
      if (!el) return
      if (this.fieldId) el.setAttribute('id', this.fieldId)
      else el.removeAttribute('id')
      el.setAttribute('aria-required', String(this.required))
      el.setAttribute('aria-invalid', String(!!this.error))
      el.setAttribute('aria-disabled', String(this.disabled))
    },
    onInput(e) {
      this.$emit('update:modelValue', e.detail.value)
    },
    onFocus(e) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.isFocused = false
      this.$emit('blur', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-textarea {
  &__field {
    position: relative;
    // Visual contract aligned with pd-input appearance="filled":
    // white pill, 2rpx neutral border, $pd-radius-lg corners, 16px padding.
    // Border swaps color on state change — 2rpx reserved so no layout shift.
    background: $pd-surface-primary;
    border: 2rpx solid $pd-border-input;
    border-radius: $pd-radius-lg;
    padding: $pd-space-2;
    transition: border-color $pd-duration-fast $pd-ease-standard;
  }

  &__input {
    width: 100%;
    min-height: 192rpx;
    @include pd-type(body-lg);
    color: $pd-text-primary;
    background: transparent;
    border: none;
  }

  // Counter lives at the bottom-right of the field. When present, the input
  // reserves bottom padding so lines never overlap it.
  &--has-count &__input { padding-bottom: $pd-space-2; }

  &__count {
    position: absolute;
    right: $pd-space-1-5;
    bottom: $pd-space-1;
    @include pd-type(caption);
    color: $pd-text-tertiary;
  }

  &--focused &__field { border-color: $pd-brand-500; }
  &--error &__field { border-color: $pd-error; }

  &--disabled {
    opacity: $pd-opacity-disabled;
    pointer-events: none;

    .pd-textarea__field { background: $pd-surface-tertiary; }
  }
}
</style>
