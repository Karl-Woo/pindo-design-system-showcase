<template>
  <pd-doc-shell active-path="dot-slider">
    <view class="pg">
      <view class="pg-header">
        <view class="pg-header__row">
          <text class="pg-header__title">档位滑块</text>
          <pd-badge variant="label" color="brand" text="新增" />
        </view>
        <text class="pg-header__desc">离散滑块组件，宽度自适应。滑块只能停留在 N 个圆点上，落点后会触发 change 事件，可在外层调用接口写入后端。</text>
      </view>

      <!-- 主示例：1:1 复刻 Figma -->
      <text class="h3">默认 4 档</text>
      <pd-card variant="elevated">
        <pd-dot-slider
          :value="weightIdx"
          :options="weightOptions"
          unit="kg"
          @input="weightIdx = $event"
          @change="onWeightChange"
        />

        <view class="state">
          <view class="state__row">
            <text class="state__k">当前索引</text>
            <text class="state__v">{{ weightIdx }}</text>
          </view>
          <view class="state__row">
            <text class="state__k">当前标签</text>
            <text class="state__v">{{ weightOptions[weightIdx].label }}</text>
          </view>
          <view class="state__row">
            <text class="state__k">后端数值 (kg)</text>
            <text class="state__v">{{ weightOptions[weightIdx].value }}</text>
          </view>
          <view class="state__row">
            <text class="state__k">最近一次发送</text>
            <text class="state__v">{{ lastSentSummary }}</text>
          </view>
          <view class="state__row">
            <text class="state__k">后端最近一次返回</text>
            <text class="state__v">{{ lastFetchedSummary }}</text>
          </view>
        </view>

        <view class="controls">
          <pd-button variant="secondary" text="重置" @click="weightIdx = 0" />
          <pd-button variant="filled" text="重新拉取" @click="reload" />
        </view>
      </pd-card>

      <!-- 自定义档位 -->
      <text class="h3">自定义档位与单位</text>
      <pd-card variant="elevated">
        <pd-dot-slider
          :value="speedIdx"
          :options="['慢', '一般', '较快', '极速']"
          unit=""
          @input="speedIdx = $event"
        />
      </pd-card>

      <!-- 禁用 -->
      <text class="h3">禁用态</text>
      <pd-card variant="elevated">
        <pd-dot-slider :value="2" :options="weightOptions" unit="kg" disabled />
      </pd-card>

      <!-- Props -->
      <text class="h3">Props</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">Prop</text>
          <text class="prop-h">Type</text>
          <text class="prop-h">Default</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">value</text>
          <text class="prop-type">Number</text>
          <text class="prop-default">0</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">options</text>
          <text class="prop-type">Array&lt;string | {label, value}&gt;</text>
          <text class="prop-default">[{label:'0-2',value:1.2}, {label:'2-5',value:3.3}, {label:'5-10',value:7.0}, {label:'10+',value:12.5}]</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">unit</text>
          <text class="prop-type">String</text>
          <text class="prop-default">'kg'</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">disabled</text>
          <text class="prop-type">Boolean</text>
          <text class="prop-default">false</text>
        </view>
      </view>

      <!-- Events -->
      <text class="h3">Events</text>
      <view class="token-card">
        <view class="prop-header">
          <text class="prop-h">事件</text>
          <text class="prop-h">参数</text>
          <text class="prop-h">说明</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">input</text>
          <text class="prop-type">(index)</text>
          <text class="prop-default">配合 v-model</text>
        </view>
        <view class="prop-row">
          <text class="prop-name">change</text>
          <text class="prop-type">(index, label, value)</text>
          <text class="prop-default">落到圆点时触发；value 为 options[index].value（后端数值），string 选项时回退到 index</text>
        </view>
      </view>

      <!-- Usage -->
      <text class="h3">使用方式</text>
      <view class="code-block">
        <text class="code-line code-comment">// 基础用法（字符串选项）</text>
        <text class="code-line">&lt;pd-dot-slider v-model="idx" :options="['0-2','2-5','5-10','10+']" unit="kg" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// 带后端数值（推荐用于会落库的字段；value = 估算单均重 kg）</text>
        <text class="code-line">const opts = [</text>
        <text class="code-line">  { label: '0-2',  value: 1.2  },</text>
        <text class="code-line">  { label: '2-5',  value: 3.3  },</text>
        <text class="code-line">  { label: '5-10', value: 7.0  },</text>
        <text class="code-line">  { label: '10+',  value: 12.5 }</text>
        <text class="code-line">]</text>
        <text class="code-line">&lt;pd-dot-slider :value="idx" :options="opts" @input="idx = $event" @change="onChange" /&gt;</text>
        <text class="code-line"> </text>
        <text class="code-line code-comment">// onChange 实现：第三个参数是后端数值</text>
        <text class="code-line">async onChange(idx, label, weight_kg) {</text>
        <text class="code-line">  await setDotSliderValue({ index: idx, label, weight_kg })</text>
        <text class="code-line">}</text>
      </view>

      <!-- Guidelines -->
      <text class="h3">规范指引</text>
      <view class="rule rule--do">
        <text class="rule__icon">+</text>
        <text class="rule__text">用于「粗略选择」的离散场景：重量区间、风险等级、紧急程度等。落点即提交。</text>
      </view>
      <view class="rule rule--dont">
        <text class="rule__icon">-</text>
        <text class="rule__text">不要用于连续数值（金额、温度）。连续数值请使用 primewind-sliderrange。</text>
      </view>
    </view>
  </pd-doc-shell>
