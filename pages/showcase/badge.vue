<template>
  <pd-doc-shell active-path="badge">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">徽章</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">徽章用于呈现状态、数量与标签。提供四种变体以适配不同场景，并支持自定义颜色。</text>
      </view>

      <!-- Variant Grid -->
      <text class="h3">变体</text>
      <view class="badge-grid">
        <view class="badge-cell">
          <text class="desc">status</text>
          <pd-badge variant="status" text="进行中" />
        </view>
        <view class="badge-cell">
          <text class="desc">dot</text>
          <pd-badge variant="dot" />
        </view>
        <view class="badge-cell">
          <text class="desc">count</text>
          <pd-badge variant="count" :value="8" />
        </view>
        <view class="badge-cell">
          <text class="desc">label</text>
          <pd-badge variant="label" text="新" />
        </view>
      </view>

      <!-- Count Overflow -->
      <text class="h3">计数溢出</text>
      <view class="badge-row">
        <pd-badge variant="count" :value="5" />
        <pd-badge variant="count" :value="42" />
        <pd-badge variant="count" :value="99" />
        <pd-badge variant="count" :value="150" />
      </view>
      <text class="desc">超过 99 的数值显示为 99+</text>

      <!-- Custom Colors -->
      <text class="h3">自定义颜色</text>
      <view class="badge-row">
        <pd-badge variant="status" text="成功" color="success" />
        <pd-badge variant="status" text="警告" color="warning" />
        <pd-badge variant="status" text="错误" color="error" />
        <pd-badge variant="status" text="信息" color="info" />
      </view>

      <!-- Label 语义色（含新增 neutral 中性灰） -->
      <text class="h3">标签色（label variant）</text>
      <view class="badge-row">
        <pd-badge variant="label" text="品牌" />
        <pd-badge variant="label" text="中性灰" color="neutral" />
        <pd-badge variant="label" text="成功" color="success" />
        <pd-badge variant="label" text="警告" color="warning" />
      </view>
      <text class="desc">同尺寸 / 内距 / 字重，visual weight 一致，仅颜色不同；neutral 为 token 化灰。</text>

      <!-- In Context -->
      <text class="h3">实际场景</text>
      <text class="desc">列表项中的徽章</text>
      <pd-card variant="elevated" padding="none">
        <pd-list-item title="收件箱" divider>
          <template #right>
            <pd-badge variant="count" :value="12" />
          </template>
        </pd-list-item>
        <pd-list-item title="通知" divider>
          <template #right>
            <pd-badge variant="dot" />
          </template>
        </pd-list-item>
        <pd-list-item title="运单状态">
          <template #right>
            <pd-badge variant="status" text="运输中" color="warning" />
          </template>
        </pd-list-item>
      </pd-card>

      <!-- Props -->
      <text class="h3">属性</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">variant</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'status'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">color</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'default'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">text</text>
          <text class="prop-type">String</text>
          <text class="prop-default">''</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">value</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">0</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 状态徽章</text>
        <text class="code-line">&lt;pd-badge variant="status" text="Active" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 带溢出处理的计数徽章</text>
        <text class="code-line">&lt;pd-badge variant="count" :value="150" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 自定义颜色</text>
        <text class="code-line">&lt;pd-badge variant="status" text="Error" color="error" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">在不需要展示具体数量的未读提示场景中，使用圆点变体。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">数值超过 999 时不要继续使用计数徽章，应显示为 1K+ 等缩写形式。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

.badge-grid { display: flex; flex-wrap: wrap; gap: $pd-space-2; }
.badge-cell { display: flex; flex-direction: column; align-items: center; gap: $pd-space-1; }
.badge-row { display: flex; align-items: center; gap: $pd-space-2; flex-wrap: wrap; margin-bottom: $pd-space-1; }
</style>
