<template>
  <view class="pd-upload">
    <view
      v-for="(file, index) in files"
      :key="index"
      class="pd-upload__preview"
    >
      <image class="pd-upload__image" :src="file.url || file" mode="aspectFill" />
      <view
        v-if="!disabled"
        class="pd-upload__delete"
        hover-class="pd-upload__delete--pressed"
        :hover-stay-time="100"
        @click.stop="onDelete(index)"
      >
        <uv-icon name="close" size="12" color="#FFFFFF" />
      </view>
    </view>

    <view
      v-if="!disabled && files.length < max"
      class="pd-upload__add"
      hover-class="pd-upload__add--pressed"
      :hover-stay-time="100"
      @click="onAdd"
    >
      <uv-icon name="plus" size="24" :color="addIconColor" />
      <text class="pd-upload__add-text">{{ addText }}</text>
    </view>
  </view>
</template>

<script>
import { PD_TEXT_PLACEHOLDER } from '@/styles/tokens.js'

export default {
  name: 'pd-upload',
  // 同 pd-rate：声明对外事件，防止 fallthrough 二次绑定。当前根是 <view>，护栏性质。
  emits: ['input', 'change', 'delete'],
  props: {
    files: { type: Array, default: () => [] },
    max: { type: Number, default: 9 },
    addText: { type: String, default: 'Add' },
    disabled: { type: Boolean, default: false },
    sourceType: { type: Array, default: () => ['album', 'camera'] }
  },
  data() {
    return {
      // 双击护栏：uni.chooseImage 是回调式的，一次点击开两次相册会重复插入图片。
      // 刻意不用 @/mixins/actionLock.js —— showcase 的 sync 脚本只同步
      // components/pd-*、styles 和 utils/mdi-icons.js，不同步 mixins/，
      // 引进来会让 showcase 同步后构建失败。组件保持自包含。
      picking: false
    }
  },
  computed: {
    addIconColor() {
      // = $pd-text-placeholder / $pd-grey-600
      return PD_TEXT_PLACEHOLDER
    }
  },
  methods: {
    onAdd() {
      const remaining = this.max - this.files.length
      if (remaining <= 0) return
      if (this.picking) return
      this.picking = true
      // 兜底：万一 complete 不回调，也要放锁，否则上传按钮永久点不动
      const failsafe = setTimeout(() => { this.picking = false }, 10000)
      uni.chooseImage({
        count: remaining,
        sourceType: this.sourceType,
        success: (res) => {
          const newFiles = res.tempFilePaths.map((p) => ({ url: p }))
          this.$emit('input', [...this.files, ...newFiles])
          this.$emit('change', [...this.files, ...newFiles])
        },
        complete: () => {
          clearTimeout(failsafe)
          this.picking = false
        }
      })
    },
    onDelete(index) {
      const next = this.files.slice()
      next.splice(index, 1)
      this.$emit('input', next)
      this.$emit('change', next)
      this.$emit('delete', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
@import '@/styles/mixins.scss';

.pd-upload {
  display: flex;
  flex-wrap: wrap;
  gap: $pd-space-1;

  &__preview {
    position: relative;
    width: 160rpx;
    height: 160rpx;
    border-radius: $pd-radius-md;
    overflow: hidden;
    background: $pd-surface-secondary;
  }

  &__image {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__delete {
    position: absolute;
    top: 4rpx;
    right: 4rpx;
    width: 32rpx;
    height: 32rpx;
    border-radius: $pd-radius-circle;
    background: rgba(0, 0, 0, 0.6);
    @include pd-flex-center;
    transition: background $pd-duration-instant $pd-ease-standard;

    &--pressed {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  &__add {
    width: 160rpx;
    height: 160rpx;
    border-radius: $pd-radius-md;
    border: 2rpx dashed $pd-border-default;
    background: $pd-surface-primary;
    @include pd-flex-col;
    align-items: center;
    justify-content: center;
    transition: all $pd-duration-fast $pd-ease-standard;

    &--pressed {
      background: $pd-surface-hover;
      border-color: $pd-brand-500;
    }
  }

  &__add-text {
    @include pd-type(caption);
    color: $pd-text-tertiary;
    margin-top: $pd-space-half;
  }
}
</style>
