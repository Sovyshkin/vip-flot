<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CardCarousel from './CardCarousel.vue'
import BookingModal from './BookingModal.vue'
import { boats } from '../data/boats'
import { yachts } from '../data/yachts'
import { sailingYachts } from '../data/sailing'
import { boatsRoutes } from '../data/boatsRoutes'
import { yachtsRoutes } from '../data/yachtsRoutes'
import { yachtTours } from '../data/yachtsTours'

const router = useRouter()
const route = useRoute()
const activeTab = ref('fleet')
const isBookingOpen = ref(false)
const fleetTypes = new Set(['boats', 'sailing', 'yachts'])

// Состояние открытия фильтров
const showFilters = ref(false)

// Фильтры и поиск для флота
const searchQuery = ref('')
const capacityFilter = ref('all')
const priceRangeFilter = ref('all')
const sortBy = ref('none')
const fleetTypeTab = ref(getFleetTypeFromQuery()) // 'boats' | 'sailing' | 'yachts'

// Фильтры для маршрутов и туров
const routeSearchQuery = ref('')
const durationFilter = ref('all')
const routeSortBy = ref('none')
const routesTab = ref('boats') // 'boats' или 'yachts'

function goToBoat(slug) {
  if (!slug) {
    isBookingOpen.value = true
    return
  }
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

function getFleetTypeFromQuery() {
  const queryValue = Array.isArray(route.query.fleetType) ? route.query.fleetType[0] : route.query.fleetType
  return fleetTypes.has(queryValue) ? queryValue : 'boats'
}

function setFleetTypeTab(tab) {
  if (!fleetTypes.has(tab)) return
  fleetTypeTab.value = tab
  router.replace({
    query: {
      ...route.query,
      fleetType: tab === 'boats' ? undefined : tab
    }
  })
}

function getFleetItemKey(boat) {
  return `${fleetTypeTab.value}-${boat.slug || boat.id || boat.name}`
}

watch(
  () => route.query.fleetType,
  () => {
    fleetTypeTab.value = getFleetTypeFromQuery()
  }
)

function resetFilters() {
  searchQuery.value = ''
  capacityFilter.value = 'all'
  priceRangeFilter.value = 'all'
  sortBy.value = 'none'
}

function resetRouteFilters() {
  routeSearchQuery.value = ''
  durationFilter.value = 'all'
  routeSortBy.value = 'none'
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

function handleTourClick(tour) {
  if (!tour.link) {
    isBookingOpen.value = true
    return
  }
  
  if (tour.link.startsWith('#popup')) {
    isBookingOpen.value = true
  } else if (tour.link.startsWith('/')) {
    router.push(tour.link)
  }
}

function toggleFilters() {
  showFilters.value = !showFilters.value
}

// Отфильтрованный и отсортированный список флота (катера + яхты)
const fleetItemsForTab = computed(() => {
  if (fleetTypeTab.value === 'boats') return boats
  if (fleetTypeTab.value === 'sailing') return sailingYachts
  return yachts
})

const filteredBoats = computed(() => {
  let result = [...fleetItemsForTab.value]

  // Поиск по названию
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(boat => boat.name.toLowerCase().includes(query))
  }

  // Фильтр по вместимости
  if (capacityFilter.value !== 'all') {
    if (capacityFilter.value === 'small') {
      result = result.filter(boat => boat.capacity <= 10)
    } else if (capacityFilter.value === 'medium') {
      result = result.filter(boat => boat.capacity > 10 && boat.capacity <= 20)
    } else if (capacityFilter.value === 'large') {
      result = result.filter(boat => boat.capacity > 20)
    }
  }

  // Фильтр по цене
  if (priceRangeFilter.value !== 'all') {
    if (priceRangeFilter.value === 'budget') {
      result = result.filter(boat => boat.pricePerHour < 20000)
    } else if (priceRangeFilter.value === 'medium') {
      result = result.filter(boat => boat.pricePerHour >= 20000 && boat.pricePerHour < 35000)
    } else if (priceRangeFilter.value === 'premium') {
      result = result.filter(boat => boat.pricePerHour >= 35000)
    }
  }

  // Сортировка
  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => a.pricePerHour - b.pricePerHour)
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => b.pricePerHour - a.pricePerHour)
  } else if (sortBy.value === 'capacity-asc') {
    result.sort((a, b) => a.capacity - b.capacity)
  } else if (sortBy.value === 'capacity-desc') {
    result.sort((a, b) => b.capacity - a.capacity)
  }

  return result
})

