<template>
  <div class="routes-page">
    <div class="wrap">
      <div class="page-header">
        <h1 class="page-title">Маршруты</h1>
        <p class="page-subtitle">Выберите интересующий маршрут и отправляйтесь в увлекательное путешествие по водным просторам Санкт-Петербурга</p>
      </div>

      <div class="routes-grid">
        <div v-for="route in routes" :key="route.id" class="route-card" @click="goToRoute(route.slug)">
          <div class="route-image">
            <img :src="route.cardImage" :alt="route.name">
            <div class="badge">{{ route.duration }}</div>
          </div>
          <div class="route-info">
            <h2 class="route-title">{{ route.name }}</h2>
            <p class="route-description">{{ route.description }}</p>
            <div class="route-details">
              <div class="route-price">от {{ route.pricePerHour.toLocaleString('ru-RU') }} ₽/час</div>
              <button class="route-btn">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { routes } from '../data/routes'

const router = useRouter()

function goToRoute(slug) {
  router.push({ name: 'RouteDetail', params: { slug } })
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
  margin-bottom: 48px;
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

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.route-card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.route-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.route-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.route-image img {
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

.route-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
}

.route-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.route-price {
  color: #0076FC;
  font-size: 20px;
  font-weight: 600;
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
  .page-header {
    margin-bottom: 32px;
  }
  
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
  
  .route-title {
    font-size: 18px;
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
