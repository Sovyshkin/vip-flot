<template>
    <div class="routes-tours-block">
        <div class="wrap-title">
            <h1 class="title">Маршруты</h1>
            <div class="actions">
                <button type="button" class="action-btn" @click="scrollPrev"><img src="../assets/arrow-left.svg" alt=""></button>
                <button type="button" class="action-btn" @click="scrollNext"><img src="../assets/arrow-right.svg" alt=""></button>
            </div>
        </div>
        <div class="tabs">
            <button type="button" class="tab-btn" :class="{ active: activeTab === 'boats' }" @click="switchTab('boats')">Маршруты на катерах</button>
            <button type="button" class="tab-btn" :class="{ active: activeTab === 'yachts' }" @click="switchTab('yachts')">Маршруты на яхтах</button>
        </div>
        <div
            class="cards"
            ref="cardsContainer"
            @scroll="onScroll"
            @touchstart.passive="onTouchStart"
            @touchmove.passive="onTouchMove"
            @touchend.passive="onTouchEnd"
            @pointerdown.passive="onPointerDown"
            @pointermove.passive="onPointerMove"
            @pointerup.passive="onPointerUp"
            @pointercancel.passive="onPointerUp">
            <div
                    v-for="route in visibleRoutes"
                    :key="route.id"
                    class="card"
                    :class="{ 'card--custom': isCustomRoute(route) }"
                    @click="handleRouteClick(route)">
                    <div v-if="!isCustomRoute(route)" class="wrap-img">
                        <img :src="route.image" :alt="route.title">
                        <div class="badge">{{ route.duration || 'По договоренности' }}</div>
                    </div>
                    <div class="card-info" :class="{ 'card-info--custom': isCustomRoute(route) }">
                        <div class="card-text">
                            <span v-if="isCustomRoute(route)" class="card-label">Индивидуальный маршрут</span>
                            <span class="card-title">{{ route.title }}</span>
                            <span class="card-desc" :class="{ 'card-desc--custom': isCustomRoute(route) }">{{ getCustomDescription(route) }}</span>
                            <span v-if="isCustomRoute(route)" class="card-note">Опишите пожелания — капитан предложит лучший вариант по времени и маршруту.</span>
                        </div>
                        <button class="card-btn" @click.stop="handleRouteClick(route)">{{ getActionText(route) }}</button>
                    </div>
                </div>
        </div>
        <div class="cards-indicator" aria-hidden="true">
            <span v-for="n in pagesCount" :key="n" :class="['cards-indicator__dot', { 'cards-indicator__dot--active': (n - 1) === currentPage }]"></span>
        </div>
        <button
            v-if="isMobile && !showAll && routesForTab.length > mobileLimit"
            class="show-more-btn"
            @click="showAll = true"
        >Показать больше</button>
    </div>
    <BookingModal v-model="isBookingOpen" />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { boatsRoutes } from '../data/boatsRoutes'
import { yachtsRoutes } from '../data/yachtsRoutes'
import BookingModal from './BookingModal.vue'

const router = useRouter()
const cardsContainer = ref(null)
const currentPage = ref(0)
const pagesCount = ref(1)
const activeTab = ref('boats')
const showAll = ref(false)
const isMobile = ref(false)
const mobileLimit = 3
const isBookingOpen = ref(false)

const routesForTab = computed(() => (activeTab.value === 'boats' ? boatsRoutes : yachtsRoutes))
const visibleRoutes = computed(() => {
    if (!isMobile.value) return routesForTab.value
    if (showAll.value) return routesForTab.value
    return routesForTab.value.slice(0, mobileLimit)
})

function handleRouteClick(route) {
    if (route.link && !route.isPopup) {
        if (route.link.startsWith('/')) {
            router.push(route.link)
            return
        }
    }
    isBookingOpen.value = true
}

function getActionText(route) {
    if (route.title.toLowerCase().includes('свой маршрут')) return 'Обсудить'
    if (route.link && !route.isPopup) return 'Подробнее'
    return 'Оставить заявку'
}

function isCustomRoute(route) {
    return route.hasImage === false || !route.image || /свой маршрут/i.test(route.title)
}

function getCustomDescription(route) {
    if (!isCustomRoute(route)) return route.description
    return 'Соберем индивидуальный маршрут по вашим пожеланиям. Согласуем длительность, места остановок и формат прогулки.'
}
function getVisibleCount() {
  const width = window.innerWidth
  if (width <= 768) return 1
  if (width <= 1200) return 2
  return 3
}

// swipe / pointer state
const touchStartX = ref(0)
const touchDeltaX = ref(0)
const isPointerDown = ref(false)
const pointerStartX = ref(0)

function switchTab(tab) {
  activeTab.value = tab
  showAll.value = false
  nextTick(() => {
    if (cardsContainer.value) {
      cardsContainer.value.scrollTo({ left: 0, behavior: 'instant' })
    }
    updatePages()
  })
}

function findFirstVisibleIndex() {
    const container = cardsContainer.value
    if (!container) return 0
    const cards = Array.from(container.querySelectorAll('.card'))
    const containerRect = container.getBoundingClientRect()
    for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect()
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
    const step = getVisibleCount()
    const target = Math.min(idx + step, cards.length - 1)
    scrollToIndex(target)
}

function scrollPrev() {
    const idx = findFirstVisibleIndex()
    const step = getVisibleCount()
    const target = Math.max(idx - step, 0)
    scrollToIndex(target)
}

