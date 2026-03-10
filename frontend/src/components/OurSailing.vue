<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Carousel from './Carousel.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cardsContainer = ref(null)
const currentPage = ref(0)
const pagesCount = ref(0)

function goToBoat(slug) {
    router.push({ name: 'BoatDetail', params: { slug } })
}

function goToCatalog() {
    router.push({ name: 'Catalog' })
}

function goToBooking() {
    router.push({ path: '/', hash: '#booking' })
}

// Touch events
const touchStart = ref({ x: 0, time: 0 })

function onTouchStart(e) {
    touchStart.value = {
        x: e.touches[0].clientX,
        time: Date.now()
    }
}

function onTouchMove() {
    // Дать возможность браузеру обрабатывать прокрутку нативно
}

function onTouchEnd(e) {
    const deltaX = e.changedTouches[0].clientX - touchStart.value.x
    const deltaTime = Date.now() - touchStart.value.time
    
    // Swipe детектирование (минимум 50px и максимум 300ms)
    if (Math.abs(deltaX) > 50 && deltaTime < 300) {
        if (deltaX > 0) {
            scrollPrev()
        } else {
            scrollNext()
        }
    }
}

// Pointer events для мышки
const pointerState = ref({ isDragging: false, startX: 0, scrollLeft: 0 })

function onPointerDown(e) {
    if (!cardsContainer.value) return
    pointerState.value = {
        isDragging: true,
        startX: e.pageX - cardsContainer.value.offsetLeft,
        scrollLeft: cardsContainer.value.scrollLeft
    }
    cardsContainer.value.style.cursor = 'grabbing'
    cardsContainer.value.style.userSelect = 'none'
}

function onPointerMove(e) {
    if (!pointerState.value.isDragging || !cardsContainer.value) return
    e.preventDefault()
    const x = e.pageX - cardsContainer.value.offsetLeft
    const walk = (x - pointerState.value.startX) * 2
    cardsContainer.value.scrollLeft = pointerState.value.scrollLeft - walk
}

function onPointerUp() {
    if (!cardsContainer.value) return
    pointerState.value.isDragging = false
    cardsContainer.value.style.cursor = 'grab'
    cardsContainer.value.style.userSelect = ''
}

// Scroll Navigation
function findFirstVisibleIndex() {
    const container = cardsContainer.value
    if (!container) return 0
    const cards = Array.from(container.querySelectorAll('.card'))
    const scrollLeft = container.scrollLeft
    
    let closestIndex = 0
    let minDistance = Infinity
    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const cardLeft = card.offsetLeft
        const distance = Math.abs(scrollLeft - cardLeft)
        
        if (distance < minDistance) {
            minDistance = distance
            closestIndex = i
        }
    }
    
    return closestIndex
}

function scrollToIndex(index) {
    if (!cardsContainer.value) return
    const container = cardsContainer.value
    const cards = container.querySelectorAll('.card')
    if (index >= 0 && index < cards.length) {
        const card = cards[index]
        // removed unused var
        container.scrollTo({
            left: card.offsetLeft,
            behavior: 'smooth'
        })
    }
}

function scrollNext() {
    const idx = findFirstVisibleIndex()
    scrollToIndex(idx + 1)
}

function scrollPrev() {
    const idx = findFirstVisibleIndex()
    scrollToIndex(idx - 1)
}

function onScroll() {
    updatePages()
}

function updatePages() {
    if (!cardsContainer.value) return
    const container = cardsContainer.value
    const cards = container.querySelectorAll('.card')
    const total = cards.length
    
    // Определяем количество видимых карточек в зависимости от ширины экрана
    let visibleCount = 3 // desktop default
    const width = window.innerWidth
    if (width <= 768) visibleCount = 1 // mobile
    else if (width <= 1200) visibleCount = 2 // tablet
    
    // Количество возможных позиций прокрутки
    pagesCount.value = Math.max(1, total - visibleCount + 1)
    currentPage.value = findFirstVisibleIndex()
}

let resizeObserver = null

onMounted(() => {
    if (cardsContainer.value) {
        updatePages()
        resizeObserver = new ResizeObserver(() => {
            updatePages()
        })
        resizeObserver.observe(cardsContainer.value)
    }
})

onBeforeUnmount(() => {
    if (resizeObserver && cardsContainer.value) {
        resizeObserver.unobserve(cardsContainer.value)
    }
})
</script>

