<template>
  <view class="home-view">
    <TagListCell v-for="(item, idx) in dataList" :key="idx" :cell-item="item" />
  </view>
</template>

<script setup lang="ts">
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { ref, unref, watch } from 'vue'
import { getPostsByTag, getPostsByCategorie } from '@/api/mine'

import TagListCell from './components/TagListCell.vue'

const dataList = ref([])
const isTags = ref<boolean>(true)
const tagName = ref<string>('')
const categoriesName = ref<string>('')

const loadData = (tag = '') => {
  const api = unref(isTags) ? getPostsByTag(unref(tagName)) : getPostsByCategorie(unref(categoriesName))
  api
    .then((res: any) => {
      const { postlist } = res
      dataList.value = []
      dataList.value = unref(dataList).concat(postlist)
    })
    .finally(() => {
      uni.stopPullDownRefresh()
    })
}

onLoad((options) => {
  if (options.isTags) {
    isTags.value = decodeURIComponent(options.isTags) === 'true'
  }
  if (unref(isTags)) {
    tagName.value = decodeURIComponent(options.tagName ?? '')
    uni.setNavigationBarTitle({
      title: unref(tagName)
    })
  } else {
    categoriesName.value = decodeURIComponent(options.categoriesName ?? '')
    uni.setNavigationBarTitle({
      title: unref(categoriesName)
    })
  }
  uni.startPullDownRefresh({ success: () => {} })
  // loadData()
})

onPullDownRefresh(() => {
  loadData()
})

onReachBottom(() => {})
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: 100%;
}
</style>
