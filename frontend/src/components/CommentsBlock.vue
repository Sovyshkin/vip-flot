<template>
    <div class="comments-block">
        <div class="wrap-title">
      <h2 class="title">Отзывы наших клиентов</h2>
            <div class="actions">
                <button type="button" class="action-btn" @click="scrollPrev"><img src="../assets/arrow-left.svg" alt="" width="24" height="24" decoding="async"></button>
                <button type="button" class="action-btn" @click="scrollNext"><img src="../assets/arrow-right.svg" alt="" width="24" height="24" decoding="async"></button>
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
           <div class="card">
            <div class="user">
                <div class="wrap-avatar">
                    <img src="../assets/avatar-1.webp" alt="" width="48" height="48" loading="lazy" decoding="async">
                </div>
                <div class="user-info">
                    <span class="name">Анна Петрова</span>
                    <span class="date">15 февраля 2026</span>
                </div>
            </div>
            <p class="text">Отличная прогулка на развод мостов! Катер комфортный, капитан профессиональный. Рекомендую!</p>
            <div class="rating">
                <span>5.0</span>
                <img src="../assets/rating.svg" alt="" width="76" height="16" loading="lazy" decoding="async">
            </div>
           </div>
           <div class="card">
            <div class="user">
                <div class="wrap-avatar">
                    <img src="../assets/avatar-2.webp" alt="" width="48" height="48" loading="lazy" decoding="async">
                </div>
                <div class="user-info">
                    <span class="name">Ника Морозова</span>
                    <span class="date">15 февраля 2026</span>
                </div>
            </div>
            <p class="text">Отличная прогулка на развод мостов! Катер комфортный, капитан профессиональный. Рекомендую!</p>
            <div class="rating">
                <span>5.0</span>
                <img src="../assets/rating.svg" alt="" width="76" height="16" loading="lazy" decoding="async">
            </div>
           </div>
           <div class="card">
            <div class="user">
                <div class="wrap-avatar">
                    <img src="../assets/avatar-3.webp" alt="" width="48" height="48" loading="lazy" decoding="async">
                </div>
                <div class="user-info">
                    <span class="name">Наталья Гриневич</span>
                    <span class="date">15 февраля 2026</span>
                </div>
            </div>
            <p class="text">Отличная прогулка на развод мостов! Катер комфортный, капитан профессиональный. Рекомендую!</p>
            <div class="rating">
                <span>5.0</span>
                <img src="../assets/rating.svg" alt="" width="76" height="16" loading="lazy" decoding="async">
            </div>
           </div>
           <div class="card">
            <div class="user">
                <div class="wrap-avatar">
                    <img src="../assets/avatar-1.webp" alt="" width="48" height="48" loading="lazy" decoding="async">
                </div>
                <div class="user-info">
                    <span class="name">Анна Петрова</span>
                    <span class="date">15 февраля 2026</span>
                </div>
            </div>
            <p class="text">Отличная прогулка на развод мостов! Катер комфортный, капитан профессиональный. Рекомендую!</p>
            <div class="rating">
                <span>5.0</span>
                <img src="../assets/rating.svg" alt="" width="76" height="16" loading="lazy" decoding="async">
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

const cardsContainer = ref(null)
const currentPage = ref(0)
const pagesCount = ref(1)

// swipe / pointer state
const touchStartX = ref(0)
const touchDeltaX = ref(0)
const isPointerDown = ref(false)
const pointerStartX = ref(0)

function findFirstVisibleIndex() {
    const container = cardsContainer.value
    if (!container) return 0
    const cards = Array.from(container.querySelectorAll('.card'))
    const containerRect = container.getBoundingClientRect()
    for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect()
        // check if card is at least partially visible
        if (rect.right > containerRect.left + 1) return i
    }
    return Math.max(cards.length - 1, 0)
}

