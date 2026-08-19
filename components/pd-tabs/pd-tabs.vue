<template>
  <view
    class="pd-tabs"
    :class="[`pd-tabs--${variant}`, { 'pd-tabs--sticky': sticky }]"
  >
    <view
      v-for="(item, index) in items"
      :key="index"
      class="pd-tabs__item"
      :class="{ 'pd-tabs__item--active': index === currentIndex }"
      hover-class="pd-tabs__item--pressed"
      :hover-stay-time="100"
      @click="onSelect(index)"
    >
      <text class="pd-tabs__label">{{ item.label || item }}</text>
      <!-- Optional incentive badge on a pill tab (e.g. 申请团长「3%返现」).
           Pass `badge: '3%返现'` on the item. -->
      <pd-badge
        v-if="item.badge"
        class="pd-tabs__badge"
        variant="label"
        :text="item.badge"
      />
      <view
        v-if="variant === 'underline' && index === currentIndex"
        class="pd-tabs__indicator"
      />
    </view>
  </view>
</template>

<script>
export default {
  name: 'pd-tabs',
  // 同 pd-rate：声明对外事件，防止父组件的 @change/@input 被 fallthrough 二次绑定。
  // 当前根是 <view>，不会双触发；属于护栏性质。
  emits: ['input', 'change'],
  props: {
    items: { type: Array, default: () => [] },
    value: { type: Number, default: 0 },
    variant: {
      type: String,
      default: 'underline',
      validator: (v) => ['underline', 'pill', 'switcher'].includes(v)
    },
    sticky: { type: Boolean, default: false }
  },
  data() {
    return {
      currentIndex: this.value
    }
  },
  watch: {
    value(v) {
      this.currentIndex = v
    }
  },
  methods: {
    onSelect(index) {
      if (index === this.currentIndex) return
      this.currentIndex = index
      this.$emit('input', index)
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-tabs {
  display: flex;
  background: $pd-surface-primary;

  &--sticky {
    position: sticky;
    top: 0;
    z-index: $pd-z-sticky;
  }

  &__item {
    flex: 1;
    @include pd-flex-center;
    position: relative;
    padding: $pd-space-1-5 $pd-space-1;
    transition: background $pd-duration-instant $pd-ease-standard;

    &--pressed {
      background: $pd-surface-hover;
    }
  }

  &__label {
    @include pd-type(heading-4);
    color: $pd-text-tertiary;
    font-weight: $pd-font-regular;
    transition: color $pd-duration-fast $pd-ease-standard;
  }

  &__item--active &__label {
    color: $pd-text-primary;
    font-weight: $pd-font-bold;
  }

  &__badge {
    margin-left: $pd-space-half;
    flex-shrink: 0; // 别被 flex 挤压导致徽章文字逐字换行
    white-space: nowrap;
  }

  &__indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 48rpx;
    height: 4rpx;
    background: $pd-brand-500;
    border-radius: $pd-radius-pill;
  }

  // ── Underline variant ──
  &--underline {
    border-bottom: 1rpx solid $pd-border-divider;
  }

  // ── Pill variant ──
  &--pill {
    background: $pd-surface-secondary;
    border-radius: $pd-radius-pill;
    padding: $pd-space-half;
    gap: $pd-space-half;

    .pd-tabs__item {
      padding: $pd-space-1 $pd-space-3;
      border-radius: $pd-radius-pill;
      height: 80rpx;
      transition: background $pd-duration-fast $pd-ease-standard;

      &--active {
        background: $pd-surface-primary;
        box-shadow: $pd-elevation-1;
      }

      &--pressed {
        background: $pd-surface-hover;
      }
    }

    .pd-tabs__label {
      @include pd-type(body-lg);
    }

    .pd-tabs__item--active .pd-tabs__label {
      color: $pd-text-primary;
      font-weight: $pd-font-semibold;
    }
  }

  // ── Switcher variant (iOS-style segmented / Figma "Content Switcher") ──
  // Full-width track, no gap, tertiary track, white active pill (no shadow),
  // nowrap labels. Fits longer labels than `pill` and matches Figma 349:1340.
  &--switcher {
    background: $pd-surface-tertiary;
    border-radius: $pd-radius-pill;
    padding: $pd-space-half;

    .pd-tabs__item {
      padding: 0 $pd-space-3;
      height: 80rpx;
      border-radius: $pd-radius-pill;

      &--active {
        background: $pd-surface-primary;
      }

      &--pressed {
        background: $pd-surface-hover;
      }
    }

    .pd-tabs__label {
      @include pd-type(body-lg);
      color: $pd-text-placeholder;
      white-space: nowrap;
    }

    .pd-tabs__item--active .pd-tabs__label {
      color: $pd-text-primary;
      font-weight: $pd-font-regular;
    }
  }
}
</style>