// Выбор маршрутов для текущей вкладки (катера или яхты)
const routesForTab = computed(() => routesTab.value === 'boats' ? boatsRoutes : yachtsRoutes)

// Отфильтрованный список маршрутов для текущей вкладки
const filteredRoutes = computed(() => {
  let result = [...routesForTab.value]

  // Поиск по названию
  if (routeSearchQuery.value) {
    const query = routeSearchQuery.value.toLowerCase()
    result = result.filter(route => 
      route.title.toLowerCase().includes(query) || 
      route.description.toLowerCase().includes(query)
    )
  }

  // Фильтр по длительности
  if (durationFilter.value !== 'all') {
    result = result.filter(route => {
      if (!route.duration) return false
      const duration = route.duration.toLowerCase()
      // Извлекаем число из строки
      const hours = parseInt(duration.match(/\d+/)?.[0] || '0')
      
      if (durationFilter.value === 'short') {
        return hours <= 2
      } else if (durationFilter.value === 'medium') {
        return hours >= 3 && hours <= 4
      } else if (durationFilter.value === 'long') {
        return hours >= 5
      }
      return true
    })
  }

  // Сортировка
  if (routeSortBy.value === 'duration-asc') {
    result.sort((a, b) => {
      const durationA = parseInt(a.duration?.match(/\d+/)?.[0] || '999')
      const durationB = parseInt(b.duration?.match(/\d+/)?.[0] || '999')
      return durationA - durationB
    })
  } else if (routeSortBy.value === 'duration-desc') {
    result.sort((a, b) => {
      const durationA = parseInt(a.duration?.match(/\d+/)?.[0] || '0')
      const durationB = parseInt(b.duration?.match(/\d+/)?.[0] || '0')
      return durationB - durationA
    })
  } else if (routeSortBy.value === 'name-asc') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  } else if (routeSortBy.value === 'name-desc') {
    result.sort((a, b) => b.title.localeCompare(a.title))
  }

  return result
})

