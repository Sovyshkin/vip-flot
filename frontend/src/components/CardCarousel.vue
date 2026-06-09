<template>
  <div
    class="card-carousel"
    :class="{ 'card-carousel--dragging': isDragging }"
    @click="onCarouselClick"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp">
    <div
      class="carousel-track"
      ref="trackEl"
      >
      <div
        v-for="(image, index) in images"
        :key="`${image}-${index}`"
        class="carousel-slide"
      >
        <img :src="getImageUrl(image)" :alt="alt">
      </div>
    </div>
    <button v-if="images.length > 1" class="arrow arrow-prev" @click.stop="prev">
      ‹
    </button>
    <button v-if="images.length > 1" class="arrow arrow-next" @click.stop="next">
      ›
    </button>
    <div v-if="images.length > 1" class="carousel-dots">
      <button
        v-for="(_, index) in images"
        :key="index"
        :class="['dot', { active: currentIndex === index }]"
        @click.stop="goTo(index)"
      />
    </div>
  </div>
</template>

<script setup>
/* global defineProps */
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  alt: {
    type: String,
    default: ''
  }
})

const trackEl = ref(null)
const currentIndex = ref(0)
const startX = ref(0)
const dragDeltaX = ref(0)
const isDragging = ref(false)
const didSwipe = ref(false)
const activePointerId = ref(null)

watch(
  () => props.images,
  async () => {
    currentIndex.value = 0
    await nextTick()
    if (trackEl.value) {
      trackEl.value.style.transform = 'translateX(0)'
    }
  },
  { deep: true }
)

function goTo(index) {
  currentIndex.value = index
  if (trackEl.value) {
    trackEl.value.style.transform = `translateX(-${index * 100}%)`
  }
}

function syncTrackPosition() {
  if (!trackEl.value) return
  const baseX = -currentIndex.value * 100
  const offset = isDragging.value ? dragDeltaX.value : 0
  trackEl.value.style.transform = `translateX(calc(${baseX}% + ${offset}px))`
}

function next() {
  const nextIndex = (currentIndex.value + 1) % props.images.length
  goTo(nextIndex)
}

function prev() {
  const prevIndex = (currentIndex.value - 1 + props.images.length) % props.images.length
  goTo(prevIndex)
}

function getImageUrl(imageName) {
  if (!imageName) return ''
  if (typeof imageName !== 'string') return imageName
  if (/^(https?:)?\/\//i.test(imageName) || imageName.startsWith('data:') || imageName.startsWith('/')) {
    return imageName
  }
  return `/images/${encodeURIComponent(imageName)}`
}

function onPointerDown(event) {
  if (!props.images.length || (event.pointerType === 'mouse' && event.button !== 0)) return
  if (event.target?.closest?.('button, a, input, textarea, select')) return
  isDragging.value = true
  didSwipe.value = false
  activePointerId.value = event.pointerId
  startX.value = event.clientX
  dragDeltaX.value = 0
  trackEl.value?.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event) {
  if (!isDragging.value || event.pointerId !== activePointerId.value) return
  dragDeltaX.value = event.clientX - startX.value
  syncTrackPosition()
}

function onPointerUp(event) {
  if (!isDragging.value || event.pointerId !== activePointerId.value) return
  const threshold = 48
  const delta = dragDeltaX.value

  isDragging.value = false
  trackEl.value?.releasePointerCapture?.(event.pointerId)

  if (Math.abs(delta) >= threshold && props.images.length > 1) {
    didSwipe.value = true
    if (delta < 0) next()
    else prev()
  }

  dragDeltaX.value = 0
  activePointerId.value = null
  syncTrackPosition()
}

function onCarouselClick(event) {
  if (didSwipe.value) {
    event.stopPropagation()
    didSwipe.value = false
  }
}
</script>

<style scoped>
.card-carousel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #fff;
  border-radius: 16px;
  touch-action: pan-y;
  user-select: none;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 280ms ease-out;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.card-carousel--dragging .carousel-track {
  cursor: grabbing;
  transition: none;
}

.carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-carousel:hover .arrow {
  opacity: 1;
}

.arrow-prev {
  left: 10px;
}

.arrow-next {
  right: 10px;
}

.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 5;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}

.dot.active {
  background: #0076FC;
  transform: scale(1.2);
}
</style>
