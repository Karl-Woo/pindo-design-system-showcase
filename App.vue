<script>
export default {
  onLaunch() {},
  onShow() {},
  onHide() {}
}
</script>

<style>
/* 品牌高亮字体（阿里妈妈数黑体，单一 Bold 权重）
   仅用于品牌时刻 / 营销显眼场景，不替换全局正文。详见 doc/DESIGN_SYSTEM.md §2.5。 */
@font-face {
  font-family: 'Alimama ShuHeiTi';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/static/fonts/AlimamaShuHeiTi/AlimamaShuHeiTi-Bold.ttf') format('truetype');
}

/* 全局字体规范配置（系统字体，中文优先）
   使用各平台原生字体：iOS → PingFang SC，Android → Noto Sans SC，
   桌面/H5 兜底为 -apple-system / BlinkMacSystemFont / Roboto 等系统栈。 */

page {
  font-family:
    'PingFang SC', 'Noto Sans SC', -apple-system, BlinkMacSystemFont,
    'Roboto', 'Helvetica Neue', 'Arial', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-variant-numeric: tabular-nums;
}

view, text, button, input, textarea {
  font-family: inherit;
}

.number-text, .price-value, .rating-score, .count-number, .amount-text {
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Roboto',
    'Helvetica Neue', 'Arial', 'PingFang SC', 'Noto Sans SC', sans-serif;
  font-variant-numeric: tabular-nums;
}

input, textarea {
  font-family:
    'PingFang SC', 'Noto Sans SC', -apple-system, BlinkMacSystemFont,
    'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
}

/* 品牌高亮工具类 — 字体 + 字重单独叠加，字号继续走 type scale。
   用法：<text class="pd-font-display-brand">限时拼团</text>
   详见 doc/DESIGN_SYSTEM.md §2.5。 */
.pd-font-display-brand {
  font-family: 'Alimama ShuHeiTi', 'PingFang SC', 'Noto Sans SC', sans-serif;
  font-weight: 700;
}

/* 品牌高亮 — body (32rpx) 标签成品样式。
   仅用于 1–4 字短品牌标签（徽章、状态丸、内联 tag）。
   用法：<text class="pd-display-brand-label">已发货</text>
   详见 doc/DESIGN_SYSTEM.md §2.5。 */
.pd-display-brand-label {
  font-family: 'Alimama ShuHeiTi', 'PingFang SC', 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 32rpx;
  line-height: 48rpx;
  letter-spacing: 0;
}
</style>