// Отфильтрованный список туров
const filteredTours = computed(() => {
  let result = [...yachtTours]

  // Поиск по названию
  if (routeSearchQuery.value) {
    const query = routeSearchQuery.value.toLowerCase()
    result = result.filter(tour => 
      tour.title.toLowerCase().includes(query) || 
      tour.description.toLowerCase().includes(query)
    )
  }

  // Фильтр по длительности
  if (durationFilter.value !== 'all') {
    result = result.filter(tour => {
      if (!tour.duration) return false
      const duration = tour.duration.toLowerCase()
      // Извлекаем число из строки
      const hours = parseInt(duration.match(/\d+/)?.[0] || '0')
      
      if (durationFilter.value === 'short') {
        return hours <= 2
      } else if (durationFilter.value === 'medium') {
        return hours >= 3 && hours <= 4
      } else if (durationFilter.value === 'long') {
        return hours >= 5
      }
      return true
    })
  }

  return result
})
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
          Маршруты
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'tours' }]" 
          @click="setTab('tours')">
          Туры
        </button>
      </div>
    </div>

    <!-- Fleet Section -->
    <div v-show="activeTab === 'fleet'" class="fleet-section">
      <div class="routes-tabs">
        <button
          type="button"
          class="routes-tab-btn"
          :class="{ active: fleetTypeTab === 'boats' }"
          @click="setFleetTypeTab('boats')">
          Катера
        </button>
        <button
          type="button"
          class="routes-tab-btn"
          :class="{ active: fleetTypeTab === 'sailing' }"
          @click="setFleetTypeTab('sailing')">
          Парусные
        </button>
        <button
          type="button"
          class="routes-tab-btn"
          :class="{ active: fleetTypeTab === 'yachts' }"
          @click="setFleetTypeTab('yachts')">
          Яхты
        </button>
      </div>

      <!-- Кнопка переключения фильтров -->
      <button @click="toggleFilters" class="toggle-filters-btn">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ showFilters ? 'Скрыть фильтры' : 'Показать фильтры' }}</span>
        <svg class="chevron" :class="{ open: showFilters }" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Фильтры для флота -->
      <transition name="filters-slide">
        <div v-show="showFilters" class="filters-container">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Поиск по названию..."
              class="search-input"
            >
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">✕</button>
          </div>

          <div class="filters-row">
          <div class="filter-group">
            <label class="filter-label">Вместимость:</label>
            <select v-model="capacityFilter" class="filter-select">
              <option value="all">Все</option>
              <option value="small">До 10 гостей</option>
              <option value="medium">10-20 гостей</option>
              <option value="large">Более 20 гостей</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Цена:</label>
            <select v-model="priceRangeFilter" class="filter-select">
              <option value="all">Все</option>
              <option value="budget">До 20 000 ₽</option>
              <option value="medium">20 000 - 35 000 ₽</option>
              <option value="premium">От 35 000 ₽</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Сортировка:</label>
            <select v-model="sortBy" class="filter-select">
              <option value="none">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="capacity-asc">Вместимость: меньше</option>
              <option value="capacity-desc">Вместимость: больше</option>
            </select>
          </div>

          <button @click="resetFilters" class="reset-btn">Сбросить фильтры</button>
        </div>

          <div class="results-count">
            Найдено: {{ filteredBoats.length }} из {{ fleetItemsForTab.length }}
          </div>
        </div>
      </transition>

      <div v-if="filteredBoats.length === 0" class="no-results">
        <p class="no-results-text">Ничего не найдено. Попробуйте изменить параметры поиска.</p>
      </div>

      <div v-else :key="fleetTypeTab" class="cards-grid">
        <div v-for="boat in filteredBoats" :key="getFleetItemKey(boat)" class="card" @click="goToBoat(boat.slug)">
          <div class="wrap-img">
            <CardCarousel :key="getFleetItemKey(boat)" :images="boat.cardImage" :alt="boat.name" :useThumbs="true">
            </CardCarousel>
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
              <span class="card-price" v-if="boat.pricePerHour">от {{ boat.pricePerHour.toLocaleString('ru-RU') }} ₽/час</span>
              <span class="card-price" v-else>Цена по запросу</span>
              <span class="card-price-day" v-if="boat.pricePerDay">от {{ boat.pricePerDay.toLocaleString('ru-RU') }} ₽/сутки</span>
            </div>
            <div class="wrap-btns">
              <button class="btn to-book" @click.stop="goToBooking">Забронировать</button>
              <button class="btn more" @click.stop="goToBoat(boat.slug)">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Routes Section -->
    <div v-show="activeTab === 'routes' || activeTab === 'tours'" class="routes-section">
      <!-- Вкладки маршруты (только для роутов, не для туров) -->
      <div v-show="activeTab === 'routes'" class="routes-tabs">
        <button 
          type="button" 
          class="routes-tab-btn" 
          :class="{ active: routesTab === 'boats' }" 
          @click="routesTab = 'boats'">
          Катера
        </button>
        <button 
          type="button" 
          class="routes-tab-btn" 
          :class="{ active: routesTab === 'yachts' }" 
          @click="routesTab = 'yachts'">
          Яхты
        </button>
      </div>

      <!-- Кнопка переключения фильтров -->
      <button @click="toggleFilters" class="toggle-filters-btn">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ showFilters ? 'Скрыть фильтры' : 'Показать фильтры' }}</span>
        <svg class="chevron" :class="{ open: showFilters }" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Фильтры для маршрутов и туров -->
      <transition name="filters-slide">
        <div v-show="showFilters" class="filters-container">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              v-model="routeSearchQuery" 
              placeholder="Поиск маршрутов..."
              class="search-input"
            >
            <button v-if="routeSearchQuery" @click="routeSearchQuery = ''" class="clear-btn">✕</button>
          </div>

          <div class="filters-row">
          <div class="filter-group">
            <label class="filter-label">Длительность:</label>
            <select v-model="durationFilter" class="filter-select">
              <option value="all">Все</option>
              <option value="short">До 2 часов</option>
              <option value="medium">3-4 часа</option>
              <option value="long">Более 5 часов</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Сортировка:</label>
            <select v-model="routeSortBy" class="filter-select">
              <option value="none">Нет</option>
              <option value="name-asc">По названию (А-Я)</option>
              <option value="name-desc">По названию (Я-А)</option>
              <option value="duration-asc">По длительности (короче)</option>
              <option value="duration-desc">По длительности (дольше)</option>
            </select>
          </div>

          <button @click="resetRouteFilters" class="reset-btn">Сбросить фильтры</button>
        </div>

          <div class="results-count">
            {{ activeTab === 'routes' ? `Найдено: ${filteredRoutes.length} из ${routesForTab.length}` : `Найдено: ${filteredTours.length} из ${yachtTours.length}` }}
          </div>
        </div>
      </transition>

      <div v-if="(activeTab === 'routes' && filteredRoutes.length === 0) || (activeTab === 'tours' && filteredTours.length === 0)" class="no-results">
        <p class="no-results-text">Ничего не найдено. Попробуйте изменить параметры поиска.</p>
      </div>

      <div v-show="activeTab === 'routes' && filteredRoutes.length > 0" class="routes-grid">
        <div 
          v-for="route in filteredRoutes" 
          :key="route.id" 
          class="route-card"
          :class="{ 'route-card--custom': isCustomRoute(route) }">
          <div v-if="!isCustomRoute(route)" class="wrap-img">
            <img :src="route.image" :alt="route.title" loading="lazy" decoding="async">
            <div class="badge">{{ route.duration }}</div>
          </div>
          <div class="card-info" :class="{ 'card-info--custom': isCustomRoute(route) }">
            <div class="card-text">
              <span v-if="isCustomRoute(route)" class="card-label">Индивидуальный формат</span>
              <span class="card-title">{{ route.title }}</span>
              <span class="card-desc" :class="{ 'card-desc--custom': isCustomRoute(route) }">{{ getCustomDescription(route) }}</span>
              <span v-if="isCustomRoute(route)" class="card-note">Согласуем время, точки посадки и высадки, маршрут и формат прогулки.</span>
            </div>
            <button class="card-btn" @click="goToRoute(route.link ? route.link.split('/').pop() : '')">{{ getActionText(route) }}</button>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'tours' && filteredTours.length > 0" class="routes-grid">
        <div 
          v-for="tour in filteredTours" 
          :key="tour.id" 
          class="route-card">
          <div class="wrap-img">
            <img :src="tour.imageUrl" :alt="tour.title" loading="lazy" decoding="async">
            <div class="badge">{{ tour.duration }}</div>
          </div>
          <div class="card-info">
            <div class="card-text">
              <span class="card-title">{{ tour.title }}</span>
              <span class="card-desc">{{ tour.description }}</span>
            </div>
            <button class="card-btn" @click="handleTourClick(tour)">Узнать подробнее</button>
          </div>
        </div>
      </div>
    </div>
    <BookingModal v-model="isBookingOpen" />
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

