<template>
  <view>
    <view :class="styles.test">
      欢迎使用 NutUI 开发 Taro 多端项目 <Dongdong />
      <view :class="styles.font">onLoad</view>
    </view>
    <view class="text-blue-200 px-2">{{ count }}</view>
    <view>
      <nut-button type="primary" @click="handleClick"> Count++ </nut-button>
    </view>
    <waterfall :list="list" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoad, useReachBottom } from '@tarojs/taro'
import { Dongdong } from '@nutui/icons-vue-taro'
import styles from './index.module.scss'
import waterfall from '@/components/waterfall.vue'
import { getImageList } from '@/api/mock'
// import { getList } from '@/api/example'
const count = ref<number>(0)
// 瀑布流列表
const list = ref<any[]>([])
// loading
const loading = ref(false)
/**
 * @Author: rui
 * @Description: 获取照片列表
 * @Date: 2024/04/01 10:12:00
 **/
const mockImageList = () => {
  loading.value = true
  setTimeout(() => {
    const res = getImageList()
    list.value = list.value.concat(res.result.activityPhotoList)
    loading.value = false
  }, 500)
}
useLoad(async () => {
  console.log('onLoad')
  // await getList()
  mockImageList()
})

useReachBottom(() => {
  if (loading.value) return
  mockImageList()
})

const handleClick = () => {
  count.value++
}
</script>
