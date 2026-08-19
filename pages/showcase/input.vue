<template>
  <pd-doc-shell active-path="input" title="输入框与表单字段">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">输入框、多行文本、搜索</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">pd-input、pd-textarea、pd-search 在原生控件外层封装了标签、错误提示、辅助说明以及聚焦环。pd-form-field 可为任意控件提供统一的标签 / 错误提示展示。</text>
      </view>

      <!-- ── pd-input ── -->
      <view class="sec-label">
        <text class="sec-label__text">PD-INPUT</text>
      </view>
      <view class="sec-card">
        <view class="ex">
          <text class="ex__cap">默认</text>
          <pd-input label="邮箱" placeholder="you@example.com" v-model="email" />
        </view>
        <view class="ex">
          <text class="ex__cap">带辅助说明</text>
          <pd-input
            label="显示名称"
            placeholder="请输入显示名称"
            v-model="displayName"
            helper="其他用户将在 Pindo 上看到此名称"
          />
        </view>
        <view class="ex">
          <text class="ex__cap">必填</text>
          <pd-input label="手机号" placeholder="请输入手机号" v-model="phone" required />
        </view>
        <view class="ex">
          <text class="ex__cap">密码</text>
          <pd-input label="密码" placeholder="请输入密码" v-model="password" type="password" password />
        </view>
        <view class="ex">
          <text class="ex__cap">错误</text>
          <pd-input label="用户名" placeholder="请输入用户名" v-model="errorVal" error="该用户名已被占用" />
        </view>
        <view class="ex">
          <text class="ex__cap">禁用</text>
          <pd-input label="账户 ID" placeholder="自动生成" value="PKG-20260413" disabled />
        </view>
        <view class="ex">
          <text class="ex__cap">带 suffix（单位指示）</text>
          <pd-input
            label="精确重量"
            placeholder="例如 12.5"
            type="digit"
            v-model="weight"
            :clearable="false"
          >
            <template #suffix>
              <text class="suffix-unit">kg</text>
            </template>
          </pd-input>
        </view>
      </view>

      <!-- ── pd-textarea ── -->
      <view class="sec-label">
        <text class="sec-label__text">PD-TEXTAREA</text>
      </view>
      <view class="sec-card">
        <view class="ex">
          <text class="ex__cap">带字数统计</text>
          <pd-textarea
            label="描述"
            placeholder="请描述您的货物信息"
            v-model="description"
            :maxlength="200"
            show-count
          />
        </view>
        <view class="ex">
          <text class="ex__cap">错误</text>
          <pd-textarea
            label="备注"
            placeholder="给司机的备注"
            v-model="notes"
            error="备注不能为空"
          />
        </view>
      </view>

      <!-- ── pd-search ── -->
      <view class="sec-label">
        <text class="sec-label__text">PD-SEARCH</text>
      </view>
      <view class="sec-card">
        <view class="ex">
          <text class="ex__cap">默认</text>
          <pd-search v-model="query" placeholder="搜索运单" />
        </view>
        <view class="ex">
          <text class="ex__cap">带取消按钮</text>
          <pd-search
            v-model="query2"
            placeholder="搜索港口"
            show-cancel
            @cancel="query2 = ''"
          />
        </view>
        <view class="ex">
          <text class="ex__cap">禁用</text>
          <pd-search value="只读查询" disabled />
        </view>
      </view>

      <!-- pd-form-field is embedded inside pd-input / pd-textarea — consumers
           don't normally call it directly. The 昵称 / raw-uv-input pattern
           was removed: pd-input is the canonical input contract; bare
           uv-input under pd-form-field gets no box styling and shouldn't
           ship to users. -->

      <!-- ── Props ── -->
      <view class="sec-label">
        <text class="sec-label__text">PROPS</text>
      </view>
      <view class="sec-card sec-card--flush">
        <view class="prop-header">
          <text class="prop-h">属性</text>
          <text class="prop-h">类型</text>
          <text class="prop-h">默认值</text>
        </view>
        <view class="prop-row"><text class="prop-name">label</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">error</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">helper</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">required</text><text class="prop-type">Boolean</text><text class="prop-default">false</text></view>
        <view class="prop-row"><text class="prop-name">value</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">type</text><text class="prop-type">String</text><text class="prop-default">'text'</text></view>
        <view class="prop-row"><text class="prop-name">placeholder</text><text class="prop-type">String</text><text class="prop-default">''</text></view>
        <view class="prop-row"><text class="prop-name">disabled</text><text class="prop-type">Boolean</text><text class="prop-default">false</text></view>
        <view class="prop-row"><text class="prop-name">clearable</text><text class="prop-type">Boolean</text><text class="prop-default">true</text></view>
        <view class="prop-row"><text class="prop-name">password</text><text class="prop-type">Boolean</text><text class="prop-default">false</text></view>
        <view class="prop-row"><text class="prop-name">cursorSpacing</text><text class="prop-type">Number | String</text><text class="prop-default">0</text></view>
      </view>
      <text class="desc">上表为 pd-input 的属性（type / clearable / password 为其专有）。三个组件都用 v-model 绑值，但底层 prop 名不同：<text class="desc-strong">pd-textarea 是 modelValue</text>（Vue 3 原生契约），pd-input / pd-search 是 value（v-model 经 $attrs 透传给内层 uv-input 生效）。pd-textarea 另有 maxlength / showCount / autoHeight。</text>
      <text class="desc">cursorSpacing：软键盘弹起时输入框与键盘保持的距离（px）。默认 0 会让输入框贴着键盘顶端 —— 页面若有固定底部栏会盖住它。传入 ≈ 底部栏高度可把输入框顶到键盘和底部栏之上；同时确保输入框下方有足够滚动空间（否则实际距离 = min(距底部距离, cursorSpacing) 会被夹小）。App/小程序生效，H5 由浏览器原生处理。</text>

      <!-- ── Usage ── -->
      <view class="sec-label">
        <text class="sec-label__text">USAGE</text>
      </view>
      <view class="code-block">
        <text class="code-line code-comment">// pd-input 带标签和辅助说明</text>
        <text class="code-line">&lt;pd-input</text>
        <text class="code-line">  label="邮箱"</text>
        <text class="code-line">  placeholder="you@example.com"</text>
        <text class="code-line">  v-model="email"</text>
        <text class="code-line">  helper="我们绝不会泄露您的邮箱"</text>
        <text class="code-line">/&gt;</text>
      </view>

      <!-- ── Guidelines ── -->
      <view class="sec-label">
        <text class="sec-label__text">GUIDELINES</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">将错误提示直接展示在字段下方，让用户清楚地看到哪个字段需要修改。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要使用 toast 来展示表单校验错误。toast 会自动消失，用户会丢失上下文。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      displayName: '',
      phone: '',
      password: '',
      errorVal: 'karl',
      description: '',
      notes: '',
      query: '',
      query2: '',
      weight: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

