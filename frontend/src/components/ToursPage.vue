<template>
  <div class="tours-page">
    <div class="wrap">
      <div class="page-header">
        <h1 class="page-title">Длительные яхт-туры</h1>
        <p class="page-subtitle">Многодневные путешествия на яхтах по живописным маршрутам — незабываемые впечатления для вас и ваших близких</p>
      </div>

      <div class="tours-grid">
        <div v-for="tour in yachtTours" :key="tour.id" class="tour-card" @click="goToTour(tour.link)">
          <div class="tour-image">
            <img :src="tour.imageUrl" :alt="tour.title">
            <div class="badge">{{ tour.duration }}</div>
          </div>
          <div class="tour-info">
            <h2 class="tour-title">{{ tour.title }}</h2>
            <p class="tour-description">{{ tour.description }}</p>
            <div class="tour-details">
              <div class="tour-guests">{{ tour.guestsRaw }}</div>
              <button class="tour-btn">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BookingModal v-model="isBookingOpen" />
  </div>
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
</script>

<style scoped>
.tours-page {
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

.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.tour-card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tour-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.tour-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.tour-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
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

.tour-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.tour-title {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}

.tour-description {
  color: #949CA4;
  font-size: 15px;
  line-height: 1.6;
}

.tour-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.tour-guests {
  color: #949CA4;
  font-size: 14px;
  font-weight: 500;
}

.tour-btn {
  padding: 12px 24px;
  background-color: #0076FC;
  color: #fff;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tour-btn:hover {
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

  .tours-grid {
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

  .tours-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .tour-title {
    font-size: 20px;
  }

  .tour-description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }

  .tour-info {
    padding: 16px;
  }

  .tour-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .tour-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
