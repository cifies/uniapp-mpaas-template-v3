<!-- 所有分类 -->
<template>
  <view class="categories-view">
    <view v-for="item in categoriesList" :key="item.name" class="cell" @click="didSelectItem(item)">
      <text class="name">{{ item.name }}</text>
      <text class="count">{{ item.count }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

import { ref } from 'vue'
import { getSiteCategories } from '@/api/mine'

const categoriesList = ref<{ name: string; count: number | string }[]>([])

onLoad(() => {
  requestGetSiteCategories()
})

function requestGetSiteCategories() {
  getSiteCategories().then((res: any) => {
    categoriesList.value = res ?? []
  })
}

function didSelectItem(item: { name: string }) {
  uni.navigateTo({
    url: `/pages/tagList/tagList?categoriesName=${item.name}&isTags=false`
  })
}
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style lang="scss" scoped>
.categories-view {
  margin-top: 20rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 117rpx;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .name {
      color: $u-main-color;
      font: 32rpx/45rpx 'PingFangSC-Regular, PingFang SC';
      margin-bottom: 8rpx;
    }
    .count {
      color: $u-content-color;
      font: 24rpx/33rpx 'PingFangSC-Regular, PingFang SC';
    }
  }
}
</style>
