<template>
  <div v-if="tour" class="yacht-tour-detail">
    <section class="hero hero-animate">
      <img class="hero-image" :src="tour.bannerImage || tour.imageUrl" :alt="tour.title">
      <div class="hero-overlay"></div>
      <div class="hero-content wrap">
        <button class="hero-back" type="button" @click="goBack">Назад к турам</button>
        <p class="hero-kicker">Длительный яхт-тур</p>
        <h1 class="hero-title">{{ tour.title }}</h1>
        <div class="hero-meta">
          <span class="meta-chip">{{ tour.durationRaw || tour.duration }}</span>
          <span class="meta-chip">{{ tour.guestsRaw || `до ${tour.maxGuests} гостей` }}</span>
        </div>
      </div>
    </section>

    <section class="content wrap">
      <div class="overview-grid">
        <article class="overview-card overview-card--1">
          <span class="overview-label">Маршрут</span>
          <p class="overview-value">{{ tour.route || 'Индивидуально по запросу' }}</p>
        </article>
        <article class="overview-card overview-card--2">
          <span class="overview-label">Длительность</span>
          <p class="overview-value">{{ tour.durationRaw || tour.duration }}</p>
        </article>
        <article class="overview-card overview-card--3">
          <span class="overview-label">Вместимость</span>
          <p class="overview-value">{{ tour.guestsRaw || `до ${tour.maxGuests} гостей` }}</p>
        </article>
      </div>

      <div class="layout">
        <main class="main-column">
          <article class="panel panel-reveal panel-reveal--1">
            <h2 class="panel-title">О туре</h2>
            <p class="panel-text">{{ tour.fullDescription || tour.description }}</p>
          </article>

          <article v-if="tour.route" class="panel panel-reveal panel-reveal--2">
            <h2 class="panel-title">Маршрут</h2>
            <p class="route-line">{{ tour.route }}</p>
            <p v-if="tour.routeDescription" class="panel-text">{{ tour.routeDescription }}</p>
          </article>

          <article v-if="hasItinerary" class="panel panel-reveal panel-reveal--3">
            <h2 class="panel-title">{{ itinerarySectionTitle }}</h2>
            <div class="timeline">
              <div
                v-for="(item, idx) in tour.itinerary"
                :key="idx"
                class="timeline-item"
                :style="{ '--delay': `${Math.min(idx * 80, 360)}ms` }">
                <div class="timeline-day">{{ item.day }}</div>
                <div class="timeline-body">
                  <h3 class="timeline-title">{{ item.title }}</h3>
                  <p class="timeline-text">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </article>

          <article v-if="hasWhatToSee" class="panel panel-reveal panel-reveal--4">
            <h2 class="panel-title">Что посмотреть</h2>
            <ul class="list">
              <li v-for="(point, idx) in tour.whatToSee" :key="idx">{{ point }}</li>
            </ul>
          </article>

          <article v-if="hasTourOptions" class="panel panel-reveal panel-reveal--5">
            <h2 class="panel-title">Варианты тура</h2>
            <ul class="list">
              <li v-for="(option, idx) in tour.tourOptions" :key="idx">{{ option }}</li>
            </ul>
          </article>

          <article v-if="hasFaq" class="panel panel-reveal panel-reveal--6">
            <h2 class="panel-title">FAQ</h2>
            <div class="faq-list">
              <details v-for="(item, idx) in tour.faq" :key="idx" class="faq-item">
                <summary>{{ item.question }}</summary>
                <p>{{ item.answer }}</p>
              </details>
            </div>
          </article>

          <article v-if="hasIncluded || hasPaidSeparately" class="panel panel-reveal panel-reveal--7">
            <h2 class="panel-title">Условия</h2>
            <div v-if="hasIncluded" class="terms-group">
              <h3>Включено</h3>
              <ul class="list compact terms-list">
                <li v-for="(item, idx) in tour.details.included" :key="`inc-${idx}`">{{ item }}</li>
              </ul>
            </div>
            <div v-if="hasPaidSeparately" class="terms-group">
              <h3>Оплачивается отдельно</h3>
              <ul class="list compact terms-list terms-list--warning">
                <li v-for="(item, idx) in tour.details.paidSeparately" :key="`paid-${idx}`">{{ item }}</li>
              </ul>
            </div>
          </article>

          <article v-if="hasGallery" class="panel panel-reveal panel-reveal--8">
            <h2 class="panel-title">Галерея</h2>
            <div class="gallery-grid">
              <img
                v-for="(image, idx) in tour.gallery"
                :key="idx"
                :src="image"
                :alt="`${tour.title} ${idx + 1}`"
                :style="{ '--delay': `${Math.min(idx * 60, 420)}ms` }"
                @click="openLightbox(idx)">
            </div>
          </article>
        </main>

        <aside class="side-column">
          <div class="booking-card panel">
            <h3 class="booking-title">Забронировать тур</h3>
            <p class="booking-subtitle">Мы свяжемся с вами и подберем оптимальный маршрут и судно</p>
            <form @submit.prevent="submitBooking" class="booking-form">
              <div class="form-group">
                <label class="group-name" for="booking-name">Ваше имя</label>
                <input
                  v-model="formData.name"
                  class="group-value"
                  type="text"
                  id="booking-name"
                  name="name"
                  placeholder="Введите имя"
                  required
                />
              </div>
              <div class="form-group">
                <label class="group-name" for="booking-phone">Телефон</label>
                <input
                  v-model="formData.phone"
                  class="group-value"
                  type="text"
                  id="booking-phone"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  inputmode="tel"
                  autocomplete="tel"
                  maxlength="18"
                  @input="onPhoneInput"
                  @paste="onPhonePaste"
                  @keydown="onPhoneKeydown"
                  required
                />
              </div>
              <div class="form-group">
                <label class="group-name" for="booking-date">Дата тура</label>
                <input
                  v-model="formData.date"
                  class="group-value"
                  type="date"
                  id="booking-date"
                  name="date"
                  placeholder="Выберите дату"
                />
              </div>
              <div class="form-group">
                <label class="group-name" for="booking-guests">Количество гостей</label>
                <input
                  v-model="formData.guests"
                  class="group-value"
                  type="number"
                  id="booking-guests"
                  name="guests"
                  placeholder="Укажите количество"
                  min="1"
                  :max="tour.maxGuests"
                />
              </div>
              <div v-if="successMessage" class="message success-message">{{ successMessage }}</div>
              <div v-if="errorMessage" class="message error-message">{{ errorMessage }}</div>
              <button type="submit" class="btn-book" :disabled="isLoading">
                {{ isLoading ? 'Отправка...' : 'Отправить заявку' }}
              </button>
            </form>
          </div>
        </aside>
      </div>
    </section>

    <section class="yacht-tour-sections">
      <div class="wrap">
        <OurYachts custom-title="Яхты для тура" />
        <YachtTours />
        <RequestBook />
      </div>
    </section>

    <teleport to="body">
      <transition name="lightbox-fade">
        <div
          v-if="isLightboxOpen"
          class="lightbox"
          @click.self="closeLightbox"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend.passive="onTouchEnd">
          <button type="button" class="lightbox-close" @click="closeLightbox">✕</button>

          <button
            v-if="lightboxImages.length > 1"
            type="button"
            class="lightbox-arrow lightbox-arrow--prev"
            @click.stop="prevImage">
            ‹
          </button>

          <div class="lightbox-media">
            <img :src="lightboxImages[activeImageIndex]" :alt="`${tour.title} ${activeImageIndex + 1}`">
          </div>

          <button
            v-if="lightboxImages.length > 1"
            type="button"
            class="lightbox-arrow lightbox-arrow--next"
            @click.stop="nextImage">
            ›
          </button>

          <div v-if="lightboxImages.length > 1" class="lightbox-dots">
            <button
              v-for="(img, idx) in lightboxImages"
              :key="img + idx"
              type="button"
              class="lightbox-dot"
              :class="{ 'lightbox-dot--active': idx === activeImageIndex }"
              @click="activeImageIndex = idx" />
          </div>
        </div>
      </transition>
    </teleport>
  </div>

  <div v-else class="not-found wrap">
    <h1>Яхт-тур не найден</h1>
    <button class="cta" @click="goBack">Вернуться в туры</button>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OurYachts from './OurYachts.vue'