<template>
    <div class="sailing-block">
        <div class="wrap-title">
            <h1 class="title">Наши парусные</h1>
            <div class="title-actions">
                <div class="view-catalog" @click="goToCatalog">
                    <span class="text-catalog">Смотреть весь каталог</span>
                    <img class="icon-catalog" src="../assets/go-to-catalog.svg" alt="">
                </div>
                <div class="navigation-btns">
                    <button type="button" class="action-btn" @click="scrollPrev"><img src="../assets/arrow-left.svg" alt=""></button>
                    <button type="button" class="action-btn" @click="scrollNext"><img src="../assets/arrow-right.svg" alt=""></button>
                </div>
            </div>
        </div>
           <div 
            ref="cardsContainer" 
            class="cards" 
            @scroll="onScroll"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
        >
            <div class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img src="../assets/sailing-1.png" alt="">
                    </Carousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Beluga</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до 10 гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>5.5 метров</span>
                            </div>
                        </div>
                        <span class="card-price">от 19 000 ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click="goToBooking">Забронировать</button>
                        <button class="btn more" @click="goToBoat('beluga')">Подробнее</button>
                    </div>
                </div>
            </div>
             <div class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img src="../assets/sailing-2.png" alt="">
                    </Carousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Geleon</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до 10 гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>5.5 метров</span>
                            </div>
                        </div>
                        <span class="card-price">от 19 000 ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click="goToBooking">Забронировать</button>
                        <button class="btn more" @click="goToBoat('geleon')">Подробнее</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img src="../assets/sailing-3.png" alt="">
                    </Carousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Amsterdam</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до 10 гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>5.5 метров</span>
                            </div>
                        </div>
                        <span class="card-price">от 19 000 ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click="goToBooking">Забронировать</button>
                        <button class="btn more" @click="goToBoat('amsterdam')">Подробнее</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img src="../assets/sailing-4.png" alt="">
                    </Carousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Магнум</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до 10 гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>5.5 метров</span>
                            </div>
                        </div>
                        <span class="card-price">от 19 000 ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click="goToBooking">Забронировать</button>
                        <button class="btn more" @click="goToBoat('boat-4')">Подробнее</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img src="../assets/sailing-5.png" alt="">
                    </Carousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Francesco</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до 10 гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>5.5 метров</span>
                            </div>
                        </div>
                        <span class="card-price">от 19 000 ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click="goToBooking">Забронировать</button>
                        <button class="btn more" @click="goToBoat('francesco')">Подробнее</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img src="../assets/sailing-6.png" alt="">
                    </Carousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">Cherry</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до 10 гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>5.5 метров</span>
                            </div>
                        </div>
                        <span class="card-price">от 19 000 ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click="goToBooking">Забронировать</button>
                        <button class="btn more" @click="goToBoat('cherry')">Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cards-indicator" aria-hidden="true">
            <span v-for="n in pagesCount" :key="n" :class="['cards-indicator__dot', { 'cards-indicator__dot--active': (n - 1) === currentPage }]"></span>
        </div>
    </div>
</template>

<style scoped>
.sailing-block {
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

.title-actions {
    display: flex;
    align-items: center;
    gap: 24px;
}

.navigation-btns {
    display: flex;
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

.view-catalog {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.view-catalog:hover {
    opacity: 0.7;
}

.text-catalog {
    color: #0076FC;
    font-weight: 500;
    font-size: 14px;
    line-height: 17.5px;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.icon-catalog {
    width: 20px;
    height: 20px;
}

.cards {
    width: 100%;
    display: flex;
    gap: 15px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    cursor: grab;
}

.cards::-webkit-scrollbar {
    display: none;
}

.cards:active {
    cursor: grabbing;
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

.card {
        min-width: calc(33.333% - 10px);
        flex-shrink: 0;
        display: flex;
        min-height: 450px;
        flex-direction: column;
        gap: 24px;
        background-color: #fff;
        border-radius: 16px;
        scroll-snap-align: start;
}

.wrap-img {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    width: 100%;
    aspect-ratio: 16 / 9;
    cursor: pointer;
}

.card-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 24px 24px 24px;
}

.card-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.card-title {
    color: #1A1A1A;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
}

.card-desc {
    display: flex;
    align-items: center;
    gap: 16px;
}

.item-desc {
    display: flex;
    align-items: center;
    gap: 8px;
}

.card-price {
    color: #0076FC;
    font-weight: 600;
    font-size: 19px;
}

.wrap-btns {
    display: flex;
    gap: 12px;
    align-items: center;
}

.btn {
    width: 100%;
    padding: 18.5px 32px;
    border-radius: 16px;
    background-color: #F5F5F5;
    color: #1A1A1A;
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    letter-spacing: 0px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.to-book {
    background-color: #0076FC;
    color: #FFFFFF;
}

.to-book:hover {
    background-color: #0061D1;
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
@media (max-width: 1200px) {
    .card {
        min-width: calc(50% - 7.5px);
    }
}

@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .card {
        min-height: 400px;
        min-width: calc(50% - 7.5px);
    }
    
    .card-title {
        font-size: 20px;
    }
    
    .card-desc {
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .sailing-block {
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
    
    .title-actions {
        width: 100%;
        justify-content: space-between;
    }
    
    .card {
        min-height: 380px;
        min-width: 100%;
    }
    
    .wrap-img {
        height: 200px;
    }
    
    .card-info {
        gap: 20px;
        padding: 0 20px 20px 20px;
    }
    
    .card-title {
        font-size: 18px;
    }
    
    .card-desc {
        font-size: 15px;
    }
    
    .btn {
        padding: 16px 24px;
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        min-height: 350px;
    }
    
    .wrap-img {
        height: 180px;
    }
    
    .card-title {
        font-size: 16px;
    }
    
    .card-desc {
        font-size: 14px;
    }
    
    .card-price {
        font-size: 17px;
    }
}
</style>