function scrollToIndex(index) {
    const container = cardsContainer.value
    if (!container) return
    const cards = container.querySelectorAll('.card')
    const target = cards[index]
    if (!target) return
    const containerRect = container.getBoundingClientRect()
    const cardRect = target.getBoundingClientRect()
    const delta = cardRect.left - containerRect.left
    container.scrollTo({ left: container.scrollLeft + delta, behavior: 'smooth' })
}

function scrollNext() {
    const container = cardsContainer.value
    if (!container) return
    const cards = container.querySelectorAll('.card')
    const idx = findFirstVisibleIndex()
    const target = Math.min(idx + 1, cards.length - 1)
    scrollToIndex(target)
}

function scrollPrev() {
    const idx = findFirstVisibleIndex()
    const target = Math.max(idx - 1, 0)
    scrollToIndex(target)
}

function updatePages() {
    const container = cardsContainer.value
    if (!container) return
    const total = container.querySelectorAll('.card').length
    pagesCount.value = Math.max(1, total)
    const idx = findFirstVisibleIndex()
    currentPage.value = idx
}

function onScroll() {
    updatePages()
}

// Touch handlers
function onTouchStart(e) {
    touchStartX.value = e.touches[0].clientX
    touchDeltaX.value = 0
}

function onTouchMove(e) {
    touchDeltaX.value = e.touches[0].clientX - touchStartX.value
}

function onTouchEnd() {
    const delta = touchDeltaX.value
    if (Math.abs(delta) > 40) {
        if (delta < 0) scrollNext()
        else scrollPrev()
    }
    touchDeltaX.value = 0
}

// Pointer handlers (desktop drag)
function onPointerDown(e) {
    isPointerDown.value = true
    pointerStartX.value = e.clientX
}

function onPointerMove(e) {
    if (!isPointerDown.value) return
    touchDeltaX.value = e.clientX - pointerStartX.value
}

function onPointerUp() {
    if (!isPointerDown.value) return
    const delta = touchDeltaX.value
    if (Math.abs(delta) > 40) {
        if (delta < 0) scrollNext()
        else scrollPrev()
    }
    isPointerDown.value = false
    touchDeltaX.value = 0
}

onMounted(() => {
    updatePages()
    window.addEventListener('resize', updatePages)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePages)
})
</script>

<style scoped>
.comments-block {
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
    align-items: center;
    gap: 12px;
}

.action-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
}

.cards {
    width: 100%;
    display: flex;
    gap: 15px;
    overflow: hidden;
    overflow-y: hidden;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

}

.cards::-webkit-scrollbar { display: none; }

.card {
    flex: 0 0 392px;
    width: 392px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background-color: #fff;
    border-radius: 16px;
}

.user {
    display: flex;
    align-items: center;
    gap: 8px;
}

.wrap-avatar {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    overflow: hidden;
}

.wrap-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.name {
    font-weight: 600;
    font-size: 18px;
    color: #1A1A1A;
    letter-spacing: 0px;
}

.date {
    font-weight: 400;
    font-size: 14px;
    color: #949CA4;
    letter-spacing: 0px;
}

.text {
    font-weight: 400;
    font-size: 16px;
    color: #1A1A1A;
    letter-spacing: 0px;
}

.rating {
    display: flex;
    align-items: center;
    gap: 4px;
}

.rating span {
    font-weight: 500;
    font-size: 14px;
    color: #1A1A1A;
    letter-spacing: 0px;
}

.rating img {
    display: block;
    width: 64px;
    height: auto;
}

/* Responsive */
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
    .comments-block {
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
        padding: 20px;
    }
    
    .name {
        font-size: 16px;
    }
    
    .text {
        font-size: 15px;
    }

    .rating img {
        width: 64px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        flex: 0 0 calc(100vw - 60px);
        width: calc(100vw - 60px);
        padding: 16px;
        gap: 12px;
    }
    
    .wrap-avatar {
        width: 40px;
        height: 40px;
    }
    
    .name {
        font-size: 15px;
    }
    
    .date {
        font-size: 12px;
    }
    
    .text {
        font-size: 14px;
    }
    
    .rating span {
        font-size: 13px;
    }

    .rating img {
        width: 52px;
    }
}
</style>
