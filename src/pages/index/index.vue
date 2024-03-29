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
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoad } from '@tarojs/taro'
import { Dongdong } from '@nutui/icons-vue-taro'
import styles from './index.module.scss'
import { getList } from '../../api/example'
const count = ref<number>(0)

useLoad(async () => {
  console.log('onLoad')
  await getList()
})

const handleClick = () => {
  count.value++
}
</script>
