<template>
  <view class="shell" :class="{ 'shell--drawer-open': drawerOpen }">
    <!-- ── Mobile top bar (visible <960px only) ── -->
    <view class="shell__mbar">
      <view
        class="shell__ham"
        hover-class="shell__ham--pressed"
        :hover-stay-time="80"
        @click="openDrawer"
      >
        <pd-icon name="menu" size="lg" color="primary" />
      </view>
      <view class="shell__mbar-center">
        <text class="shell__mbar-section">{{ currentSection }}</text>
        <text class="shell__mbar-title">{{ currentTitle }}</text>
      </view>
      <view class="shell__mbar-right">
        <image class="shell__mark" src="/static/images/logo.svg" mode="aspectFit" />
      </view>
    </view>

    <!-- Mobile drawer scrim -->
    <view
      v-if="drawerOpen"
      class="shell__scrim"
      @click="closeDrawer"
    />

    <!-- ── Sidebar (persistent desktop / drawer mobile) ── -->
    <view class="shell__sidebar">
      <view class="shell__brand" @click="goHome">
        <image class="shell__mark" src="/static/images/logo.svg" mode="aspectFit" />
        <view class="shell__wordmark-stack">
          <text class="shell__wordmark">Pindo Coral</text>
          <text class="shell__wordmark-sub">Design System</text>
        </view>
      </view>

      <view class="shell__search">
        <view
          class="search-box"
          :class="{ 'search-box--active': searchFocused || hasQuery }"
        >
          <pd-icon name="magnify" size="sm" color="tertiary" />
          <input
            class="search-box__input"
            type="text"
            placeholder="快速查找"
            placeholder-style="color: #8B8B8B; font-size: 28rpx;"
            :value="query"
            @input="onSearchInput"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
          <!-- Trailing slot: clear button when typing, ⌘K hint otherwise.
               Visibility is toggled imperatively in a watcher (see script).
               uni-app H5 hoisted our :class / v-if / :style bindings on this
               branch as static, so they never re-rendered despite query
               changing. A DOM-level watcher sidesteps the compiler hoisting. -->
          <view
            ref="clearEl"
            class="search-box__clear"
            hover-class="search-box__clear--pressed"
            :hover-stay-time="80"
            @click="clearSearch"
          >
            <pd-icon name="close" size="sm" color="placeholder" />
          </view>
          <view ref="kbdEl" class="search-box__kbd">
            <text class="search-box__kbd-text">⌘K</text>
          </view>
        </view>
      </view>

      <view class="shell__nav">
        <view v-if="!filteredNav.length" class="shell__empty">
          <pd-icon name="magnify" size="lg" color="disabled" />
          <text class="shell__empty-title">无匹配结果</text>
          <text class="shell__empty-desc">请尝试其他关键词，例如「按钮」「颜色」「表单」。</text>
        </view>
        <!-- Key includes query so changing the filter rebuilds the tree. This
             avoids a Vue/uni-app H5 issue where nested v-for blocks re-use DOM
             nodes by key even when the parent array's `items` sub-array has
             been swapped, leaving stale children on screen. -->
        <view
          v-for="section in filteredNav"
          :key="section.label + '|' + query"
          class="nav-section"
        >
          <text class="nav-section__label">{{ section.label }}</text>
          <view
            v-for="item in section.items"
            :key="item.path"
            class="nav-item"
            :class="{ 'nav-item--active': item.path === activePath }"
            hover-class="nav-item--pressed"
            :hover-stay-time="80"
            @click="onNavClick(item.path)"
          >
            <text class="nav-item__text">{{ item.name }}</text>
            <pd-badge
              v-if="item.flag"
              variant="label"
              :color="item.flag === 'beta' ? 'warning' : 'brand'"
              :text="item.flag === 'new' ? '新' : '测试'"
            />
          </view>
        </view>

        <view class="shell__sfoot">
          <view class="shell__sfoot-links">
            <view
              class="shell__sfoot-link"
              hover-class="shell__sfoot-link--pressed"
              :hover-stay-time="80"
              @click="openExternal(LINK_CHANGELOG)"
            >
              <text class="shell__sfoot-link-text">更新日志</text>
            </view>
            <view
              class="shell__sfoot-link"
              hover-class="shell__sfoot-link--pressed"
              :hover-stay-time="80"
              @click="openExternal(LINK_GITHUB)"
            >
              <text class="shell__sfoot-link-text">GitHub</text>
            </view>
          </view>
          <text class="shell__sfoot-line">Pindo Coral 设计系统</text>
          <text class="shell__sfoot-line shell__sfoot-line--dim">uni-app · uv-ui · SCSS</text>
        </view>
      </view>
    </view>

    <!-- ── Main content ── -->
    <view class="shell__main">
      <view class="shell__topbar">
        <view class="bc">
          <text class="bc__item">{{ currentSection }}</text>
          <text class="bc__sep">/</text>
          <text class="bc__item bc__item--current">{{ currentTitle }}</text>
          <pd-badge v-if="currentFlag === 'new'" variant="label" color="brand" text="新" />
          <pd-badge v-else-if="currentFlag === 'beta'" variant="label" color="warning" text="测试" />
        </view>
        <view class="shell__topbar-right">
          <view
            class="shell__topbar-link"
            hover-class="shell__topbar-link--pressed"
            :hover-stay-time="80"
            @click="openExternal(LINK_CHANGELOG)"
          >
            <text class="shell__topbar-link-text">更新日志</text>
          </view>
          <view
            class="shell__topbar-link"
            hover-class="shell__topbar-link--pressed"
            :hover-stay-time="80"
            @click="openExternal(LINK_GITHUB)"
          >
            <text class="shell__topbar-link-text">GitHub</text>
          </view>
        </view>
      </view>

      <view class="shell__content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
