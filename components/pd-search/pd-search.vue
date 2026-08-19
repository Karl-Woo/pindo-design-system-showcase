<template>
  <view
    class="pd-search"
    :class="{ 'pd-search--focused': isFocused, 'pd-search--disabled': disabled }"
  >
    <view class="pd-search__bar">
      <pd-icon name="magnify" size="md" color="placeholder" class="pd-search__icon" />
      <input
        class="pd-search__input"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :confirm-type="'search'"
        :placeholder-style="placeholderStyle"
        :aria-disabled="disabled"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @confirm="onConfirm"
      />
      <view
        v-if="value && clearable && !disabled"
        class="pd-search__clear"
        hover-class="pd-search__clear--pressed"
        @click="onClear"
      >
        <uv-icon name="close-circle-fill" size="16" :color="clearIconColor" />
      </view>
    </view>
    <view
      v-if="showCancel"
      class="pd-search__cancel"
      hover-class="pd-search__cancel--pressed"
      @click="onCancel"
    >
      <text class="pd-search__cancel-text">{{ cancelText }}</text>
    </view>
  </view>
</template>

<script>
import { PD_TEXT_DISABLED, PD_PLACEHOLDER_STYLE } from '@/styles/tokens.js'

export default {
  name: 'pd-search',
  // 同 pd-rate：声明对外事件，防止父组件的 @input/@focus/@blur 被 fallthrough
  // 二次绑定。当前根是 <view>（真正的 <input> 在内层），所以不会双触发；护栏性质。
  emits: ['input', 'focus', 'blur', 'search', 'clear', 'cancel'],
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: false },
    cancelText: { type: String, default: '取消' }
  },
  data() {
    return {
      isFocused: false,
      // Native placeholder-style attr only accepts plain CSS string. Use the
      // shared token-driven constant so updates to $pd-text-placeholder /
      // $pd-body-lg propagate automatically.
      placeholderStyle: PD_PLACEHOLDER_STYLE
    }
  },
  computed: {
    clearIconColor() {
      // = $pd-text-disabled / $pd-grey-500
      return PD_TEXT_DISABLED
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.detail.value)
    },
    onFocus(e) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.isFocused = false
      this.$emit('blur', e)
    },
    onConfirm(e) {
      this.$emit('search', e.detail.value)
    },
    onClear() {
      this.$emit('input', '')
      this.$emit('clear')
    },
    onCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-search {
  display: flex;
  align-items: center;
  min-height: $pd-touch-lg;

  &__bar {
    flex: 1;
    display: flex;
    align-items: center;
    height: $pd-touch-lg;
    padding: 0 $pd-space-1-5;
    // White pill + neutral border — matches pd-input appearance="filled" so
    // search and input share the same visual contract across the DS.
    background: $pd-surface-primary;
    border: 2rpx solid $pd-border-input;
    border-radius: $pd-radius-pill;
    transition: background $pd-duration-fast $pd-ease-standard,
                border-color $pd-duration-fast $pd-ease-standard,
                box-shadow $pd-duration-fast $pd-ease-standard;
  }

  &--focused &__bar {
    border-color: $pd-brand-500;
    box-shadow: 0 0 0 2rpx $pd-brand-500;
  }

  // Disabled — match pd-input: surface-tertiary fill on the bar +
  // global opacity wash + no pointer events. Keeps shape (radius / padding)
  // identical to enabled state so toggling doesn't shift layout.
  &--disabled {
    opacity: $pd-opacity-disabled;
    pointer-events: none;
  }
  &--disabled &__bar {
    background: $pd-surface-tertiary;
  }

  &__icon {
    flex-shrink: 0;
    margin-right: $pd-space-1;
  }

  &__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    @include pd-type(body-lg);
    color: $pd-text-primary;
    background: transparent;
    border: none;
  }

  &__clear {
    @include pd-flex-center;
    width: 48rpx;
    height: 48rpx;
    margin-left: $pd-space-half;
    border-radius: $pd-radius-circle;

    &--pressed { background: $pd-surface-hover; }
  }

  &__cancel {
    margin-left: $pd-space-1-5;
    padding: $pd-space-half $pd-space-1;

    &--pressed { opacity: 0.6; }
  }

  &__cancel-text {
    @include pd-type(body-lg);
    color: $pd-brand-500;
  }
}
</style>
