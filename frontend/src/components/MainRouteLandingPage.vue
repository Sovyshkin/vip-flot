<template>
  <div v-if="routeConfig" class="dynamic-routes-page">
    <div class="wrap">
      <div class="page-header">
        <h1 class="page-title">{{ routeConfig.title }}</h1>
        <p class="page-subtitle">{{ routeConfig.subtitle }}</p>
      </div>

      <div class="routes-grid">
        <article v-for="card in routeConfig.cards" :key="card.id" class="route-card">
          <div class="route-media">
            <img :src="card.image" :alt="card.title" loading="lazy" decoding="async">
            <div class="route-badge">{{ card.duration }}</div>
          </div>

          <div class="route-info">
            <div class="route-head">
              <h2 class="route-title">{{ card.title }}</h2>
              <span v-if="card.time" class="route-time">{{ card.time }}</span>
            </div>

            <p class="route-description">{{ card.description }}</p>

            <div v-if="card.features?.length" class="route-features">
              <span v-for="feature in card.features" :key="feature" class="feature-chip">{{ feature }}</span>
            </div>

            <div class="route-actions">
              <button class="route-btn" @click="openBooking">Оставить заявку</button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <DetailPageSections />
    <BookingModal v-model="isBookingOpen" />
  </div>

  <div v-else class="not-found">
    <h1>Маршрут не найден</h1>
    <router-link to="/" class="btn-back">Вернуться на главную</router-link>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BookingModal from './BookingModal.vue'
import DetailPageSections from './DetailPageSections.vue'

const route = useRoute()
const isBookingOpen = ref(false)