import { DOC_NAV, resolveNav } from '@/utils/doc-nav.js'

// 外部链接 — 指向 machacha 分支（开发主分支，main 仅用于稳定发布）。
// 详见 doc/DESIGN_SYSTEM.md §18 Changelog。
const LINK_GITHUB = 'https://github.com/qiuyichen00/pindo/tree/machacha'
const LINK_CHANGELOG = 'https://github.com/qiuyichen00/pindo/blob/machacha/doc/DESIGN_SYSTEM.md#18-changelog'

export default {
  name: 'pd-doc-shell',
  props: {
    // Path slug of the current page (matches DOC_NAV items).
    activePath: { type: String, default: 'index' },
    // Override breadcrumb pieces. When omitted we resolve from activePath.
    section: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  data() {
    return {
      nav: DOC_NAV,
      drawerOpen: false,
      query: '',
      searchFocused: false,
      LINK_GITHUB,
      LINK_CHANGELOG
    }
  },
  computed: {
    // Explicit boolean mirror of `query` for v-if clauses. uni-app H5's template
    // compiler occasionally drops v-else branches when the sibling v-if is a
    // plain truthy expression on a string; computing to a Boolean sidesteps that.
    hasQuery() {
      return !!this.query
    },
    resolved() {
      return resolveNav(this.activePath)
    },
    currentSection() {
      return this.section || this.resolved.section
    },
    currentTitle() {
      return this.title || this.resolved.name
    },
    currentFlag() {
      return this.resolved.flag
    },
    // Live-filter the nav by the user's query. Matches on page name OR slug.
    // Sections with zero matches are dropped so the list stays compact.
    filteredNav() {
      const q = this.query.trim().toLowerCase()
      if (!q) return this.nav
      return this.nav
        .map((s) => ({
          ...s,
          items: s.items.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.path.toLowerCase().includes(q)
          )
        }))
        .filter((s) => s.items.length > 0)
    }
  },
  watch: {
    hasQuery: {
      handler(val) {
        // Fallback visibility toggle — see template comment on the trailing slot.
        this.$nextTick(() => {
          const clear = this.$refs.clearEl
          const kbd = this.$refs.kbdEl
          const clearEl = clear && (clear.$el || clear)
          const kbdEl = kbd && (kbd.$el || kbd)
          if (clearEl && clearEl.style) clearEl.style.display = val ? 'flex' : 'none'
          if (kbdEl && kbdEl.style) kbdEl.style.display = val ? 'none' : 'flex'
        })
      },
      immediate: true
    },
    query(val) {
      // uni-app H5 also skipped :value on the native <input> for this branch,
      // so the input stays stuck on whatever the user typed after clearSearch
      // runs. Sync the underlying native <input>.value imperatively.
      this.$nextTick(() => {
        const host = document.querySelector('uni-input.search-box__input')
        const native = host && host.querySelector('input')
        if (native && native.value !== val) native.value = val
      })
    }
  },
  methods: {
    openDrawer() {
      this.drawerOpen = true
    },
    closeDrawer() {
      this.drawerOpen = false
    },
    onSearchInput(e) {
      // uni-app <input> emits a detail.value on H5/native; the plain DOM event
      // fallback (target.value) covers the edge where the event is a native one.
      this.query =
        (e && e.detail && e.detail.value) !== undefined
          ? e.detail.value
          : (e && e.target && e.target.value) || ''
    },
    clearSearch() {
      this.query = ''
    },
    goHome() {
      this.closeDrawer()
      this.clearSearch()
      if (this.activePath === 'index') return
      uni.reLaunch({ url: '/pages/showcase/index' })
    },
    onNavClick(path) {
      this.closeDrawer()
      this.clearSearch()
      if (path === this.activePath) return
      if (path === 'index') {
        uni.reLaunch({ url: '/pages/showcase/index' })
      } else {
        uni.navigateTo({ url: `/pages/showcase/${path}` })
      }
    },
    // 跨平台打开外部链接：H5 用 window.open，app-plus 用 plus.runtime.openURL。
    openExternal(url) {
      if (!url) return
      // #ifdef H5
      if (typeof window !== 'undefined' && window.open) {
        window.open(url, '_blank', 'noopener,noreferrer')
        return
      }
      // #endif
      // #ifdef APP-PLUS
      if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.openURL) {
        plus.runtime.openURL(url)
        return
      }
      // #endif
      uni.setClipboardData({ data: url })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

$sidebar-w: 560rpx;
// Breakpoint from Base docs UX: below this we drawer-ize the sidebar.
$bp-desktop: 960px;

.shell {
  min-height: 100vh;
  background: $pd-surface-primary;
  position: relative;
}

// ── Mark (shared atom) ── Pindo logo, used in sidebar brand row + mobile mbar.
.shell__mark {
  width: 56rpx;
  height: 56rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
  // image needs explicit dims; mode="aspectFit" inside the SFC keeps logo square.
}

// ── Brand row ──
.shell__brand {
  display: flex;
  align-items: center;
  gap: $pd-space-1-5;
  padding: $pd-space-3 $pd-space-2 $pd-space-2;
  border-bottom: 1rpx solid $pd-border-light;
  cursor: pointer;
}

.shell__wordmark-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}

.shell__wordmark {
  // 品牌名 — 用设计系统自己的 display-brand label 字体（数黑体 700 / 32rpx）。
  // 详见 doc/DESIGN_SYSTEM.md §2.5。
  @include pd-display-brand-label;
  color: $pd-text-primary;
  line-height: 1.2;
}

.shell__wordmark-sub {
  @include pd-type(body-sm);
  color: $pd-text-tertiary;
  letter-spacing: 0.2px;
  line-height: 1.2;
}

// ── Mobile top bar — only visible below breakpoint ──
.shell__mbar {
  display: none;
  align-items: center;
  justify-content: space-between;
  height: 96rpx;
  padding: 0 $pd-space-2;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12rpx);
  -webkit-backdrop-filter: blur(12rpx);
  border-bottom: 1rpx solid $pd-border-light;
  position: sticky;
  top: 0;
  z-index: 30;
}

