<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { boats } from '../data/boats'
import { yachts } from '../data/yachts'
import { sailingYachts } from '../data/sailing'
import CardCarousel from './CardCarousel.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('boats')
const showAll = ref(false)
const isMobile = ref(false)

function checkMobile() { isMobile.value = window.innerWidth <= 768 }

const tabs = [
  { key: 'boats', label: 'Катера', data: boats },
  { key: 'yachts', label: 'Яхты', data: yachts },
  { key: 'sailing', label: 'Парусные', data: sailingYachts }
]

const currentData = computed(() => {
  const tab = tabs.find(t => t.key === activeTab.value)
  return tab ? tab.data : []
})

const visibleItems = computed(() => {
  const count = isMobile.value ? 4 : 6
  return showAll.value ? currentData.value : currentData.value.slice(0, count)
})

const hasMore = computed(() => {
  return currentData.value.length > (isMobile.value ? 4 : 6)
})

function goToDetail(slug) {
  if (slug) {
    router.push({ name: 'BoatDetail', params: { slug } })
  }
}

function goToCatalog() {
  router.push({ name: 'Catalog' })
}

function goToBooking() {
  router.push({ path: '/', hash: '#booking' })
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="fleet-tabs-block">
    <div class="wrap-title">
      <div class="title-left">
        <h1 class="title">Наш флот</h1>
        <div class="view-catalog" @click="goToCatalog">
          <span class="text-catalog">Перейти в каталог</span>
          <img class="icon-catalog" src="../assets/go-to-catalog.svg" alt="">
        </div>
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key; showAll = false"
      >
        {{ tab.label }}
        <span class="tab-count">{{ tab.data.length }}</span>
      </button>
    </div>

    <div class="cards">
      <div v-for="item in visibleItems" :key="item.id || item.name" class="card" @click="goToDetail(item.slug)">
        <div class="wrap-img" @click.stop>
          <CardCarousel :images="Array.isArray(item.cardImage) ? item.cardImage : [item.cardImage]" :alt="item.name">
          </CardCarousel>
        </div>
        <div class="card-info">
          <div class="card-text">
            <span class="card-title">{{ item.name }}</span>
            <div class="card-desc">
              <div class="item-desc">
                <img src="../assets/card-desc-icon-1.svg" alt="">
                <span>до {{ item.capacity }} гостей</span>
              </div>
              <div class="item-desc" v-if="item.length">
                <img src="../assets/card-desc-icon-2.svg" alt="">
                <span>{{ item.length }} {{ item.length < 10 ? 'метров' : 'м' }}</span>
              </div>
            </div>
            <span class="card-price" v-if="item.pricePerHour">от {{ item.pricePerHour.toLocaleString('ru-RU') }} ₽/час</span>
            <span class="card-price" v-else-if="item.pricePerDay">от {{ item.pricePerDay.toLocaleString('ru-RU') }} ₽/сутки</span>
            <span class="card-price" v-else>Цена по запросу</span>
          </div>
          <div class="wrap-btns">
            <button class="btn to-book" @click.stop="goToBooking">Арендовать</button>
            <button class="btn more" v-if="item.slug" @click.stop="goToDetail(item.slug)">Подробнее</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasMore" class="show-more-wrap">
      <button class="show-more-btn" @click="showAll = true">Показать ещё</button>
    </div>
  </div>
</template>

<style scoped>
.fleet-tabs-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.wrap-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.title-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  color: #1A1A1A;
  text-transform: uppercase;
  font-size: 36px;
  font-weight: 700;
}

.view-catalog {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.view-catalog:hover {
  opacity: 0.7;
}

.text-catalog {
  color: #0076FC;
  font-weight: 500;
  font-size: 14px;
  line-height: 17.5px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.icon-catalog {
  width: 20px;
  height: 20px;
}

.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #E6E6E6;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  background: none;
  border: none;
  color: #949CA4;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background 0.3s ease;
}

.tab-btn.active {
  color: #0076FC;
}

.tab-btn.active::after {
  background: #0076FC;
}

.tab-btn:hover {
  color: #1A1A1A;
}

.tab-count {
  font-size: 12px;
  font-weight: 500;
  color: #949CA4;
  background: #F5F5F5;
  padding: 2px 8px;
  border-radius: 10px;
}

.tab-btn.active .tab-count {
  background: rgba(0, 118, 252, 0.1);
  color: #0076FC;
}

.cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: #fff;
    border-radius: 16px;
    cursor: pointer;
}

.wrap-img {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  width: 100%;
  aspect-ratio: 16 / 9;
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
  gap: 12px;
}

.card-title {
  color: #1A1A1A;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
}

.card-desc {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-desc {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-price {
  color: #0076FC;
  font-weight: 600;
  font-size: 19px;
}

.wrap-btns {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn {
  width: 100%;
  padding: 18.5px 32px;
  border-radius: 16px;
  background-color: #F5F5F5;
  color: #1A1A1A;
  font-weight: 600;
  font-size: 15px;
  line-height: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.to-book {
  background-color: #0076FC;
  color: #FFFFFF;
}

.to-book:hover {
  background-color: #0061D1;
}

.show-more-wrap {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.show-more-btn {
  padding: 16px 48px;
  border-radius: 16px;
  background-color: #0076FC;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.show-more-btn:hover {
  background-color: #0061D1;
  transform: translateY(-2px);
}

@media (max-width: 1200px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .fleet-tabs-block {
    gap: 24px;
  }

  .title {
    font-size: 24px;
  }

  .tabs {
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .tab-btn {
    padding: 12px 16px;
    font-size: 14px;
    white-space: nowrap;
  }

  .cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-price {
    font-size: 17px;
  }

  .btn {
    padding: 16px 24px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }

  .card-info {
    gap: 20px;
    padding: 0 20px 20px 20px;
  }

  .card-title {
    font-size: 16px;
  }

  .item-desc span {
    font-size: 13px;
  }

  .card-price {
    font-size: 16px;
  }

  .wrap-btns {
    flex-direction: row;
    gap: 8px;
  }

  .btn {
    padding: 14px 10px;
    font-size: 13px;
  }
}
</style>