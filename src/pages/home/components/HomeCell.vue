<template>
  <view class="cont-view">
    <view class="right_cell">
      <view class="tit">{{ cellItem.slug }}</view>
      <view class="center_cell">
        <view v-for="(tagItem, idx) in cellItem.tags" :key="idx" class="u-page__tag-item">
          <uni-tag
            :text="tagItem.name"
            size="small"
            :custom-style="{
              backgroundColor: bgColorList[idx],
              color: textColorList[idx],
              borderColor: 'transparent',
              padding: '2px 5px',
              fontSize: '12px',
              lineHeight: '12px'
            }"
            inverted
            type="success"
            @click="tagClick(idx)"
          />
        </view>
      </view>
      <view class="date">
        <text>{{ dateString }}</text>
        <text>{{ weekday }}</text>
      </view>
    </view>
    <view class="left_cell" hover-class="cell_selected" :hover-stay-time="150" @click="didSelectItem">查看详情</view>
  </view>
</template>

<script setup lang="ts">
import { ref, unref, withDefaults, watch } from 'vue'

type ItemObj = { slug: string; tags: { name: string }[]; date: string; path: string; title: string }

interface PropsInterface {
  cellItem: ItemObj
}

const props = withDefaults(defineProps<PropsInterface>(), {
  cellItem: () => {
    return {
      slug: 'sss',
      tags: [],
      date: '',
      name: '',
      path: '',
      title: ''
    }
  }
})

const dateString = ref('')
const weekday = ref('')
const bgColorList = ref<string[]>([])
const textColorList = ref<string[]>([])

const tagBgColorList: string[] = ['#FFEBEB', '#FFF1E6', '#E6FFEE', '#E6F5FF']
const tagTextColorMap: Map<string, string> = new Map([
  ['#FFEBEB', '#D02A2A'],
  ['#FFF1E6', '#FB5D00'],
  ['#E6FFEE', '#13B346'],
  ['#E6F5FF', '#0082D9']
])

watch(
  () => props.cellItem,
  (newVal) => {
    dateFormat(newVal.date)
    newVal.tags.map((item: { name: string }, index: number) => {
      const num = tagBgColorList.length - 1
      const random = Math.round(Math.random() * num)
      const bgColor: string = tagBgColorList[random]
      const tagTextColor = tagTextColorMap.get(bgColor) ?? '#D02A2A'
      unref(bgColorList).push(bgColor)
      unref(textColorList).push(tagTextColor)
    })
  },
  {
    immediate: true
  }
)

function formatTwo(n: number) {
  return n >= 10 ? `${n}` : `0${n}`
}
function dateFormat(str = ''): void {
  str = str
    .replace(/-/g, '/')
    .replace('T', ' ')
    .replace('.000+0000', '')
    .replace('.000+0800', '')
    .replace('.000 0800', '')
    .replace('.000Z', '')
    .replace('+0800', '')
  str = str.replace(/\.[0-9]{3}/, '')
  const date = new Date(str)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const weekIndex: number = date.getDay() ?? 0
  const weekArr: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  weekday.value = weekArr[weekIndex]

  const formats = {
    YYYY: year,
    MM: formatTwo(month),
    DD: formatTwo(day),
    HH: formatTwo(hour),
    mm: formatTwo(minute),
    ss: formatTwo(second)
  }

  const fmt = 'YYYY年MM月DD日'
  dateString.value = fmt.replace(/([a-z])\1+/gi, (a) => formats[a] || a)
}

function tagClick(index: number): void {
  const item: { name: string } = props.cellItem.tags[index]
  uni.navigateTo({
    url: `/pages/tagList/tagList?tagName=${encodeURIComponent(item.name)}`
  })
}

function didSelectItem() {
  uni.navigateTo({
    url: `/pages/detail/detail?path=${encodeURIComponent(props.cellItem.path)}&title=${encodeURIComponent(
      props.cellItem.title
    )}`
  })
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cell_selected {
  background-color: rgba($color: $u-type-primary, $alpha: 0.5) !important;
}

.cont-view {
  background-color: #ffffff;
  margin: 20rpx 30rpx 0;
  box-sizing: border-box;
  padding: 30rpx;
  min-height: 157rpx;
  // max-height: 211rpx;
  border-radius: 8rpx;
  @extend .flex;

  .right_cell {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 470rpx;

    .tit {
      color: $u-main-color;
      font: 34rpx/48rpx 'PingFangSC-Medium, PingFang SC';
      font-weight: 500;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }

    .center_cell {
      margin-top: 16rpx;
      display: flex;
      flex-wrap: wrap;

      .u-page__tag-item {
        margin-right: 16rpx;
      }

      // u-tag {
      //   margin-right: 16rpx;
      // }
    }

    .date {
      margin-top: 16rpx;
      color: $u-content-color;
      font: 24rpx/33rpx 'PingFangSC-Regular, PingFang SC';
    }
  }

  .left_cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160rpx;
    height: 60rpx;
    background: $u-type-primary;
    border-radius: 30rpx;
    font: 24rpx/30rpx 'PingFangSC-Medium, PingFang SC';
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
