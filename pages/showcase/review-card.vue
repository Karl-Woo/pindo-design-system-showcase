<template>
  <pd-doc-shell active-path="review-card">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">评价卡</text>
          <pd-badge variant="label" color="success" text="新增" />
        </view>
        <text class="pg-header__desc">
          一条用户评价：头像 · 昵称 · 日期 · 正文 · 两个评分（拼团评价 / 转运公司）· 图片。
          同一条评价在 App 里有两种呈现，用 variant 区分 —— compact 是拼团详情的横滑卡，
          full 是全部评价页的列表行。
        </text>
      </view>

      <!-- ── variant ── -->
      <text class="h3">variant · compact（拼团详情横滑卡）</text>
      <text class="p">固定 312px 宽的 grey-50 方块，正文截断 2 行，图片最多 2 张、其余收进「+N」。宽度是按「一屏看到 1 张 + 下一张的边」定的。</text>
      <view class="demo demo--dark-bg">
        <pd-review-card v-bind="base" />
      </view>

      <text class="h3">variant · full（全部评价页列表行）</text>
      <text class="p">满宽、无底色、行间 hairline 分隔。正文<text class="hl">不截断</text>，图片 flex-wrap 全部显示 —— 这里就是「读完整评价」的地方。</text>
      <view class="demo demo--list">
        <pd-review-card v-bind="base" variant="full" />
        <pd-review-card v-bind="long" variant="full" />
      </view>

      <!-- ── 长文本 ── -->
      <text class="h3">长文本 · 昵称</text>
      <text class="p">
        昵称是用户可控字段，必然会超长。<text class="hl">两个 variant 都截断成 1 行</text>，日期永不换行 ——
        这条规则住在组件里，所以两边不可能再各修各的。下面 compact / full 各一张：
      </text>
      <view class="demo demo--dark-bg">
        <pd-review-card v-bind="base" :nickname="LONG_NAME" />
      </view>
      <view class="demo demo--list">
        <pd-review-card v-bind="base" variant="full" :nickname="LONG_NAME" />
      </view>

      <text class="h3">长文本 · 正文</text>
      <text class="p">左 compact 截 2 行 + 省略号；右 full 全文。同一条评价。</text>
      <view class="demo demo--dark-bg">
        <pd-review-card v-bind="long" />
      </view>
      <view class="demo demo--list">
        <pd-review-card v-bind="long" variant="full" />
      </view>

      <!-- ── 图片 ── -->
      <text class="h3">图片 · 封顶与「+N」</text>
      <text class="p">compact 的 body 只有 236px，塞得下 2 张 88px 方图（88+8+88=184），第 3 张会被卡边裁掉。所以超出的收进「+N」—— 点任意图仍打开<text class="hl">全部</text>图的预览器，封顶不丢信息。</text>
      <view class="demo demo--dark-bg demo--row">
        <pd-review-card v-bind="base" :images="[P(1), P(2)]" />
        <pd-review-card v-bind="base" :images="[P(1), P(2), P(3)]" />
        <pd-review-card v-bind="base" :images="[P(1), P(2), P(3), P(4), P(5)]" />
      </view>
      <text class="p">同样 5 张图在 full 下全部显示（wrap 到第二行）：</text>
      <view class="demo demo--list">
        <pd-review-card v-bind="base" variant="full" :images="[P(1), P(2), P(3), P(4), P(5)]" />
      </view>

      <!-- ── 对比度 ── -->
      <text class="h3">「+N」蒙层对比度</text>
      <text class="p">
        蒙层背景是<text class="hl">用户上传的图</text>，可能是纯白（白袋子 / 过曝）。用 elevation 那套的 opacity-scrim（0.40）时白字只有
        2.85:1，不过 WCAG AA；所以这里用 <text class="mono">opacity-scrim-heavy</text>（0.60）→ 5.74:1。左白右深，两边都该清楚：
      </text>
      <view class="demo demo--dark-bg demo--row">
        <pd-review-card v-bind="base" :images="[WHITE, WHITE, WHITE, WHITE]" />
        <pd-review-card v-bind="base" :images="[DARK, DARK, DARK, DARK]" />
      </view>

      <!-- ── 缺字段 ── -->
      <text class="h3">字段缺失</text>
      <text class="p">后端可能回空串 / 0 / null。正文为空时整行塌陷，不留空洞。</text>
      <view class="demo demo--dark-bg demo--row">
        <pd-review-card v-bind="base" content="" />
        <pd-review-card v-bind="base" :group-rating="0" :transport-rating="null" content="没打分" />
        <pd-review-card v-bind="base" nickname="" />
      </view>

      <!-- ── Props ── -->
      <text class="h3">属性 · pd-review-card</text>
      <view class="token-card">
        <view class="prop-header"><text class="prop-h">属性</text><text class="prop-h">类型</text><text class="prop-h">默认值</text></view>
        <view class="prop-row"><text class="prop-name">variant</text><text class="prop-type">String</text><text class="prop-default">'compact'</text></view>
        <view class="prop-row"><text class="prop-name">avatar</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">nickname</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">time</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">content</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">groupRating</text><text class="prop-type">Number | String</text><text class="prop-default">0</text></view>
        <view class="prop-row"><text class="prop-name">transportRating</text><text class="prop-type">Number | String</text><text class="prop-default">0</text></view>
        <view class="prop-row"><text class="prop-name">images</text><text class="prop-type">Array</text><text class="prop-default">[]</text></view>
      </view>

      <text class="h3">用法</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// 拼团详情横滑卡</text></text>
        <text class="code-line">&lt;pd-review-card variant="compact"</text>
        <text class="code-line">  :nickname="r.user_nickname" :time="r.created_time"</text>
        <text class="code-line">  :content="r.content" :images="r.images"</text>
        <text class="code-line">  :group-rating="r.group_rating" :transport-rating="r.transport_rating" /&gt;</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 全部评价页列表行</text></text>
        <text class="code-line">&lt;pd-review-card variant="full" … /&gt;</text>
      </view>

      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">time 传后端原始时间戳即可，组件自己只取日期；两个页面显示格式因此永远一致。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">图片点击已内建 previewImage，且永远传全量图 —— 这正是 compact 敢封顶的前提。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要为了「只想要截断」或「只想要 wrap」新开 prop。两个 variant 就是 App 里仅有的两种形态；每多一个旋钮就是一份永久公共 API。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要把这张卡复制去别处改 —— 它存在的原因就是两个页面各抄一份后漂移，详情页修好的长昵称 bug 半年没同步到全部评价页。</text></view>
    </view>
  </pd-doc-shell>
