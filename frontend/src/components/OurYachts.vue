<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import CardCarousel from './CardCarousel.vue'
import { useRouter } from 'vue-router'
import { yachts } from '../data/yachts'

const router = useRouter()
const showAll = ref(false)
const isMobile = ref(false)
function checkMobile() { isMobile.value = window.innerWidth <= 768 }

const visibleYachts = computed(() => showAll.value ? yachts : yachts.slice(0, isMobile.value ? 4 : 6))

function goToYacht(slug) {
    router.push({ name: 'BoatDetail', params: { slug } })
}

function goToCatalog() {
    router.push({ name: 'Catalog' })
}

function goToBooking() {
    router.push({ path: '/', hash: '#booking' })
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
})
</script>

<template>
    <div class="yachts-block">
        <div class="wrap-title">
            <div class="title-left">
                <h1 class="title">Наши яхты</h1>
                <div class="view-catalog" @click="goToCatalog">
                    <span class="text-catalog">Перейти в каталог</span>
                    <img class="icon-catalog" src="../assets/go-to-catalog.svg" alt="">
                </div>
            </div>
        </div>
        <div class="cards">
            <div v-for="yacht in visibleYachts" :key="yacht.id" class="card" @click="goToYacht(yacht.slug)">
                <div class="wrap-img">
                    <CardCarousel :images="Array.isArray(yacht.cardImage) ? yacht.cardImage : [yacht.cardImage]" :alt="yacht.name">
                    </CardCarousel>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">{{ yacht.name }}</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до {{ yacht.capacity }} гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>{{ yacht.length }} м</span>
                            </div>
                        </div>
                        <span class="card-price" v-if="yacht.pricePerHour">от {{ yacht.pricePerHour.toLocaleString('ru-RU') }} ₽/час</span>
                        <span class="card-price" v-else>Цена по запросу</span>
                        <span class="card-price-day" v-if="yacht.pricePerDay">от {{ yacht.pricePerDay.toLocaleString('ru-RU') }} ₽/сутки</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click.stop="goToBooking">Арендовать</button>
                        <button class="btn more" @click.stop="goToYacht(yacht.slug)">Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!showAll && yachts.length > (isMobile ? 4 : 8)" class="show-more-wrap">
            <button class="show-more-btn" @click="showAll = true">Показать ещё</button>
        </div>
    </div>
</template>

<style scoped>
.yachts-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.wrap-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.title-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
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
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        background-color: #fff;
        border-radius: 16px;
        cursor: pointer;
    }

.wrap-img {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    width: 100%;
    aspect-ratio: 16 / 9;
    cursor: pointer;
    background: #fff;
}

.wrap-img :deep(.carousel-track) {
    display: flex !important;
    width: 100% !important;
    height: 100% !important;
}

.wrap-img :deep(.carousel-slide) {
    flex-shrink: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.wrap-img :deep(.carousel-slide img) {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
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

.card-price-day {
    color: #5a6a8a;
    font-size: 13px;
    font-weight: 500;
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
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .title-actions {
        gap: 16px;
    }
    
    .view-catalog {
        gap: 6px;
    }
    
    .text-catalog {
        font-size: 14px;
    }
    
    .icon-catalog {
        width: 16px;
        height: 16px;
    }
    
    .action-btn {
        width: 40px;
        height: 40px;
    }
    
    .action-btn img {
        width: 20px;
        height: 20px;
    }
    
    .card-title {
        font-size: 20px;
    }
    
    .card-desc {
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .yachts-block {
        gap: 24px;
    }
    
    .wrap-title {
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }
    
    .title {
        font-size: 24px;
    }
    
    .cards {
        grid-template-columns: 1fr;
        gap: 16px;
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

.show-more-wrap {
    display: flex;
    justify-content: center;
    margin-top: 8px;
}

.show-more-btn {
    padding: 16px 48px;
    border-radius: 16px;
    background-color: #0076FC;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.show-more-btn:hover {
    background-color: #0061D1;
    transform: translateY(-2px);
}
</style>