.shell__ham {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $pd-radius-sm;
  transition: background-color $pd-duration-instant;

  &--pressed { background: $pd-surface-secondary; }
}

.shell__mbar-center {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rpx;
}

.shell__mbar-section {
  @include pd-type(body-sm);
  color: $pd-text-placeholder;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.shell__mbar-title {
  @include pd-type(body-sm);
  color: $pd-text-primary;
  font-weight: $pd-font-semibold;
  @include pd-line-clamp(1);
}

.shell__mbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

// ── Scrim (mobile drawer) ──
.shell__scrim {
  display: none;
  position: fixed;
  inset: 0;
  background: $pd-scrim-standard;
  z-index: 40;
  // Use the design-system fade-in keyframe instead of a local one.
  animation: pd-fade-in $pd-duration-fast $pd-ease-standard;
}

// ── Sidebar ──
.shell__sidebar {
  width: $sidebar-w;
  min-height: 100vh;
  max-height: 100vh;
  background: $pd-surface-primary;
  border-right: 1rpx solid $pd-border-light;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  overflow-y: auto;
  z-index: 20;
  // On desktop the flex parent places main to the right. We set this up with
  // a wrapper? No — we use `position: sticky` and put main next to it via flex
  // on `.shell`. That requires display: flex on .shell on desktop (see below).
}

.shell__search {
  padding: $pd-space-2 $pd-space-2 $pd-space-1-5;
}

.shell__nav {
  flex: 1;
  padding: $pd-space-1 $pd-space-1-5 $pd-space-3;
  overflow-y: auto;
}

.shell__sfoot {
  padding: $pd-space-3 $pd-space-half $pd-space-2;
  margin-top: $pd-space-3;
  border-top: 1rpx solid $pd-border-light;
}

.shell__sfoot-line {
  @include pd-type(body-sm);
  color: $pd-text-tertiary;
  display: block;

  &--dim {
    color: $pd-text-placeholder;
    margin-top: 4rpx;
  }
}

// External links in the sidebar foot — primary access on mobile (drawer),
// always-visible on desktop (also mirrored in topbar). 见 §16.4。
.shell__sfoot-links {
  display: flex;
  gap: $pd-space-1;
  margin-bottom: $pd-space-1-5;
}

.shell__sfoot-link {
  padding: $pd-space-half $pd-space-1;
  border-radius: $pd-radius-xs;
  background: $pd-surface-secondary;
  cursor: pointer;
  transition: background-color $pd-duration-instant;

  &--pressed { background: $pd-surface-hover; }

  @media (hover: hover) {
    &:hover .shell__sfoot-link-text { color: $pd-brand-500; }
  }
}

.shell__sfoot-link-text {
  @include pd-type(body-sm);
  color: $pd-text-secondary;
  font-weight: $pd-font-medium;
  transition: color $pd-duration-instant;
}

// ── Search box ──
.search-box {
  display: flex;
  align-items: center;
  gap: $pd-space-1;
  height: 64rpx;
  padding: 0 $pd-space-1;
  background: $pd-surface-secondary;
  border-radius: $pd-radius-sm;
  border: 1rpx solid transparent;
  transition: border-color $pd-duration-fast $pd-ease-standard,
    background-color $pd-duration-fast $pd-ease-standard;

  &--active {
    background: $pd-surface-primary;
    border-color: $pd-border-input;
  }

  &__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: $pd-body-sm;
    color: $pd-text-primary;
    padding: 0;
  }

  &__kbd {
    padding: 2rpx $pd-space-half;
    background: $pd-surface-primary;
    border: 1rpx solid $pd-border-light;
    border-radius: $pd-radius-xs;
    flex-shrink: 0;
  }

  &__kbd-text {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    font-family: 'SF Mono', Consolas, monospace;
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

  &__trail--hidden {
    display: none;
  }
}

// ── Empty state (no search matches) ──
.shell__empty {
  padding: $pd-space-4 $pd-space-2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $pd-space-1;

  &-title {
    @include pd-type(body);
    font-weight: $pd-font-semibold;
    color: $pd-text-primary;
    margin-top: $pd-space-1;
  }

  &-desc {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    line-height: $pd-body-sm-lh;
  }
}

// ── Nav sections + items ──
.nav-section {
  margin-bottom: $pd-space-2;

  &__label {
    @include pd-type(overline);
    color: $pd-text-placeholder;
    letter-spacing: 1.2px;
    padding: 0 $pd-space-1;
    margin-bottom: $pd-space-half;
    display: block;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  height: 56rpx;
  padding: 0 $pd-space-1;
  border-radius: $pd-radius-xs;
  cursor: pointer;
  transition: background-color $pd-duration-instant,
    color $pd-duration-instant;

  &--pressed { background: $pd-surface-hover; }

  &--active {
    background: $pd-brand-50;

    .nav-item__text {
      color: $pd-brand-500;
      font-weight: $pd-font-medium;
    }
  }

  // Hover — desktop pointer only, skip non-active items.
  // Touch / mobile drawer keeps using the --pressed class via uni-app's
  // hover-class attribute and sees no hover wash.
  @media (hover: hover) {
    &:hover:not(.nav-item--active) {
      background: $pd-surface-secondary;

      .nav-item__text { color: $pd-text-primary; }
    }
  }

  &__text {
    flex: 1;
    @include pd-type(body-sm);
    color: $pd-text-secondary;
    transition: color $pd-duration-instant;
  }
}

// ── Main column ──
.shell__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

// ── Topbar (desktop only) ──
.shell__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 $pd-space-4;
  border-bottom: 1rpx solid $pd-border-light;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8rpx);
  -webkit-backdrop-filter: blur(8rpx);
  z-index: 10;
}

