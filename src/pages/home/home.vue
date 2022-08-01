<template>
  <view class="home-view">
    <HomeCell v-for="(item, idx) in dataList" :key="idx" :cell-item="item" />
  </view>
</template>

<script setup lang="ts">
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'

import { ref, unref } from 'vue'
import { homeList } from '@/api/home'

import { useUserStore } from '@/pinia/user'

import HomeCell from './components/HomeCell.vue'

const dataList = ref([])
const pageN = ref(1)
const totalNum = ref<number>(0)

const userStore = useUserStore()

const requestHomeList = () => {
  homeList({ pageNum: pageN.value })
    .then((res: any) => {
      const { data, total } = res
      totalNum.value = total
      dataList.value = unref(dataList).concat(data)
      pageN.value++
      // 1、直接修改
      // userStore.articleNum = total

      // 2、$patch一个函数修改
      // userStore.$patch(state => {
      //   state.articleNum = total
      // })

      // 3、$patch批量修改
      // userStore.$patch({
      //   articleNum: total
      // })

      // 4、调用action
      userStore.changeArticleNum(total)

      // 5、替换整个store
      // userStore.$state = {
      //   articleNum: 2
      // }

      // 6、重置 state
      // userStore.$reset()
    })
    .finally(() => {
      uni.stopPullDownRefresh()
    })
}

onLoad(() => {
  uni.startPullDownRefresh({
    success: () => {
      console.log('success---')
    }
  })
})

onPullDownRefresh(() => {
  pageN.value = 1
  requestHomeList()
})

onReachBottom(() => {
  if (unref(totalNum) !== 0 && unref(totalNum) === unref(dataList).length) return
  requestHomeList()
})
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>
