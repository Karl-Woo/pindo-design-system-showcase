<template>
  <view class="pd-review-card" :class="`pd-review-card--${variant}`">
    <pd-avatar :src="avatar" size="sm" />

    <view class="pd-review-card__body">
      <view class="pd-review-card__head">
        <text class="pd-review-card__name">{{ nickname }}</text>
        <text class="pd-review-card__time">{{ dayText }}</text>
      </view>

      <text v-if="content" class="pd-review-card__content">{{ content }}</text>

      <view class="pd-review-card__rating">
        <pd-rate :value="Number(groupRating) || 0" :size="14" gap="0" />
        <text class="pd-review-card__rating-label">拼团评价</text>
      </view>
      <view class="pd-review-card__rating">
        <pd-rate :value="Number(transportRating) || 0" :size="14" gap="0" />
        <text class="pd-review-card__rating-label">转运公司</text>
      </view>

      <view v-if="visiblePhotos.length" class="pd-review-card__photos">
        <view
          v-for="(img, k) in visiblePhotos"
          :key="k"
          class="pd-review-card__photo"
          @click="preview(k)"
        >
          <image class="pd-review-card__photo-img" :src="img" mode="aspectFill" />
          <view
            v-if="overflow && k === visiblePhotos.length - 1"
            class="pd-review-card__photo-more"
          >
            <text class="pd-review-card__photo-more-text">+{{ overflow }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// pd-review-card — one user review: avatar, name, date, body, the two ratings
// (拼团评价 / 转运公司), and photos.
//
//   <pd-review-card variant="compact" :nickname="r.user_nickname" … />
//
// Two variants, because the same review renders two ways in the app:
//
//   compact — 拼团详情's horizontal carousel. Fixed 312px grey tile; body
//             clamped to 2 lines; photos capped (see below). Sized so one card
//             plus a peek of the next fits the viewport.
//   full    — 全部评价页's list. Full-bleed, divider-separated, no clamp, all
//             photos wrapped onto as many rows as needed.
//
// The variant drives container chrome + clamp + photo layout together, rather
// than exposing those as three separate props: the two surfaces above are the
// only shapes this card has, and each extra knob is permanent public API.
//
// Everything else is shared — notably the name/date truncation, which both
// pages previously got wrong in the same way (see __name below).
const COMPACT_PHOTO_MAX = 2

export default {
  name: 'pd-review-card',
  props: {
    variant: {
      type: String,
      default: 'compact',
      validator: (v) => ['compact', 'full'].includes(v),
    },
    avatar: { type: String, default: '' },
    nickname: { type: String, default: '' },
    // Raw backend timestamp. The card owns the display format (date only) so
    // every surface shows a review's date the same way.
    time: { type: String, default: '' },
    content: { type: String, default: '' },
    groupRating: { type: [Number, String], default: 0 },
    transportRating: { type: [Number, String], default: 0 },
    images: { type: Array, default: () => [] },
  },
  computed: {
    // Date only — drop any time portion. Handles both "2025-05-18 14:30:00"
    // and ISO "2025-05-18T14:30:00".
    dayText() {
      return (this.time == null ? '' : String(this.time)).split(/[ T]/)[0]
    },
    // compact caps the row; full wraps and shows everything.
    visiblePhotos() {
      const imgs = this.images || []
      return this.variant === 'compact' ? imgs.slice(0, COMPACT_PHOTO_MAX) : imgs
    },
    overflow() {
      if (this.variant !== 'compact') return 0
      return Math.max(0, (this.images || []).length - COMPACT_PHOTO_MAX)
    },
  },
  methods: {
    // Always previews the FULL list, never just the visible thumbs — that is
    // what keeps the compact "+N" cap from actually hiding anything.
    preview(index) {
      uni.previewImage({ urls: this.images, current: index })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-review-card {
  display: flex;
  gap: $pd-space-1-5; // 12px avatar → body (Figma review gap)
  box-sizing: border-box;

  // ── compact: 拼团详情 carousel tile ──
  &--compact {
    width: 624rpx; // 312px (Figma review width) → 1 card + a peek of the next
    background: $pd-grey-50;
    border-radius: $pd-radius-xl;
    padding: $pd-space-2;
    // The carousel's scroll-view sets `white-space: nowrap` to lay cards out in
    // a row; undo it so this card's own text wraps normally.
    white-space: normal;
    overflow: hidden;
  }

  // ── full: 全部评价页 list row ──
  &--full {
    padding: $pd-space-2 0; // 16px top/bottom; the page owns side padding
    border-bottom: 1rpx solid $pd-border-divider;

    &:last-child {
      border-bottom: none;
    }
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__head {
    @include pd-flex-between;
    gap: $pd-space-1; // 8px floor between a truncated name and the date
    margin-bottom: $pd-space-1; // 8px body rhythm (Figma body gap)
  }

  // Name truncates, date never does — same shape as pd-group-card's title/chip
  // row. `min-width: 0` is load-bearing: a flex item defaults to min-width:auto
  // and would refuse to shrink, so the clamp would never fire and a long
  // nickname would wrap to 3 lines and squeeze the date into two. Both pages
  // shipped that bug before this component existed; keeping the rule in one
  // place is most of why it exists.
  &__name {
    @include pd-type(body-sm);
    color: $pd-text-primary;
    font-weight: $pd-font-semibold; // PingFang Semibold per Figma
    @include pd-line-clamp(1);
    flex: 1;
    min-width: 0;
  }
  &__time {
    @include pd-type(body-sm);
    color: $pd-text-tertiary; // #616161 — readable content needs AA (placeholder #8b8b8b was 3.13:1 on grey-50)
    flex-shrink: 0;
  }

  &__content {
    @include pd-type(body-sm);
    color: $pd-text-secondary;
    display: block;
    margin-bottom: $pd-space-1; // 8px body rhythm
  }
  // Only the carousel clamps — the full list is where you go to read it all.
  &--compact &__content {
    @include pd-line-clamp(2);
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 12rpx; // 6px stars → label (Figma rate gap; no 6px token — sits between space-half/space-1)
    margin-bottom: $pd-space-half; // 4px between the two rate rows
  }
  &__rating-label {
    @include pd-type(caption);
    color: $pd-text-tertiary;
  }

  &__photos {
    display: flex;
    gap: $pd-space-1; // 8px between photos
    margin-top: $pd-space-1; // 8px from the rating rows to the images (Figma)
  }
  // full has no width budget to respect, so every photo shows.
  &--full &__photos {
    flex-wrap: wrap;
  }

  // Wraps each thumb so the "+N" scrim can absolutely position against it.
  // Radius lives here (not on the img) so the scrim clips to the same shape.
  &__photo {
    position: relative;
    width: 176rpx;
    height: 176rpx;
    flex-shrink: 0;
    border-radius: $pd-radius-sm; // 4px (Figma photo radius)
    overflow: hidden;
  }
  &__photo-img {
    width: 100%;
    height: 100%;
    display: block;
  }

  // "+N" overlay on the last visible thumb (compact only).
  &__photo-more {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // scrim-heavy, not scrim: the backdrop is a user photo and may be near-white
    // (a mailer bag), where 0.40 drops the white "+N" to 2.85:1 and fails AA.
    background: rgba(0, 0, 0, $pd-opacity-scrim-heavy);
    // Explicit z-index is REQUIRED, not cosmetic: on App-Plus an <image> paints
    // over an absolutely-positioned sibling that has no z-index, which would
    // make this scrim silently invisible on device while looking fine on H5.
    // Same trap that once hid the map pin (§6.5).
    z-index: 1;
  }
  &__photo-more-text {
    @include pd-type(body-sm);
    color: $pd-text-inverse;
    font-weight: $pd-font-semibold;
  }
}
</style>