.shell__topbar-right {
  display: flex;
  align-items: center;
  gap: $pd-space-3;
}

.shell__topbar-link {
  padding: $pd-space-half $pd-space-1;
  border-radius: $pd-radius-xs;
  cursor: pointer;
  transition: background-color $pd-duration-instant;

  &--pressed { background: $pd-surface-secondary; }

  @media (hover: hover) {
    &:hover .shell__topbar-link-text { color: $pd-brand-500; }
  }
}

.shell__topbar-link-text {
  @include pd-type(body-sm);
  color: $pd-text-tertiary;
  font-weight: $pd-font-medium;
  transition: color $pd-duration-instant;
}

.bc {
  display: flex;
  align-items: center;
  gap: $pd-space-1;

  &__item {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;

    &--current {
      color: $pd-text-primary;
      font-weight: $pd-font-medium;
    }
  }

  &__sep {
    @include pd-type(body-sm);
    color: $pd-text-placeholder;
  }
}

.shell__content {
  flex: 1;
}

// ============================================================================
// Responsive layout
// Desktop (>= 960px): flex row — sidebar left, main right. Mobile bar hidden.
// Mobile  (<  960px): single column — mobile bar on top, main fills.
//                     Sidebar becomes an absolutely-positioned drawer that
//                     slides in from the left when ham is tapped.
// ============================================================================

@media (min-width: #{$bp-desktop}) {
  .shell {
    display: flex;
    align-items: stretch;
  }

  .shell__mbar { display: none; }
  .shell__scrim { display: none; }
}

@media (max-width: #{$bp-desktop - 1px}) {
  .shell__mbar { display: flex; }

  .shell__sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    min-height: 100vh;
    max-height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform $pd-duration-normal $pd-ease-standard;
    box-shadow: $pd-elevation-3;
    width: 88%;
    max-width: 560rpx;
  }

  .shell--drawer-open .shell__sidebar {
    transform: translateX(0);
  }

  .shell--drawer-open .shell__scrim {
    display: block;
  }

  .shell__topbar { display: none; }
}
</style>
