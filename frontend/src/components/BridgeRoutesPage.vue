<template>
  <div class="bridge-routes-page">
    <div class="wrap">
      <div class="page-header">
        <h1 class="page-title">Разводные мосты</h1>
        <p class="page-subtitle">Все доступные варианты прогулки под разводными мостами Санкт-Петербурга</p>
      </div>

      <div class="routes-grid">
        <article v-for="route in bridgeRoutes" :key="route.id" class="route-card">
          <div class="route-media">
            <img :src="route.image" :alt="route.title" loading="lazy" decoding="async">
            <div class="route-badge">{{ route.duration }}</div>
          </div>
          <div class="route-info">
            <div class="route-head">
              <h2 class="route-title">{{ route.title }}</h2>
              <span v-if="route.time" class="route-time">{{ route.time }}</span>
            </div>
            <p class="route-description">{{ getRouteExcerpt(route) }}</p>

            <div v-if="route.features && route.features.length" class="route-features">
              <span v-for="(feature, idx) in route.features" :key="idx" class="feature-chip">{{ feature }}</span>
            </div>

            <div class="route-actions">
              <button class="route-btn" @click="openBooking">{{ route.buttonText || 'Оставить заявку' }}</button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <DetailPageSections />

    <BookingModal v-model="isBookingOpen" />
  </div>
</template>

<script setup>
import { bridgeRoutes } from '../data/bridgeRoutes'
import BookingModal from './BookingModal.vue'
import DetailPageSections from './DetailPageSections.vue'
import { ref } from 'vue'
import { buildBridgeRouteExcerpt } from '../utils/pageCopy'

const isBookingOpen = ref(false)

function openBooking() {
  isBookingOpen.value = true
}

function getRouteExcerpt(route) {
  return buildBridgeRouteExcerpt(route)
}
</script>

<style scoped>
.bridge-routes-page {
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
  font-size: 42px;
  font-weight: 700;
}

.page-subtitle {
  color: #949CA4;
  font-size: 17px;
  line-height: 1.6;
  max-width: 820px;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
}

.route-card {
  background-color: #fff;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.route-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.route-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.route-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.route-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
}

.route-info {
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.route-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.route-title {
  color: #1A1A1A;
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
}

.route-time {
  color: #0076FC;
  font-weight: 600;
  font-size: 14px;
}

.route-description {
  color: #5a6a8a;
  font-size: 15px;
  line-height: 1.55;
}

.route-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-chip {
  padding: 6px 12px;
  border-radius: 999px;
  background-color: #f2f4f7;
  color: #1A1A1A;
  font-size: 12px;
  font-weight: 600;
}

.route-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

@media (max-width: 1024px) {
  .page-title {
    font-size: 34px;
  }

  .routes-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {

  .page-title {
    font-size: 26px;
  }

  .page-subtitle {
    font-size: 15px;
  }

  .route-info {
    padding: 18px 18px 20px;
  }

  .route-title {
    font-size: 18px;
  }
}
</style>