function updatePages() {
    const container = cardsContainer.value
    if (!container) return
    const total = container.querySelectorAll('.card').length
    const visible = getVisibleCount()
    pagesCount.value = Math.max(1, Math.ceil(total / visible))
    const idx = findFirstVisibleIndex()
    currentPage.value = Math.floor(idx / visible)
}

function onScroll() {
    updatePages()
}

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

function checkMobile() {
    isMobile.value = window.innerWidth <= 768
}

let resizeObserver
onMounted(() => {
    checkMobile()
    updatePages()
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => { checkMobile(); updatePages() })
        resizeObserver.observe(document.body)
    } else {
        window.addEventListener('resize', () => { checkMobile(); updatePages() })
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

.tabs {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.tab-btn {
    padding: 12px 24px;
    border-radius: 16px;
    background-color: #fff;
    font-weight: 600;
    font-size: 16px;
    color: #1A1A1A;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    border: none;
}

.tab-btn.active {
    background-color: #0076FC;
    color: #fff;
}

.tab-btn:hover:not(.active) {
    background-color: #e8e8e8;
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

.card {
    flex: 0 0 calc(33.333% - 10px);
    width: calc(33.333% - 10px);
    display: flex;
    min-height: 450px;
    flex-direction: column;
    gap: 24px;
    background-color: #fff;
    border-radius: 16px;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.card--custom {
    background: linear-gradient(145deg, rgba(0, 118, 252, 0.12), rgba(255, 255, 255, 0.9));
    border: 1px solid rgba(0, 118, 252, 0.2);
}

.wrap-img {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    height: 238px;
    background: #f2f4f7;
}

.wrap-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.wrap-img--placeholder {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    background: linear-gradient(135deg, rgba(0, 118, 252, 0.2), rgba(0, 118, 252, 0.05));
}

.placeholder-content {
    padding: 18px;
    color: #1A1A1A;
    font-weight: 600;
    font-size: 16px;
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
    flex: 1;
}

.card-info--custom {
    padding: 24px;
    gap: 20px;
}

.card-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
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
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-desc--custom {
    color: #1A1A1A;
    font-weight: 500;
    font-size: 17px;
    letter-spacing: 0;
    opacity: 1;
    -webkit-line-clamp: unset;
}

.card-label {
    display: inline-flex;
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(0, 118, 252, 0.15);
    color: #0076FC;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.card-note {
    color: #5a6a8a;
    font-size: 14px;
    line-height: 1.45;
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
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.card-btn:hover {
    background-color: #0061D1;
    transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .card {
        flex: 0 0 calc(50% - 7.5px);
        width: calc(50% - 7.5px);
        min-height: 400px;
    }
    
    .card-title {
        font-size: 20px;
    }
    
    .card-desc {
        font-size: 16px;
    }

    .card-desc--custom {
        font-size: 15px;
    }
}

@media (max-width: 768px) {
    .routes-tours-block {
        gap: 16px;
    }

    .wrap-title {
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }

    .title {
        flex: 1;
        font-size: 22px;
    }

    /* Стрелки скролла прячем — карточки теперь в сетке */
    .actions {
        display: none;
    }

    .cards-indicator {
        display: none;
    }

    .tabs {
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        flex-wrap: nowrap;
    }

    .tabs::-webkit-scrollbar {
        display: none;
    }

    .tab-btn {
        white-space: nowrap;
        font-size: 13px;
        padding: 10px 16px;
        border-radius: 12px;
    }

    /* Одна колонка вместо горизонтального скролла */
    .cards {
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: visible;
    }

    /* Карточка: горизонтальная — фото слева, текст справа */
    .card {
        flex: none;
        width: 100%;
        min-height: unset;
        height: 110px;
        flex-direction: row;
        gap: 0;
        border-radius: 16px;
        overflow: hidden;
    }

    .wrap-img {
        flex-shrink: 0;
        width: 38%;
        height: 100%;
        border-radius: 0;
    }

    .wrap-img--placeholder {
        align-items: center;
    }

    .badge {
        font-size: 11px;
        padding: 5px 9px;
        border-radius: 0 12px 0 12px;
    }

    .card-info {
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        gap: 6px;
        padding: 12px;
    }

    .card-text {
        gap: 4px;
        flex: 1;
        overflow: hidden;
    }

    .card-title {
        font-size: 13px;
        letter-spacing: 0;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-desc {
        font-size: 11px;
        line-height: 1.35;
        opacity: 0.7;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-desc--custom {
        font-size: 12px;
        -webkit-line-clamp: unset;
    }

    .card-info--custom {
        padding: 16px;
    }

    .card-note {
        font-size: 12px;
    }

    .card-btn {
        width: 100%;
        padding: 9px 10px;
        font-size: 12px;
        border-radius: 10px;
        line-height: 1.2;
    }

    .show-more-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 14px;
        background-color: #fff;
        color: #1A1A1A;
        font-weight: 600;
        font-size: 14px;
        border-radius: 14px;
        border: none;
        cursor: pointer;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }

    .card {
        height: 145px;
    }

    .wrap-img {
        width: 42%;
    }

    .card-info {
        padding: 12px 10px;
    }

    .card-title {
        font-size: 12px;
    }

    .card-btn {
        font-size: 11px;
        padding: 8px 8px;
    }
}
</style>