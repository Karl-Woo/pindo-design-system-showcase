<template>
  <pd-doc-shell active-path="icons">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">图标</text>
          <pd-badge variant="label" color="info" :text="`${totalCount} 个图标`" />
        </view>
        <text class="pg-header__desc">为 Pindo 精选的 Material Design 图标，通过 &lt;pd-icon&gt; 组件以内联 SVG 蒙版形式渲染，原生支持尺寸与颜色 token。</text>
      </view>

      <!-- Sizes -->
      <text class="h3">尺寸</text>
      <view class="token-card">
        <view v-for="s in sizes" :key="s.key" class="size-row">
          <view class="size-target" :style="{ width: s.touch, height: s.touch }">
            <pd-icon name="star" :size="s.key" color="brand" />
          </view>
          <view class="size-info">
            <text class="size-token mono">size="{{ s.key }}"</text>
            <text class="size-val">{{ s.token }} — {{ s.rpx }} ({{ s.px }}px)</text>
          </view>
          <text class="size-usage">{{ s.usage }}</text>
        </view>
      </view>

      <!-- Color tokens -->
      <text class="h3">颜色 token</text>
      <text class="desc">优先传入语义颜色名，而不是 hex 值。一次性场景下仍可传入 #rrggbb 字符串。</text>
      <view class="color-grid">
        <view v-for="c in colors" :key="c.key" class="color-cell">
          <view class="color-swatch"><pd-icon name="heart" size="md" :color="c.key" /></view>
          <text class="color-key mono">{{ c.key }}</text>
          <text class="color-hex">{{ c.hex }}</text>
        </view>
      </view>

      <!-- Catalog search + grid -->
      <text class="h3">图标库</text>
      <text class="desc">按名称搜索，无匹配的分类会自动隐藏。</text>

      <view class="search" :class="{ 'search--active': searchFocused || query }">
        <pd-icon name="magnify" size="sm" color="tertiary" />
        <input
          ref="searchInput"
          class="search__input"
          type="text"
          placeholder="搜索图标（例如 truck、map、account）"
          placeholder-style="color: #8B8B8B; font-size: 26rpx;"
          :value="query"
          @input="onSearchInput"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
        />
        <view
          ref="clearEl"
          class="search__clear"
          hover-class="search__clear--pressed"
          :hover-stay-time="80"
          @click="clearSearch"
        >
          <pd-icon name="close" size="sm" color="placeholder" />
        </view>
      </view>

      <view v-if="query && !filteredFlat.length" class="empty">
        <pd-icon name="magnify" size="lg" color="disabled" />
        <text class="empty__title">未找到匹配 "{{ query }}" 的图标</text>
        <text class="empty__desc">试试更宽泛的关键词，或在 materialdesignicons.com 查阅完整 MDI 图标库。</text>
      </view>

      <!-- Keyed wrapper — when the query changes, the wrapper gets a new
           :key, Vue unmounts the whole subtree, then mounts fresh. This
           sidesteps uni-app H5's template hoisting on v-if, which otherwise
           keeps the initial branch rendered even after the condition flips. -->
      <view :key="'catalog-' + (query || 'all')">
        <!-- No query → categorised grid -->
        <view v-if="!query">
          <view
            v-for="cat in categories"
            :key="cat.label"
            class="category"
          >
            <view class="category__head">
              <text class="category__label">{{ cat.label }}</text>
              <text class="category__count">{{ cat.items.length }}</text>
            </view>
            <view class="icon-grid">
              <view
                v-for="name in cat.items"
                :key="name"
                class="icon-cell"
                hover-class="icon-cell--pressed"
                :hover-stay-time="80"
                @click="onIconTap(name)"
              >
                <view class="icon-cell__tile"><pd-icon :name="name" size="md" color="secondary" /></view>
                <text class="icon-cell__label mono">{{ name }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- With query → flat filtered grid -->
        <view v-if="query && filteredFlat.length" class="icon-grid icon-grid--flat">
          <view
            v-for="row in filteredFlat"
            :key="row.name"
            class="icon-cell"
            hover-class="icon-cell--pressed"
            :hover-stay-time="80"
            @click="onIconTap(row.name)"
          >
            <view class="icon-cell__tile"><pd-icon :name="row.name" size="md" color="secondary" /></view>
            <text class="icon-cell__label mono">{{ row.name }}</text>
            <text class="icon-cell__cat">{{ row.cat }}</text>
          </view>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// 推荐：使用 token</text></text>
        <text class="code-line">&lt;pd-icon name="truck-delivery" size="md" color="brand" /&gt;</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 也支持原始数值</text></text>
        <text class="code-line">&lt;pd-icon name="map-marker" :size="24" color="#007AFF" /&gt;</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 图标名采用 MDI kebab-case 命名 — 详见 materialdesignicons.com</text></text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">密集列表中优先使用线性图标；主要操作处使用面性图标。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">可点击图标须包裹在 88rpx（44pt）的点击区域内 —— 直接使用 `size="lg"` 或补充 padding。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">已有语义 token 时不要使用原始 hex 颜色。用 `color="brand"` 替代 `color="#CB1D45"`。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要在未与设计同步的情况下引入图标库以外的图标 —— 一致性优先于覆盖度。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
import { MDI_CATEGORIES, MDI_NAMES } from '@/utils/mdi-icons.js'

export default {
  data() {
    return {
      query: '',
      searchFocused: false,
      sizes: [
        { key: 'sm', token: '$pd-icon-sm', rpx: '32rpx', px: '16', touch: '64rpx', usage: '行内指示' },
        { key: 'md', token: '$pd-icon-md', rpx: '40rpx', px: '20', touch: '80rpx', usage: '标准默认' },
        { key: 'lg', token: '$pd-icon-lg', rpx: '48rpx', px: '24', touch: '88rpx', usage: '导航栏、突出展示' }
      ],
      colors: [
        { key: 'primary', hex: '#1A1A1A' },
        { key: 'secondary', hex: '#3D3D3D' },
        { key: 'tertiary', hex: '#616161' },
        { key: 'placeholder', hex: '#8B8B8B' },
        { key: 'disabled', hex: '#ABABAB' },
        { key: 'brand', hex: '#CB1D45' },
        { key: 'success', hex: '#34C759' },
        { key: 'warning', hex: '#FF9500' },
        { key: 'error', hex: '#FF3B30' },
        { key: 'info', hex: '#007AFF' }
      ],
      categories: MDI_CATEGORIES,
      // Flat [{ name, cat }, ...] list populated by the search watcher.
      // Using a single-level array sidesteps the uni-app H5 nested-v-for
      // render bug; a shallow list diffs cleanly.
      filteredFlat: [],
      totalCount: MDI_NAMES.length
    }
  },
  watch: {
    // Recompute + assign filteredCategories from the watcher instead of a
    // computed. Same uni-app H5 workaround pattern as pd-doc-shell.
    query(val) {
      const q = (val || '').trim().toLowerCase()
      if (!q) {
        this.filteredFlat = []
      } else {
        const hits = []
        for (const c of this.categories) {
          for (const name of c.items) {
            if (name.includes(q)) hits.push({ name, cat: c.label })
          }
        }
        this.filteredFlat = hits
      }
      this.$nextTick(() => {
        const host = this.$refs.searchInput
          && (this.$refs.searchInput.$el || this.$refs.searchInput)
        const native = host && host.tagName === 'INPUT'
          ? host
          : host && host.querySelector && host.querySelector('input')
        if (native && native.value !== val) native.value = val
        const clearRef = this.$refs.clearEl
        const clearEl = clearRef && (clearRef.$el || clearRef)
        if (clearEl && clearEl.style) clearEl.style.display = val ? 'flex' : 'none'
      })
    }
  },
  mounted() {
    // Initial state: clear button hidden because query starts empty.
    this.$nextTick(() => {
      const clearRef = this.$refs.clearEl
      const clearEl = clearRef && (clearRef.$el || clearRef)
      if (clearEl && clearEl.style) clearEl.style.display = 'none'
    })
  },
  methods: {
    onSearchInput(e) {
      this.query =
        (e && e.detail && e.detail.value) !== undefined
          ? e.detail.value
          : (e && e.target && e.target.value) || ''
    },
    clearSearch() {
      this.query = ''
    },
    onIconTap(name) {
      // Copy the name to clipboard for easy pasting into code. Uni-app
      // provides setClipboardData with a toast; fall back to navigator.clipboard.
      const text = name
      if (uni && uni.setClipboardData) {
        uni.setClipboardData({
          data: text,
          showToast: false,
          success: () => uni.showToast({ title: `已复制：${text}`, icon: 'none' })
        })
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

// Sizes
.size-row {
  display: flex;
  align-items: center;
  padding: $pd-space-1-5 $pd-space-2;
  border-bottom: 1rpx solid $pd-border-light;
  &:last-child { border-bottom: none; }
}
.size-target {
  @include pd-flex-center;
  background: $pd-brand-50;
  border-radius: $pd-radius-sm;
  flex-shrink: 0;
  margin-right: $pd-space-1-5;
  border: 1rpx dashed rgba(203, 29, 69, 0.2);
}
.size-info { flex: 1; }
.size-token { @include pd-type(body-sm); color: $pd-text-primary; display: block; }
.size-val { @include pd-type(body-sm); color: $pd-text-placeholder; display: block; margin-top: 2rpx; }
.size-usage { @include pd-type(body-sm); color: $pd-text-tertiary; flex-shrink: 0; }

// Color swatches
.color-grid { display: flex; flex-wrap: wrap; gap: $pd-space-1; margin-bottom: $pd-space-2; }
.color-cell {
  width: calc(20% - 13rpx);
  background: $pd-surface-primary;
  border-radius: $pd-radius-md;
  padding: $pd-space-1 $pd-space-half;
  @include pd-flex-col;
  align-items: center;
  gap: 2rpx;
  box-shadow: $pd-elevation-1;
}
.color-swatch {
  width: 64rpx;
  height: 64rpx;
  @include pd-flex-center;
  background: $pd-surface-secondary;
  border-radius: $pd-radius-circle;
  margin-bottom: 4rpx;
}
.color-key { @include pd-type(body-sm); color: $pd-text-primary; text-align: center; @include pd-line-clamp(1); }
.color-hex { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; text-align: center; }

// Search
.search {
  display: flex;
  align-items: center;
  gap: $pd-space-1;
  height: 80rpx;
  padding: 0 $pd-space-1-5;
  background: $pd-surface-primary;
  border: 2rpx solid $pd-border-light;
  border-radius: $pd-radius-md;
  margin-bottom: $pd-space-2;
  transition: border-color $pd-duration-fast $pd-ease-standard;

  &--active { border-color: $pd-border-input; }

  &__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: $pd-body-sm;
    color: $pd-text-primary;
  }

  &__clear {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $pd-radius-circle;
    transition: background-color $pd-duration-instant;
    flex-shrink: 0;

    &--pressed { background: $pd-surface-secondary; }
  }
}

// Category header
.category { margin-bottom: $pd-space-3; }
.category__head {
  display: flex;
  align-items: baseline;
  gap: $pd-space-1;
  margin-bottom: $pd-space-1;
}
.category__label {
  @include pd-type(overline);
  color: $pd-text-tertiary;
  letter-spacing: 1.2px;
}
.category__count {
  @include pd-type(body-sm);
  color: $pd-text-placeholder;
}

// Icon grid
.icon-grid { display: flex; flex-wrap: wrap; gap: $pd-space-1; }
.icon-cell {
  width: calc(25% - 12rpx);
  background: $pd-surface-primary;
  border-radius: $pd-radius-md;
  padding: $pd-space-1-5 $pd-space-half;
  @include pd-flex-col;
  align-items: center;
  gap: 4rpx;
  box-shadow: $pd-elevation-1;
  transition: transform $pd-duration-fast $pd-ease-standard,
    box-shadow $pd-duration-fast $pd-ease-standard;

  &--pressed {
    transform: scale(0.97);
    box-shadow: $pd-elevation-2;
  }

  &__tile {
    width: 72rpx;
    height: 72rpx;
    @include pd-flex-center;
    background: $pd-surface-secondary;
    border-radius: $pd-radius-circle;
  }

  &__label {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    text-align: center;
    @include pd-line-clamp(1);
    max-width: 100%;
  }

  &__cat {
    @include pd-type(body-sm);
    color: $pd-text-placeholder;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    font-size: 18rpx;
    margin-top: 2rpx;
    @include pd-line-clamp(1);
    max-width: 100%;
  }
}

// Empty
.empty {
  padding: $pd-space-4 $pd-space-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $pd-space-1;
  background: $pd-surface-secondary;
  border-radius: $pd-radius-md;

  &__title {
    @include pd-type(body-lg);
    font-weight: $pd-font-semibold;
    color: $pd-text-primary;
    margin-top: $pd-space-1;
  }

  &__desc {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    line-height: $pd-body-sm-lh;
  }
}

</style>
