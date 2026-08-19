<template>
  <view class="pd-group-card" @click="$emit('click', $event)">
    <!-- ── Left illustration tile ── -->
    <view class="pd-group-card__tile">
      <view class="pd-group-card__label-wrap">
        <text class="pd-group-card__label">海运 普货</text>
        <view class="pd-group-card__rule" />
      </view>
      <image
        class="pd-group-card__ship"
        src="/static/images/group/card-ship.svg"
        mode="aspectFit"
      />
      <!-- Date badge overlay (grouping + nearby only) -->
      <view v-if="showDateBadge" class="pd-group-card__date">
        <text class="pd-group-card__date-month">{{ dateBadge.month }}</text>
        <text class="pd-group-card__date-day">{{ dateBadge.day }}</text>
      </view>
    </view>

    <!-- ── Right content area ── -->
    <view class="pd-group-card__body">
      <view class="pd-group-card__top">
        <view class="pd-group-card__head">
          <text class="pd-group-card__title">{{ title }}</text>
          <view class="pd-group-card__chip" :class="`pd-group-card__chip--${chipTone}`">
            <text class="pd-group-card__chip-text">{{ statusLabel }}</text>
          </view>
        </view>
        <view class="pd-group-card__meta">
          <text v-if="dateText" class="pd-group-card__meta-date">{{ dateText }}</text>
          <text class="pd-group-card__company">{{ company }}</text>
          <view v-if="distance" class="pd-group-card__distance">
            <text class="pd-group-card__distance-dot">·</text>
            <text class="pd-group-card__distance-text">{{ distance }}</text>
          </view>
        </view>
        <view v-if="tags && tags.length" class="pd-group-card__tags">
          <view
            v-for="t in tags"
            :key="t"
            class="pd-group-card__tag"
          >
            <text class="pd-group-card__tag-text">{{ t }}</text>
          </view>
        </view>
      </view>

      <!-- ── Status-specific footer ── -->
      <view class="pd-group-card__footer">
        <!-- grouping / nearby → progress + weight -->
        <template v-if="status === 'grouping' || status === 'nearby'">
          <view class="pd-group-card__progress">
            <view
              class="pd-group-card__progress-fill"
              :style="{ width: progressPct + '%' }"
            />
          </view>
          <text class="pd-group-card__weight">
            <text class="pd-group-card__weight-current">{{ weight }}kg</text>
            <text class="pd-group-card__weight-max">/{{ maxWeight }}kg</text>
          </text>
        </template>

        <!-- packed → "去打包" CTA -->
        <template v-else-if="status === 'packed'">
          <view
            class="pd-group-card__cta pd-group-card__cta--ghost"
            hover-class="pd-group-card__cta--pressed"
            :hover-stay-time="120"
            @click.stop="onAction"
          >
            <text class="pd-group-card__cta-text">去打包</text>
          </view>
        </template>

        <!-- pending-pay → "立即付款" CTA (primary/filled) -->
        <template v-else-if="status === 'pending-pay'">
          <view
            class="pd-group-card__cta pd-group-card__cta--primary"
            hover-class="pd-group-card__cta--pressed"
            :hover-stay-time="120"
            @click.stop="onAction"
          >
            <text class="pd-group-card__cta-text">立即付款</text>
          </view>
        </template>

        <!-- shipping / delivered → "进入取货群" CTA -->
        <template v-else-if="status === 'shipping' || status === 'delivered'">
          <view
            class="pd-group-card__cta"
            :class="status === 'delivered' ? 'pd-group-card__cta--muted' : 'pd-group-card__cta--ghost'"
            hover-class="pd-group-card__cta--pressed"
            :hover-stay-time="120"
            @click.stop="onAction"
          >
            <text class="pd-group-card__cta-text">进入取货群</text>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
// pd-group-card — the shipping/pooling card used across the buyer flow. Six
// status variants drive the right-side footer:
//
//   grouping   — progress bar + weight (currently pooling)
//   nearby     — same shape as grouping (variant for "near me" discovery)
//   packed     — "去打包" ghost CTA
//   pending-pay — "立即付款" filled CTA
//   shipping   — "进入取货群" ghost CTA
//   delivered  — "进入取货群" muted CTA (terminal state)
//
// The left illustration tile is a branded mark (海运 普货 + ship) with an
// optional date badge overlay; grouping/nearby show the badge by default.

const STATUS_LABELS = {
  grouping: '拼团中',
  nearby: '附近团',
  packed: '已打包',
  'pending-pay': '待支付',
  shipping: '转运中',
  delivered: '已送达'
}

// Maps each status to a chip visual tone. Brand-red for active pooling,
// neutral-dark for post-pool states, success-green for delivered.
const CHIP_TONES = {
  grouping: 'brand',
  nearby: 'brand',
  packed: 'neutral',
  'pending-pay': 'warning',
  shipping: 'info',
  delivered: 'success'
}

