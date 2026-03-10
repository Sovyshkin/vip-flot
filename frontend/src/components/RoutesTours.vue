<template>
    <div class="routes-tours-block">
        <div class="wrap-title">
            <h1 class="title">Маршруты и туры</h1>
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
                <div class="wrap-img">
                    <img src="../assets/card-1.jpg" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Катера и яхты на развод мостов</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('razvod-mostov')">Узнать подробнее</button>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <img src="../assets/card-2.png" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Реки каналы</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('reki-kanaly')">Узнать подробнее</button>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <img src="../assets/card-1.jpg" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Катера и яхты на развод мостов</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('petergof-morskoy')">Узнать подробнее</button>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <img src="../assets/card-2.png" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Реки каналыв</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('kronshtadt-tour')">Узнать подробнее</button>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <img src="../assets/card-1.jpg" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Катера и яхты на развод мостов</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('romantichnaya-progulka')">Узнать подробнее</button>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <img src="../assets/card-2.png" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Реки каналы</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('korporativnaya-progulka')">Узнать подробнее</button>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <img src="../assets/card-1.jpg" alt="">
                    <div class="badge">от 2-х часов</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Катера и яхты на развод мостов</span>
                        <span class="card-desc">Ночные прогулки под разводными мостами Санкт-Петербурга на катерах и яхтах</span>
                    </div>
                    <button class="card-btn" @click="goToRoute('razvod-mostov')">Узнать подробнее</button>
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

const router = useRouter()
const cardsContainer = ref(null)
const currentPage = ref(0)
const pagesCount = ref(1)

function goToRoute(slug) {
  router.push({ name: 'RouteDetail', params: { slug } })
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
.routes-tours-block {
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


.cards::-webkit-scrollbar { display: none; }

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
}

.card {
    flex: 0 0 592px;
    width: 592px;
    display: flex;
    min-height: 450px;
    flex-direction: column;
    gap: 24px;
    background-color: #fff;
    border-radius: 16px;
}

.wrap-img {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    height: 238px;
}

.badge {
    position: absolute;
    border-radius: 0 16px 0 16px;
    padding: 8px 12px;
    background-color: black;
    color: white;
    font-weight: 500;
    font-size: 14px;
    bottom: 0;
    left: 0;
}

.card-info {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0 24px 24px 24px;
}

.card-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.card-title {
    color: #1A1A1A;
    font-weight: 600;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.card-desc {
    color: #1A1A1A;
    font-weight: 300;
    font-size: 18px;
    letter-spacing: 1px;
    opacity: .7;
}

.card-btn {
    width: 100%;
    padding: 18.5px 32px ;
    background-color: #0076FC;
    border-radius: 12px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .card {
        flex: 0 0 480px;
        width: 480px;
        min-height: 400px;
    }
    
    .card-title {
        font-size: 20px;
    }
    
    .card-desc {
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .routes-tours-block {
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
        min-height: 380px;
    }
    
    .wrap-img {
        height: 200px;
    }
    
    .card-info {
        gap: 24px;
        padding: 0 20px 20px 20px;
    }
    
    .card-title {
        font-size: 18px;
    }
    
    .card-desc {
        font-size: 15px;
    }
    
    .card-btn {
        padding: 16px 24px;
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
        min-height: 350px;
    }
    
    .wrap-img {
        height: 180px;
    }
    
    .badge {
        font-size: 12px;
        padding: 6px 10px;
    }
    
    .card-title {
        font-size: 16px;
    }
    
    .card-desc {
        font-size: 14px;
    }
}
</style>