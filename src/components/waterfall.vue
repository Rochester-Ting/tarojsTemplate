<template>
  <view class="flex justify-around items-start">
    <view class="left-wrapper" id="left-custom">
      <view v-for="(left, idx) of leftList" :key="idx" class="w-[360rpx]">
        <image
          :src="left.url"
          class="w-full"
          :style="{
            height: left.calcHeight + 'rpx'
          }"
        />
      </view>
    </view>
    <view class="right-wrapper" id="right-custom">
      <view v-for="(right, idx) of rightList" :key="idx" class="w-[360rpx]">
        <image
          :src="right.url"
          class="w-full"
          :style="{
            height: right.calcHeight + 'rpx'
          }"
        />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
/**
 * name: waterfall
 * description:
 * author: rui
 * date: 2024/4/1
 */
import { computed, onMounted, ref, watch } from 'vue'
import Taro from '@tarojs/taro'
const props = defineProps({
  list: Array,
  default: () => []
})
// left
const leftList = ref<any[]>([])
// right
const rightList = ref<any[]>([])
/**
 * @Author: rui
 * @Description: 动态获取左边的高度
 * @Date: 2024/04/01 11:13:12
 **/
const leftHeight = computed(() => {
  let height = 0
  for (const left of leftList.value) {
    height = height + (left.calcHeight || 0)
  }
  return height
})
/**
 * @Author: rui
 * @Description: 动态获取右边的高度
 * @Date: 2024/04/01 11:13:05
 **/
const rightHeight = computed(() => {
  let height = 0
  for (const right of rightList.value) {
    height = height + (right.calcHeight || 0)
  }
  return height
})
/**
 * @Author: rui
 * @Description: 添加到左边或者右边
 * @Date: 2024/04/01 11:05:35
 **/
const initLeftOrRightList = (item: any, info: any) => {
  const itemCopy = JSON.parse(JSON.stringify(item))
  // itemCopy.calcHeight = info.height
  if (!item.calcHeight) {
    itemCopy.calcHeight = 360 * (info.height / info.width)
  }
  if (leftHeight.value <= rightHeight.value) {
    leftList.value.push(itemCopy)
  } else {
    rightList.value.push(itemCopy)
  }
}
/**
 * @Author: rui
 * @Description: 计算高度
 * @Date: 2024/04/01 10:49:42
 **/
const fixedImageList = async (list: any[]) => {
  for (const item of list) {
    const leftIdx = leftList.value.findIndex((s) => s.url === item.url)
    const rightIdx = rightList.value.findIndex((s) => s.url === item.url)
    if (leftIdx === -1 && rightIdx === -1) {
      const res = await Taro.getImageInfo({
        src: item.url
      })
      initLeftOrRightList(item, res)
    } else {
      const itemCopy =
        leftIdx > -1 ? leftList.value[leftIdx] : rightList.value[rightIdx]
      initLeftOrRightList(itemCopy, null)
    }
  }
}

watch(
  () => props.list,
  () => {
    console.log('list', props.list)
    fixedImageList(props.list || [])
  },
  { immediate: true, deep: true }
)
</script>
<style scoped lang="scss"></style>