</template>

<script>
// 纯色图必须走 base64：uni 的 <image> 把 src 塞进内层 div 的 background-image,
// 原始 `;utf8,<svg …>` 里的 < > " 会让 CSS url() 解析失败并静默变 none（<img>
// 那边照样 load 成功，所以「图加载了吗」的检查会骗人）。
const swatch = (hex) =>
  'data:image/svg+xml;base64,' +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${hex}"/></svg>`)

const LONG_NAME = '这是一个非常非常长的用户昵称用来测试溢出行为到底会怎样'

export default {
  data() {
    return {
      LONG_NAME,
      WHITE: swatch('#ffffff'),
      DARK: swatch('#222222'),
      base: {
        nickname: '叉叉歪',
        time: '2026-04-02 14:30:00',
        content: '九尘 还得是你九尘',
        groupRating: 5,
        transportRating: 5,
        images: ['https://picsum.photos/200/200?random=1'],
      },
      long: {
        nickname: '九尘',
        time: '2026-04-02 09:10:00',
        content: '这条评价非常长，用来测试两行截断之后的效果到底如何。'.repeat(8),
        groupRating: 4,
        transportRating: 3,
        images: [],
      },
    }
  },
  methods: {
    P(n) {
      return `https://picsum.photos/200/200?random=${n}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.hl {
  color: $pd-brand-500;
  font-weight: $pd-font-semibold;
}
.demo {
  margin-bottom: $pd-space-2;

  // compact 卡本身是 grey-50，跟文档页白底贴一起看不出边界 —— 垫一层灰底
  &--dark-bg {
    background: $pd-surface-secondary;
    border-radius: $pd-radius-md;
    padding: $pd-space-2;
    overflow-x: auto;
  }
  // full 是给白底列表用的，且自带 hairline 分隔
  &--list {
    background: $pd-surface-primary;
    border: 1rpx solid $pd-border-light;
    border-radius: $pd-radius-md;
    padding: 0 $pd-space-2;
  }
  // 并排比较多张 compact
  &--row {
    display: flex;
    gap: $pd-space-1-5;
  }
}
</style>
