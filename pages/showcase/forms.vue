<template>
  <pd-doc-shell active-path="forms">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">表单模式</text>
          <pd-badge variant="label" color="success" text="稳定" />
        </view>
        <text class="pg-header__desc">用于注册、设置和数据录入的标准表单模式，支持行内校验。</text>
      </view>

      <!-- Registration Form -->
      <text class="h3">注册表单</text>
      <pd-card variant="elevated">
        <pd-input label="手机号" placeholder="请输入手机号" v-model="regPhone" required />
        <view class="form-gap" />
        <pd-input label="密码" placeholder="请设置登录密码" v-model="regPassword" type="password" password required />
        <view class="form-gap" />
        <pd-input label="确认密码" placeholder="请再次输入密码" v-model="regConfirm" type="password" password required />
        <view class="form-gap-lg" />
        <pd-button block @click="onRegister">创建账号</pd-button>
      </pd-card>

      <!-- Settings Form -->
      <text class="h3">设置表单</text>
      <pd-card variant="elevated">
        <pd-form-field label="昵称">
          <uv-input v-model="settingsNickname" placeholder="请输入昵称" />
        </pd-form-field>
        <view class="form-gap" />
        <pd-form-field label="个人简介">
          <uv-textarea v-model="settingsBio" placeholder="写一段简短的介绍" count maxlength="120" />
        </pd-form-field>
        <view class="form-gap" />
        <pd-form-field label="消息推送">
          <uv-switch v-model="settingsNotify" />
        </pd-form-field>
      </pd-card>

      <!-- Validation -->
      <text class="h3">校验</text>
      <pd-card variant="elevated">
        <pd-input label="邮箱" placeholder="请输入邮箱地址" v-model="valEmail" error="请输入有效的邮箱地址" required />
        <view class="form-gap" />
        <pd-input label="密码" placeholder="至少 8 个字符" v-model="valPassword" type="password" password error="密码长度不能少于 8 位" required />
        <view class="form-gap-lg" />
        <pd-button block disabled>提交</pd-button>
      </pd-card>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 注册模式</text>
        <text class="code-line">&lt;pd-card variant="elevated"&gt;</text>
        <text class="code-line">  &lt;pd-input label="Phone" v-model="phone" required /&gt;</text>
        <text class="code-line">  &lt;pd-input label="Password" v-model="pw" password /&gt;</text>
        <text class="code-line">  &lt;pd-button block @click="submit"&gt;Register&lt;/pd-button&gt;</text>
        <text class="code-line">&lt;/pd-card&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 带开关的设置项</text>
        <text class="code-line">&lt;pd-form-field label="Notifications"&gt;</text>
        <text class="code-line">  &lt;uv-switch v-model="notify" /&gt;</text>
        <text class="code-line">&lt;/pd-form-field&gt;</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">主操作按钮放在表单底部并通栏铺满，便于拇指点按。</text>
      </view>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">在每个字段下方进行行内校验，让用户在上下文中看到错误。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要用 toast 提示表单校验错误，提示会一闪而过且丢失上下文。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要在不指明出错字段的情况下直接禁用提交按钮。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
export default {
  data() {
    return {
      regPhone: '',
      regPassword: '',
      regConfirm: '',
      settingsNickname: '',
      settingsBio: '',
      settingsNotify: true,
      valEmail: 'bad-email',
      valPassword: '123'
    }
  },
  methods: {
    onRegister() {
      uni.showToast({ title: '表单已提交', icon: 'none' })
    }
  }
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

.form-gap { height: $pd-space-2; }
.form-gap-lg { height: $pd-space-3; }
</style>
