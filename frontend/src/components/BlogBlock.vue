<template>
    <div class="blog-block">
        <div class="wrap-title">
            <h1 class="title">Блог о судоходстве</h1>
            <div class="actions">
                <button type="button" class="action-btn" @click="scrollPrev"><img src="../assets/arrow-left.svg" alt="Предыдущая"></button>
                <button type="button" class="action-btn" @click="scrollNext"><img src="../assets/arrow-right.svg" alt="Следующая"></button>
            </div>
        </div>
        <div class="cards"
             ref="cardsContainer"
             @scroll="onScroll"
             @touchstart.passive="onTouchStart"
             @touchmove.passive="onTouchMove"
             @touchend.passive="onTouchEnd"
             @pointerdown.passive="onPointerDown"
             @pointermove.passive="onPointerMove"
             @pointerup.passive="onPointerUp"
             @pointercancel.passive="onPointerUp">
            <div class="card" v-for="article in articles" :key="article.id">
                <div class="wrap-img">
                    <img :src="article.image" :alt="article.title">
                    <div class="badge">{{ article.date }}</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-category">{{ article.category }}</span>
                        <span class="card-title">{{ article.title }}</span>
                        <span class="card-desc">{{ article.description }}</span>
                    </div>
                    <button class="card-btn" @click="goToArticle(article.slug)">Читать далее</button>
                </div>
            </div>
        </div>
        <div class="cards-indicator" aria-hidden="true">
            <span v-for="n in pagesCount" :key="n" :class="['cards-indicator__dot', { 'cards-indicator__dot--active': (n - 1) === currentPage }]"></span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { articles } from '../data/blog-articles'

const router = useRouter()
const cardsContainer = ref(null)
const currentPage = ref(0)
const pagesCount = ref(1)

function goToArticle(slug) {
  router.push({ name: 'BlogArticle', params: { slug } })
}

// swipe / pointer state
let startX = 0
let currentX = 0
let isDragging = false
let startTime = 0
let resizeObserver = null

