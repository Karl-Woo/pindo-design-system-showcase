<template>
  <pd-doc-shell active-path="button">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">按钮</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">语义化 &lt;button&gt; 元素，提供 6 种变体、单一 48px 尺寸（满足最小触控热区）、pill 全圆角、图标支持，以及完整的无障碍能力（聚焦环、aria-disabled、aria-busy、键盘导航）。</text>
      </view>

      <!-- Variants -->
      <text class="h3">变体</text>
      <text class="desc">6 种强调层级。单一 48px 尺寸 · body-lg 半粗文字 · pill 全圆角。</text>
      <view class="token-card">
        <view v-for="v in variants" :key="v.name" class="use-row">
          <pd-button :variant="v.key" text="标签" />
          <view class="use-info">
            <text class="use-name">{{ v.name }} · {{ v.key }}</text>
          </view>
        </view>
      </view>

      <!-- When to Use -->
      <text class="h3">使用场景</text>
      <view class="token-card">
        <view v-for="v in variants" :key="v.key" class="use-row">
          <pd-button :variant="v.key" text="Aa" />
          <view class="use-info">
            <text class="use-name">{{ v.name }}</text>
            <text class="use-desc">{{ v.guidance }}</text>
          </view>
        </view>
      </view>

      <!-- States per variant -->
      <text class="h3">状态</text>
      <text class="desc">每种变体在默认、禁用、加载中三种状态下的呈现。</text>
      <view class="state-matrix">
        <view class="state-matrix__header">
          <text class="state-matrix__label" />
          <text class="state-matrix__col">默认</text>
          <text class="state-matrix__col">禁用</text>
          <text class="state-matrix__col">加载中</text>
        </view>
        <view v-for="v in variants" :key="'state-'+v.key" class="state-matrix__row">
          <text class="state-matrix__label">{{ v.name }}</text>
          <view class="state-matrix__cell"><pd-button :variant="v.key" text="Aa" /></view>
          <view class="state-matrix__cell"><pd-button :variant="v.key" text="Aa" :disabled="true" /></view>
          <view class="state-matrix__cell"><pd-button :variant="v.key" :loading="true" /></view>
        </view>
      </view>

      <!-- Interaction states description -->
      <text class="h3">交互行为</text>
      <view class="token-card">
        <view class="interact-row"><text class="interact-state">悬停</text><text class="interact-desc">背景加深（填充 / 危险）或着色（次要色调 / 描边 / 幽灵）。仅 H5 生效。</text></view>
        <view class="interact-row"><text class="interact-state">按下</text><text class="interact-desc">scale(0.98) + 背景色位移。长按可观察效果。</text></view>
        <view class="interact-row"><text class="interact-state">聚焦</text><text class="interact-desc">4rpx brand-500 描边聚焦环。按 Tab 键导航查看。</text></view>
        <view class="interact-row"><text class="interact-state">禁用</text><text class="interact-desc">opacity 0.38，pointer-events: none，aria-disabled="true"。</text></view>
        <view class="interact-row"><text class="interact-state">加载中</text><text class="interact-desc">加载圈替换全部内容，pointer-events: none，aria-busy="true"。</text></view>
      </view>

      <!-- Full Width -->
      <text class="h3">通栏宽度</text>
      <pd-button variant="filled" text="提交订单" :block="true" />
      <view class="spacer-sm" />
      <pd-button variant="secondary" text="取消" :block="true" />

      <!-- Icon Left / Right -->
      <text class="h3">带图标</text>
      <text class="desc">图标可以放在左侧（默认）或右侧。</text>
      <view class="demo-row">
        <pd-button variant="filled" icon="plus" text="添加" />
        <pd-button variant="secondary" icon="arrow-right" iconPosition="right" text="下一步" />
      </view>
      <view class="demo-row">
        <pd-button variant="tonal" icon="star" text="收藏" />
        <pd-button variant="ghost" icon="share" text="分享" />
      </view>

      <!-- Icon Only -->
      <text class="h3">仅图标</text>
      <text class="desc">仅显示图标的方形按钮。适用于工具栏、关闭按钮、紧凑布局等。</text>
      <view class="demo-row">
        <pd-button variant="filled" icon="plus" :iconOnly="true" />
        <pd-button variant="tonal" icon="star" :iconOnly="true" />
        <pd-button variant="secondary" icon="setting" :iconOnly="true" />
        <pd-button variant="ghost" icon="close" :iconOnly="true" />
        <pd-button variant="danger" icon="close" :iconOnly="true" />
      </view>

      <!-- Stack (icon above text, square dock action) -->
      <text class="h3">图标 + 文字（方形 dock 动作）</text>
      <text class="desc">图标在上、文字在下的方形按钮（48×48px，pill 圆形）。用于客服 / 分享 / 收藏等底栏动作；图标 lg（24px），文字用 overline（10px Semibold）—— dock 专用，是对 §2 CJK 可读下限的刻意例外，勿外用。MDI 图标通过 #icon-left 槽传入。</text>
      <view class="demo-row">
        <pd-button variant="plain" stack text="客服">
          <template #icon-left><pd-icon name="face-agent" size="lg" color="primary" /></template>
        </pd-button>
        <pd-button variant="plain" stack text="分享">
          <template #icon-left><pd-icon name="open-in-new" size="lg" color="primary" /></template>
        </pd-button>
        <pd-button variant="ghost" stack text="收藏">
          <template #icon-left><pd-icon name="heart-outline" size="lg" color="brand" /></template>
        </pd-button>
      </view>

      <!-- In Context -->
      <text class="h3">实际场景</text>
      <text class="desc">表单底部：主要操作 + 幽灵取消。</text>
      <view class="ctx-card">
        <view class="ctx-footer">
          <pd-button variant="ghost" text="取消" />
          <pd-button variant="filled" text="确认" />
        </view>
      </view>
      <view class="spacer" />
      <text class="desc">由仅图标按钮组成的工具栏。</text>
      <view class="ctx-card">
        <view class="ctx-toolbar">
          <pd-button variant="ghost" icon="arrow-left" :iconOnly="true" />
          <text class="ctx-toolbar__title">编辑运单</text>
          <pd-button variant="ghost" icon="close" :iconOnly="true" />
          <pd-button variant="ghost" icon="more-dot-fill" :iconOnly="true" />
        </view>
      </view>

      <!-- Props -->
      <text class="h3">Props</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view v-for="p in props" :key="p.name" class="prop-row">
          <text class="prop-name mono">{{ p.name }}</text>
          <text class="prop-type">{{ p.type }}</text>
          <text class="prop-default mono">{{ p.default }}</text>
        </view>
      </view>

      <!-- Events -->
      <text class="h3">Events</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">事件</text>
          <text class="prop-h">参数</text>
          <text class="prop-h">触发时机</text>
        </view>
        <view class="prop-row">
          <text class="prop-name mono">click</text>
          <text class="prop-type">Event</text>
          <text class="prop-default">点击且非 disabled / loading 态</text>
        </view>
      </view>

      <!-- Accessibility -->
      <text class="h3">无障碍</text>
      <view class="token-card">
        <view class="a11y-row"><text class="a11y-label">元素</text><text class="a11y-val">&lt;button&gt;（原生，可聚焦）</text></view>
        <view class="a11y-row"><text class="a11y-label">键盘</text><text class="a11y-val">Tab 聚焦，Enter / Space 激活</text></view>
        <view class="a11y-row"><text class="a11y-label">聚焦环</text><text class="a11y-val">4rpx 实线 brand-500，偏移 4rpx</text></view>
        <view class="a11y-row"><text class="a11y-label">aria-disabled</text><text class="a11y-val">disabled=true 时设置</text></view>
        <view class="a11y-row"><text class="a11y-label">aria-busy</text><text class="a11y-val">loading=true 时设置</text></view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line"><text class="code-comment">// 主要操作</text></text>
        <text class="code-line">&lt;pd-button variant="filled" text="提交" /&gt;</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 图标在右</text></text>
        <text class="code-line">&lt;pd-button icon="arrow-right" iconPosition="right" text="下一步" /&gt;</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 仅图标（关闭按钮）</text></text>
        <text class="code-line">&lt;pd-button variant="ghost" icon="close" :iconOnly="true" /&gt;</text>
        <text class="code-line"></text>
        <text class="code-line"><text class="code-comment">// 通栏提交按钮</text></text>
        <text class="code-line">&lt;pd-button variant="filled" text="注册" :block="true" /&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">每个屏幕只用一个填充按钮。多个填充按钮会争夺注意力。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">次要强调使用 tonal —— 既携带品牌色，又不会喧宾夺主。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">"取消"、"跳过"、"忽略" 这类低强调操作使用 ghost。</text></view>
      <view class="rule rule--do"><text class="rule__icon">+</text><text class="rule__text">在工具栏和紧凑布局中使用仅图标按钮。桌面端可搭配 tooltip 使用。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要在没有解释的情况下禁用按钮。先把校验错误展示出来。</text></view>
      <view class="rule rule--dont"><text class="rule__icon">-</text><text class="rule__text">不要把 danger 用于非破坏性操作。红色保留给删除、移除、退出等不可逆动作。</text></view>

      <!-- Migration -->
      <text class="h3">从 v0 迁移</text>
      <view class="token-card">
        <view class="migrate-row">
          <text class="migrate-old mono">variant="primary"</text>
          <text class="migrate-arrow">&rarr;</text>
          <text class="migrate-new mono">variant="filled"</text>
        </view>
        <view class="migrate-row">
          <text class="migrate-old mono">variant="branded"</text>
          <text class="migrate-arrow">&rarr;</text>
          <text class="migrate-new mono">variant="tonal"</text>
        </view>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      variants: [
        { key: 'filled', name: '填充', guidance: '最高强调。登录、提交、确认 —— 每屏仅一个。' },
        { key: 'tonal', name: '色调', guidance: '中等强调，带品牌色调。申请、加入、保存 —— 与填充按钮搭配。' },
        { key: 'secondary', name: '次要', guidance: '描边样式。取消、编辑、筛选 —— 边界清晰、强调较弱。' },
        { key: 'ghost', name: '幽灵', guidance: '最低强调。跳过、忽略、关闭 —— 融入背景。' },
        { key: 'plain', name: '平实', guidance: '透明背景 + 中性黑字。卡片内的次要切换、链接型动作 —— 品牌红会过强时使用。' },
        { key: 'danger', name: '危险', guidance: '仅用于破坏性操作。删除、移除、退出 —— 红色提示不可逆。' }
      ],
      props: [
        { name: 'variant', type: 'String', default: "'filled'" },
        { name: 'loading', type: 'Boolean', default: 'false' },
        { name: 'disabled', type: 'Boolean', default: 'false' },
        { name: 'block', type: 'Boolean', default: 'false' },
        { name: 'text', type: 'String', default: "''" },
        { name: 'icon', type: 'String', default: "''" },
        { name: 'iconPosition', type: 'String', default: "'left'" },
        { name: 'iconOnly', type: 'Boolean', default: 'false' },
        { name: 'stack', type: 'Boolean', default: 'false' },
        { name: 'ariaLabel', type: 'String', default: "''" },
        { name: 'ariaPressed', type: 'Boolean | null', default: 'null' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.spacer { height: $pd-space-2; }
.spacer-sm { height: $pd-space-1; }

// ── Matrix ──
.matrix { background: $pd-surface-primary; border-radius: $pd-radius-md; box-shadow: $pd-elevation-1; overflow: hidden; }
.matrix-header { display: flex; align-items: center; padding: $pd-space-1 $pd-space-1-5; border-bottom: 1rpx solid $pd-border-light; }
.matrix-col { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; text-align: center; }
.matrix-row { display: flex; align-items: center; padding: $pd-space-1-5 $pd-space-1-5; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.matrix-label { @include pd-type(body-sm); color: $pd-text-secondary; width: 130rpx; flex-shrink: 0; }
.matrix-cell { flex: 1; @include pd-flex-center; }

// ── Token card ──
.use-row { display: flex; align-items: center; gap: $pd-space-1-5; padding: $pd-space-1-5 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.use-info { flex: 1; }
.use-name { @include pd-type(body-sm); color: $pd-text-primary; font-weight: $pd-font-semibold; display: block; }
.use-desc { @include pd-type(body-sm); color: $pd-text-tertiary; display: block; margin-top: 4rpx; }

// ── State matrix ──
.state-matrix { background: $pd-surface-primary; border-radius: $pd-radius-md; box-shadow: $pd-elevation-1; overflow: hidden; }
.state-matrix__header { display: flex; align-items: center; padding: $pd-space-1 $pd-space-1-5; border-bottom: 1rpx solid $pd-border-light; }
.state-matrix__col { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; text-align: center; }
.state-matrix__row { display: flex; align-items: center; padding: $pd-space-1-5 $pd-space-1-5; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.state-matrix__label { @include pd-type(body-sm); color: $pd-text-secondary; width: 130rpx; flex-shrink: 0; }
.state-matrix__cell { flex: 1; @include pd-flex-center; }

// ── Interaction table ──
.interact-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.interact-state { @include pd-type(body-sm); color: $pd-text-primary; font-weight: $pd-font-semibold; width: 140rpx; flex-shrink: 0; }
.interact-desc { @include pd-type(body-sm); color: $pd-text-tertiary; flex: 1; }

.demo-row { display: flex; align-items: center; gap: $pd-space-1-5; margin-bottom: $pd-space-1-5; flex-wrap: wrap; }
.demo-note { @include pd-type(body-sm); color: $pd-text-placeholder; }

// ── Context ──
.ctx-card { background: $pd-surface-primary; border-radius: $pd-radius-md; box-shadow: $pd-elevation-1; padding: $pd-space-2; }
.ctx-footer { display: flex; justify-content: flex-end; gap: $pd-space-1; }
.ctx-toolbar { display: flex; align-items: center; gap: $pd-space-half;
  &__title { @include pd-type(heading-3); color: $pd-text-primary; flex: 1; margin-left: $pd-space-half; }
}

// ── Props ──
.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; flex: 1; }

// ── Accessibility table ──
.a11y-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.a11y-label { @include pd-type(body-sm); color: $pd-text-primary; font-weight: $pd-font-medium; width: 200rpx; flex-shrink: 0; }
.a11y-val { @include pd-type(body-sm); color: $pd-text-tertiary; flex: 1; }

// ── Code ──

// ── Rules ──

// ── Migration ──
.migrate-row { display: flex; align-items: center; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.migrate-old { @include pd-type(body-sm); color: $pd-text-placeholder; text-decoration: line-through; flex: 1; }
.migrate-arrow { @include pd-type(body-lg); color: $pd-text-tertiary; padding: 0 $pd-space-1; }
.migrate-new { @include pd-type(body-sm); color: $pd-success-text; font-weight: $pd-font-semibold; flex: 1; }
</style>
