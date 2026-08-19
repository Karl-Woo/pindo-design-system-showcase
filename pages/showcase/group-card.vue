<template>
  <pd-doc-shell active-path="group-card">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">拼团卡片</text>
          <pd-badge variant="label" color="brand" text="新" />
        </view>
        <text class="pg-header__desc">买家全流程使用的拼团卡片。同一个组件覆盖 6 种状态变体，仅替换右下角的底部区域。</text>
      </view>

      <!-- ── Grouping ── -->
      <view class="sec-label"><text class="sec-label__text">GROUPING — 拼团中</text></view>
      <view class="sec-card sec-card--flush">
        <view class="ex">
          <text class="ex__cap">进度条 + 重量读数。图块上叠加日期徽章。</text>
          <pd-group-card
            status="grouping"
            title="广州 → 洛杉矶"
            company="海运拼团转运"
            distance="46km"
            :weight="23"
            :max-weight="50"
            :date-badge="{ month: 'OCT', day: '20' }"
            @action="onAction"
          />
        </view>
      </view>

      <!-- ── Nearby ── -->
      <view class="sec-label"><text class="sec-label__text">NEARBY — 附近团</text></view>
      <view class="sec-card sec-card--flush">
        <view class="ex">
          <text class="ex__cap">与拼团中样式一致；"附近团"发现页使用此变体。</text>
          <pd-group-card
            status="nearby"
            title="深圳 → 马尼拉"
            company="海邮达物流"
            distance="12km"
            :weight="38"
            :max-weight="50"
            :date-badge="{ month: 'OCT', day: '22' }"
            @action="onAction"
          />
        </view>
      </view>

      <!-- ── Packed ── -->
      <view class="sec-label"><text class="sec-label__text">PACKED — 已打包</text></view>
      <view class="sec-card sec-card--flush">
        <view class="ex">
          <text class="ex__cap">幽灵 CTA："去打包"。中性色标签。</text>
          <pd-group-card
            status="packed"
            title="广州 → 洛杉矶"
            company="海运拼团转运"
            distance="46km"
            date-text="10月11日"
            @action="onAction"
          />
        </view>
      </view>

      <!-- ── Pending Pay ── -->
      <view class="sec-label"><text class="sec-label__text">PENDING PAY — 待支付</text></view>
      <view class="sec-card sec-card--flush">
        <view class="ex">
          <text class="ex__cap">填充式主要 CTA："立即付款"。警示色标签。</text>
          <pd-group-card
            status="pending-pay"
            title="广州 → 洛杉矶"
            company="海运拼团转运"
            distance="46km"
            @action="onAction"
          />
        </view>
      </view>

      <!-- ── Shipping ── -->
      <view class="sec-label"><text class="sec-label__text">SHIPPING — 转运中</text></view>
      <view class="sec-card sec-card--flush">
        <view class="ex">
          <text class="ex__cap">幽灵 CTA："进入取货群"。信息色标签。</text>
          <pd-group-card
            status="shipping"
            title="广州 → 洛杉矶"
            company="海运拼团转运"
            distance="46km"
            date-text="10月11日"
            @action="onAction"
          />
        </view>
      </view>

      <!-- ── Delivered ── -->
      <view class="sec-label"><text class="sec-label__text">DELIVERED — 已送达</text></view>
      <view class="sec-card sec-card--flush">
        <view class="ex">
          <text class="ex__cap">终止状态下的弱化 CTA。成功色标签。</text>
          <pd-group-card
            status="delivered"
            title="广州 → 洛杉矶"
            company="海运拼团转运"
            distance="46km"
            date-text="10月11日"
            @action="onAction"
          />
        </view>
      </view>

      <!-- ── Props ── -->
      <view class="sec-label"><text class="sec-label__text">PROPS</text></view>
      <view class="sec-card sec-card--flush">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view class="prop-row"><text class="prop-name">status</text><text class="prop-type">String</text><text class="prop-default">必填</text></view>
        <view class="prop-row"><text class="prop-name">title</text><text class="prop-type">String</text><text class="prop-default">'拼团标题'</text></view>
        <view class="prop-row"><text class="prop-name">tags</text><text class="prop-type">Array</text><text class="prop-default">['海运','普货']</text></view>
        <view class="prop-row"><text class="prop-name">company</text><text class="prop-type">String</text><text class="prop-default">'转运公司名称'</text></view>
        <view class="prop-row"><text class="prop-name">distance</text><text class="prop-type">String</text><text class="prop-default">'46km'</text></view>
        <view class="prop-row"><text class="prop-name">dateText</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">dateBadge</text><text class="prop-type">Object</text><text class="prop-default">null</text></view>
        <view class="prop-row"><text class="prop-name">weight</text><text class="prop-type">Number</text><text class="prop-default">23</text></view>
        <view class="prop-row"><text class="prop-name">maxWeight</text><text class="prop-type">Number</text><text class="prop-default">50</text></view>
        <view class="prop-row"><text class="prop-name">progress</text><text class="prop-type">Number</text><text class="prop-default">-1</text></view>
      </view>

      <!-- ── Status values ── -->
      <view class="sec-label"><text class="sec-label__text">STATUS VALUES</text></view>
      <view class="sec-card sec-card--flush">
        <view class="prop-row"><text class="prop-name">grouping</text><text class="prop-type">进度条 + 重量</text><text class="prop-default">拼团中</text></view>
        <view class="prop-row"><text class="prop-name">nearby</text><text class="prop-type">进度条 + 重量</text><text class="prop-default">附近团</text></view>
        <view class="prop-row"><text class="prop-name">packed</text><text class="prop-type">幽灵 CTA</text><text class="prop-default">已打包</text></view>
        <view class="prop-row"><text class="prop-name">pending-pay</text><text class="prop-type">填充 CTA</text><text class="prop-default">待支付</text></view>
        <view class="prop-row"><text class="prop-name">shipping</text><text class="prop-type">幽灵 CTA</text><text class="prop-default">转运中</text></view>
        <view class="prop-row"><text class="prop-name">delivered</text><text class="prop-type">弱化 CTA</text><text class="prop-default">已送达</text></view>
      </view>

      <!-- ── Guidelines ── -->
      <view class="sec-label"><text class="sec-label__text">GUIDELINES</text></view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">日期徽章仅用于拼团中 / 附近团 —— 成团之后的状态以行内方式展示日期。</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">标题保持单行。组件本身已将标题截断至一行；文案也要足够短，能一眼看清。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要在同一个列表视图中混合不同状态。先过滤或分段再渲染 —— CTA 混杂的列表很难浏览。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  methods: {
    onAction(status) {
      uni.showToast({ title: `操作：${status}`, icon: 'none' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.sec-label { margin: $pd-space-3 0 $pd-space-1;
  &__text { @include pd-type(overline); color: $pd-text-tertiary; letter-spacing: 1rpx; }
}
.sec-card { background: $pd-surface-primary; border-radius: $pd-radius-md; box-shadow: $pd-elevation-1; overflow: hidden; padding: $pd-space-2; }
.sec-card--flush { padding: 0; }

.ex { padding: $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; }
  &__cap { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-bottom: $pd-space-1-5; }
}

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
