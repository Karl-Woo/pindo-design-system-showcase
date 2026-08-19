<template>
  <pd-doc-shell active-path="index" section="入门" title="欢迎">
    <view class="page">
      <view class="hero">
        <view class="hero__brand">
          <image class="hero__logo" src="/static/images/logo.svg" mode="aspectFit" />
          <view class="hero__wordmark-stack">
            <text class="hero__wordmark">Pindo Coral</text>
            <text class="hero__wordmark-sub">Design System</text>
          </view>
        </view>
        <text class="hero__title">欢迎来到 Pindo Coral 设计系统</text>
        <text class="hero__lead">构建 Pindo 的共同语言 —— 一套承载品牌的组件、token 与模式库，让设计师和工程师以更小的摩擦更快交付。</text>

        <view class="hero__meta">
          <view class="hero__meta-item">
            <text class="hero__meta-label">最近更新</text>
            <text class="hero__meta-value">2026-06-09</text>
          </view>
          <view class="hero__meta-divider" />
          <view class="hero__meta-item">
            <text class="hero__meta-label">组件</text>
            <text class="hero__meta-value">16</text>
          </view>
          <view class="hero__meta-divider" />
          <view class="hero__meta-item">
            <text class="hero__meta-label">Token</text>
            <text class="hero__meta-value">120+</text>
          </view>
        </view>
      </view>

      <!-- What's new — bumps with each release; see DESIGN_SYSTEM.md §18 -->
      <view class="section">
        <view class="section__head">
          <text class="section__label">最新动态</text>
          <text class="section__hint">2026-06-09 · 详见更新日志</text>
        </view>
        <view class="news">
          <view class="news__item" hover-class="news__item--pressed" :hover-stay-time="80" @click="go('button')">
            <view class="news__head">
              <pd-badge variant="label" color="info" text="按钮" />
              <text class="news__date">6/9</text>
            </view>
            <text class="news__title">按钮统一为单一 48px 尺寸 · pill 全圆角</text>
            <text class="news__desc">移除 md / sm（低于 48px 触控热区），仅保留 48px 一档，文字改为 body-lg 半粗；所有按钮改为 pill 最大圆角（仅图标 / dock 按钮成圆形）。</text>
          </view>
          <view class="news__item" hover-class="news__item--pressed" :hover-stay-time="80" @click="go('typography')">
            <view class="news__head">
              <pd-badge variant="label" color="info" text="字体排印" />
              <text class="news__date">6/9</text>
            </view>
            <text class="news__title">字号体系按 Figma 重定标 · 新增 heading-4</text>
            <text class="news__desc">display / heading 整体放大对齐 Figma；原 body 升为 body-lg（16px 主正文），原 body-lg 升为 heading-4（18px 半粗标题）。</text>
          </view>
          <view class="news__item" hover-class="news__item--pressed" :hover-stay-time="80" @click="openExternal(LINK_CHANGELOG)">
            <view class="news__head">
              <pd-badge variant="label" color="brand" text="完整更新日志" />
            </view>
            <text class="news__title">查看历次发布说明</text>
            <text class="news__desc">所有版本变更、迁移说明与决策记录都记录在 DESIGN_SYSTEM.md §18 Changelog。</text>
          </view>
        </view>
      </view>

      <!-- Start here -->
      <view class="section">
        <view class="section__head">
          <text class="section__label">从这里开始</text>
        </view>
        <view class="cards">
          <view class="card" hover-class="card--pressed" :hover-stay-time="100" @click="go('typography')">
            <view class="card__tag-row"><pd-badge variant="label" color="info" text="面向设计师" /></view>
            <text class="card__title">设计基础</text>
            <text class="card__desc">系统的视觉语汇 —— 字体、颜色、间距、层级与动效。从这里开始了解设计系统的语法。</text>
            <view class="card__foot">
              <text class="card__link">探索设计基础</text>
              <pd-icon class="card__arrow" name="arrow-right" size="sm" color="brand" />
            </view>
          </view>
          <view class="card" hover-class="card--pressed" :hover-stay-time="100" @click="go('button')">
            <view class="card__tag-row"><pd-badge variant="label" color="success" text="面向工程师" /></view>
            <text class="card__title">组件参考</text>
            <text class="card__desc">16 个生产级组件，通过 easycom 自动引入。每个组件都附带 Props、变体和无障碍说明。</text>
            <view class="card__foot">
              <text class="card__link">浏览组件</text>
              <pd-icon class="card__arrow" name="arrow-right" size="sm" color="brand" />
            </view>
          </view>
          <view class="card card--feature" hover-class="card--pressed" :hover-stay-time="100" @click="go('group-card')">
            <view class="card__tag-row"><pd-badge variant="label" color="brand" text="新特性" /></view>
            <text class="card__title">拼团卡片</text>
            <text class="card__desc">单个组件覆盖六种拼团状态变体，随 2026.04 版本一同发布。</text>
            <view class="card__foot">
              <text class="card__link">查看发布说明</text>
              <pd-icon class="card__arrow" name="arrow-right" size="sm" color="brand" />
            </view>
          </view>
        </view>
      </view>

      <!-- Principles -->
      <view class="section">
        <view class="section__head">
          <text class="section__label">设计原则</text>
        </view>
        <view class="p-list">
          <view class="p-row">
            <text class="p-row__num">01</text>
            <view class="p-row__body">
              <text class="p-row__title">移动优先，兼顾桌面</text>
              <text class="p-row__desc">每个组件都按 750rpx 设备的触控体验来构建。桌面端是渐进增强，而非起点。</text>
            </view>
          </view>
          <view class="p-divider" />
          <view class="p-row">
            <text class="p-row__num">02</text>
            <view class="p-row__body">
              <text class="p-row__title">用 token 而非魔法数值</text>
              <text class="p-row__desc">所有颜色、间距、尺寸和圆角都使用设计 token。系统中没有的值请提出新 token —— 不要写死。</text>
            </view>
          </view>
          <view class="p-divider" />
          <view class="p-row">
            <text class="p-row__num">03</text>
            <view class="p-row__body">
              <text class="p-row__title">默认即无障碍</text>
              <text class="p-row__desc">WCAG AA 对比度、88rpx 触控热区、规范的 ARIA 与键盘支持，这些能力随每个组件一同交付。</text>
            </view>
          </view>
          <view class="p-divider" />
          <view class="p-row">
            <text class="p-row__num">04</text>
            <view class="p-row__body">
              <text class="p-row__title">一件事只做一种方式</text>
              <text class="p-row__desc">一致性优于个人巧思。遇到犹豫时优先沿用既有模式，需要调整也请先经过团队评审。</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Quick start -->
      <view class="section">
        <view class="section__head">
          <text class="section__label">快速上手</text>
          <text class="section__hint">复制到任意 Vue SFC 即可使用</text>
        </view>
        <view class="code">
          <view class="code__bar">
            <view class="code__dots">
              <view class="code__dot code__dot--r" />
              <view class="code__dot code__dot--y" />
              <view class="code__dot code__dot--g" />
            </view>
            <text class="code__file">button-example.vue</text>
          </view>
          <view class="code__body">
            <view class="code__line"><text class="code__comment">// 在任意 .vue 中引入 tokens + mixins</text></view>
            <view class="code__line"><text class="code__kw">@import</text><text class="code__p"> </text><text class="code__str">'@/styles/tokens.scss'</text><text class="code__p">;</text></view>
            <view class="code__line"><text class="code__kw">@import</text><text class="code__p"> </text><text class="code__str">'@/styles/mixins.scss'</text><text class="code__p">;</text></view>
            <view class="code__line code__line--blank" />
            <view class="code__line"><text class="code__comment">// 组件通过 easycom 自动引入</text></view>
            <view class="code__line"><text class="code__tag">&lt;pd-button</text><text class="code__p"> </text><text class="code__attr">variant</text><text class="code__p">=</text><text class="code__str">"filled"</text><text class="code__p"> </text><text class="code__attr">text</text><text class="code__p">=</text><text class="code__str">"Go"</text><text class="code__p"> </text><text class="code__tag">/&gt;</text></view>
          </view>
        </view>
      </view>

      <view class="bottom">
        <view class="next">
          <text class="next__label">下一节</text>
          <view class="next__link" hover-class="next__link--pressed" :hover-stay-time="80" @click="go('colors')">
            <text class="next__title">颜色</text>
            <text class="next__desc">品牌色、语义色与中性色板</text>
            <pd-icon class="next__arrow" name="arrow-right" size="md" color="placeholder" />
          </view>
        </view>

        <view class="foot">
          <view class="foot__left">
            <text class="foot__copy">© 2026 海运拼团 Pindo Shipping</text>
            <text class="foot__meta">基于 Pindo Coral 设计系统构建</text>
          </view>
          <view class="foot__links">
            <view
              class="foot__link"
              hover-class="foot__link--pressed"
              :hover-stay-time="80"
              @click="openExternal(LINK_CHANGELOG)"
            >
              <text class="foot__link-text">更新日志</text>
            </view>
            <view
              class="foot__link"
              hover-class="foot__link--pressed"
              :hover-stay-time="80"
              @click="openExternal(LINK_GITHUB)"
            >
              <text class="foot__link-text">GitHub</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
