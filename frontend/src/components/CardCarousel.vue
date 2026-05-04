<template>
  <div class="card-carousel">
    <div class="carousel-track" ref="trackEl">
      <div
        v-for="(image, index) in images"
        :key="index"
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
import { ref } from 'vue'

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

function goTo(index) {
  currentIndex.value = index
  if (trackEl.value) {
    trackEl.value.style.transform = `translateX(-${index * 100}%)`
  }
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
</script>

<style scoped>
.card-carousel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #fff;
  border-radius: 16px;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
}

.carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
