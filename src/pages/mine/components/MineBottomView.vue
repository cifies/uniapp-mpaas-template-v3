<!-- 我的-社交模块 -->
<template>
  <view class="mine-bottom-view">
    <view v-for="name in socialList" :key="name" class="cell" @click="didSelectItem(name)">
      <i class="iconfont" :class="[getSocialValue(name)]" />
      <text class="name">{{ name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, toRef, unref, watch } from 'vue'

const props = defineProps({
  social: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const socialList = ref<Array<string>>(['0', '2', '3', '4'])
const tmpSocial = toRef(props, 'social')

watch(
  tmpSocial,
  (newVal) => {
    if (!newVal) return
    socialList.value = Object.keys(newVal)
  },
  {
    immediate: true
  }
)

const getSocialValue = (k: string) => {
  const v = props.social[`${k}`]
  const arr = v.split(' || ')
  const iconName = arr[1] ?? 'gitee'
  if (iconName === 'google') return 'gitee'
  return iconName
}

function didSelectItem(k: string): void {
  const v = unref(tmpSocial)[`${k}`]
  const arr: string[] = v.split(' || ') || ['https://www.cqzhong.cn']
  uni.setClipboardData({
    data: arr[0],
    success: () =>
      uni.showToast({
        title: '链接已复制，请在浏览器打开',
        icon: 'none'
      })
  })
}
</script>

<style lang="scss" scoped>
.mine-bottom-view {
  margin-top: 64rpx;
  width: 100%;
  height: 160rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .cell {
    margin-bottom: 40rpx;
    width: 325rpx;
    height: 117rpx;
    background: #ffffff;
    box-shadow: 0 0 33rpx 0 #f2f2f9;
    border-radius: 12rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .iconfont {
      color: #000000;
      font-size: 48rpx;
      margin-left: 74rpx;
      margin-right: 27rpx;
      font-weight: normal;
    }
    .gitee {
      font-size: 42rpx;
      margin-right: 33rpx;
    }
    .name {
      color: $u-main-color;
      font: 32rpx/45rpx 'PingFangSC-Regular, PingFang SC';
    }
  }
}
</style>
