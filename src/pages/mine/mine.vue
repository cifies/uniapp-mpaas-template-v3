<template>
  <view class="mine-view">
    <view class="bottom-view" />
    <view class="cover-view">
      <MineTopView :avatar="avatar" :title="title" :des="des" />
      <MineCenterView :categories-num="categoriesNum" :tag-num="tagNum" />
      <MineBottomView :social="social" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { getSiteConfig, getSiteCategories, getSiteTags } from '@/api/mine'

import MineTopView from './components/MineTopView.vue'
import MineCenterView from './components/MineCenterView.vue'
import MineBottomView from './components/MineBottomView.vue'

const avatar = ref<string>('')
const title = ref<string>('')
const des = ref<string>('')
const categoriesNum = ref<number>(0)
const tagNum = ref<number>(0)
const social = ref({})

onLoad(() => {
  requestGetSiteConfig()
  requestGetSiteCategories()
  requestGetSiteTags()
})

function requestGetSiteConfig() {
  getSiteConfig().then((res: any) => {
    avatar.value = res.avatar
    title.value = res.title
    des.value = res.description
    social.value = res.social
  })
}
function requestGetSiteCategories() {
  getSiteCategories().then((res: any) => {
    categoriesNum.value = (res ?? []).length
  })
}

function requestGetSiteTags() {
  getSiteTags().then((res: any) => {
    tagNum.value = (res ?? []).length
  })
}
</script>

<style>
page {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #4474ff;
}
</style>
<style lang="scss" scoped>
.mine-view {
  width: 100%;
  height: 100%;
  .cover-view {
    margin-top: 188rpx;
    height: calc(100% - 188rpx);
    width: 100%;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    overflow: visible;
    box-sizing: border-box;
    padding: 0 30rpx;
  }
  .bottom-view {
    z-index: -1;
    position: fixed;
    height: 300rpx;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
}
</style>