import YachtTours from './YachtTours.vue'
import RequestBook from './RequestBook.vue'
import { getYachtTourBySlug } from '../data/yachtsTours'

const route = useRoute()
const router = useRouter()

const tour = computed(() => getYachtTourBySlug(route.params.slug))

const hasItinerary = computed(() => Boolean(tour.value?.itinerary?.length))
const hasWhatToSee = computed(() => Boolean(tour.value?.whatToSee?.length))
const hasTourOptions = computed(() => Boolean(tour.value?.tourOptions?.length))
const hasFaq = computed(() => Boolean(tour.value?.faq?.length))
const hasGallery = computed(() => Boolean(tour.value?.gallery?.length))
const hasIncluded = computed(() => Boolean(tour.value?.details?.included?.length))
const hasPaidSeparately = computed(() => Boolean(tour.value?.details?.paidSeparately?.length))

const formData = ref({
  name: '',
  phone: '',
  date: '',
  guests: ''
})
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submitBooking() {
  successMessage.value = ''
  errorMessage.value = ''
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Пожалуйста, введите ваше имя'
    return
  }
  if (!formData.value.phone.trim()) {
    errorMessage.value = 'Пожалуйста, введите номер телефона'
    return
  }
  isLoading.value = true
  try {
    const formDataToSend = new FormData()
    formDataToSend.append('action', 'vip_flot_booking')
    formDataToSend.append('name', formData.value.name)
    formDataToSend.append('phone', formData.value.phone)
    formDataToSend.append('date', formData.value.date)
    formDataToSend.append('guests', formData.value.guests)
    formDataToSend.append('boat_id', tour.value.id)
    formDataToSend.append('boat_name', tour.value.title)
    formDataToSend.append('consent', 'true')

    const API_URL = process.env.VUE_APP_API_URL || 'http://localhost/vip-flot/wp-admin/admin-ajax.php'

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formDataToSend
    })
    const data = await response.json()
    if (data.success) {
      successMessage.value = 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
      formData.value = { name: '', phone: '', date: '', guests: '' }
    } else {
      errorMessage.value = data.data?.message || 'Произошла ошибка'
    }
  } catch (error) {
    errorMessage.value = 'Не удалось отправить заявку. Попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}

function formatPhoneDigits(digits) {
  if (!digits) return ''
  digits = digits.replace(/[^0-9]/g, '')
  if (digits[0] === '8') digits = '7' + digits.slice(1)
  if (digits[0] !== '7') digits = '7' + digits
  digits = digits.slice(0, 11)
  const d = digits
  const rest = d.slice(1)
  const p1 = rest.slice(0, 3)
  const p2 = rest.slice(3, 6)
  const p3 = rest.slice(6, 8)
  const p4 = rest.slice(8, 10)
  let out = '+' + d[0]
  if (p1) out += ' (' + p1 + ')'
  if (p2) out += ' ' + p2
  if (p3) out += '-' + p3
  if (p4) out += '-' + p4
  return out
}

function onPhoneInput(e) {
  const el = e.target
  let digits = el.value.replace(/\D/g, '')
  if (!digits) { el.value = ''; formData.value.phone = ''; return }
  if (digits[0] !== '7') { digits = digits[0] === '8' ? '7' + digits.slice(1) : '7' + digits }
  digits = digits.slice(0, 11)
  el.value = formatPhoneDigits(digits)
  formData.value.phone = el.value
}

function onPhonePaste(e) {
  e.preventDefault()
  let digits = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '')
  if (!digits) return
  if (digits[0] !== '7') digits = digits.slice(0, 10)
  digits = digits.slice(0, 11)
  const el = e.target
  el.value = formatPhoneDigits(digits)
}

