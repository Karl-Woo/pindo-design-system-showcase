<template>
  <pd-doc-shell active-path="tabs">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">标签页</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">页内标签页用于在同级视图间切换。下划线变体适用于主导航，胶囊变体适用于筛选场景。</text>
      </view>

      <!-- Underline -->
      <text class="h3">下划线（默认）</text>
      <view class="demo">
        <pd-tabs
          :items="tabs"
          :value="tabIndex"
          @change="tabIndex = $event"
        />
        <view class="demo-body">
          <text class="demo-body__text">已选择：{{ tabs[tabIndex] }}</text>
        </view>
      </view>

      <!-- Pill -->
      <text class="h3">胶囊</text>
      <view class="demo">
        <pd-tabs
          variant="pill"
          :items="pillTabs"
          :value="pillIndex"
          @change="pillIndex = $event"
        />
        <view class="demo-body">
          <text class="demo-body__text">筛选：{{ pillTabs[pillIndex] }}</text>
        </view>
      </view>

      <!-- Switcher (iOS-style content switcher) -->
      <text class="h3">分段切换（switcher）</text>
      <view class="demo">
        <pd-tabs
          variant="switcher"
          :items="['保留包装', '部分拆包装']"
          :value="switchIndex"
          @change="switchIndex = $event"
        />
      </view>
      <view class="demo">
        <pd-tabs
          variant="switcher"
          :items="[{ label: '申请团长', badge: '3%返现' }, { label: '下次再说' }]"
          :value="leadIndex"
          @change="leadIndex = $event"
        />
        <view class="demo-body">
          <text class="demo-body__text"
            >switcher：tertiary 轨道 + 白色选中块 + 单行不换行；item 可带
            badge（激励标签）。</text
          >
        </view>
      </view>

      <!-- In a card -->
      <text class="h3">卡片中的标签页</text>
      <pd-card variant="elevated" padding="none">
        <pd-tabs :items="['详情', '评价', '规格']" :value="0" />
        <view class="card-body">
          <text class="card-body__text">标签内容显示在这里。</text>
        </view>
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
          <text class="prop-name">items</text>
          <text class="prop-type">Array</text>
          <text class="prop-default">[]</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">value</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">0</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">variant</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'underline'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">sticky</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 下划线标签页</text>
        <text class="code-line">&lt;pd-tabs :items="['One','Two','Three']" v-model="index" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 胶囊筛选标签页</text>
        <text class="code-line">&lt;pd-tabs variant="pill" :items="filters" v-model="active" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 分段切换 + 激励 badge</text>
        <text class="code-line">&lt;pd-tabs variant="switcher" :items="[{ label:'申请团长', badge:'3%返现' }, '下次再说']" v-model="i" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">建议使用 2-5 个标签项，更多项时改用下拉菜单或可横向滚动的列表。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要用标签页承载顺序性流程，这类场景应使用步骤条。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['全部', '进行中', '已完成'],
      tabIndex: 0,
      pillTabs: ['最新', '热门', '推荐'],
      pillIndex: 1,
      switchIndex: 0,
      leadIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.demo { background: $pd-surface-primary; border-radius: $pd-radius-md; box-shadow: $pd-elevation-1; overflow: hidden; }
.demo-body { padding: $pd-space-3 $pd-space-2;
  &__text { @include pd-type(body-lg); color: $pd-text-secondary; }
}
.card-body { padding: $pd-space-3 $pd-space-2;
  &__text { @include pd-type(body-lg); color: $pd-text-secondary; }
}

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
