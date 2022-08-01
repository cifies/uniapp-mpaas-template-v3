<!-- 我的-头像部分 -->
<template>
  <view class="mine-top-view">
    <view class="top-view">
      <img class="avatar" :src="avatar" @click="tapAvatar" />
      <text class="title">{{ title }}</text>
    </view>
    <text class="des">{{ des }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  avatar: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  des: {
    type: String,
    default: ''
  }
})

const tapAvatar = () => {
  uni.previewImage({
    urls: [props.avatar]
  })
}

// function tapAvatar(): void {
//   uni.previewImage({
//     urls: [props.avatar]
//   })
// }
</script>

<style lang="scss" scoped>
.mine-top-view {
  width: 100%;
  overflow: visible;
  box-sizing: border-box;

  .top-view {
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 12rpx;

    .avatar {
      margin-top: -70rpx;
      width: 180rpx;
      height: 180rpx;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: #f7f8fa;
      border: 10rpx solid #f7f8fa;
    }

    .title {
      margin-top: 25rpx;
      color: $u-main-color;
      font: 34rpx/40rpx 'PingFangSC-Medium, PingFang SC';
      font-weight: 500;
    }
  }

  .des {
    color: $u-content-color;
    font-weight: 400;
    font: 26rpx/37rpx 'PingFangSC-Regular, PingFang SC';
    display: block;
    margin: auto;
    word-break: keep-all;
    word-wrap: break-word;
    text-align: center;
  }
}
</style>
