<template>
  <section class="main-routes-showcase" aria-labelledby="main-routes-showcase-title">
    <div class="header">
      <h2 id="main-routes-showcase-title" class="title">Маршруты и яхт-туры</h2>
      <router-link class="all-link" :to="{ name: 'Routes' }">Смотреть все</router-link>
    </div>

    <div class="routes-grid" role="list" aria-label="Маршруты">
      <article
        v-for="item in routeItems"
        :key="item.title"
        class="route-card"
        role="listitem"
        @click="go(item.link)">
        <div class="route-card__image-wrap">
          <img :src="item.image" :alt="item.title" loading="lazy">
          <span class="duration-chip">{{ item.duration }}</span>
        </div>
        <div class="route-card__text">
          <h3 class="route-card__title">{{ item.title }}</h3>
          <p v-if="item.subtitle" class="route-card__subtitle">{{ item.subtitle }}</p>
        </div>
      </article>
    </div>

    <div class="tours-grid" role="list" aria-label="Яхт-туры">
      <article class="tour-card tour-card--featured" role="listitem" @click="go(featuredTour.link)">
        <div class="tour-card__image-wrap">
          <img :src="featuredTour.image" :alt="featuredTour.title" loading="lazy">
          <span class="duration-chip">{{ featuredTour.duration }}</span>
        </div>
        <div class="tour-card__content">
          <h3 class="tour-card__title">{{ featuredTour.title }}</h3>
          <p class="tour-card__desc">{{ featuredTour.description }}</p>
          <button type="button" class="tour-btn" @click.stop="go(featuredTour.link)">Подробнее</button>
        </div>
      </article>

      <article
        v-for="item in shortTours"
        :key="item.title"
        class="tour-card"
        role="listitem"
        @click="go(item.link)">
        <div class="tour-card__image-wrap">
          <img :src="item.image" :alt="item.title" loading="lazy">
          <span class="duration-chip">{{ item.duration }}</span>
        </div>
        <div class="tour-card__content tour-card__content--compact">
          <h3 class="tour-card__title">{{ item.title }}</h3>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const routeItems = [
  {
    title: 'Разводные мосты',
    subtitle: 'Ночные прогулки',
    duration: 'от 2-х часов',
    link: '/routes/razvod-mostov',
    image: 'https://optim.tildacdn.com/tild6434-6331-4266-b764-633232333538/-/cover/420x500/center/center/-/format/webp/photo_2024-06-06_171.jpeg.webp'
  },
  {
    title: 'Реки каналы',
    subtitle: '',
    duration: 'от 2-х часов',
    link: '/routes/reki-i-kanaly',
    image: 'https://optim.tildacdn.com/tild3361-6531-4965-b265-333331303831/-/cover/420x500/center/center/-/format/webp/photo_2024-06-16_003.jpeg.webp'
  },
  {
    title: 'Прогулка по Неве',
    subtitle: '',
    duration: 'от 2-х часов',
    link: '/routes/neva',
    image: 'https://static.tildacdn.com/tild3061-3762-4232-b965-626430373734/photo_2025-05-27_21-.jpg'
  },
  {
    title: 'Выход в Финский залив',
    subtitle: '',
    duration: 'от 3-х часов',
    link: '/routes/finskij-zaliv',
    image: 'https://optim.tildacdn.com/tild6133-3134-4965-b836-373061356438/-/cover/420x500/center/top/-/format/webp/photo_2024-06-16_001.jpeg.webp'
  }
]

const featuredTour = {
  title: 'Яхт-туры',
  description: 'Многодневные путешествия по северным маршрутам: от Выборга и Кронштадта до Валаама, Карелии и дальних островов.',
  duration: 'от 1 дня и более',
  link: '/tours',
  image: 'https://optim.tildacdn.com/tild3334-3363-4366-b064-626562613062/-/cover/848x510/center/center/-/format/webp/photo_2024-06-06_171.jpeg.webp'
}

const shortTours = [
  {
    title: 'Петергоф',
    duration: 'от 4-х часов',
    link: '/tours/petergof',
    image: 'https://optim.tildacdn.com/tild3963-6461-4834-b132-646436323435/-/cover/464x510/center/center/-/format/webp/photo_2024-08-02_151.jpeg.webp'
  },
  {
    title: 'Кронштадт',
    duration: 'от 5-ти часов',
    link: '/tours/kronshtadt',
    image: 'https://optim.tildacdn.com/tild3061-3632-4838-b437-636638303837/-/cover/464x510/center/bottom/-/format/webp/photo_2024-07-23_163.jpeg.webp'
  },
  {
    title: 'Крепость Орешек',
    duration: 'от 8-ми часов',
    link: '/tours/krepost-oreshek',
    image: 'https://optim.tildacdn.com/tild3130-6535-4633-b061-376236646366/-/cover/464x510/center/center/-/format/webp/photo_2025-06-01_15-.jpg.webp'
  }
]

function go(link) {
  if (!link) return
  router.push(link)
}
</script>

<style scoped>
.main-routes-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.title {
  margin: 0;
  color: #1A1A1A;
  text-transform: uppercase;
  font-size: 36px;
  font-weight: 700;
}

.all-link {
  color: #0076FC;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 13px;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.route-card,
.tour-card {
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 24px rgba(17, 31, 56, 0.08);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.route-card:hover,
.tour-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(17, 31, 56, 0.15);
}

.route-card__image-wrap,
.tour-card__image-wrap {
  position: relative;
  height: 248px;
}

.route-card__image-wrap img,
.tour-card__image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.duration-chip {
  position: absolute;
  top: 12px;
  left: 12px;
  border-radius: 999px;
  background: rgba(13, 20, 36, 0.86);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 11px;
}

.route-card__text,
.tour-card__content {
  padding: 14px 16px 16px;
}

.route-card__title,
.tour-card__title {
  margin: 0;
  color: #1A1A1A;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}

.route-card__subtitle {
  margin: 6px 0 0;
  color: #586377;
  font-size: 14px;
}

.tours-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 15px;
}

.tour-card--featured {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
}

.tour-card--featured .tour-card__image-wrap {
  height: 258px;
}

.tour-card__desc {
  margin: 8px 0 0;
  color: #66758C;
  font-size: 14px;
  line-height: 1.4;
}

.tour-btn {
  margin-top: 14px;
  width: 100%;
  border: none;
  background: #0076FC;
  color: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.tour-btn:hover {
  background: #005FD0;
}

.tour-card__content--compact {
  min-height: 78px;
  display: flex;
  align-items: center;
}

@media (max-width: 1199px) {
  .routes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tours-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tour-card--featured {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 26px;
  }

  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .routes-grid,
  .tours-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .tour-card--featured {
    grid-column: auto;
  }

  .route-card__image-wrap,
  .tour-card__image-wrap,
  .tour-card--featured .tour-card__image-wrap {
    height: 220px;
  }

  .route-card__title,
  .tour-card__title {
    font-size: 20px;
  }
}
</style>