/* Toggle Filters Button */
.toggle-filters-btn {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: #FFFFFF;
  border: 2px solid #E6E6E6;
  border-radius: 10px;
  color: #1A1A1A;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.toggle-filters-btn:hover {
  background: #F8F8F8;
  border-color: #0076FC;
  color: #0076FC;
}

.toggle-filters-btn:hover svg {
  color: #0076FC;
}

.toggle-filters-btn .chevron {
  transition: transform 0.3s ease;
}

.toggle-filters-btn .chevron.open {
  transform: rotate(180deg);
}

/* Filters Slide Animation */
.filters-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 600px;
  overflow: hidden;
}

.filters-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 600px;
  overflow: hidden;
}

.filters-slide-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.filters-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.filters-slide-enter-to {
  max-height: 600px;
  opacity: 1;
  transform: translateY(0);
}

.filters-slide-leave-from {
  max-height: 600px;
  opacity: 1;
  transform: translateY(0);
}

/* Filters Container */
.filters-container {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: #949CA4;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 48px 14px 48px;
  border: 2px solid #E6E6E6;
  border-radius: 12px;
  font-size: 15px;
  color: #1A1A1A;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #0076FC;
}

.search-input::placeholder {
  color: #949CA4;
}

.clear-btn {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #949CA4;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  transition: color 0.2s ease;
}