const routeContentMap = {
  'reki-i-kanaly': {
    title: 'Маршруты по рекам и каналам Санкт-Петербурга',
    subtitle: 'Выберите один из трех популярных сценариев прогулки по рекам и каналам Петербурга.',
    cards: [
      {
        id: 1,
        title: 'Парадная Нева, реки и каналы',
        duration: 'от 2-х часов',
        time: null,
        description: 'Спокойный обзорный сценарий, который соединяет парадные виды Невы с более камерной атмосферой Фонтанки, Мойки и центральных каналов.',
        image: 'https://optim.tildacdn.com/tild3435-3235-4233-a232-313933323864/-/cover/930x820/center/center/-/format/webp/2B3A9705.jpg.webp',
        features: ['Нева', 'Фонтанка', 'Канал Грибоедова', 'Мойка']
      },
      {
        id: 2,
        title: 'Парадная Нева и разводные мосты',
        duration: '2 часа',
        time: 'Время: с 00:00 до 02:00',
        description: 'Ночной выход по центральной Неве с акцентом на главные городские панорамы и кульминацией в момент развода знаковых мостов.',
        image: 'https://static.tildacdn.com/tild3661-3136-4339-b761-646239343263/photo_2024-07-25_021.jpeg',
        features: ['Эрмитаж', 'Стрелка В.О.', 'Петропавловская крепость', 'Разводные мосты']
      },
      {
        id: 3,
        title: 'Реки и каналы и разводные мосты',
        duration: '3 часа',
        time: 'Время: с 00:00 до 03:00',
        description: 'Маршрут начинается в более уютной акватории каналов, а затем выходит в Неву, где вечер завершается видом на развод мостов в историческом центре.',
        image: 'https://static.tildacdn.com/tild3734-3162-4431-b266-326535303735/r0m0_4-MT8DLzK8QCQ-u.jpg',
        features: ['Фонтанка', 'Канал Грибоедова', 'Мойка', 'Разводные мосты']
      }
    ]
  },
  neva: {
    title: 'Прогулки по Неве в Санкт-Петербурге',
    subtitle: 'Три варианта водной прогулки по Неве: классический, с мостами и с выходом в залив.',
    cards: [
      {
        id: 1,
        title: 'Парадная Нева, реки и каналы',
        duration: 'от 2-х часов',
        time: null,
        description: 'Классическая прогулка по Неве с возможностью добавить участок по центральным каналам, чтобы увидеть город и в парадном, и в более тихом масштабе.',
        image: 'https://optim.tildacdn.com/tild3435-3235-4233-a232-313933323864/-/cover/930x820/center/center/-/format/webp/2B3A9705.jpg.webp',
        features: ['Нева', 'Фонтанка', 'Канал Грибоедова', 'Мойка']
      },
      {
        id: 2,
        title: 'Парадная Нева и разводные мосты',
        duration: '2 часа',
        time: 'Время: с 00:00 до 02:00',
        description: 'Вечерний маршрут для тех, кто хочет увидеть главные фасады Петербурга с воды и встретить развод мостов без суеты на набережных.',
        image: 'https://static.tildacdn.com/tild3661-3136-4339-b761-646239343263/photo_2024-07-25_021.jpeg',
        features: ['Эрмитаж', 'Стрелка В.О.', 'Петропавловская крепость', 'Разводные мосты']
      },
      {
        id: 3,
        title: 'Парадная Нева и Финский залив',
        duration: 'от 2 часов',
        time: null,
        description: 'Комбинированная прогулка от классических панорам центра к более открытому пространству Финского залива и современному силуэту города.',
        image: 'https://static.tildacdn.com/tild6436-6165-4466-b338-643139653461/photo_2024-07-25_021.jpeg',
        features: ['Нева', 'Финский залив', 'ЗСД', 'Лахта Центр']
      }
    ]
  },
  'finskij-zaliv': {
    title: 'Прогулки в Финский залив из Санкт-Петербурга',
    subtitle: 'Маршруты в залив с панорамами исторического и современного Санкт-Петербурга.',
    cards: [
      {
        id: 1,
        title: 'Закат в Финском заливе',
        duration: '4 часа',
        time: null,
        description: 'Маршрут для красивого вечернего света: сначала центральная Нева, затем простор залива с панорамами ЗСД, Лахты и стадиона на воде.',
        image: 'https://static.tildacdn.com/tild6362-3966-4932-b937-663134656562/photo_2024-08-20_163.jpeg',
        features: ['Нева', 'Финский залив', 'Лахта Центр', 'Газпром Арена']
      },
      {
        id: 2,
        title: 'Парадная Нева и Финский залив',
        duration: 'от 2 часов',
        time: null,
        description: 'Плавный сценарий без спешки: исторический центр остаётся за кормой, а дальше прогулка раскрывается через широкую воду и современные виды Петербурга.',
        image: 'https://static.tildacdn.com/tild6436-6165-4466-b338-643139653461/photo_2024-07-25_021.jpeg',
        features: ['Эрмитаж', 'Нева', 'Финский залив', 'ЗСД']
      },
      {
        id: 3,
        title: 'Финский залив и разводные мосты',
        duration: '4 часа',
        time: null,
        description: 'Длинный вечерний маршрут, который соединяет прогулку по заливу с возвращением в центр как раз к самому выразительному ночному моменту — разводу мостов.',
        image: 'https://static.tildacdn.com/tild6362-3966-4932-b937-663134656562/photo_2024-08-20_163.jpeg',
        features: ['Финский залив', 'Лахта Центр', 'Газпром Арена', 'Разводные мосты']
      }
    ]
  }
}

const routeConfig = computed(() => routeContentMap[route.params.slug])

function openBooking() {
  isBookingOpen.value = true
}
</script>

<style scoped>
.dynamic-routes-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.page-title {
  color: #1A1A1A;
  text-transform: uppercase;
  font-size: 40px;
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
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}

.route-card {
  background-color: #fff;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
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
  background-color: rgba(0, 0, 0, 0.62);
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
  gap: 14px;
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
  color: #5A6A8A;
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

.not-found {
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.not-found h1 {
  color: #1A1A1A;
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
}

.btn-back {
  background-color: #0076FC;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #FFFFFF;
  text-decoration: none;
}

@media (max-width: 1024px) {
  .page-title {
    font-size: 34px;
  }

  .routes-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
