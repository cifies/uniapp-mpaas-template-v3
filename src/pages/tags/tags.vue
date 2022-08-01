<!-- 所有标签 -->
<template>
  <view class="tags-view">
    <view v-for="(tagItem, idx) in tagsList" :key="tagItem.name" class="u-page__tag-item">
      <uni-tag
        :text="tagItem.name"
        size="small"
        :custom-style="{
          backgroundColor: bgColorList[idx],
          color: textColorList[idx],
          borderColor: 'transparent',
          padding: '5px',
          fontSize: '12px',
          lineHeight: '12px',
          margin: '8px 10px 0px 0px',
          display: 'inline-block'
        }"
        inverted
        type="success"
        @click="tagClick(tagItem.name)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, unref, watch } from 'vue'

import { getSiteTags } from '@/api/mine'

const tagsList = ref<{ name: string }[]>([])
const bgColorList = ref<string[]>([])
const textColorList = ref<string[]>([])

const tagBgColorList: string[] = ['#FFEBEB', '#FFF1E6', '#E6FFEE', '#E6F5FF']
const tagTextColorMap: Map<string, string> = new Map([
  ['#FFEBEB', '#D02A2A'],
  ['#FFF1E6', '#FB5D00'],
  ['#E6FFEE', '#13B346'],
  ['#E6F5FF', '#0082D9']
])

onLoad(() => {
  requestGetSiteTags()
})

function requestGetSiteTags() {
  getSiteTags().then((res: any) => {
    tagsList.value = res ?? []

    unref(tagsList).map((item, index) => {
      const num = tagBgColorList.length - 1
      const random = Math.round(Math.random() * num)
      const bgColor = tagBgColorList[random]
      const tagTextColor = tagTextColorMap.get(bgColor) ?? '#D02A2A'
      unref(bgColorList).push(bgColor)
      unref(textColorList).push(tagTextColor)
    })
  })
}

function tagClick(name: string): void {
  uni.navigateTo({
    url: `/pages/tagList/tagList?tagName=${encodeURIComponent(name)}`
  })
}
</script>

<style>
page {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.tags-view {
  width: 100%;
  // height: 100%;
  padding-left: 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: auto;
}
</style>
