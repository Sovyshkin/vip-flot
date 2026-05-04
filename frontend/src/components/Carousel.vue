<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <div
      class="carousel-track"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel-slide"
      >
        <img :src="image" :alt="alt">
      </div>
    </div>

    <button v-if="images.length > 1 && showArrows" class="arrow arrow--prev" @click.stop="prev" aria-label="Previous">‹</button>
    <button v-if="images.length > 1 && showArrows" class="arrow arrow--next" @click.stop="next" aria-label="Next">›</button>

    <div v-if="images.length > 1 && showDots" class="dots">
      <button
        v-for="(_, index) in images"
        :key="index"
        :class="['dot', { 'dot--active': currentIndex === index }]"
        @click.stop="goTo(index)"
        aria-label="Go to slide"
      />
    </div>
  </div>
</template>

<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
/* global defineProps, defineEmits, defineExpose */
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  alt: {
    type: String,
    default: ''
  },
  showDots: {
    type: Boolean,
    default: true
  },
  showArrows: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['slideChange'])

const currentIndex = ref(0)

function goTo(index) {
  if (props.images.length === 0) return
  if (index < 0) index = props.images.length - 1
  else if (index >= props.images.length) index = 0
  currentIndex.value = index
  emit('slideChange', index)
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

function onKeyDown(e) {
  if (e.key === 'ArrowLeft') {
    prev()
  } else if (e.key === 'ArrowRight') {
    next()
  }
}

function reset() {
  currentIndex.value = 0
}

defineExpose({ goTo, next, prev, reset })
</script>

<style scoped>
.carousel {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
  outline: none;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.45s cubic-bezier(.22,.9,.25,1);
}

.carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26,26,26,0.6);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel:hover .arrow {
  opacity: 1;
}

.arrow--prev { left: 12px }
.arrow--next { right: 12px }

.dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.dot {
  width: 12px;
  height: 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.85);
  background: rgba(255,255,255,0.25);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
  padding: 0;
}

.dot--active {
  background: #0076FC;
  border-color: #0076FC;
  transform: scale(1.2);
}

@media (max-width: 900px) {
  .arrow { width: 34px; height: 34px }
  .dot { width: 10px; height: 7px }
}

@media (max-width: 600px) {
  .arrow { display: none }
  .dot { width: 8px; height: 6px }
}
</style>