.clear-btn:hover {
  color: #1A1A1A;
}

.filters-row {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #1A1A1A;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #E6E6E6;
  border-radius: 12px;
  font-size: 15px;
  color: #1A1A1A;
  background: #FFFFFF;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #0076FC;
}

.reset-btn {
  padding: 12px 24px;
  background: #F8F8F8;
  border: 2px solid #E6E6E6;
  border-radius: 12px;
  color: #1A1A1A;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.reset-btn:hover {
  background: #E6E6E6;
  border-color: #D1D1D1;
}

.results-count {
  font-size: 14px;
  color: #949CA4;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  background: #FFFFFF;
  border-radius: 16px;
}

.no-results-text {
  font-size: 18px;
  color: #949CA4;
  margin: 0;
}

/* Routes Tabs */
.routes-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6E6E6;
}

.routes-tab-btn {
  padding: 12px 24px;
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

.routes-tab-btn.active {
  color: #0076FC;
}

.routes-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #0076FC;
}

.routes-tab-btn:hover {
  color: #1A1A1A;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
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
  transition: transform 0.4s ease;
}

.wrap-img :deep(.carousel-slide img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.route-card:hover .wrap-img img {
  transform: scale(1.06);
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

.card-price-day {
  color: #5a6a8a;
  font-size: 15px;
  font-weight: 500;
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

.route-card--custom {
  background: linear-gradient(145deg, rgba(0, 118, 252, 0.12), rgba(255, 255, 255, 0.9));
  border: 1px solid rgba(0, 118, 252, 0.2);
}

.card-info--custom {
  padding: 28px;
}

.card-label {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(0, 118, 252, 0.15);
  color: #0076FC;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.card-desc--custom {
  color: #1A1A1A;
  font-weight: 500;
  font-size: 15px;
}

.card-note {
  display: block;
  color: #5a6a8a;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 8px;
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

  .filters-container {
    padding: 20px;
  }

  .filters-row {
    gap: 12px;
  }

  .filter-group {
    min-width: 180px;
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

  .toggle-filters-btn {
    padding: 10px 16px;
    font-size: 13px;
    gap: 6px;
  }

  .filters-container {
    padding: 16px;
    gap: 16px;
  }

  .filters-row {
    flex-direction: column;
    gap: 12px;
  }

  .filter-group {
    width: 100%;
    min-width: auto;
  }

  .reset-btn {
    width: 100%;
  }

  .search-input {
    font-size: 14px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .routes-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .route-card--custom {
    gap: 0;
  }

  .card-info--custom {
    padding: 22px;
    gap: 16px;
  }

  .card-info--custom .card-text {
    gap: 10px;
  }

  .card-label {
    width: fit-content;
    max-width: 100%;
    white-space: normal;
    line-height: 1.2;
  }

  .card-desc--custom {
    font-size: 14px;
    line-height: 1.45;
  }

  .card-note {
    font-size: 13px;
    line-height: 1.45;
    margin-top: 0;
  }

  .route-card--custom .card-btn {
    width: 100%;
    padding: 13px 18px;
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
  .catalog-page {
    padding: 20px;
  }

  .catalog-title {
    font-size: 24px;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 14px;
  }

  .toggle-filters-btn {
    padding: 8px 14px;
    font-size: 13px;
    gap: 6px;
  }

  .filters-container {
    padding: 12px;
  }

  .search-input {
    padding: 12px 40px 12px 40px;
    font-size: 13px;
  }

  .filter-label {
    font-size: 13px;
  }

  .filter-select {
    font-size: 14px;
    padding: 10px 12px;
  }

  .no-results-text {
    font-size: 16px;
  }

  .wrap-img {
    height: 200px;
  }

  .card-info {
    padding: 0 16px 16px 16px;
    gap: 20px;
  }

  .card-info--custom {
    padding: 18px;
    gap: 14px;
  }

  .card-title {
    font-size: 16px;
  }

  .route-card--custom .card-title {
    font-size: 18px;
    line-height: 1.25;
  }

  .card-desc--custom {
    font-size: 13px;
  }

  .card-note {
    font-size: 12px;
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
