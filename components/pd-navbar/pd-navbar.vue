<template>
  <view class="pd-navbar-root">
    <!-- ── Step-progress variant (Figma 514:136) ──
         A self-contained fixed navbar: white, px-8 container, flex-col gap-4,
         a 48px title row + a 4px segmented progress row (its own px-8). The
         whole thing is fixed so the progress stays visible while the page
         scrolls; a spacer reserves its height. Enable with `progressSegments`
         (> 0) + `progressCurrent` (filled count, 1-based = currentStep + 1). -->
    <template v-if="hasProgress">
      <view class="pd-navbar__step" :style="{ paddingTop: statusBarH + 'px' }">
        <view class="pd-navbar__step-title">
          <view class="pd-navbar__step-side"><slot name="left" /></view>
          <text class="pd-navbar__step-heading">{{ title }}</text>
          <view class="pd-navbar__step-side"><slot name="right" /></view>
        </view>
        <view class="pd-navbar__step-progress">
          <pd-progress :segments="progressSegments" :current="progressCurrent" />
        </view>
      </view>
      <!-- Reserve status bar + 56px (48 title + 4 gap + 4 progress) in flow. -->
      <view
        v-if="placeholder"
        class="pd-navbar__step-ph"
        :style="{ height: statusBarH + 56 + 'px' }"
      />
    </template>

    <!-- ── Default variant (unchanged) ── -->
    <uv-navbar
      v-else
      :title="hasCenter ? '' : title"
      :leftIconSize="showBack ? '22' : '0'"
      :leftIconColor="leftIconColor"
      :placeholder="placeholder"
      :fixed="fixed"
      :height="height"
      :safeAreaInsetTop="true"
      :bgColor="bgColor"
      :border="border"
      :titleStyle="titleStyle"
      @leftClick="handleBack"
    >
      <template v-if="$slots.left" #left>
        <slot name="left" />
      </template>
      <template v-if="hasCenter" #center>
        <slot name="center">
          <text class="pd-navbar__title">{{ title }}</text>
        </slot>
      </template>
      <template v-if="$slots.right" #right>
        <slot name="right" />
      </template>
    </uv-navbar>
  </view>
</template>

<script>
import { PD_TEXT_PRIMARY } from '@/styles/tokens.js'

export default {
  name: 'pd-navbar',
  // 规范：emit 什么就声明什么（DESIGN_SYSTEM §16.2）。
  // back 不是原生事件名，今天不会双触发；声明是为了不依赖
  // 「这个名字恰好不是原生的」这种需要每次重新论证的推理。
  emits: ['back'],
  props: {
    title: { type: String, default: '' },
    showBack: { type: Boolean, default: true },
    bgColor: { type: String, default: '#FFFFFF' },
    border: { type: Boolean, default: false },
    fixed: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: true },
    // Navbar content-row height (excl. status bar), passed to uv-navbar. Default
    // 44px (iOS standard). Pages whose navbar hosts 48px icon-only action buttons
    // pass '96rpx' so the bar fully covers them — see DESIGN_SYSTEM.md
    // "Navbar height for 48px actions". Ignored by the step-progress variant,
    // which renders a fixed 48px title row per Figma.
    height: { type: String, default: '44px' },
    leftIconColor: { type: String, default: () => PD_TEXT_PRIMARY },
    // ── Step-progress variant ──
    // > 0 renders the segmented progress navbar (title row + progress row, fixed,
    // always visible). `progressCurrent` = filled segment count (1-based).
    progressSegments: { type: Number, default: 0 },
    progressCurrent: { type: Number, default: 0 }
  },
  data() {
    return { statusBarH: 0 }
  },
  mounted() {
    this.statusBarH = uni.getSystemInfoSync().statusBarHeight || 0
  },
  computed: {
    hasCenter() {
      return !!this.$slots.center
    },
    hasProgress() {
      return this.progressSegments > 0
    },
    titleStyle() {
      return {
        fontSize: '36rpx',
        fontWeight: '600',
        color: PD_TEXT_PRIMARY
      }
    }
  },
  methods: {
    handleBack() {
      if (this.$listeners && this.$listeners.back) {
        this.$emit('back')
      } else {
        uni.navigateBack({ delta: 1 })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-navbar__title {
  @include pd-type(heading-3);
  color: $pd-text-primary;
}

// ── Step-progress variant (Figma 514:136) ──
.pd-navbar__step {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 980; // navbar layer — above scrolling content
  background: $pd-surface-primary;
  display: flex;
  flex-direction: column;
  gap: $pd-space-half; // 4px between title row and progress row
  padding: 0 $pd-space-1; // px-8 container
  box-sizing: border-box;
}
.pd-navbar__step-title {
  display: flex;
  align-items: center;
  gap: $pd-space-3; // 24px
  height: 96rpx; // 48px title row
  width: 100%;
}
.pd-navbar__step-side {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.pd-navbar__step-heading {
  flex: 1;
  min-width: 0;
  text-align: center;
  @include pd-type(heading-4); // 18px
  font-weight: $pd-font-bold;
  color: $pd-text-primary;
}
.pd-navbar__step-progress {
  display: flex;
  width: 100%;
  padding: 0 $pd-space-1; // extra px-8 → segments inset 16px total, per Figma
  box-sizing: border-box;
}
.pd-navbar__step-ph {
  width: 100%;
}
</style>