// 正文内强调（.desc 内联使用）
.desc-strong {
  font-weight: $pd-font-semibold;
  color: $pd-text-secondary;
}

// ── Section label (small uppercase overline) ──
.sec-label {
  padding: $pd-space-2 $pd-space-1 $pd-space-1;
  &__text {
    @include pd-type(overline);
    color: $pd-brand-500;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
}

// ── Card wrapping examples ──
// Vertical padding bumped from $pd-space-half (4px) → $pd-space-1 (8px) for
// breathing room around the first/last example row.
.sec-card {
  background: $pd-surface-primary;
  border-radius: $pd-radius-md;
  box-shadow: $pd-elevation-1;
  padding: $pd-space-1 $pd-space-2;
  &--flush { padding: 0; overflow: hidden; }
}

// ── Example inside a card ──
// Row padding $pd-space-1 (8px) → $pd-space-1-5 (12px) and caption gap
// $pd-space-half (4px) → $pd-space-1 (8px) so each demo row has more
// vertical air around its caption + control.
.ex {
  padding: $pd-space-1-5 0;
  border-bottom: 1rpx solid $pd-border-light;
  &:last-child { border-bottom: none; }
  &__cap {
    @include pd-type(body-sm);
    color: $pd-text-tertiary;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: $pd-space-1;
  }
}

// Unit suffix inside the input (kg, $, %, …) — neutral tertiary so it
// doesn't compete with the user's own value.
.suffix-unit {
  @include pd-type(body-lg);
  color: $pd-text-tertiary;
  margin-left: $pd-space-half;
}

// ── Props table ──
.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row {
  display: flex; padding: $pd-space-1 $pd-space-2;
  border-bottom: 1rpx solid $pd-border-light;
  &:last-child { border-bottom: none; }
}
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
