<template>
    <div class="yacht-tours-block">
        <div class="wrap-title">
            <h2 class="title">Другие яхт-туры</h2>
        </div>
        <div class="cards-scroll">
            <div class="cards">
                <div v-for="tour in yachtTours" :key="tour.id" class="card" @click="goToTour(tour.link)">
                    <div class="wrap-img">
                        <img :src="tour.imageUrl" :alt="tour.title">
                        <div class="badge">{{ tour.duration }}</div>
                    </div>
                    <div class="card-info">
                        <span class="card-title">{{ tour.title }}</span>
                        <span class="card-desc">{{ tour.description }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { yachtTours } from '../data/yachtsTours'

const router = useRouter()

function goToTour(link) {
  if (!link || link.startsWith('#popup')) {
    return
  }
  if (link.startsWith('/')) {
    router.push(link)
  }
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
}

.title {
    color: #1A1A1A;
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 700;
}

.cards-scroll {
    overflow-x: auto;
    margin: 0 -20px;
    padding: 0 20px;
    scrollbar-width: none;
}

.cards-scroll::-webkit-scrollbar {
    display: none;
}

.cards {
    display: flex;
    gap: 16px;
    padding-bottom: 8px;
}

.card {
    flex: 0 0 320px;
    display: flex;
    flex-direction: column;
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

@media (max-width: 768px) {
    .title {
        font-size: 24px;
    }

    .card {
        flex: 0 0 260px;
    }
}
</style>
