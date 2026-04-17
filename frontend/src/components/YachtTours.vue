<template>
    <div class="yacht-tours-block">
        <div class="wrap-title">
            <h1 class="title">Яхт-туры</h1>
            <div class="view-all" @click="goToRoutesPage">
                <span class="text-view">Смотреть маршруты</span>
                <img class="icon-view" src="../assets/go-to-catalog.svg" alt="">
            </div>
        </div>
        <div class="cards">
            <div v-for="tour in yachtTours" :key="tour.id" class="card" @click="goToTour(tour.link)">
                <div class="wrap-img">
                    <img :src="tour.imageUrl" :alt="tour.title">
                    <div class="badge">{{ tour.duration }}</div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <span class="card-title">{{ tour.title }}</span>
                        <span class="card-desc">{{ tour.description }}</span>
                    </div>
                    <button class="card-btn" @click.stop="goToTour(tour.link)">Подробнее</button>
                </div>
            </div>
        </div>
    </div>
    <BookingModal v-model="isBookingOpen" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { yachtTours } from '../data/yachtsTours'
import BookingModal from './BookingModal.vue'

const router = useRouter()
const isBookingOpen = ref(false)

function goToTour(link) {
  if (!link) {
    isBookingOpen.value = true
    return
  }
  
  if (link.startsWith('#popup')) {
    isBookingOpen.value = true
  } else if (link.startsWith('/')) {
    router.push(link)
  }
}

function goToRoutesPage() {
  router.push({ name: 'Tours' })
}
</script>

<style scoped>
.yacht-tours-block {
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

.view-all {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.view-all:hover {
    opacity: 0.7;
}

.text-view {
    color: #0076FC;
    font-weight: 500;
    font-size: 14px;
    line-height: 17.5px;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.icon-view {
    width: 20px;
    height: 20px;
}

.cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
}

.card {
    min-height: 450px;
    display: flex;
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
    object-fit: cover;
    display: block;
}

.badge {
    position: absolute;
    border-radius: 0 16px 0 16px;
    padding: 8px 12px;
    background-color: black;
    color: white;
    font-size: 14px;
    font-weight: 500;
    bottom: 0;
    left: 0;
}

.card-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    padding: 0 24px 24px 24px;
    flex: 1;
}

.card-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card-title {
    color: #1A1A1A;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.2;
}

.card-desc {
    color: #949CA4;
    font-size: 16px;
    line-height: 1.4;
    min-height: 3.2em;
}

.card-btn {
    width: 100%;
    padding: 16px 32px;
    background-color: #0076FC;
    border-radius: 16px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 15px;
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

    .cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card {
        min-height: 420px;
    }

    .wrap-img {
        height: 210px;
    }

    .card-title {
        font-size: 21px;
    }

    .card-desc {
        font-size: 15px;
    }
}

@media (max-width: 768px) {
    .yacht-tours-block {
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

    .card {
        min-height: auto;
        gap: 18px;
    }

    .wrap-img {
        height: 200px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card-info {
        gap: 16px;
        padding: 0 20px 20px 20px;
    }
    
    .card-title {
        font-size: 18px;
    }
    
    .card-desc {
        font-size: 13px;
        min-height: auto;
    }
    
    .card-btn {
        padding: 14px 20px;
        font-size: 14px;
    }
}
</style>
