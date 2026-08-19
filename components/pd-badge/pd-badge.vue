<template>
  <view class="pd-badge" :class="[`pd-badge--${variant}`]" :style="containerStyle">
    <text v-if="variant !== 'dot'" class="pd-badge__text" :style="textStyle">{{ displayText }}</text>
  </view>
</template>

<script>
// 语义色名 → 真实 token 数值。值与 styles/tokens.scss 保持同步：
//   - bg    = $pd-{semantic}-bg-strong（label/status 变体的背景，~12% 透明 tint）
//   - fg    = $pd-{semantic}-text（AA 对比度的文字色）
//   - solid = $pd-{semantic}（status / dot / count 等场景的纯色）
// brand 走 brand-100 / brand-500（与 .pd-badge--label 默认 token 对齐）。
const SEMANTIC_TOKENS = {
  brand:   { bg: 'rgba(203, 29, 69, 0.10)',  fg: '#CB1D45', solid: '#CB1D45' },
  success: { bg: 'rgba(52, 199, 89, 0.12)',  fg: '#058132', solid: '#34C759' },
  warning: { bg: 'rgba(255, 149, 0, 0.12)',  fg: '#B35100', solid: '#FF9500' },
  error:   { bg: 'rgba(255, 59, 48, 0.12)',  fg: '#D70015', solid: '#FF3B30' },
  info:    { bg: 'rgba(0, 122, 255, 0.12)',  fg: '#006CE5', solid: '#007AFF' },
  // 中性灰：结构复用 label（同尺寸/内距/字重 = 同 visual weight），只换 token 化灰。
  // bg=$pd-grey-100，fg=$pd-text-secondary(grey-800)，solid=$pd-grey-700。
  neutral: { bg: '#EDEDED',                  fg: '#3D3D3D', solid: '#616161' }
}

export default {
  name: 'pd-badge',
  props: {
    variant: {
      type: String,
      default: 'status',
      validator: (v) => ['status', 'dot', 'count', 'label'].includes(v)
    },
    // 接受语义色名（'brand' | 'success' | 'warning' | 'error' | 'info' | 'neutral'）
    // 或自定义 hex 字符串（'#RRGGBB'）。语义色映射到 tokens.scss 的真实 token。
    color: { type: String, default: '' },
    text: { type: String, default: '' },
    value: { type: Number, default: 0 }
  },
  computed: {
    displayText() {
      if (this.variant === 'count') {
        return this.value > 99 ? '99+' : String(this.value)
      }
      return this.text
    },
    // 把 color prop 解析成 { bg, fg, solid } 三元组。语义色查表，hex 走旧逻辑。
    resolvedColor() {
      if (!this.color) return null
      if (SEMANTIC_TOKENS[this.color]) return SEMANTIC_TOKENS[this.color]
      // Hex / CSS 颜色字符串 — 旧行为：bg = color + 1A 透明度，fg = color。
      return { bg: this.color + '1A', fg: this.color, solid: this.color }
    },
    // 拆开容器样式与文字样式 —— scoped CSS 里 .pd-badge--label .pd-badge__text
    // 用了 ID 更高的选择器，必须把文字色直接绑在 <text> 元素上才能覆盖。
    containerStyle() {
      const c = this.resolvedColor
      if (!c) return {}
      if (this.variant === 'label' || this.variant === 'status') {
        return { backgroundColor: c.bg }
      }
      // dot / count — 实色背景
      return { backgroundColor: c.solid }
    },
    textStyle() {
      const c = this.resolvedColor
      if (!c) return {}
      if (this.variant === 'label' || this.variant === 'status') {
        return { color: c.fg }
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__text {
    @include pd-type(overline);
  }

  // ── Variants ──
  &--status {
    height: 40rpx;
    padding: 0 $pd-space-1;
    border-radius: $pd-radius-xs;
    background-color: $pd-surface-secondary;

    .pd-badge__text {
      color: $pd-text-secondary;
    }
  }

  &--dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: $pd-radius-circle;
    background-color: $pd-brand-500;
  }

  &--count {
    min-width: 32rpx;
    height: 32rpx;
    padding: 0 $pd-space-half;
    border-radius: $pd-radius-pill;
    background-color: $pd-error;

    .pd-badge__text {
      color: $pd-text-inverse;
      font-size: $pd-overline;
      font-weight: $pd-font-medium;
    }
  }

  &--label {
    height: 40rpx;
    padding: 0 $pd-space-1;
    border-radius: $pd-radius-xs;
    background-color: $pd-brand-100;

    .pd-badge__text {
      color: $pd-brand-500;
    }
  }
}
</style>
