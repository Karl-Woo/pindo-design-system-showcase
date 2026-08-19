<template>
  <pd-doc-shell active-path="colors">
    <view class="pg">
      <!-- Header -->
      <view class="pg-header">
        <view class="pg-header__row"><text class="pg-header__title">颜色</text><pd-badge variant="label" color="success" text="稳定" /></view>
        <text class="pg-header__desc">颜色 token 定义了 Pindo 的视觉识别。所有文字颜色在白色背景上均符合 WCAG AA 对比度标准。</text>
      </view>

      <!-- Brand — solid scale -->
      <text class="h3">品牌色板（纯色阶）</text>
      <text class="desc">从 50 到 900 的完整阶梯，不含透明度，可用于任何背景。</text>
      <view class="swatch-grid">
        <view v-for="c in brandSolid" :key="c.token" class="swatch" :style="{ backgroundColor: c.hex, color: c.dark ? '#1A1A1A' : '#FFFFFF' }">
          <text class="swatch__token" :style="{ color: c.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)' }">{{ c.token }}</text>
          <text class="swatch__hex" :style="{ color: c.dark ? '#1A1A1A' : '#FFFFFF' }">{{ c.hex }}</text>
          <text class="swatch__usage" :style="{ color: c.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)' }">{{ c.usage }}</text>
        </view>
      </view>

      <!-- Brand — alpha tints -->
      <text class="h3">品牌色板（透明度变体）</text>
      <text class="desc">基于 brand-500 的透明度叠加，仅限在白色背景上使用；深色背景请改用上方的纯色阶。</text>
      <view class="token-card">
        <view v-for="c in brandAlpha" :key="c.token" class="token-row">
          <view class="dot" :style="{ backgroundColor: c.val }" />
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.val }}</text>
          </view>
          <text class="token-row__usage">{{ c.usage }}</text>
        </view>
      </view>

      <!-- Semantic fills -->
      <text class="h3">语义颜色（填充）</text>
      <text class="desc">与 iOS 系统色板对齐的状态颜色，对比度仅满足 3:1，仅适用于边框、图标、填充等非文字 UI。</text>
      <view class="swatch-row">
        <view v-for="c in semantic" :key="c.name" class="swatch-sm" :style="{ backgroundColor: c.hex }">
          <text class="swatch-sm__name">{{ c.name }}</text>
          <text class="swatch-sm__hex">{{ c.hex }}</text>
        </view>
      </view>

      <!-- Semantic text variants -->
      <text class="h3">语义颜色（文字安全）</text>
      <text class="desc">在白色背景上对比度 ≥ 4.5:1，符合 WCAG AA 正文标准。任何把语义色用在文字上的场景（状态徽章、错误提示、链接等）都应使用这组 token。</text>
      <view class="token-card">
        <view v-for="c in semanticText" :key="c.token" class="token-row">
          <view class="dot" :style="{ backgroundColor: c.hex }" />
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.hex }}</text>
          </view>
          <view class="token-row__meta">
            <text class="token-row__contrast">{{ c.contrast }}</text>
            <text class="token-row__usage">{{ c.usage }}</text>
          </view>
        </view>
      </view>

      <!-- Semantic backgrounds -->
      <text class="h3">语义颜色（背景）</text>
      <text class="desc">搭配 *-text token 使用。-bg 用于大面积反馈卡片；-bg-strong 用于紧凑徽章。</text>
      <view class="token-card">
        <view v-for="c in semanticBg" :key="c.token" class="token-row" :style="{ backgroundColor: c.val }">
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.val }}</text>
          </view>
          <text class="token-row__usage">{{ c.usage }}</text>
        </view>
      </view>

      <!-- Grey Scale -->
      <text class="h3">中性色阶（Neutral Grey Scale）</text>
      <text class="desc">10 级中性色阶（饱和度 0%，纯灰），系统内一切文字、边框、表面的灰度都从这里取值。下方的语义 token（text-*、border-*、surface-*）本质上都是它的别名。</text>
      <view class="token-card">
        <view v-for="c in grey" :key="c.token" class="token-row">
          <view class="dot dot--bordered" :style="{ backgroundColor: c.hex }" />
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.hex }}</text>
          </view>
          <view class="token-row__meta">
            <text class="token-row__contrast">{{ c.source }}</text>
            <text class="token-row__usage">{{ c.usage }}</text>
          </view>
        </view>
      </view>

      <!-- Text -->
      <text class="h3">文字层级</text>
      <view class="token-card">
        <view v-for="c in text" :key="c.token" class="token-row">
          <view class="dot" :style="{ backgroundColor: c.hex }" />
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.hex }}</text>
          </view>
          <view class="token-row__meta">
            <text class="token-row__contrast">{{ c.contrast }}</text>
            <text class="token-row__usage">{{ c.usage }}</text>
          </view>
        </view>
      </view>

      <!-- Surface -->
      <text class="h3">表面</text>
      <view class="token-card">
        <view v-for="c in surface" :key="c.token" class="token-row">
          <view class="dot dot--bordered" :style="{ backgroundColor: c.hex }" />
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.hex }}</text>
          </view>
          <text class="token-row__usage">{{ c.usage }}</text>
        </view>
      </view>

      <!-- Border -->
      <text class="h3">边框与分隔线</text>
      <view class="token-card">
        <view v-for="c in border" :key="c.token" class="token-row">
          <view class="dot dot--bordered" :style="{ backgroundColor: c.hex }" />
          <view class="token-row__body">
            <text class="token-row__name">{{ c.token }}</text>
            <text class="token-row__val mono">{{ c.hex }}</text>
          </view>
          <text class="token-row__usage">{{ c.usage }}</text>
        </view>
      </view>

      <!-- Overlay -->
      <text class="h3">遮罩</text>
      <view class="overlay-row">
        <view v-for="c in overlay" :key="c.name" class="overlay-box">
          <view class="overlay-sample" :style="{ backgroundColor: c.val }" />
          <text class="overlay-name mono">{{ c.name }}</text>
          <text class="overlay-val">{{ c.opacity }}</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// 在 SCSS 中</text></text>
        <text class="code-line">color: $pd-text-primary;</text>
        <text class="code-line">background: $pd-surface-secondary;</text>
        <text class="code-line">border: 1rpx solid $pd-border-input;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">语义色用于文字时使用 *-text 变体（success-text / warning-text / error-text / info-text），对比度 ≥ 4.5:1 符合 WCAG AA。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">在白色背景上，text-tertiary (#616161) 是可使用的最浅文字色，对比度 5.3:1，符合 WCAG AA。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要把 text-placeholder 用作正文颜色；也不要把 text-disabled 用于非禁用元素 —— 它们都不满足 AA 对比度。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要把 $pd-success / $pd-warning / $pd-info 直接当文字色使用（对比度仅 2.1–4.2），应使用对应的 -text 变体。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">深色背景上不要使用 brand-50 / brand-100 等透明度 token，请改用 brand-50-solid / brand-100-solid 等纯色阶。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">所有中性灰色都来自 grey-50 → grey-900 色阶。编写新组件时优先使用语义 token（text-primary、border-light），仅在需要特定阶层时直接引用 grey-N。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要在代码中硬编码具体灰色 hex（如 #1A1A1A、#3D3D3D、#EDEDED），始终通过语义 token 或 grey-N 引用 —— 这样色阶整体微调时无需逐处改动。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      // Solid brand ladder — safe on any surface.
      brandSolid: [
        { token: '$pd-brand-50-solid',  hex: '#FBE6EC', usage: '最浅背景', dark: true },
        { token: '$pd-brand-100-solid', hex: '#F8D1DA', usage: '浅色面板', dark: true },
        { token: '$pd-brand-200-solid', hex: '#F1A4B6', usage: '边框、轻强调', dark: true },
        { token: '$pd-brand-300',       hex: '#E1768F', usage: '禁用态 CTA', dark: false },
        { token: '$pd-brand-400',       hex: '#E85A7A', usage: '悬停 / 浅色强调', dark: false },
        { token: '$pd-brand-500',       hex: '#CB1D45', usage: '主要 CTA、激活状态', dark: false },
        { token: '$pd-brand-600',       hex: '#A01636', usage: '按下 / 深色强调', dark: false },
        { token: '$pd-brand-700',       hex: '#7E0F2C', usage: '文字强调', dark: false },
        { token: '$pd-brand-800',       hex: '#56091E', usage: '深色背景主色', dark: false },
        { token: '$pd-brand-900',       hex: '#2F0411', usage: '极深背景', dark: false },
        { token: '$pd-brand-cta',       hex: '#E30055', usage: '高强调登录 CTA（例外色）', dark: false }
      ],
      // Alpha-based tints — white-surface only.
      brandAlpha: [
        { token: '$pd-brand-50',  val: 'rgba(203,29,69,0.08)', usage: '悬停 / 激活态背景' },
        { token: '$pd-brand-100', val: 'rgba(203,29,69,0.10)', usage: '选中态背景' },
        { token: '$pd-brand-150', val: 'rgba(203,29,69,0.12)', usage: '按下态背景' },
        { token: '$pd-brand-200', val: 'rgba(203,29,69,0.20)', usage: '按下态深色背景' }
      ],
      semantic: [
        { name: 'success', hex: '#34C759' },
        { name: 'warning', hex: '#FF9500' },
        { name: 'error',   hex: '#FF3B30' },
        { name: 'info',    hex: '#007AFF' },
        { name: 'rating',  hex: '#FFCC00' }
      ],
      semanticText: [
        { token: '$pd-success-text', hex: '#058132', contrast: '5.1:1', usage: '成功类文字（徽章 / 提示）' },
        { token: '$pd-warning-text', hex: '#B35100', contrast: '4.7:1', usage: '警告类文字' },
        { token: '$pd-error-text',   hex: '#D70015', contrast: '5.9:1', usage: '错误类文字 / 危险按钮' },
        { token: '$pd-info-text',    hex: '#006CE5', contrast: '5.2:1', usage: '链接、信息提示' }
      ],
      semanticBg: [
        { token: '$pd-success-bg',        val: 'rgba(52,199,89,0.08)',  usage: '推荐卡片背景' },
        { token: '$pd-success-bg-strong', val: 'rgba(52,199,89,0.12)',  usage: '成功徽章' },
        { token: '$pd-warning-bg',        val: 'rgba(255,149,0,0.08)',  usage: '警告卡片' },
        { token: '$pd-warning-bg-strong', val: 'rgba(255,149,0,0.12)',  usage: '警告徽章' },
        { token: '$pd-error-bg',          val: 'rgba(255,59,48,0.08)',  usage: '错误卡片 / 危险按钮背景' },
        { token: '$pd-error-bg-strong',   val: 'rgba(255,59,48,0.12)',  usage: '错误徽章 / 危险按钮按下' },
        { token: '$pd-info-bg',           val: 'rgba(0,122,255,0.08)',  usage: '信息卡片' },
        { token: '$pd-info-bg-strong',    val: 'rgba(0,122,255,0.12)',  usage: '信息徽章' }
      ],
      grey: [
        { token: '$pd-grey-50',  hex: '#F5F5F5', source: '中性灰',     usage: '极浅背景 / 表格斑马条纹' },
        { token: '$pd-grey-100', hex: '#EDEDED', source: '中性灰',     usage: '卡片、分组背景（= surface-secondary）' },
        { token: '$pd-grey-200', hex: '#DFDFDF', source: '中性灰',     usage: '分隔线、弱边框、按压反馈（= border-divider / surface-hover）' },
        { token: '$pd-grey-300', hex: '#CCCCCC', source: '中性灰',     usage: '表单边框（= border-input）' },
        { token: '$pd-grey-400', hex: '#C2C2C2', source: '中性灰',     usage: '默认边框（= border-default）' },
        { token: '$pd-grey-500', hex: '#ABABAB', source: '中性灰',     usage: '禁用态（= text-disabled）' },
        { token: '$pd-grey-600', hex: '#8B8B8B', source: '中性灰',     usage: '占位文字 3.5:1（= text-placeholder）' },
        { token: '$pd-grey-700', hex: '#616161', source: '中性灰',     usage: '说明文字 5.3:1 ✓ AA（= text-tertiary）' },
        { token: '$pd-grey-800', hex: '#3D3D3D', source: '中性灰',     usage: '正文 11.3:1 ✓ AAA（= text-secondary）' },
        { token: '$pd-grey-900', hex: '#1A1A1A', source: '中性灰',     usage: '主要文字 17.2:1 ✓ AAA（= text-primary）' }
      ],
      text: [
        { token: 'text-primary',     hex: '#1A1A1A', contrast: '17.2:1', usage: '主标题（= grey-900）' },
        { token: 'text-secondary',   hex: '#3D3D3D', contrast: '11.3:1', usage: '正文（= grey-800）' },
        { token: 'text-tertiary',    hex: '#616161', contrast: '5.3:1',  usage: '说明文字（= grey-700）' },
        { token: 'text-placeholder', hex: '#8B8B8B', contrast: '3.5:1',  usage: '占位文字（= grey-600）' },
        { token: 'text-disabled',    hex: '#ABABAB', contrast: '2.3:1',  usage: '仅限 :disabled 控件（= grey-500）' }
      ],
      surface: [
        { token: 'surface-primary',   hex: '#FFFFFF', usage: '主背景、浮层卡片（白色，色阶外）' },
        { token: 'surface-secondary', hex: '#F5F5F5', usage: '分组区域、轻量内嵌（= grey-50）' },
        { token: 'surface-tertiary',  hex: '#EDEDED', usage: '在 secondary 表面上的内嵌卡片（= grey-100）' },
        { token: 'surface-hover',     hex: '#DFDFDF', usage: '按下反馈（= grey-200）' }
      ],
      border: [
        { token: 'border-default', hex: '#C2C2C2', usage: '标准/强边框（= grey-400）' },
        { token: 'border-divider', hex: '#DFDFDF', usage: '分隔线、行/区块分隔（= grey-200）— 页面上看得见的那道 hairline' },
        { token: 'border-light',   hex: '#EDEDED', usage: '仅限可按压卡片/按钮描边，护住按下时的淡边（= grey-100）' },
        { token: 'border-input',   hex: '#CCCCCC', usage: '表单输入框（= grey-300）' }
      ],
      overlay: [
        { name: 'scrim-light',    val: 'rgba(0,0,0,0.3)', opacity: '30%' },
        { name: 'scrim-standard', val: 'rgba(0,0,0,0.4)', opacity: '40%' },
        { name: 'scrim-heavy',    val: 'rgba(0,0,0,0.6)', opacity: '60%' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// 共享页面 chrome — 见 doc/DESIGN_SYSTEM.md §16.4。
@import '@/styles/doc-page.scss';

// ── Swatches ──
.swatch-grid { display: flex; flex-wrap: wrap; gap: $pd-space-1; }
.swatch {
  width: calc(50% - 8rpx); min-height: 180rpx; border-radius: $pd-radius-md; padding: $pd-space-1-5;
  display: flex; flex-direction: column; justify-content: flex-end;
  &__token { @include pd-type(overline); color: rgba(255,255,255,0.6); display: block; }
  &__hex { @include pd-type(body-lg); font-weight: $pd-font-semibold; color: $pd-text-inverse; display: block; margin-top: 4rpx; }
  &__usage { @include pd-type(body-sm); color: rgba(255,255,255,0.5); display: block; margin-top: $pd-space-half; }
}
.swatch-row { display: flex; gap: $pd-space-1; }
.swatch-sm {
  flex: 1; height: 128rpx; border-radius: $pd-radius-md; padding: $pd-space-1; display: flex; flex-direction: column; justify-content: flex-end;
  &__name { @include pd-type(body-sm); color: $pd-text-inverse; font-weight: $pd-font-semibold; display: block; }
  &__hex { @include pd-type(body-sm); color: rgba(255,255,255,0.7); display: block; }
}

// ── Token table ──
.token-row {
  display: flex; align-items: center; padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light;
  &:last-child { border-bottom: none; }
  &__body { flex: 1; min-width: 0; margin-right: $pd-space-1; }
  &__name { @include pd-type(body-sm); color: $pd-text-primary; font-weight: $pd-font-medium; display: block; }
  &__val { @include pd-type(body-sm); color: $pd-text-placeholder; display: block; margin-top: 2rpx; }
  &__meta { text-align: right; flex-shrink: 0; }
  &__contrast { @include pd-type(body-sm); color: $pd-success-text; font-weight: $pd-font-semibold; display: block; }
  &__usage { @include pd-type(body-sm); color: $pd-text-placeholder; display: block; margin-top: 2rpx; }
}
.dot { width: 40rpx; height: 40rpx; border-radius: $pd-radius-sm; flex-shrink: 0; margin-right: $pd-space-1-5;
  &--bordered { border: 1rpx solid $pd-border-light; }
}

// ── Overlay ──
.overlay-row { display: flex; gap: $pd-space-2; }
.overlay-box { flex: 1; text-align: center; }
.overlay-sample { width: 100%; height: 96rpx; border-radius: $pd-radius-sm; }
.overlay-name { @include pd-type(body-sm); color: $pd-text-secondary; display: block; margin-top: $pd-space-half; }
.overlay-val { @include pd-type(body-sm); color: $pd-text-placeholder; display: block; }

</style>
