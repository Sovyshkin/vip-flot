<template>
    <div class="routes-tours-block">
        <div class="wrap-title">
            <h1 class="title">Мероприятия на воде</h1>
            <div class="actions">
                <button type="button" class="action-btn" :class="{ active: activeTab === 'holidays' }" @click="activeTab = 'holidays'">Праздники</button>
                <button type="button" class="action-btn" :class="{ active: activeTab === 'entertainment' }" @click="activeTab = 'entertainment'">Развлекательные программы</button>
            </div>
        </div>

        <!-- Праздники -->
        <template v-if="activeTab === 'holidays'">
            <div class="row-cards">
                <div v-for="card in holidaysRow1" :key="card.id" class="row-1-card card" @click="goToActivity(card.slug)">
                    <img class="image-card" :src="card.image" :alt="card.name">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="wrap-icon">
                                <img :src="card.icon" :alt="card.name">
                            </div>
                            <h2 class="title-card">{{ card.name }}</h2>
                        </div>
                        <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="row-cards">
                <div v-for="card in holidaysRow2" :key="card.id" class="row-2-card card" @click="goToActivity(card.slug)">
                    <img class="image-card" :src="card.image" :alt="card.name">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="wrap-icon">
                                <img :src="card.icon" :alt="card.name">
                            </div>
                            <h2 class="title-card">{{ card.name }}</h2>
                        </div>
                        <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                    </div>
                </div>
            </div>
        </template>

        <!-- Развлекательные программы -->
        <template v-if="activeTab === 'entertainment'">
            <div class="row-cards">
                <div v-for="card in entertainmentRow1" :key="card.id" class="row-1-card card" @click="goToActivity(card.slug)">
                    <img class="image-card" :src="card.image" :alt="card.name">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="wrap-icon">
                                <img :src="card.icon" :alt="card.name">
                            </div>
                            <h2 class="title-card">{{ card.name }}</h2>
                        </div>
                        <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="row-cards">
                <div v-for="card in entertainmentRow2" :key="card.id" class="row-2-card card" @click="goToActivity(card.slug)">
                    <img class="image-card" :src="card.image" :alt="card.name">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="wrap-icon">
                                <img :src="card.icon" :alt="card.name">
                            </div>
                            <h2 class="title-card">{{ card.name }}</h2>
                        </div>
                        <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getActivitiesByCategory } from '../data/activities'

const router = useRouter()
const activeTab = ref('holidays')

// Праздники - первый ряд (3 карточки)
const holidaysRow1 = getActivitiesByCategory('holidays').slice(0, 3)

// Праздники - второй ряд (4 карточки)
const holidaysRow2 = getActivitiesByCategory('holidays').slice(3, 7)

// Развлекательные программы - первый ряд (3 карточки)
const entertainmentRow1 = getActivitiesByCategory('entertainment').slice(0, 3)

// Развлекательные программы - второй ряд (3 карточки)
const entertainmentRow2 = getActivitiesByCategory('entertainment').slice(3, 6)

function goToActivity(slug) {
  router.push({ name: 'ActivityDetail', params: { slug } })
}
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
    width: fit-content;
    border-radius: 16px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    font-weight: 600;
    font-size: 20px;
    color: #1A1A1A;
}

.active {
    background-color: #0076FC;
    color: #fff;
}

.row-cards {
    display: flex;
    align-items: center;
    gap: 12px;
}


.row-1-card {
    height: 350px;
}

.row-2-card {
    height: 240px;
}
.card {
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    border-radius: 16px;
    padding: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Затемнение поверх изображения */
.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(232deg, rgba(0, 0, 0, 0) 28.07%, rgba(0, 0, 0, 0.8) 100%),
                linear-gradient(207.02deg, rgba(0, 0, 0, 0) 47.19%, rgba(0, 0, 0, 0.8) 89.84%);
    z-index: 1;
    pointer-events: none;
}


.image-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    z-index: 0;
    transition: transform 0.3s ease;
}

.card:hover .image-card {
    transform: scale(1.05);
}

.card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.card-info {
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 2;
}

.wrap-icon {
    width: 50px;
    height: 48px;
    background-color: #0076FC;
    padding: 12px 13px;
    border-radius: 12px;
    z-index: 2;
}

.title-card {
    color: #fff;
    font-weight: 600;
    font-size: 20px;
}

.go-into-card {
    width: 24px;
    height: 24px;
    z-index: 2;
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .actions {
        flex-wrap: wrap;
    }
    
    .action-btn {
        font-size: 16px;
        padding: 12px 16px;
    }
    
    .row-cards {
        gap: 8px;
    }
    
    .row-1-card {
        height: 300px;
    }
    
    .row-2-card {
        height: 200px;
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
        flex-wrap: wrap;
    }
    
    .action-btn {
        font-size: 14px;
        padding: 10px 14px;
    }
    
    .row-cards {
        flex-direction: column;
        gap: 8px;
    }
    
    .row-1-card,
    .row-2-card {
        height: 180px;
        width: 100%;
    }
    
    .title-card {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        padding: 12px;
    }
    
    .wrap-icon {
        width: 40px;
        height: 40px;
        padding: 8px;
    }
    
    .wrap-icon img {
        width: 100%;
        height: 100%;
    }
    
    .title-card {
        font-size: 16px;
    }
    
    .go-into-card {
        width: 20px;
        height: 20px;
    }
}
</style>