function onPhoneKeydown(e) {
  const key = e.key
  if (key !== 'Backspace' && key !== 'Delete') return
  const el = e.target
  const selStart = el.selectionStart
  const digits = (el.value || '').replace(/\D/g, '')
  if (key === 'Backspace') {
    if (selStart <= 1) { e.preventDefault(); return }
    const newDigits = digits.slice(0, -1)
    el.value = formatPhoneDigits(newDigits)
  } else {
    if (selStart >= el.value.length) { e.preventDefault(); return }
    const newDigits = digits.slice(0, -1)
    el.value = formatPhoneDigits(newDigits)
  }
}

const dayPattern = /^\s*\d+(?:\s*[-–]\s*\d+)?\s*д(?:ень|ня|ней)\s*$/i

const itinerarySectionTitle = computed(() => {
  const itinerary = tour.value?.itinerary || []
  const hasDayBasedLabels = itinerary.some((item) => dayPattern.test((item?.day || '').trim()))
  return hasDayBasedLabels ? 'Программа по дням' : 'План тура'
})

const isLightboxOpen = ref(false)
const activeImageIndex = ref(0)
const touchStartX = ref(0)
const touchDeltaX = ref(0)

const lightboxImages = computed(() => {
  if (tour.value?.gallery?.length) return tour.value.gallery
  if (tour.value?.bannerImage) return [tour.value.bannerImage]
  if (tour.value?.imageUrl) return [tour.value.imageUrl]
  return []
})

