<script setup>
import { boats } from '../data/boats'
import Carousel from './Carousel.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToBoatDetail(slug) {
  router.push({ name: 'BoatDetail', params: { slug } })
}

function goToCatalog() {
  router.push({ name: 'Catalog' })
}

function goToBooking() {
    router.push({ path: '/', hash: '#booking' })
}
</script>

<template>
    <div class="our-boats-block">
        <div class="wrap-title">
            <h1 class="title">Наши катера</h1>
            <div class="view-catalog" @click="goToCatalog">
                <span class="text-catalog">Смотреть весь каталог</span>
                <img class="icon-catalog" src="../assets/go-to-catalog.svg" alt="">
            </div>
        </div>
           <div class="cards">
            <div v-for="boat in boats" :key="boat.id" class="card">
                <div class="wrap-img">
                    <Carousel :interval="4500">
                        <img v-for="(image, index) in boat.cardImage" :key="index" :src="image" :alt="boat.name">
                    </Carousel>
                </div>
                <div class="card-info" @click="goToBoatDetail(boat.slug)" style="cursor: pointer;">
                    <div class="card-text">
                        <span class="card-title">{{ boat.name }}</span>
                        <div class="card-desc">
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-1.svg" alt="">
                                <span>до {{ boat.capacity }} гостей</span>
                            </div>
                            <div class="item-desc">
                                <img src="../assets/card-desc-icon-2.svg" alt="">
                                <span>{{ boat.length }} метров</span>
                            </div>
                        </div>
                        <span class="card-price">от {{ boat.pricePerHour.toLocaleString('ru-RU') }} ₽/час</span>
                    </div>
                    <div class="wrap-btns">
                        <button class="btn to-book" @click.stop="goToBooking">Забронировать</button>
                        <button class="btn more" @click.stop="goToBoatDetail(boat.slug)">Подробнее</button>
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
.our-boats-block {
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
    width: 100%;
    aspect-ratio: 16 / 9;
    cursor: pointer;
}

/* Carousel controls styling for cards */
.wrap-img :deep(.arrow) {
    width: 36px;
    height: 36px;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
}

.wrap-img :deep(.arrow:hover) {
    background: rgba(0, 0, 0, 0.8);
}

.wrap-img :deep(.dots) {
    bottom: 10px;
}

.wrap-img :deep(.dot) {
    width: 8px;
    height: 8px;
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
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 1024px) {
    .title {
        font-size: 28px;
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
}

@media (max-width: 768px) {
    .our-boats-block {
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
    
    .cards {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .card-title {
        font-size: 18px;
    }
    
    .card-price {
        font-size: 17px;
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
    
    .card-info {
        gap: 20px;
        padding: 0 20px 20px 20px;
    }
    
    .card-title {
        font-size: 16px;
    }
    
    .item-desc span {
        font-size: 13px;
    }
    
    .card-price {
        font-size: 16px;
    }
    
    .wrap-btns {
        flex-direction: column;
        gap: 8px;
    }
    
    .btn {
        padding: 14px 20px;
        font-size: 13px;
    }
}
</style>