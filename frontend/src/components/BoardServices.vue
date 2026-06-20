<template>
  <div class="board-services">
    <div class="wrap-title">
      <h2 class="title">Услуги на борту</h2>
      <h3 class="subtitle">Подготовьте свой сценарий идеального отдыха. Мы предлагаем большой выбор дополнительных услуг.</h3>
    </div>
    <div class="cards">
      <div class="row-cards">
        <div class="row-1-card card" @click="goToService('catering')">
          <img class="image-card" src="../assets/services-1.webp" alt="" />
          <span class="card-title">Кейтеринг</span>
        </div>
        <div class="row-1-card card" @click="goToService('guide')">
          <img class="image-card" src="../assets/services-2.webp" alt="" />
          <span class="card-title">Гид</span>
        </div>
        <div class="row-1-card card" @click="goToService('chef')">
          <img class="image-card" src="../assets/services-3.webp" alt="" />
          <span class="card-title">Повар</span>
        </div>
        <div class="row-1-card card" @click="goToService('bartender')">
          <img class="image-card" src="../assets/services-4.webp" alt="" />
          <span class="card-title">Бармен</span>
        </div>
        <div class="row-1-card card" @click="goToService('photographer')">
          <img class="image-card" src="../assets/services-5.webp" alt="" />
          <span class="card-title">Фотограф</span>
        </div>
        <div class="row-1-card card" @click="goToService('decoration')">
          <img class="image-card" src="../assets/services-6.webp" alt="" />
          <span class="card-title">Украшение палубы</span>
        </div>
      </div>
      <div class="row-cards">
        
        <div class="row-2-card card" @click="goToService('host')">
          <img class="image-card" src="../assets/services-7.webp" alt="" />
          <span class="card-title">Ведущий</span>
        </div>
        <div class="row-2-card card" @click="goToService('dj')">
          <img class="image-card" src="../assets/services-8.webp" alt="" />
          <span class="card-title">Диджей</span>
        </div>
        <!-- <div class="row-2-card card" @click="goToService('live-music')">
          <img class="image-card" src="../assets/services-9.webp" alt="" />
          <span class="card-title">Живая музыка</span>
        </div> -->
      </div>
    </div>
    <div class="consult-wrap">
      <button class="consult-btn" @click="goToBooking">Получить консультацию по подбору</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToService(slug) {
  router.push({ name: 'ServiceDetail', params: { slug } })
}

function goToBooking() {
  const el = document.getElementById('booking')
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.board-services {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.wrap-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
}
.subtitle {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  color: #1a1a1a;
  opacity: 0.7;
  max-width: 600px;
}

.consult-wrap {
  display: flex;
  justify-content: center;
}

.consult-btn {
  padding: 18px 40px;
  background-color: #0076FC;
  color: #fff;
  border-radius: 16px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.consult-btn:hover {
  background-color: #0061D1;
  transform: translateY(-2px);
}

.cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.row-cards {
  display: flex;
  gap: 12px;
}
.row-1-card {
  flex: 1;
}
.row-2-card {
  flex: 1;
}
.card {
  position: relative;
  width: 100%;
  height: 192px;
  display: flex;
  align-items: flex-end;
  padding: 16px 24px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      232deg,
      rgba(0, 0, 0, 0) 28.07%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    linear-gradient(
      207.02deg,
      rgba(0, 0, 0, 0) 47.19%,
      rgba(0, 0, 0, 0.8) 89.84%
    );
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
  border-radius: 12px;
  z-index: 0;
  transition: transform 0.3s ease;
}

.card:hover .image-card {
  transform: scale(1.05);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0;
  z-index: 2;
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .subtitle {
        font-size: 16px;
    }
    
    .card {
        height: 160px;
    }
}

@media (max-width: 768px) {
    .board-services {
        gap: 24px;
    }
    
    .title {
        font-size: 24px;
    }
    
    .subtitle {
        font-size: 14px;
    }
    
    .cards {
        gap: 8px;
    }
    
    .row-cards {
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .row-1-card,
    .row-2-card {
        flex: 0 0 calc(50% - 4px);
        width: calc(50% - 4px);
        height: 140px;
    }
    
    .card {
        padding: 12px 16px;
    }
    
    .card-title {
        font-size: 14px;
    }

    .consult-btn {
        width: 100%;
        padding: 16px 24px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .subtitle {
        font-size: 13px;
    }

    .row-1-card,
    .row-2-card {
        flex: 0 0 calc(50% - 4px);
        width: calc(50% - 4px);
        height: 120px;
    }
    
    .card {
        padding: 10px 12px;
    }
    
    .card-title {
        font-size: 13px;
    }
}
</style>