</template>

<script>
import { setDotSliderValue, getDotSliderValue } from '@/api/dotSlider.js'

export default {
  data () {
    return {
      weightIdx: 1,
      // 每一档既有显示 label 又有要发给后端的数值。
      // value = 该区间的「估算单均重」(kg)，按真实用户分布得出
      // （0-2/2-5/5-10/10+ 分别覆盖 25.7% / 40.6% / 24.8% / 8.9%）。
      weightOptions: [
        { label: '0-2',  value: 1.2 },
        { label: '2-5',  value: 3.3 },
        { label: '5-10', value: 7.0 },
        { label: '10+',  value: 12.5 }
      ],
      speedIdx: 2,
      lastSent: null,
      lastFetched: null
    }
  },
  computed: {
    lastSentSummary () {
      if (!this.lastSent) return '尚未发送'
      return `index=${this.lastSent.index} · label=${this.lastSent.label} · weight_kg=${this.lastSent.weight_kg}`
    },
    lastFetchedSummary () {
      if (!this.lastFetched) return '尚未拉取'
      if (this.lastFetched.error) return `错误：${this.lastFetched.error}`
      return `index=${this.lastFetched.index} · label=${this.lastFetched.label} · weight_kg=${this.lastFetched.weight_kg}`
    }
  },
  methods: {
    async onWeightChange (idx, label, value) {
      // value 来自 component：当前档位对应的后端数值（weight_kg）。
      this.lastSent = { index: idx, label, weight_kg: value }
      // ⚠️ 真实接口请按业务接入；此处展示「落点即提交」的链路。
      try {
        await setDotSliderValue({ index: idx, label, weight_kg: value })
      } catch (e) {
        // 演示页：接口未接通也不阻塞 UI
        // 真实业务：在这里 toast 错误
      }
    },
    async reload () {
      try {
        const res = await getDotSliderValue({})
        // 兼容真实/Mock 返回结构
        const index = (res && (res.weight_range_index ?? res.index ?? res.value)) ?? this.weightIdx
        const opt = this.weightOptions[index] || { label: '', value: undefined }
        const label = (res && (res.weight_range_label ?? res.label)) ?? opt.label
        const weight_kg = (res && (res.weight_kg ?? res.value)) ?? opt.value
        this.lastFetched = { index, label, weight_kg }
        this.weightIdx = index
      } catch (e) {
        this.lastFetched = { error: e && e.message ? e.message : '拉取失败' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/doc-page.scss';

.controls { display: flex; justify-content: space-between; gap: $pd-space-1; margin-top: $pd-space-3; }

.state { margin-top: $pd-space-3; padding: $pd-space-1-5; background: $pd-surface-secondary; border-radius: $pd-radius-md;
  &__row { display: flex; justify-content: space-between; padding: $pd-space-half 0; }
  &__k { @include pd-type(body-sm); color: $pd-text-tertiary; }
  &__v { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; }
}

.prop-header { display: flex; padding: $pd-space-1 $pd-space-2; background: $pd-surface-secondary; }
.prop-h { @include pd-type(overline); color: $pd-text-tertiary; flex: 1; }
.prop-row { display: flex; padding: $pd-space-1 $pd-space-2; border-bottom: 1rpx solid $pd-border-light; &:last-child { border-bottom: none; } }
.prop-name { @include pd-type(body-sm); color: $pd-text-primary; font-family: 'SF Mono', Consolas, monospace; font-weight: $pd-font-medium; flex: 1; }
.prop-type { @include pd-type(body-sm); color: $pd-brand-500; flex: 1; }
.prop-default { @include pd-type(body-sm); color: $pd-text-placeholder; font-family: 'SF Mono', Consolas, monospace; flex: 1; }

</style>
