<template>
  <div class="routes-page">
    <div class="wrap">
      <div class="page-header">
        <h1 class="page-title">Маршруты</h1>
        <p class="page-subtitle">Выберите маршрут для катера или яхты — покажем город с воды в самом красивом ракурсе</p>
      </div>

      <div class="tabs">
        <button type="button" class="tab-btn" :class="{ active: activeTab === 'boats' }" @click="activeTab = 'boats'">Катера</button>
        <button type="button" class="tab-btn" :class="{ active: activeTab === 'yachts' }" @click="activeTab = 'yachts'">Яхты</button>
      </div>

      <div class="routes-grid">
        <article
          v-for="route in routesForTab"
          :key="route.id"
          class="route-card"
          :class="{ 'route-card--custom': isCustomRoute(route) }"
          @click="handleRouteClick(route)">
          <div v-if="!isCustomRoute(route)" class="route-media">
            <img :src="route.image" :alt="route.title" loading="lazy" decoding="async">
            <div class="route-badge">{{ route.duration || 'По договоренности' }}</div>
          </div>
          <div class="route-info" :class="{ 'route-info--custom': isCustomRoute(route) }">
            <span v-if="isCustomRoute(route)" class="route-label">Индивидуальный формат</span>
            <h2 class="route-title">{{ route.title }}</h2>
            <p class="route-description" :class="{ 'route-description--custom': isCustomRoute(route) }">
              {{ getCustomDescription(route) }}
            </p>
            <p v-if="isCustomRoute(route)" class="route-note">Согласуем время, точки посадки и высадки, маршрут и формат прогулки.</p>
            <div class="route-details">
              <button class="route-btn" @click.stop="handleRouteClick(route)">{{ getActionText(route) }}</button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <BookingModal v-model="isBookingOpen" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { boatsRoutes } from '../data/boatsRoutes'
import { yachtsRoutes } from '../data/yachtsRoutes'
import BookingModal from './BookingModal.vue'

const router = useRouter()
const activeTab = ref('boats')
const isBookingOpen = ref(false)

const routesForTab = computed(() => (activeTab.value === 'boats' ? boatsRoutes : yachtsRoutes))

function handleRouteClick(route) {
  if (route.link && !route.isPopup) {
    if (route.link.startsWith('/')) {
      router.push(route.link)
      return
    }
  }
  isBookingOpen.value = true
}

function isCustomRoute(route) {
  return route.hasImage === false || !route.image || /свой маршрут/i.test(route.title)
}

function getCustomDescription(route) {
  if (!isCustomRoute(route)) return route.description
  return 'Соберем индивидуальный маршрут под ваши пожелания, учтем формат прогулки и состав гостей.'
}

function getActionText(route) {
  if (route.title.toLowerCase().includes('свой маршрут')) return 'Обсудить'
  if (route.link && !route.isPopup) return 'Подробнее'
  return 'Оставить заявку'
}
</script>

<style scoped>
.routes-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-title {
  color: #1A1A1A;
  text-transform: uppercase;
  font-size: 48px;
  font-weight: 700;
}

.page-subtitle {
  color: #949CA4;
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
}

.tabs {
  display: flex;
  gap: 12px;
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

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.route-card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.route-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.route-card--custom {
  background: linear-gradient(145deg, rgba(0, 118, 252, 0.12), rgba(255, 255, 255, 0.9));
  border: 1px solid rgba(0, 118, 252, 0.2);
}

.route-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f2f4f7;
}

.route-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.route-info--custom {
  padding: 28px;
  gap: 12px;
}

.route-label {
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

.route-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.route-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.route-title {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}

.route-description {
  color: #949CA4;
  font-size: 15px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.route-description--custom {
  color: #1A1A1A;
  font-size: 16px;
  font-weight: 500;
  -webkit-line-clamp: unset;
}

.route-note {
  color: #5a6a8a;
  font-size: 14px;
  line-height: 1.5;
}

.route-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: auto;
}

.route-btn {
  padding: 12px 24px;
  background-color: #0076FC;
  color: #fff;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.route-btn:hover {
  background-color: #0061D1;
}

/* Responsive */
@media (max-width: 1024px) {
  .page-title {
    font-size: 36px;
  }
  
  .page-subtitle {
    font-size: 16px;
  }
  
  .routes-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  
  .page-title {
    font-size: 28px;
  }
  
  .page-subtitle {
    font-size: 15px;
  }
  
  .routes-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .route-title {
    font-size: 20px;
  }
  
  .route-description {
    font-size: 14px;
  }

  .route-info--custom {
    padding: 22px;
    gap: 14px;
  }

  .route-label {
    max-width: 100%;
    white-space: normal;
    line-height: 1.2;
  }

  .route-description--custom {
    font-size: 14px;
    line-height: 1.45;
  }

  .route-note {
    font-size: 13px;
    line-height: 1.45;
  }

  .tabs {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .route-info {
    padding: 20px;
  }

  .route-info--custom {
    padding: 18px;
    gap: 12px;
  }
  
  .route-title {
    font-size: 18px;
    line-height: 1.25;
  }

  .route-description--custom {
    font-size: 13px;
  }

  .route-note {
    font-size: 12px;
  }
  
  .route-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .route-btn {
    width: 100%;
  }
}
</style>
