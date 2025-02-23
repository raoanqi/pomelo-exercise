<!--要求：-->
<!--封装组件，传入一个 img 的 src，该组件会在图片加载失败时进行重试加载 2 次-->
<template>
  <img :src="imageSrc" :alt="alt" @error="handleError" style="width: 100%; height: auto" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image'
  }
})

const imageSrc = ref(props.src)
const retries = ref(0)
const maxRetries = 2

// 处理图片加载失败的错误
const handleError = () => {
  if (retries.value < maxRetries) {
    retries.value++
    imageSrc.value = '' // 清空src以触发重新加载
    setTimeout(() => {
      imageSrc.value = props.src // 设置原始src以重新加载
    }, 100)
  } else {
    console.error('Image failed to load after 2 retries.')
  }
}

// 在组件初始化时确保图片路径是有效的
onMounted(() => {
  imageSrc.value = props.src
})
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
