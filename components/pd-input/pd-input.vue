<template>
  <pd-form-field
    :label="label"
    :required="required"
    :error="error"
    :helper="helper"
    :field-id="fieldId"
    :no-padding="true"
  >
    <view
      class="pd-input"
      :class="{
        'pd-input--error': !!error,
        'pd-input--focused': isFocused,
        'pd-input--disabled': disabled
      }"
    >
      <slot name="prefix" />
      <uv-input
        ref="uvInput"
        :value="value"
        :type="password ? 'password' : type"
        :placeholder="placeholder"
        :disabled="disabled"
        :clearable="clearable"
        :maxlength="maxlength"
        :passwordIcon="password"
        border="none"
        :fontSize="inputFontSize"
        :color="inputColor"
        :customStyle="wrapperStyle"
        :placeholderStyle="placeholderStyle"
        v-bind="$attrs"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @confirm="$emit('confirm', $event)"
        @clear="$emit('clear')"
      />
      <slot name="suffix" />
    </view>
  </pd-form-field>
</template>

<script>
import {
  PD_TEXT_PRIMARY,
  PD_BODY_FONT_SIZE,
  PD_PLACEHOLDER_STYLE
} from '@/styles/tokens.js'

export default {
  name: 'pd-input',
  inheritAttrs: false,
  // inheritAttrs:false 只挡住根元素，但模板第 33 行的 v-bind="$attrs" 又把父组件的
  // onInput/onFocus/onBlur 手动搬到了内层 <uv-input> 上，而 34-36 行本组件自己也绑了
  // 同名处理器、并在其中 $emit 回去 —— 同一个 fallthrough 双触发往下挪了一层。
  // 实例：groupProcess.vue「微信号」输入框绑了 @focus/@blur，聚焦一次 onInputFocus
  // 跑两遍，两个 setTimeout(…,250) 都排上、scrollFieldAboveKeyboard 执行两次。
  //
  // ⚠️ 不能把 update:modelValue 写进来：本组件从不自己 emit 它（grep 计数为 0），
  // v-model 完全靠 $attrs 透传给 uv-input。一旦声明就会被从 $attrs 摘走 → v-model 断。
  emits: ['input', 'focus', 'blur', 'confirm', 'clear'],
  props: {
    label: { type: String, default: '' },
    error: { type: String, default: '' },
    helper: { type: String, default: '' },
    required: { type: Boolean, default: false },
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    password: { type: Boolean, default: false },
    maxlength: { type: Number, default: -1 },
    // Optional id for the native input — enables label click-to-focus via
    // pd-form-field's <label for="...">. Forward a unique string if you want it.
    fieldId: { type: String, default: '' }
  },
  data() {
    return {
      isFocused: false,
      // uv-input splits styles: `fontSize`/`color` props target the native <input>,
      // while `customStyle` targets the wrapper. Must pass fontSize/color as props
      // (not via customStyle) or the placeholder and filled text render at
      // different sizes — uv-input defaults the input fontSize to 14px.
      inputFontSize: PD_BODY_FONT_SIZE,
      inputColor: PD_TEXT_PRIMARY,
      wrapperStyle: {
        backgroundColor: 'transparent',
        padding: '0'
      },
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
    // uv-input doesn't forward aria-* / id to its inner native <input>, so we
    // imperatively set them on mount and whenever the driving props change.
    // H5-only: uni-app compiles to <input> on web; native platforms bypass this
    // branch since there's no DOM, which is fine — the prop-driven behavior
    // covers native a11y via the uni-input element itself.
    syncNativeAttrs() {
      const wrap = this.$refs.uvInput && this.$refs.uvInput.$el
      if (!wrap || typeof wrap.querySelector !== 'function') return
      const el = wrap.querySelector('input')
      if (!el) return
      if (this.fieldId) el.setAttribute('id', this.fieldId)
      else el.removeAttribute('id')
      el.setAttribute('aria-required', String(this.required))
      el.setAttribute('aria-invalid', String(!!this.error))
      el.setAttribute('aria-disabled', String(this.disabled))
      // type='digit' on native uni-app shows a decimal-capable numeric keyboard;
      // on H5 it compiles to <input type='text'> and the OS keyboard hint is
      // controlled by `inputmode`. Mirror it explicitly so decimal entry works
      // across platforms without consumer boilerplate.
      if (this.type === 'digit' || this.type === 'number') {
        el.setAttribute('inputmode', 'decimal')
      } else {
        el.removeAttribute('inputmode')
      }
    },
    onInput(val) {
      this.$emit('input', val)
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

.pd-input {
  display: flex;
  align-items: center;
  min-height: $pd-touch-lg;
  // The single canonical input style across the DS: white pill, neutral border,
  // 12px radius, 16px sides padding. Border swaps color on focus/error
  // (2rpx reserved → no layout shift). Pair with #prefix / #suffix slots for
  // icons or unit indicators (kg, $, %, etc.).
  background: $pd-surface-primary;
  border: 2rpx solid $pd-border-input;     // = $pd-grey-300
  border-radius: $pd-radius-lg;
  padding: 0 $pd-space-2;
  transition:
    border-color $pd-duration-fast $pd-ease-standard,
    background-color $pd-duration-fast $pd-ease-standard;

  &--focused { border-color: $pd-brand-500; }
  &--error   { border-color: $pd-error; }

  // ── Disabled ──
  // Keep the same shape (radius / padding) as the enabled state so toggling
  // disabled doesn't shift layout — only the surface color changes.
  // surface-tertiary (grey-100) gives a slightly deeper inset than the
  // page bg (surface-secondary / grey-50), making the disabled state feel
  // genuinely "filled in" rather than blending with the surrounding section.
  &--disabled {
    opacity: $pd-opacity-disabled;
    pointer-events: none;
    background: $pd-surface-tertiary;
  }
}
</style>
