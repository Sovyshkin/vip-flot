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

<template>
  <div class="yacht-tours-gallery">
    <div class="gallery-header">
      <h2 class="gallery-title">ЯХТ-ТУРЫ</h2>
      <p class="gallery-description">Предлагаем также длительные путешествия, приуроченные к вашему празднику</p>
    </div>
    <div class="gallery-scroll">
      <div class="gallery-row">
        <div
          v-for="tour in yachtTours"
          :key="tour.id"
          class="gallery-card"
          @click="goToTour(tour.link)"
        >
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

<style scoped>
.yacht-tours-gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.gallery-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gallery-title {
  color: #1A1A1A;
  text-transform: uppercase;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.gallery-description {
  color: #949CA4;
  font-size: 16px;
  margin: 0;
}

.gallery-scroll {
  overflow-x: auto;
  margin: 0 -20px;
  padding: 0 20px;
  scrollbar-width: none;
}

.gallery-scroll::-webkit-scrollbar {
  display: none;
}

.gallery-row {
  display: flex;
  gap: 16px;
  padding-bottom: 8px;
}

.gallery-card {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.wrap-img {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  height: 160px;
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
  font-size: 12px;
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
  font-size: 16px;
  line-height: 1.2;
}

.card-desc {
  color: #949CA4;
  font-size: 13px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .gallery-title {
    font-size: 24px;
  }

  .gallery-card {
    flex: 0 0 240px;
  }

  .wrap-img {
    height: 140px;
  }

  .card-title {
    font-size: 14px;
  }

  .card-desc {
    font-size: 12px;
  }
}
</style>
