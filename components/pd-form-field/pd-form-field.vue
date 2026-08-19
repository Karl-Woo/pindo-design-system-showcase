<template>
  <view
    class="pd-form-field"
    :class="{ 'pd-form-field--bare': isBare }"
  >
    <label
      v-if="label"
      class="pd-form-field__label"
      :for="fieldId || null"
    >
      <text class="pd-form-field__label-text">{{ label }}</text>
      <text v-if="required" class="pd-form-field__required" aria-hidden="true">*</text>
    </label>
    <view class="pd-form-field__control">
      <slot />
    </view>
    <text
      v-if="error"
      class="pd-form-field__message pd-form-field__message--error"
      role="alert"
    >{{ error }}</text>
    <text
      v-if="helper"
      class="pd-form-field__message pd-form-field__message--helper"
    >{{ helper }}</text>
  </view>
</template>

<script>
export default {
  name: 'pd-form-field',
  props: {
    label: { type: String, default: '' },
    required: { type: Boolean, default: false },
    error: { type: String, default: '' },
    helper: { type: String, default: '' },
    // Id of the inner control element — enables <label for="..."> so tapping
    // the label focuses the control. Consumers (pd-input, pd-textarea) forward
    // this to the native element's id.
    fieldId: { type: String, default: '' },
    // Force-disable the outer 12px vertical padding even when a label/error/
    // helper is present. Use when the control is laid out inside its own
    // container (e.g. a card) that already owns the breathing room — having
    // form-field padding *plus* the card padding doubles the top/bottom space.
    // pd-input forwards this automatically for appearance="filled".
    noPadding: { type: Boolean, default: false }
  },
  computed: {
    // Collapse outer padding to zero when there's nothing to display, OR when
    // the consumer explicitly opts in via `noPadding`. Without this, composing
    // pd-input/pd-textarea inside another container that owns its own padding
    // would double the spacing and push the control down.
    isBare() {
      return this.noPadding || (!this.label && !this.error && !this.helper)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-form-field {
  padding: $pd-space-1-5 0;

  // Passthrough mode: collapse when there's nothing to render. Keeps composed
  // pd-textarea/pd-input from double-padding when wrapped by another form-field.
  &--bare {
    padding: 0;
  }

  &__label {
    display: flex;
    align-items: center;
    // Spec: 4px gap from label baseline to control top. $pd-space-half = 8rpx,
    // which renders 4px on the 750-design device. Single source of truth for
    // every consumer of pd-form-field (pd-input, pd-textarea) — change here
    // if the design system updates the form-row label cadence.
    margin-bottom: $pd-space-half;
  }

  &__label-text {
    @include pd-type(body-lg);
    font-weight: $pd-font-medium;
    color: $pd-text-primary;
  }

  &__required {
    @include pd-type(body-lg);
    color: $pd-error-text;
    margin-left: $pd-space-half;
  }

  &__message {
    @include pd-type(caption);
    display: block;
    margin-top: $pd-space-half;

    &--error { color: $pd-error-text; }
    &--helper { color: $pd-text-tertiary; }
  }
}
</style>
