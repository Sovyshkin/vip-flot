<template>
    <div class="yacht-tours-block">
        <div class="wrap-title">
            <h2 class="title">Другие яхт-туры</h2>
            <div class="scroll-actions" aria-label="Навигация по яхт-турам">
                <button class="scroll-btn" type="button" @click="scrollCards('prev')" aria-label="Показать предыдущие туры">‹</button>
                <button class="scroll-btn" type="button" @click="scrollCards('next')" aria-label="Показать следующие туры">›</button>
            </div>
        </div>
        <div
            ref="scrollEl"
            class="cards-scroll"
            :class="{ 'cards-scroll--dragging': isDragging }"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @pointerleave="onPointerUp"
            @scroll.passive="onNativeScroll">
            <div class="cards">
                <div v-for="tour in yachtTours" :key="tour.id" class="card" @click="handleCardClick(tour)">
                    <div class="wrap-img">
                        <img :src="tour.imageUrl" :alt="tour.title" loading="lazy" decoding="async" draggable="false">
                        <div class="badge">{{ tour.duration }}</div>
                    </div>
                    <div class="card-info">
                        <span class="card-title">{{ tour.title }}</span>
                        <span class="card-desc">{{ getTourExcerpt(tour) }}</span>
                        <button
                            class="details-btn"
                            type="button"
                            @pointerdown.stop
                            @click.stop="goToTour(tour.link)">
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getYachtTourSlugFromLink, yachtTours } from '../data/yachtsTours'
import { buildYachtTourExcerpt } from '../utils/pageCopy'

const router = useRouter()
const scrollEl = ref(null)
const isDragging = ref(false)
const didDrag = ref(false)
const startX = ref(0)
const startY = ref(0)
const startScrollLeft = ref(0)
const activePointerId = ref(null)
let clickUnlockTimer

function goToTour(link) {
  const slug = getYachtTourSlugFromLink(link)
  if (!slug) return
  router.push({ name: 'YachtTourDetail', params: { slug } })
}

function handleCardClick(tour) {
  if (didDrag.value) {
    didDrag.value = false
    return
  }
  goToTour(tour.link)
}

function getTourExcerpt(tour) {
  return buildYachtTourExcerpt(tour)
}

function scrollCards(direction) {
  if (!scrollEl.value) return
  const amount = Math.round(scrollEl.value.clientWidth * 0.85)
  scrollEl.value.scrollBy({
    left: direction === 'next' ? amount : -amount,
    behavior: 'smooth'
  })
}

function onPointerDown(event) {
  if (event.pointerType === 'touch') return
  if (event.target?.closest?.('button, a, input, textarea, select')) return
  if (!scrollEl.value || event.pointerType === 'mouse' && event.button !== 0) return
  isDragging.value = false
  didDrag.value = false
  activePointerId.value = event.pointerId
  startX.value = event.clientX
  startY.value = event.clientY
  startScrollLeft.value = scrollEl.value.scrollLeft
}

function onPointerMove(event) {
  if (event.pointerType === 'touch') return
  if (!scrollEl.value || event.pointerId !== activePointerId.value) return
  const delta = event.clientX - startX.value
  const deltaY = event.clientY - startY.value

  if (!isDragging.value) {
    if (Math.abs(deltaY) > Math.abs(delta)) return
    if (Math.abs(delta) < 8) return
    isDragging.value = true
    didDrag.value = true
    scrollEl.value.setPointerCapture?.(event.pointerId)
  }

  event.preventDefault()
  scrollEl.value.scrollLeft = startScrollLeft.value - delta
}

function onPointerUp(event) {
  if (event.pointerType === 'touch') return
  if (event.pointerId !== activePointerId.value) return
  if (isDragging.value) {
    scrollEl.value?.releasePointerCapture?.(event.pointerId)
  }
  isDragging.value = false
  activePointerId.value = null
}

function onNativeScroll() {
  didDrag.value = true
  clearTimeout(clickUnlockTimer)
  clickUnlockTimer = setTimeout(() => {
    didDrag.value = false
  }, 120)
}
</script>

<style scoped>
.yacht-tours-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.title {
    color: #1A1A1A;
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 700;
}

.scroll-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.scroll-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(0, 118, 252, 0.18);
    background: #fff;
    color: #0076FC;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.scroll-btn:hover {
    transform: translateY(-2px);
    background: #0076FC;
    color: #fff;
    box-shadow: 0 10px 24px rgba(0, 118, 252, 0.18);
}

.cards-scroll {
    overflow-x: auto;
    overflow-y: hidden;
    margin: -8px -20px -28px;
    padding: 8px 20px 28px;
    scrollbar-width: none;
    cursor: grab;
    scroll-behavior: smooth;
    scroll-snap-type: x proximity;
    touch-action: auto;
    user-select: none;
    -webkit-overflow-scrolling: touch;
}

.cards-scroll::-webkit-scrollbar {
    display: none;
}

.cards-scroll--dragging {
    cursor: grabbing;
    scroll-behavior: auto;
}

.cards {
    display: flex;
    gap: 16px;
    align-items: stretch;
}

.card {
    flex: 0 0 320px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 16px;
    cursor: pointer;
    scroll-snap-align: start;
    min-height: 392px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.wrap-img {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    height: 180px;
    background: #f2f4f7;
}

.wrap-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.badge {
    position: absolute;
    border-radius: 0 16px 0 16px;
    padding: 8px 12px;
    background-color: black;
    color: white;
    font-size: 13px;
    font-weight: 500;
    bottom: 0;
    left: 0;
}

.card-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    flex: 1;
}

.card-title {
    color: #1A1A1A;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.2;
}

.card-desc {
    color: #949CA4;
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.details-btn {
    width: 100%;
    margin-top: auto;
    padding: 13px 18px;
    border-radius: 12px;
    background: #0076FC;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.details-btn:hover {
    background: #0061D1;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .wrap-title {
        align-items: flex-start;
    }

    .title {
        font-size: 24px;
    }

    .scroll-actions {
        gap: 8px;
    }

    .scroll-btn {
        width: 38px;
        height: 38px;
        font-size: 24px;
    }

    .cards-scroll {
        margin: -8px -16px -28px;
        padding: 8px 16px 28px;
    }

    .card {
        flex: 0 0 min(82vw, 300px);
    }
}

@media (max-width: 480px) {
    .wrap-title {
        flex-direction: column;
        gap: 12px;
    }

    .scroll-actions {
        width: 100%;
        justify-content: flex-end;
    }
}
</style>
