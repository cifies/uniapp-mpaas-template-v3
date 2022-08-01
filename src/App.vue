<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import './static/css/iconfont.css';

page {
  background-color: $u-bg-color;
  --articleHTextColor: #333333;
  --articleSubTextColor: #666666;
  --articleThemeColor: #48b378;
  --shadowColor: #ccc;
  --hightNumDark: #212121;
  --hightNumfont: rgba(238, 255, 255, 0.5);
  --codeColor: #eff;
}
view,
text,
image,
input,
textarea {
  box-sizing: border-box;
}
</style>
