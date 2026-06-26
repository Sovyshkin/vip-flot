<template>
    <div class="comments-block">
        <div class="wrap-title">
            <h1 class="title">Видео от наших гостей</h1>
            <div class="actions">
                <button type="button" class="action-btn" @click="scrollPrev"><img src="../assets/arrow-left.svg" alt=""></button>
                <button type="button" class="action-btn" @click="scrollNext"><img src="../assets/arrow-right.svg" alt=""></button>
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
            <video class="video" ref="video1" src="../assets/video-1.mp4" playsinline preload="none" @play="onVideoPlay(0)" @mouseenter="onVideoMouseEnter(0)" @mouseleave="onVideoMouseLeave(0)"></video>
           </div>
           <div class="card">
            <video class="video" ref="video2" src="../assets/video-2.mp4" playsinline preload="none" @play="onVideoPlay(1)" @mouseenter="onVideoMouseEnter(1)" @mouseleave="onVideoMouseLeave(1)"></video>
           </div>
           <div class="card">
            <video class="video" ref="video3" src="../assets/video-3.mp4" playsinline preload="none" @play="onVideoPlay(2)" @mouseenter="onVideoMouseEnter(2)" @mouseleave="onVideoMouseLeave(2)"></video>
           </div>
           <div class="card">
            <video class="video" ref="video4" src="../assets/video-4.mp4" playsinline preload="none" @play="onVideoPlay(3)" @mouseenter="onVideoMouseEnter(3)" @mouseleave="onVideoMouseLeave(3)"></video>
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

// Video refs
const video1 = ref(null)
const video2 = ref(null)
const video3 = ref(null)
const video4 = ref(null)

const allVideos = [video1, video2, video3, video4]

// Pause all videos except the one playing
function onVideoPlay(currentIndex) {
    allVideos.forEach((videoRef, index) => {
        if (index !== currentIndex && videoRef.value) {
            videoRef.value.pause()
        }
    })
}

// Show controls only on hover
function onVideoMouseEnter(index) {
    const v = allVideos[index]
    if (v && v.value) v.value.controls = true
}

function onVideoMouseLeave(index) {
    const v = allVideos[index]
    if (v && v.value) v.value.controls = false
}

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

let resizeObserver
onMounted(() => {
    updatePages()
    // Observe resize to recalc pages
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => updatePages())
        resizeObserver.observe(document.body)
    } else {
        window.addEventListener('resize', updatePages)
    }
})

onBeforeUnmount(() => {
    if (resizeObserver) resizeObserver.disconnect()
    else window.removeEventListener('resize', updatePages)
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
    flex: 0 0 calc((100% - 45px) / 4);
    min-width: 232px;
    height: 360px;
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    background-color: #000;
}

.cards-indicator {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
}

.cards-indicator__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #E6E6E6;
    transition: transform 0.2s ease, background 0.2s ease;
}

.cards-indicator__dot--active {
    background: #1A1A1A;
    transform: scale(1.2);
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .card {
        flex: 0 0 340px;
        width: 340px;
        height: 220px;
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
        height: 200px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        flex: 0 0 calc(100vw - 60px);
        width: calc(100vw - 60px);
        height: 180px;
    }
}


</style>
