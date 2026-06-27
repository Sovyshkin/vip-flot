<template>
  <div
    ref="root"
    class="lazy-render"
    :style="{ '--lazy-render-min-height': props.minHeight }">
    <slot v-if="isVisible"></slot>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  rootMargin: {
    type: String,
    default: '300px 0px'
  },
  minHeight: {
    type: String,
    default: '1px'
  }
})

const root = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  if (!root.value) return

  observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      isVisible.value = true
      observer?.disconnect()
      observer = null
    }
  }, {
    root: null,
    rootMargin: props.rootMargin,
    threshold: 0.01
  })

  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.lazy-render {
  width: 100%;
  min-height: var(--lazy-render-min-height, 1px);
}
</style>
