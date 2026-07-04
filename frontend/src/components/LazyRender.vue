<template>
  <div
    ref="root"
    class="lazy-render"
    :style="{ '--lazy-render-min-height': resolvedMinHeight }">
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
  },
  mobileMinHeight: {
    type: String,
    default: ''
  }
})

const root = ref(null)
const isVisible = ref(false)
const resolvedMinHeight = ref(props.minHeight)

let observer = null

function resolveMobileMinHeight(value) {
  if (!value) return value

  const numericValue = Number.parseInt(value, 10)
  if (Number.isNaN(numericValue)) return value

  const viewportCap = Math.round(window.innerHeight * 0.72)
  return `${Math.min(numericValue, viewportCap)}px`
}

onMounted(() => {
  if (!root.value) return

  if (props.mobileMinHeight && window.matchMedia('(max-width: 768px)').matches) {
    resolvedMinHeight.value = resolveMobileMinHeight(props.mobileMinHeight)
  }

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
  contain: layout paint;
}
</style>
