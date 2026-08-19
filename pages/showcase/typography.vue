<template>
  <pd-doc-shell active-path="typography">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row"><text class="pg-header__title">字体排印</text><pd-badge variant="label" color="success" text="稳定" /></view>
        <text class="pg-header__desc">基于 iOS Dynamic Type 的字号体系。使用平台原生字体（iOS PingFang SC / Android Noto Sans SC），中文优先。</text>
      </view>

      <!-- Font Stack -->
      <text class="h3">字体栈</text>
      <view class="code-block">
        <text class="code-line">font-family: 'PingFang SC', 'Noto Sans SC',</text>
        <text class="code-line">  -apple-system, BlinkMacSystemFont, 'Roboto',</text>
        <text class="code-line">  'Helvetica Neue', 'Arial', sans-serif;</text>
      </view>
      <text class="desc">
        使用平台原生字体：iOS / macOS 渲染为 PingFang SC，Android 渲染为 Noto Sans SC，桌面 H5 兜底为各平台的系统字体。这样可以保持与系统一致的视觉，并避免加载额外字体文件带来的包体积成本。
      </text>

      <!-- Live font sample -->
      <view class="token-card">
        <view class="type-row">
          <text class="type-sample" style="font-size: 36rpx; font-weight: 400;">海运拼团 · 专业物流服务 Pindo</text>
          <view class="type-meta"><text class="type-token mono">常规 Regular 400</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample" style="font-size: 36rpx; font-weight: 500;">海运拼团 · 专业物流服务 Pindo</text>
          <view class="type-meta"><text class="type-token mono">中等 Medium 500</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample" style="font-size: 36rpx; font-weight: 600;">海运拼团 · 专业物流服务 Pindo</text>
          <view class="type-meta"><text class="type-token mono">半粗 Semibold 600</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample" style="font-size: 36rpx; font-weight: 700;">海运拼团 · 专业物流服务 Pindo</text>
          <view class="type-meta"><text class="type-token mono">加粗 Bold 700</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample" style="font-size: 36rpx; font-weight: 400; font-style: italic;">Pindo Shipping · The quick brown fox</text>
          <view class="type-meta"><text class="type-token mono">斜体 Italic（仅拉丁）</text></view>
        </view>
      </view>

      <!-- Type Scale -->
      <text class="h3">字号体系</text>
      <text class="desc">每一级对应 iOS Dynamic Type 字号。在 SCSS 中使用 @include pd-type() 混入。正文字号采用 ~1.5 倍行高（body-sm 1.57×），给中文字符足够的呼吸空间。</text>
      <view class="token-card">
        <view v-for="t in scale" :key="t.token" class="type-row">
          <text class="type-sample" :style="{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh, letterSpacing: t.ls }">{{ t.text }}</text>
          <view class="type-meta">
            <text class="type-token mono">{{ t.token }}</text>
            <text class="type-spec">{{ t.size }} / w{{ t.weight }} / 行高 {{ t.lh }}</text>
          </view>
        </view>
      </view>

      <!-- Letter-spacing decision callout -->
      <text class="h3">字符间距（CJK 适配）</text>
      <view class="rule rule--do">
        <text class="rule__icon">i</text>
        <text class="rule__text">所有正文 / 标题级 token 的 letter-spacing 已置为 0。CSS letter-spacing 会作用于每个汉字，原 iOS HIG 数值（针对 SF Pro 拉丁文）会让中文字符出现重叠或松散排列。仅 overline（拉丁大写标签）保留 +0.5px 间距。</text>
      </view>

      <!-- Weights -->
      <text class="h3">字重</text>
      <view class="token-card">
        <view v-for="w in weights" :key="w.name" class="weight-row">
          <text class="weight-sample" :style="{ fontWeight: w.value }">{{ w.name }}</text>
          <text class="weight-val mono">{{ w.value }}</text>
          <text class="weight-usage">{{ w.usage }}</text>
        </view>
      </view>

      <!-- Display-Brand Font — 阿里妈妈数黑体 -->
      <text class="h3">品牌高亮字体（阿里妈妈数黑体）</text>
      <text class="desc">单一 Bold 700 权重，仅用于品牌时刻 / 营销显眼场景：hero CTA、活动 banner、价格大字、拼团倒计时、品牌徽章。不替换全局正文。详见 doc/DESIGN_SYSTEM.md §2.5。</text>

      <view class="token-card">
        <view v-for="b in brandSamples" :key="b.token" class="type-row">
          <text class="type-sample pd-font-display-brand" :style="{ fontSize: b.size, lineHeight: b.lh }">{{ b.text }}</text>
          <view class="type-meta">
            <text class="type-token mono">{{ b.token }}</text>
            <text class="type-spec">{{ b.size }} / 行高 {{ b.lh }}</text>
          </view>
        </view>
      </view>

      <!-- Label style — body (32rpx) brand text style -->
      <text class="h3">Label 样式（pd-display-brand-label · 32rpx）</text>
      <text class="desc">短品牌标签场景的字号 + 字体成品样式（数黑体 700 / 32rpx / 行高 48rpx）。仅限 1–4 字。**这是字体风格，不是徽章**——在实际页面里通常裸用，背景 / 圆角由所在容器决定。</text>
      <view class="token-card">
        <view class="type-row">
          <text class="type-sample pd-display-brand-label">已发货</text>
          <view class="type-meta"><text class="type-spec">3 字状态文字</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample pd-display-brand-label">拼团成团</text>
          <view class="type-meta"><text class="type-spec">4 字状态文字</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample pd-display-brand-label">限时</text>
          <view class="type-meta"><text class="type-spec">2 字促销标签</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample pd-display-brand-label">新人</text>
          <view class="type-meta"><text class="type-spec">2 字身份标签</text></view>
        </view>
      </view>

      <!-- Side-by-side comparison: brand vs system -->
      <text class="h3">对照 — 品牌字 vs 系统字</text>
      <view class="token-card">
        <view class="type-row">
          <text class="type-sample pd-font-display-brand" style="font-size: 72rpx; line-height: 88rpx;">限时拼团 ¥1,288</text>
          <view class="type-meta"><text class="type-token mono">.pd-font-display-brand</text><text class="type-spec">display-md · 数黑体</text></view>
        </view>
        <view class="type-row">
          <text class="type-sample" style="font-size: 72rpx; font-weight: 700; line-height: 88rpx;">限时拼团 ¥1,288</text>
          <view class="type-meta"><text class="type-token mono">$pd-font-family</text><text class="type-spec">display-md · 系统字 Bold</text></view>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// SCSS 混入 — 设置 size / weight / line-height / letter-spacing</text></text>
        <text class="code-line">@include pd-type(heading-2);</text>
        <text class="code-line">@include pd-type(body-lg);</text>
        <text class="code-line">@include pd-type(body-sm);</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 品牌高亮 — 字体 + 字重叠加，字号继续走 type scale</text></text>
        <text class="code-line">.hero-cta {</text>
        <text class="code-line">  @include pd-type(display-lg);</text>
        <text class="code-line">  @include pd-font-display-brand;</text>
        <text class="code-line">}</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">最小可读字号为 20rpx（约 10pt）；overline 仅用于标签和徽章。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">价格、数量、倒计时等场景使用 font-variant-numeric: tabular-nums 让数字等宽对齐。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">需要更清晰的西文数字（价格、评分）时，使用 .number-text 等以系统拉丁字体（SF Pro / Roboto）优先的辅助类。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">品牌高亮字体（数黑体）只用于 hero / 营销 / 价格大字；同一屏幕通常只有一个品牌时刻。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">单个组件内不要同时使用超过 2 种字号层级，保持清晰的视觉层次。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要把数黑体用于正文 / 表单 / 导航 / Toast，会让品牌时刻失去意义。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      // ⚠️ 此处显式枚举 token 数值，便于在 showcase 中直接渲染示例。
      //    修改时务必与 styles/tokens.scss 中的 $pd-* 变量保持一致。
      scale: [
        { token: 'display-lg', size: '90rpx', weight: '700', lh: '104rpx', ls: '0', text: '超大展示标题' },
        { token: 'display-md', size: '72rpx', weight: '700', lh: '88rpx', ls: '0', text: '大展示标题' },
        { token: 'heading-1', size: '64rpx', weight: '700', lh: '80rpx', ls: '0', text: '一级标题' },
        { token: 'heading-2', size: '48rpx', weight: '600', lh: '64rpx', ls: '0', text: '二级标题' },
        { token: 'heading-3', size: '40rpx', weight: '600', lh: '56rpx', ls: '0', text: '三级标题' },
        { token: 'heading-4', size: '36rpx', weight: '600', lh: '56rpx', ls: '0', text: '四级标题，最小标题层级' },
        { token: 'body-lg', size: '32rpx', weight: '400', lh: '48rpx', ls: '0', text: '标准正文，适合日常阅读' },
        { token: 'body-sm', size: '28rpx', weight: '400', lh: '44rpx', ls: '0', text: '小号正文，用于次要信息' },
        { token: 'caption', size: '24rpx', weight: '400', lh: '32rpx', ls: '0', text: '说明文字，用于时间戳和元数据' },
        { token: 'overline', size: '20rpx', weight: '500', lh: '26rpx', ls: '0.5px', text: '标签文字 OVERLINE' }
      ],
      weights: [
        { name: '常规 Regular', value: '400', usage: '正文、描述性文字' },
        { name: '中等 Medium', value: '500', usage: '标签、overline、轻强调' },
        { name: '半粗 Semibold', value: '600', usage: '章节标题、卡片标题' },
        { name: '加粗 Bold', value: '700', usage: '展示标题、页面主标题、CTA 按钮' }
      ],
      // 品牌高亮字体示例 — 仅在 display / heading 级别推荐
      brandSamples: [
        { token: 'display-lg', size: '90rpx', lh: '104rpx', text: '限时拼团' },
        { token: 'display-md', size: '72rpx', lh: '88rpx', text: '新人专享 ¥99' },
        { token: 'heading-1', size: '64rpx', lh: '80rpx', text: '海运拼团 · Pindo' },
        { token: 'heading-2', size: '48rpx', lh: '64rpx', text: '已成团 · 03天12时' },
        { token: 'heading-3', size: '40rpx', lh: '56rpx', text: '即将开团' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// 共享页面 chrome — 见 doc/DESIGN_SYSTEM.md §16.4。
@import '@/styles/doc-page.scss';

// ── 本页 specific 样式 ─────────────────────────────────────────────────────
.weight-row { display: flex; align-items: center; padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.weight-sample { @include pd-type(body-lg); color: $pd-text-primary; flex: 1; }
.weight-val { @include pd-type(body-sm); color: $pd-text-placeholder; margin-right: $pd-space-1; }
.weight-usage { @include pd-type(body-sm); color: $pd-text-tertiary; }
</style>