export default {
  name: 'pd-group-card',
  // 同 pd-list-item / pd-card：根元素 $emit('click') 必须配 emits 声明，
  // 否则父组件的 @click 会被 fallthrough 再绑一次，一次点击跑两遍。
  // action 也必须列上：emits 一旦非空，Vue 会对未声明的事件发 dev warning
  // （声明前 emitsOptions 为 null 反而不警告），showcase 里有 6 处 @action。
  emits: ['click', 'action'],
  props: {
    status: {
      type: String,
      required: true,
      validator: (v) => !!STATUS_LABELS[v]
    },
    title: { type: String, default: '拼团标题' },
    tags: { type: Array, default: () => ['海运', '普货'] },
    company: { type: String, default: '转运公司名称' },
    distance: { type: String, default: '46km' },
    // Free-form date line shown above/inline with company — used by packed,
    // shipping, delivered states in the Figma spec (e.g. "10月11日").
    dateText: { type: String, default: '' },
    // Date badge overlay on the illustration tile. { month: 'OCT', day: '20' }.
    // Only rendered when provided AND status allows it (grouping/nearby).
    dateBadge: { type: Object, default: null },
    weight: { type: Number, default: 23 },
    maxWeight: { type: Number, default: 50 },
    // Optional progress override. When omitted, computed from weight/maxWeight.
    progress: { type: Number, default: -1 }
  },
  computed: {
    statusLabel() {
      return STATUS_LABELS[this.status] || ''
    },
    chipTone() {
      return CHIP_TONES[this.status] || 'neutral'
    },
    // Only grouping + nearby get the date-badge overlay in the spec. Even if
    // a consumer passes dateBadge for another status, we ignore it to keep the
    // visual contract tight.
    showDateBadge() {
      return (
        (this.status === 'grouping' || this.status === 'nearby') &&
        this.dateBadge &&
        this.dateBadge.month &&
        this.dateBadge.day
      )
    },
    progressPct() {
      if (this.progress >= 0) return Math.min(100, Math.max(0, this.progress))
      if (!this.maxWeight) return 0
      return Math.min(100, Math.max(0, (this.weight / this.maxWeight) * 100))
    }
  },
  methods: {
    onAction() {
      this.$emit('action', this.status)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

// Asymmetric card radii from the Figma spec: the bottom-left corner is a
// larger "sail-cut" that nods to the illustration tile. Kept as a literal
// here because no shared token matches the exact 48rpx value.
$gc-radius-sail: 48rpx;
$gc-tile-width: 260rpx;
$gc-card-height: 296rpx;

.pd-group-card {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: $gc-card-height;
  background: $pd-surface-primary;
  border-radius: $pd-radius-lg $pd-radius-lg $pd-radius-lg $gc-radius-sail;
  box-shadow: $pd-elevation-brand-soft;
  padding-right: $pd-space-1-5;
  overflow: visible;

  // ── Left illustration tile ──
  &__tile {
    position: relative;
    flex-shrink: 0;
    width: $gc-tile-width;
    height: 100%;
    // Wave background — PNG is pre-sized 260×296 to exactly cover the tile.
    background-image: url('/static/images/group/card-wave-bg.png');
    background-size: cover;
    background-position: center;
    background-color: $pd-brand-50;
    border-radius: $pd-radius-lg 0 0 $gc-radius-sail;
    padding: $pd-space-1-5 $pd-space-1-5 0;
    overflow: hidden;
  }

  &__label-wrap {
    position: relative;
    z-index: 1;
  }

  &__label {
    @include pd-type(body-lg);
    font-weight: $pd-font-bold;
    color: $pd-brand-500;
    letter-spacing: 0.5rpx;
    line-height: 44rpx;
    display: block;
  }

  // Short gradient underline beneath the 海运 普货 label. Fades from brand to
  // transparent — matches the Figma rule's fade-out direction.
  &__rule {
    width: 92rpx;
    height: 4rpx;
    margin-top: $pd-space-half;
    border-radius: 2rpx;
    background: linear-gradient(90deg, $pd-brand-500 0%, rgba(203, 29, 69, 0) 100%);
  }

  // Ship illustration pinned to bottom-right of tile. Percentages mirror the
  // Figma insets (left 52.42%, right 7.26%, top 62.84%, bottom 3.38%).
  &__ship {
    position: absolute;
    left: 52.42%;
    right: 7.26%;
    top: 62.84%;
    bottom: 3.38%;
    width: auto;
    height: auto;
  }

  // Date badge overlay — frosted pill, bottom-left corner of the tile.
  // Uses the tile's asymmetric sail-cut as a visual anchor.
  &__date {
    position: absolute;
    left: $pd-space-1-5;
    bottom: $pd-space-1-5;
    width: 80rpx;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4rpx);
    -webkit-backdrop-filter: blur(4rpx);
    border-radius: 8rpx 8rpx 8rpx 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(12, 12, 13, 0.05);
  }

  &__date-month {
    @include pd-type(overline);
    color: $pd-brand-500;
    font-weight: $pd-font-regular;
    line-height: 28rpx;
  }

  &__date-day {
    font-size: 40rpx;
    line-height: 44rpx;
    font-weight: $pd-font-semibold;
    color: $pd-brand-500;
  }

  // ── Right content area ──
  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: $pd-space-1-5 0 $pd-space-1-5 $pd-space-1-5;
  }

  &__top {
    display: flex;
    flex-direction: column;
    gap: $pd-space-1;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $pd-space-1;
  }

  &__title {
    @include pd-type(body-lg);
    font-weight: $pd-font-medium;
    color: $pd-grey-800;
    @include pd-line-clamp(1);
    flex: 1;
    min-width: 0;
  }

  // ── Status chip ──
  &__chip {
    flex-shrink: 0;
    height: 40rpx;
    padding: 0 $pd-space-1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $pd-radius-sm;
  }

  &__chip-text {
    @include pd-type(overline);
    line-height: 1;
  }

  // Chip tones — background + text color per status group.
  &__chip--brand {
    background: rgba(197, 37, 19, 0.05);
    .pd-group-card__chip-text { color: $pd-brand-500; }
  }
  &__chip--neutral {
    background: rgba(61, 61, 61, 0.05);
    .pd-group-card__chip-text { color: $pd-text-tertiary; }
  }
  &__chip--warning {
    background: $pd-warning-bg;
    .pd-group-card__chip-text { color: $pd-warning-text; }
  }
  &__chip--info {
    background: $pd-info-bg;
    .pd-group-card__chip-text { color: $pd-info-text; }
  }
  &__chip--success {
    background: $pd-success-bg;
    .pd-group-card__chip-text { color: $pd-success-text; }
  }

  // ── Meta row (company + distance) ──
  &__meta {
    display: flex;
    align-items: center;
    gap: $pd-space-1;
    flex-wrap: wrap;
  }

  &__meta-date {
    @include pd-type(caption);
    color: $pd-text-tertiary;
  }

  &__company {
    @include pd-type(caption);
    color: $pd-text-tertiary;
    @include pd-line-clamp(1);
    flex-shrink: 1;
    min-width: 0;
  }

  &__distance {
    display: flex;
    align-items: center;
    gap: $pd-space-half;
    flex-shrink: 0;
  }

  &__distance-dot {
    @include pd-type(caption);
    color: $pd-text-tertiary;
  }

  &__distance-text {
    @include pd-type(caption);
    color: $pd-text-tertiary;
  }

  // ── Tag row ──
  &__tags {
    display: flex;
    gap: $pd-space-half;
    flex-wrap: wrap;
  }

  &__tag {
    height: 36rpx;
    padding: 0 $pd-space-1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(61, 61, 61, 0.05);
    border-radius: $pd-radius-xs;
  }

  &__tag-text {
    @include pd-type(overline);
    color: $pd-text-tertiary;
    line-height: 1;
  }

  // ── Footer (status-dependent) ──
  &__footer {
    display: flex;
    align-items: center;
    gap: $pd-space-1-5;
    min-height: 48rpx;
  }

  // Progress variant (grouping/nearby)
  &__progress {
    flex: 1;
    height: 16rpx;
    background: rgba(203, 29, 69, 0.08);
    border-radius: $pd-radius-pill;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $pd-brand-500 0%, $pd-brand-400 100%);
    border-radius: $pd-radius-pill;
    transition: width $pd-duration-normal $pd-ease-standard;
  }

  &__weight {
    flex-shrink: 0;
    @include pd-type(overline);
    text-align: right;
  }

  &__weight-current {
    color: $pd-grey-800;
    font-weight: $pd-font-medium;
  }

  &__weight-max {
    color: $pd-text-tertiary;
  }

  // CTA variants
  &__cta {
    margin-left: auto;
    height: 56rpx;
    padding: 0 $pd-space-2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $pd-radius-pill;
    transition: transform $pd-duration-fast $pd-ease-standard,
      background-color $pd-duration-fast $pd-ease-standard;
  }

  &__cta-text {
    @include pd-type(caption);
    font-weight: $pd-font-medium;
  }

  &__cta--ghost {
    background: $pd-brand-50;
    .pd-group-card__cta-text { color: $pd-brand-500; }
  }

  &__cta--primary {
    background: $pd-brand-500;
    box-shadow: $pd-elevation-brand;
    .pd-group-card__cta-text { color: $pd-text-inverse; }
  }

  &__cta--muted {
    background: $pd-surface-secondary;
    .pd-group-card__cta-text { color: $pd-text-tertiary; }
  }

  &__cta--pressed {
    @include pd-press-scale(0.97);
  }
}
</style>