function scrollNext() {
  if (!cardsContainer.value) return
  const container = cardsContainer.value
  const cardWidth = container.querySelector('.card')?.offsetWidth || 0
  const gap = 20
  const scrollAmount = cardWidth + gap
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

function scrollPrev() {
  if (!cardsContainer.value) return
  const container = cardsContainer.value
  const cardWidth = container.querySelector('.card')?.offsetWidth || 0
  const gap = 20
  const scrollAmount = cardWidth + gap
  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

function onTouchStart(e) {
  startX = e.touches[0].clientX
  currentX = startX
  isDragging = true
  startTime = Date.now()
}

function onTouchMove(e) {
  if (!isDragging) return
  currentX = e.touches[0].clientX
}

function onTouchEnd() {
  if (!isDragging) return
  const deltaX = startX - currentX
  const deltaTime = Date.now() - startTime
  const velocity = Math.abs(deltaX) / deltaTime

  if (Math.abs(deltaX) > 50 || velocity > 0.5) {
    if (deltaX > 0) {
      scrollNext()
    } else {
      scrollPrev()
    }
  }

  isDragging = false
}

function onPointerDown(e) {
  startX = e.clientX
  currentX = startX
  isDragging = true
  startTime = Date.now()
}

function onPointerMove(e) {
  if (!isDragging) return
  currentX = e.clientX
}

function onPointerUp() {
  if (!isDragging) return
  const deltaX = startX - currentX
  const deltaTime = Date.now() - startTime
  const velocity = Math.abs(deltaX) / deltaTime

  if (Math.abs(deltaX) > 50 || velocity > 0.5) {
    if (deltaX > 0) {
      scrollNext()
    } else {
      scrollPrev()
    }
  }

  isDragging = false
}

function findFirstVisibleIndex() {
  if (!cardsContainer.value) return 0
  const container = cardsContainer.value
  const cards = Array.from(container.querySelectorAll('.card'))
  const containerRect = container.getBoundingClientRect()
  
  for (let i = 0; i < cards.length; i++) {
    const cardRect = cards[i].getBoundingClientRect()
    const cardCenter = cardRect.left + cardRect.width / 2
    if (cardCenter >= containerRect.left && cardCenter <= containerRect.right) {
      return i
    }
  }
  return 0
}

function onScroll() {
  currentPage.value = findFirstVisibleIndex()
}

function updatePages() {
  if (!cardsContainer.value) return
  const container = cardsContainer.value
  const containerWidth = container.offsetWidth
  const cardWidth = container.querySelector('.card')?.offsetWidth || 0
  const gap = 20
  const visibleCards = Math.floor(containerWidth / (cardWidth + gap))
  pagesCount.value = Math.max(1, articles.length - visibleCards + 1)
}

onMounted(() => {
  updatePages()
  
  resizeObserver = new ResizeObserver(() => {
    updatePages()
    onScroll()
  })
  
  if (cardsContainer.value) {
    resizeObserver.observe(cardsContainer.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.blog-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    color: #1A1A1A;
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 700;
}

.actions {
    display: flex;
    gap: 10px;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 12px;
    transition: opacity 0.3s;
}

.action-btn:hover {
    opacity: 0.7;
}

.action-btn img {
    width: 24px;
    height: 24px;
}

.cards {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
}

.cards::-webkit-scrollbar {
    display: none;
}

.cards:active {
    cursor: grabbing;
}

.card {
    flex: 0 0 392px;
    width: 392px;
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.wrap-img {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
}

.wrap-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.card:hover .wrap-img img {
    transform: scale(1.05);
}

.badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #1A1A1A;
}

.card-info {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}

.card-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.card-category {
    color: #0066FF;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.card-title {
    color: #1A1A1A;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
}

.card-desc {
    color: #666;
    font-size: 15px;
    line-height: 1.5;
}

.card-btn {
    background: #0066FF;
    color: #fff;
    border: none;
    padding: 14px 28px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    align-self: flex-start;
}

.card-btn:hover {
    background: #0052CC;
    transform: translateY(-2px);
}

.card-btn:active {
    transform: translateY(0);
}

.cards-indicator {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px 0;
}

.cards-indicator__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #D9D9D9;
    transition: background-color 0.3s, width 0.3s;
}

.cards-indicator__dot--active {
    background-color: #0066FF;
    width: 24px;
    border-radius: 4px;
}

@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .card {
        flex: 0 0 340px;
        width: 340px;
    }
}

@media (max-width: 768px) {
    .blog-block {
        gap: 24px;
    }
    
    .wrap-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
    
    .title {
        font-size: 24px;
    }
    
    .actions {
        width: 100%;
        justify-content: space-between;
    }
    
    .action-btn {
        padding: 10px;
    }
    
    .action-btn img {
        width: 20px;
        height: 20px;
    }
    
    .card {
        flex: 0 0 calc(100vw - 80px);
        width: calc(100vw - 80px);
    }
    
    .wrap-img {
        height: 200px;
    }
    
    .card-info {
        padding: 20px;
        gap: 16px;
    }
    
    .card-title {
        font-size: 18px;
    }
    
    .card-desc {
        font-size: 14px;
    }
    
    .card-btn {
        padding: 12px 20px;
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        flex: 0 0 calc(100vw - 60px);
        width: calc(100vw - 60px);
    }
    
    .wrap-img {
        height: 180px;
    }
    
    .badge {
        font-size: 12px;
        padding: 6px 12px;
    }
    
    .card-info {
        padding: 16px;
    }
    
    .card-category {
        font-size: 12px;
    }
    
    .card-title {
        font-size: 16px;
    }
    
    .card-desc {
        font-size: 13px;
    }
    
    .card-btn {
        padding: 12px 18px;
        font-size: 13px;
    }
}
</style>