// 外部链接 — 指向 machacha 分支（开发主分支）。与 pd-doc-shell 保持一致。
const LINK_GITHUB = 'https://github.com/qiuyichen00/pindo/tree/machacha'
const LINK_CHANGELOG = 'https://github.com/qiuyichen00/pindo/blob/machacha/doc/DESIGN_SYSTEM.md#18-changelog'

export default {
  data() {
    return {
      LINK_GITHUB,
      LINK_CHANGELOG
    }
  },
  methods: {
    go(path) {
      uni.navigateTo({ url: `/pages/showcase/${path}` })
    },
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

.page {
  padding: $pd-space-6 $pd-space-4 $pd-space-8;
  max-width: 1440rpx;
}

// ── Hero ──
.hero {
  margin-bottom: $pd-space-6;

  // Brand block — visually mirrors .shell__brand in pd-doc-shell, scaled up
  // for hero context. Same anatomy: logo + wordmark stack + version chip.
  &__brand {
    display: flex;
    align-items: center;
    gap: $pd-space-1-5;
    margin-bottom: $pd-space-2;
  }

  &__logo {
    width: 96rpx;
    height: 96rpx;
    border-radius: 20rpx;
    flex-shrink: 0;
  }

  &__wordmark-stack {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  &__wordmark {
    // 品牌名 — display-brand label 字体（数黑体 700 / 32rpx）。详见 §2.5。
    // 颜色与 sidebar wordmark 对齐：text-primary（中性），保持系统统一感。
    @include pd-display-brand-label;
    color: $pd-text-primary;
    line-height: 1.2;
  }

  &__wordmark-sub {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    letter-spacing: 0.2px;
    line-height: 1.2;
  }


  &__title {
    font-size: $pd-display-md;
    font-weight: $pd-font-bold;
    line-height: $pd-display-md-lh;
    letter-spacing: $pd-display-md-ls;
    color: $pd-text-primary;
    display: block;
  }

  &__lead {
    @include pd-type(body-lg);
    color: $pd-text-tertiary;
    display: block;
    margin-top: $pd-space-2;
    line-height: $pd-body-lg-lh;
    max-width: 900rpx;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: $pd-space-2;
    margin-top: $pd-space-3;
    padding: $pd-space-2 0;
    border-top: 1rpx solid $pd-border-light;
    border-bottom: 1rpx solid $pd-border-light;
  }

  &__meta-item {
    display: flex;
    flex-direction: column;
    gap: 2rpx;
  }

  &__meta-label {
    @include pd-type(overline);
    color: $pd-text-placeholder;
    letter-spacing: 1px;
  }

  &__meta-value {
    @include pd-type(body-sm);
    color: $pd-text-primary;
    font-weight: $pd-font-medium;
  }

  &__meta-divider {
    width: 1rpx;
    height: 40rpx;
    background: $pd-border-light;
  }
}

// ── Sections ──
.section {
  margin-bottom: $pd-space-6;

  &__head {
    display: flex;
    align-items: baseline;
    gap: $pd-space-1-5;
    margin-bottom: $pd-space-2;
  }

  &__label {
    @include pd-type(heading-3);
    color: $pd-text-primary;
    font-weight: $pd-font-semibold;
  }

  &__hint {
    @include pd-type(body-sm);
    color: $pd-text-placeholder;
  }
}

// ── Cards ──
.cards {
  display: flex;
  gap: $pd-space-2;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 320rpx;
  padding: $pd-space-2;
  background: $pd-surface-primary;
  border: 1rpx solid $pd-border-light;
  border-radius: $pd-radius-md;
  transition: border-color $pd-duration-fast $pd-ease-standard,
    box-shadow $pd-duration-fast $pd-ease-standard;

  &--pressed {
    border-color: $pd-text-disabled;
    box-shadow: $pd-elevation-1;
  }

  &--feature {
    background: $pd-brand-50;
    border-color: rgba(203, 29, 69, 0.15);
  }

  &__tag-row {
    margin-bottom: $pd-space-1;
  }

  &__title {
    @include pd-type(heading-3);
    color: $pd-text-primary;
    font-weight: $pd-font-semibold;
    display: block;
  }

  &__desc {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    display: block;
    margin-top: $pd-space-1;
    line-height: $pd-body-sm-lh;
  }

  &__foot {
    display: flex;
    align-items: center;
    gap: $pd-space-half;
    margin-top: $pd-space-2;
  }

  &__link {
    @include pd-type(body-sm);
    color: $pd-brand-500;
    font-weight: $pd-font-medium;
  }

  &__arrow {
    font-size: $pd-body-lg;
    color: $pd-brand-500;
    line-height: 1;
  }
}

// ── Principles ──
.p-list {
  border: 1rpx solid $pd-border-light;
  border-radius: $pd-radius-md;
  overflow: hidden;
}

.p-row {
  display: flex;
  align-items: flex-start;
  gap: $pd-space-3;
  padding: $pd-space-2 $pd-space-3;

  &__num {
    font-size: $pd-body-lg;
    font-weight: $pd-font-bold;
    color: $pd-brand-500;
    line-height: 1;
    font-family: 'SF Mono', Consolas, monospace;
    padding-top: 2rpx;
    flex-shrink: 0;
    min-width: 48rpx;
  }

  &__body { flex: 1; min-width: 0; }

  &__title {
    @include pd-type(body-lg);
    font-weight: $pd-font-semibold;
    color: $pd-text-primary;
    display: block;
  }

  &__desc {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    display: block;
    margin-top: $pd-space-half;
    line-height: $pd-body-sm-lh;
  }
}

.p-divider {
  height: 1rpx;
  background: $pd-border-light;
  margin-left: $pd-space-3 + 48rpx + $pd-space-3;
}

// ── Code block ──
.code {
  border-radius: $pd-radius-md;
  background: #1A1A1C;
  overflow: hidden;

  &__bar {
    display: flex;
    align-items: center;
    gap: $pd-space-1-5;
    padding: $pd-space-1 $pd-space-2;
    background: #0F0F11;
    border-bottom: 1rpx solid #2A2A2C;
  }

  &__dots {
    display: flex;
    gap: $pd-space-half;
  }

  &__dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;

    &--r { background: #FF5F57; }
    &--y { background: #FEBC2E; }
    &--g { background: #28C840; }
  }

  &__file {
    @include pd-type(body-sm);
    color: #616161;
    font-family: 'SF Mono', Consolas, monospace;
  }

  &__body {
    padding: $pd-space-2;
    display: flex;
    flex-direction: column;
    gap: 4rpx;
  }

  &__line {
    display: flex;
    white-space: pre;

    &--blank { height: $pd-space-1-5; }
  }

  &__comment,
  &__kw,
  &__str,
  &__tag,
  &__attr,
  &__p {
    font-size: $pd-body-sm;
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    line-height: $pd-body-sm-lh;
  }

  &__comment { color: #616161; }
  &__kw { color: #FF7AB2; }
  &__str { color: #D9C97C; }
  &__tag { color: #ACF2E4; }
  &__attr { color: #B281EB; }
  &__p { color: #98989D; }
}

// ── Bottom ──
.bottom {
  margin-top: $pd-space-6;
  padding-top: $pd-space-4;
  border-top: 1rpx solid $pd-border-light;
}

.next {
  &__label {
    @include pd-type(overline);
    color: $pd-text-placeholder;
    letter-spacing: 1.5px;
    display: block;
    margin-bottom: $pd-space-1;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: $pd-space-2;
    padding: $pd-space-2;
    border: 1rpx solid $pd-border-light;
    border-radius: $pd-radius-md;
    transition: background-color $pd-duration-instant;

    &--pressed { background: $pd-surface-secondary; }
  }

  &__title {
    @include pd-type(body-lg);
    font-weight: $pd-font-semibold;
    color: $pd-text-primary;
  }

  &__desc {
    flex: 1;
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
  }

  &__arrow {
    font-size: $pd-heading-3;
    color: $pd-text-disabled;
    line-height: 1;
  }
}

// ── News (What's new) ──
.news {
  display: flex;
  gap: $pd-space-2;
  flex-wrap: wrap;
}

.news__item {
  flex: 1 1 340rpx;
  padding: $pd-space-2;
  background: $pd-surface-primary;
  border: 1rpx solid $pd-border-light;
  border-radius: $pd-radius-md;
  transition: border-color $pd-duration-fast $pd-ease-standard,
    box-shadow $pd-duration-fast $pd-ease-standard;

  &--pressed {
    border-color: $pd-text-disabled;
    box-shadow: $pd-elevation-1;
  }
}

.news__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $pd-space-1;
}

.news__date {
  @include pd-type(body-sm);
  color: $pd-text-placeholder;
  font-family: 'SF Mono', Consolas, monospace;
}

.news__title {
  @include pd-type(body-lg);
  font-weight: $pd-font-semibold;
  color: $pd-text-primary;
  display: block;
}

.news__desc {
  @include pd-type(body-sm);
  color: $pd-text-tertiary;
  display: block;
  margin-top: $pd-space-1;
  line-height: $pd-body-sm-lh;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: $pd-space-2;
  margin-top: $pd-space-4;
  padding-top: $pd-space-3;
  border-top: 1rpx solid $pd-border-light;
  flex-wrap: wrap;

  &__left {
    display: flex;
    flex-direction: column;
    gap: 2rpx;
  }

  &__copy,
  &__meta {
    @include pd-type(body-sm);
    color: $pd-text-placeholder;
  }

  &__links {
    display: flex;
    gap: $pd-space-1;
  }

  &__link {
    padding: $pd-space-half $pd-space-1;
    border-radius: $pd-radius-xs;
    cursor: pointer;
    transition: background-color $pd-duration-instant;

    &--pressed { background: $pd-surface-secondary; }

    @media (hover: hover) {
      &:hover .foot__link-text { color: $pd-brand-500; }
    }
  }

  &__link-text {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    font-weight: $pd-font-medium;
    transition: color $pd-duration-instant;
  }
}
</style>