function openLightbox(index) {
  activeImageIndex.value = index
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
}

function prevImage() {
  const count = lightboxImages.value.length
  if (!count) return
  activeImageIndex.value = (activeImageIndex.value - 1 + count) % count
}

function nextImage() {
  const count = lightboxImages.value.length
  if (!count) return
  activeImageIndex.value = (activeImageIndex.value + 1) % count
}

function onTouchStart(event) {
  touchStartX.value = event.changedTouches[0]?.clientX || 0
  touchDeltaX.value = 0
}

function onTouchMove(event) {
  const currentX = event.changedTouches[0]?.clientX || 0
  touchDeltaX.value = currentX - touchStartX.value
}

function onTouchEnd() {
  if (Math.abs(touchDeltaX.value) < 40) return
  if (touchDeltaX.value > 0) {
    prevImage()
  } else {
    nextImage()
  }
  touchDeltaX.value = 0
}

function handleKeydown(event) {
  if (!isLightboxOpen.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'ArrowRight') nextImage()
}

watch(isLightboxOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

window.addEventListener('keydown', handleKeydown)
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

function goBack() {
  router.push({ name: 'Tours' })
}
</script>

<style scoped>
.yacht-tour-detail {
  background: #f6f7f9;
  min-height: 100vh;
}

.hero {
  position: relative;
  min-height: 520px;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(17, 21, 34, 0.15) 0%, rgba(17, 21, 34, 0.72) 75%);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: 280px;
  padding-bottom: 44px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-back {
  align-self: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.hero-back:hover {
  background: rgba(255, 255, 255, 0.18);
}

.hero-kicker {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  margin: 0;
}

.hero-title {
  margin: 0;
  color: #fff;
  font-size: 52px;
  line-height: 1.05;
  text-transform: uppercase;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.meta-chip {
  border-radius: 999px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-size: 14px;
  backdrop-filter: blur(10px);
}

.content {
  margin-top: -34px;
  padding-bottom: 48px;
  position: relative;
  z-index: 2;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.overview-card {
  background: linear-gradient(145deg, #ffffff, #f7f9ff);
  border: 1px solid #e4eaf6;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(12, 24, 56, 0.05);
  opacity: 0;
  transform: translateY(14px);
  animation: fadeSlideUp 0.55s ease forwards;
}

.overview-card--1 {
  animation-delay: 0.35s;
}

.overview-card--2 {
  animation-delay: 0.45s;
}

.overview-card--3 {
  animation-delay: 0.55s;
}

.overview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(12, 24, 56, 0.12);
}

.overview-label {
  display: inline-block;
  color: #6b778a;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
}

.overview-value {
  margin: 0;
  color: #1a1a1a;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 600;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 22px;
  align-items: stretch;
}

.main-column,
.side-column {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.side-column {
  position: relative;
  align-self: stretch;
  min-height: 100%;
}

.side-column {
  align-self: start;
}

.panel {
  background: #fff;
  border: 1px solid #e6e9ef;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(12, 24, 56, 0.05);
}

.panel-reveal,
.side-reveal {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeSlideUp 0.6s ease forwards;
}

.panel-reveal--1 {
  animation-delay: 0.35s;
}

.panel-reveal--2 {
  animation-delay: 0.43s;
}

.panel-reveal--3 {
  animation-delay: 0.51s;
}

.panel-reveal--4 {
  animation-delay: 0.59s;
}

.panel-reveal--5 {
  animation-delay: 0.67s;
}

.panel-reveal--6 {
  animation-delay: 0.75s;
}

.panel-reveal--7 {
   animation-delay: 0.83s;
 }

.side-reveal--2 {
   animation-delay: 0.64s;
 }

.panel-title {
  margin: 0 0 16px;
  font-size: 26px;
  line-height: 1.1;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.2px;
}

.panel-text {
  margin: 0;
  color: #354052;
  white-space: pre-line;
  line-height: 1.68;
}

.route-line {
  margin: 0 0 14px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f2f6ff;
  border: 1px solid #dbe8ff;
  color: #0f4ca1;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.route-line::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  animation: shimmer 2.4s ease-in-out infinite;
}

.timeline {
  display: grid;
  gap: 12px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 12px;
  border: 1px solid #e4e9f2;
  border-radius: 14px;
  padding: 14px;
  background: #fbfcff;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeSlideUp 0.5s ease forwards;
  animation-delay: var(--delay, 0ms);
}

.timeline-item:hover {
  border-color: #cfe0ff;
  box-shadow: 0 10px 20px rgba(15, 76, 161, 0.1);
}

.timeline-day {
  font-size: 13px;
  color: #0f4ca1;
  font-weight: 700;
  text-transform: uppercase;
}

.timeline-title {
  margin: 0 0 6px;
  color: #1a1a1a;
  font-size: 18px;
}

.timeline-text {
  margin: 0;
  color: #4b5567;
  white-space: pre-line;
  line-height: 1.58;
}

.list {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
  color: #354052;
}

.list li::marker {
  color: #0076fc;
}

.list.compact {
  gap: 8px;
}

.faq-list {
  display: grid;
  gap: 10px;
}

.faq-item {
  border: 1px solid #e4e9f2;
  border-radius: 12px;
  padding: 0;
  background: #fbfcfe;
  overflow: hidden;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 600;
  color: #1a1a1a;
  padding: 14px 16px;
  list-style: none;
  position: relative;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #0076fc;
  font-size: 18px;
}

.faq-item p {
  margin: 0;
  padding: 0 16px 14px;
  color: #465164;
  white-space: pre-line;
  line-height: 1.58;
}

.faq-item[open] summary::after {
  content: '-';
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.gallery-grid img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeSlideUp 0.45s ease forwards;
  animation-delay: var(--delay, 0ms);
}

.gallery-grid img:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(10, 20, 45, 0.18);
}

.tour-video {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  object-fit: cover;
}

.video-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.video-container .tour-video {
  grid-column: span 1;
}

.price-list {
   display: grid;
   gap: 12px;
   margin-bottom: 18px;
}

.price-row {
   display: flex;
   justify-content: space-between;
   gap: 12px;
   color: #38455a;
}

.price-row strong {
   color: #0e3871;
}

.cta {
   width: 100%;
   border: none;
   background: linear-gradient(135deg, #0076fc, #0f65d6);
   color: #fff;
   border-radius: 12px;
   padding: 14px 16px;
   font-weight: 600;
   cursor: pointer;
   box-shadow: 0 10px 22px rgba(0, 118, 252, 0.28);
   position: relative;
   overflow: hidden;
}

.cta::before {
   content: '';
   position: absolute;
   top: 0;
   left: -120%;
   width: 60%;
   height: 100%;
   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
   transition: left 0.55s ease;
}

.cta:hover {
   background: linear-gradient(135deg, #0068de, #0a56b8);
}

.cta:hover::before {
   left: 160%;
}

.note {
   margin: 10px 0 0;
   color: #6b7687;
   font-size: 13px;
   line-height: 1.5;
}

.terms-group h3 {
  margin: 0 0 10px;
  color: #1a1a1a;
  font-size: 16px;
}

.terms-list {
  list-style: none;
  padding: 0;
  gap: 10px;
}

.terms-list li {
  position: relative;
  padding: 10px 12px 10px 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f5f9ff, #eef4ff);
  border: 1px solid #dde9ff;
  color: #2f3f59;
  line-height: 1.5;
}

.terms-list li::before {
  content: '✓';
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0f65d6;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.terms-list--warning li {
  background: linear-gradient(135deg, #fff7f2, #fff1e7);
  border-color: #ffd7be;
}

.terms-list--warning li::before {
  content: '!';
  background: #ff8a3d;
}

.terms-list li::marker {
  content: '';
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.24s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(7, 12, 22, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 72px 56px;
}

.side-column {
  position: relative;
  align-self: stretch;
  min-height: 100%;
}

.side-column {
  align-self: start;
}

.booking-card {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 96px;
}

.booking-title {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  letter-spacing: 0px;
}

.booking-subtitle {
  color: #6b7687;
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group-name {
  color: #1A1A1A;
  font-size: 14px;
  font-weight: 500;
}

.group-value {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  background-color: #FFFFFF;
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 400;
  transition: border-color 0.2s ease;
}

.group-value:focus {
  outline: none;
  border-color: #0076FC;
}

.group-value::placeholder {
  color: #949CA4;
}

.message {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}

.success-message {
  background-color: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.error-message {
  background-color: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-book {
  width: 100%;
  background-color: #0076FC;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-book:hover {
  background-color: #0061D1;
}

.btn-book:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-book:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lightbox-media {
  max-width: min(1200px, 92vw);
  max-height: 86vh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.lightbox-media img {
  display: block;
  width: 100%;
  max-height: 86vh;
  object-fit: contain;
  user-select: none;
}

.lightbox-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.lightbox-arrow--prev {
  left: 18px;
}

.lightbox-arrow--next {
  right: 18px;
}

.lightbox-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.lightbox-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
}

.lightbox-dot--active {
  background: #fff;
  transform: scale(1.2);
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.not-found h1 {
  margin: 0;
  color: #1a1a1a;
  text-transform: uppercase;
}

.hero-animate .hero-image {
  animation: heroZoom 1.4s ease forwards;
}

.hero-animate .hero-overlay {
  animation: overlayFade 1.1s ease forwards;
}

.hero-animate .hero-content > * {
  opacity: 0;
  transform: translateY(18px);
  animation: fadeSlideUp 0.7s ease forwards;
}

.hero-animate .hero-content > *:nth-child(1) {
  animation-delay: 0.15s;
}

.hero-animate .hero-content > *:nth-child(2) {
  animation-delay: 0.24s;
}

.hero-animate .hero-content > *:nth-child(3) {
  animation-delay: 0.33s;
}

.hero-animate .hero-content > *:nth-child(4) {
  animation-delay: 0.42s;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroZoom {
  from {
    transform: scale(1.08);
  }

  to {
    transform: scale(1);
  }
}

@keyframes overlayFade {
  from {
    opacity: 0.1;
  }

  to {
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  45% {
    transform: translateX(130%);
  }

  100% {
    transform: translateX(130%);
  }
}

@media (max-width: 1024px) {
  .hero {
    min-height: 460px;
  }

  .hero-content {
    padding-top: 250px;
  }

  .hero-title {
    font-size: 40px;
  }

  .layout {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .overview-grid {
    grid-template-columns: 1fr 1fr;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lightbox {
    padding: 20px 58px 52px;
  }
}

.form-row {
  grid-template-columns: 1fr;
}

.yacht-tour-sections {
  padding: 42px 0 56px;
}

.yacht-tour-sections .wrap {
  display: flex;
  flex-direction: column;
  gap: 42px;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-block__title {
  color: #1A1A1A;
  text-transform: uppercase;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}

@media (max-width: 768px) {
  .yacht-tour-sections {
    padding: 30px 0 44px;
  }

  .yacht-tour-sections .wrap {
    gap: 30px;
  }

  .section-block__title {
    font-size: 24px;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 410px;
  }

  .hero-content {
    padding-top: 215px;
    padding-bottom: 28px;
    gap: 12px;
  }

  .hero-back {
    font-size: 11px;
    padding: 7px 12px;
  }

  .hero-title {
    font-size: 30px;
  }

  .panel {
    padding: 18px;
  }

  .panel-title {
    font-size: 22px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .lightbox {
    padding: 16px 14px 42px;
  }

  .lightbox-arrow {
    width: 38px;
    height: 38px;
    font-size: 24px;
  }

  .lightbox-arrow--prev {
    left: 8px;
  }

  .lightbox-arrow--next {
    right: 8px;
  }

  .lightbox-close {
    top: 10px;
    right: 10px;
    width: 38px;
    height: 38px;
  }

  .booking-section {
    padding: 0 0 24px;
  }

  .booking-panel {
    padding: 20px;
    border-radius: 18px;
  }

  .booking-title {
    font-size: 22px;
  }

  .booking-subtitle {
    font-size: 14px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-animate .hero-image,
  .hero-animate .hero-overlay,
  .hero-animate .hero-content > *,
  .overview-card,
  .panel-reveal,
  .side-reveal,
  .timeline-item,
  .gallery-grid img {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .route-line::after,
  .cta::before {
    display: none;
  }
}
</style>
