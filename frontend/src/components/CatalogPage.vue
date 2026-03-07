<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Carousel from './Carousel.vue'
import { boats } from '../data/boats'
import { routes } from '../data/routes-tours'

const router = useRouter()
const activeTab = ref('fleet')

function goToBoat(slug) {
  router.push({ name: 'BoatDetail', params: { slug } })
}

function goToRoute(slug) {
  router.push({ name: 'RouteDetail', params: { slug } })
}

function setTab(tab) {
  activeTab.value = tab
}

function goToBooking() {
  router.push({ path: '/', hash: '#booking' })
}
</script>

<template>
  <div class="catalog-page">
    <div class="catalog-header">
      <h1 class="catalog-title">Каталог</h1>
      <div class="catalog-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'fleet' }]" 
          @click="setTab('fleet')">
          Весь флот
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'routes' }]" 
          @click="setTab('routes')">
          Маршруты и туры
        </button>
      </div>
    </div>

    <!-- Fleet Section -->
    <div v-show="activeTab === 'fleet'" class="fleet-section">
      <div class="cards-grid">
        <div v-for="boat in boats" :key="boat.id" class="card">
          <div class="wrap-img">
            <Carousel :interval="4500">
              <img :src="boat.images[0]" :alt="boat.name">
            </Carousel>
          </div>
          <div class="card-info">
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
              <button class="btn to-book" @click="goToBooking">Забронировать</button>
              <button class="btn more" @click="goToBoat(boat.slug)">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Routes Section -->
    <div v-show="activeTab === 'routes'" class="routes-section">
      <div class="routes-grid">
        <div v-for="route in routes" :key="route.id" class="route-card">
          <div class="wrap-img">
            <img :src="route.images[0]" :alt="route.name">
            <div class="badge">{{ route.duration }}</div>
          </div>
          <div class="card-info">
            <div class="card-text">
              <span class="card-title">{{ route.name }}</span>
              <span class="card-desc">{{ route.description }}</span>
            </div>
            <button class="card-btn" @click="goToRoute(route.slug)">Узнать подробнее</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog-page {
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background: #F8F8F8;
}

.catalog-header {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 48px;
}

.catalog-title {
  color: #1A1A1A;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
}

.catalog-tabs {
  display: flex;
  gap: 16px;
  border-bottom: 2px solid #E6E6E6;
}

.tab-btn {
  padding: 16px 32px;
  background: none;
  border: none;
  color: #949CA4;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.tab-btn.active {
  color: #0076FC;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #0076FC;
}

.tab-btn:hover {
  color: #1A1A1A;
}

/* Fleet Cards Grid */
.fleet-section {
  animation: fadeIn 0.4s ease;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.wrap-img {
  position: relative;
  overflow: hidden;
  height: 280px;
}

.wrap-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  gap: 16px;
}

.card-title {
  color: #1A1A1A;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-desc {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-desc {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-desc img {
  width: 20px;
  height: 20px;
}

.item-desc span {
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 400;
}

.card-price {
  color: #0076FC;
  font-size: 22px;
  font-weight: 700;
}

.wrap-btns {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.to-book {
  background-color: #0076FC;
  color: #FFFFFF;
  border: none;
}

.to-book:hover {
  background-color: #0061D1;
}

.more {
  background-color: transparent;
  color: #1A1A1A;
  border: 1px solid #E6E6E6;
}

.more:hover {
  background-color: #F8F8F8;
}

/* Routes Cards Grid */
.routes-section {
  animation: fadeIn 0.4s ease;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
}

.route-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.route-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.route-card .wrap-img {
  position: relative;
  height: 280px;
}

.badge {
  position: absolute;
  border-radius: 0 16px 0 16px;
  padding: 8px 12px;
  background-color: #1A1A1A;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  bottom: 0;
  left: 0;
}

.route-card .card-desc {
  color: #949CA4;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5;
  display: block;
}

.card-btn {
  width: 100%;
  padding: 16px 32px;
  background-color: #0076FC;
  border-radius: 12px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card-btn:hover {
  background-color: #0061D1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {

  .catalog-title {
    font-size: 36px;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .routes-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {

  .catalog-header {
    gap: 24px;
    margin-bottom: 32px;
  }

  .catalog-title {
    font-size: 28px;
  }

  .catalog-tabs {
    gap: 8px;
  }

  .tab-btn {
    padding: 12px 20px;
    font-size: 15px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .routes-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .wrap-img {
    height: 220px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-price {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .catalog-title {
    font-size: 24px;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 14px;
  }

  .wrap-img {
    height: 200px;
  }

  .card-info {
    padding: 0 16px 16px 16px;
    gap: 20px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-price {
    font-size: 18px;
  }

  .wrap-btns {
    flex-direction: column;
  }

  .btn {
    padding: 12px 20px;
    font-size: 13px;
  }
}
</style>
