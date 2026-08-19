<template>
  <view
    class="pd-card"
    :class="[`pd-card--${variant}`, `pd-card--pad-${padding}`]"
    :hover-class="clickable ? 'pd-card--pressed' : ''"
    :hover-stay-time="120"
    @click="$emit('click', $event)"
  >
    <slot />
  </view>
</template>

<script>
export default {
  name: 'pd-card',
  // 同 pd-list-item：根元素 $emit('click') + 未声明 emits ⇒ 父组件 @click 会被
  // fallthrough 再绑一次，一次点击跑两遍。用 emits 而非 inheritAttrs:false，
  // 因为本组件 11 处调用里有 9 处传了 class（.ship-card / .pref-card / .confirm-sec 等），
  // 关掉 fallthrough 会把这些页面样式一起挡掉。
  //
  // ⚠️ 本声明与 package-card 的 emits 声明【互相依赖】：package-card 的根就是 pd-card，
  // 两层 fallthrough 会叠乘（修复前一次点击跑 4 遍）。单独回滚任何一个都会留下 2 倍触发。
  emits: ['click'],
  props: {
    variant: {
      type: String,
      default: 'elevated',
      validator: (v) => ['elevated', 'outlined', 'flat'].includes(v)
    },
    padding: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'lg', 'none'].includes(v)
    },
    clickable: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-card {
  border-radius: $pd-radius-xl; // 16px（Figma 卡片圆角，全站统一）
  // 不带默认外边距：间距是容器（gap）/ 父级 margin 的职责，组件不自带。
  // 曾有 margin-bottom: $pd-space-1(8px)，会和 flex 容器 gap 叠加成双倍间距，
  // 反复踩坑（见 doc/pd-card-默认外边距-根治方案.md）。已去除。
  transition: transform $pd-duration-fast $pd-ease-standard,
    box-shadow $pd-duration-fast $pd-ease-standard;

  // ── Variants ──
  &--elevated {
    background-color: $pd-surface-primary;
    box-shadow: $pd-elevation-2;
  }

  &--outlined {
    background-color: $pd-surface-primary;
    box-shadow: none;
    border: 1rpx solid $pd-grey-200; // 设计系统更新：卡片描边 grey-100→grey-200(#DFDFDF)，grey-100 在真机上偏浅
  }

  &--flat {
    background-color: $pd-surface-secondary;
    box-shadow: none;
  }

  // ── Padding ──
  &--pad-default {
    padding: $pd-space-2;
  }

  &--pad-lg {
    padding: $pd-space-3;
  }

  &--pad-none {
    padding: 0;
  }

  // ── Press ──
  &--pressed {
    @include pd-press-scale;
    box-shadow: $pd-elevation-1;
  }
}
</style>
