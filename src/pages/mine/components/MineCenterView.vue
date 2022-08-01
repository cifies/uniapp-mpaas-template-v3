<!-- 我的-中间模块 -->
<template>
  <view class="mine-center-view">
    <view
      v-for="(num, idx) in [userStore.getArticleNum, categoriesNum, tagNum]"
      :key="idx"
      class="cell"
      @click="didSelectItem(idx)"
    >
      <text class="tit">{{ num }}</text>
      <text class="sub">{{ list[idx] }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/pinia/user'

const userStore = useUserStore()

const props = defineProps({
  categoriesNum: {
    type: Number,
    default: 0
  },
  tagNum: {
    type: Number,
    default: 0
  }
})

const list = ['日志', '分类', '标签']

function didSelectItem(idx = 0) {
  if (idx === 0) {
    uni.switchTab({
      url: '/pages/home/home'
    })
    return
  }

  if (idx === 1) {
    uni.navigateTo({
      url: '/pages/categories/categories'
    })
    return
  }
  uni.navigateTo({
    url: '/pages/tags/tags'
  })
}
</script>

<style lang="scss" scoped>
.mine-center-view {
  margin-top: 40rpx;
  width: 100%;
  height: 160rpx;
  background: #f7f8fa;
  border-radius: 8rpx;
  padding: 32rpx 80rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .cell {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 96rpx;
    .tit {
      color: #2d2d35;
      font: 48rpx/56rpx 'PingFangSC-Regular, PingFang SC';
      font-weight: bold;
    }
    .sub {
      color: $u-content-color;
      font: 24rpx/33rpx 'PingFangSC-Regular, PingFang SC';
    }
  }
}
</style>
