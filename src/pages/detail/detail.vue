<!-- 文章详情 -->
<template>
  <view class="detail-view">
    <mp-html
      :content="html"
      domain="https://www.cqzhong.cn"
      lazy-load
      scroll-table
      selectable
      use-anchor
      show-with-animation
      @ready="ready"
      @load="load"
      @imgtap="imgtap"
      @linktap="linktap"
      @navigate="navigate"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { detailContent } from '@/api/home'

const html = ref<string>('')

onLoad((options) => {
  uni.setNavigationBarTitle({
    title: decodeURIComponent(options.title ?? '')
  })
  // this.html = `<pre><code class="language-css">p { color: red }</code></pre>`
  const path = decodeURIComponent(options.path ?? '')
  detailContent(path).then((res: any) => {
    const content = res.content
    html.value = content
  })
})

const load = () => {
  console.log('dom 树加载完毕')
}

const ready = (e: any) => {
  console.log('ready 事件触发：', e)
}

const imgtap = (e: any) => {
  console.log('imgtap 事件触发：', e)
}

const linktap = (e: any) => {
  console.log('linktap 事件触发：', e)
}

function navigate(href: string, e: any) {
  uni.setClipboardData({
    data: `${href}`,
    success: () => {
      uni.showToast({
        title: '已成功复制链接',
        icon: 'none'
      })
    }
  })
}
</script>

<style>
page {
  min-height: 100%;
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
.detail-view {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 32rpx;
  animation: fadeIn 1s linear;
}
</style>
