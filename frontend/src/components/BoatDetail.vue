<template>
  <div v-if="boat" class="boat-detail">
    <div class="hero-section">
      <div class="hero-image" @click="openFullscreen">
        <Carousel
          ref="heroCarousel"
          :images="detailImages"
          :showDots="false"
          :showArrows="true"
          @slideChange="heroActiveIndex = $event" />
        <button class="fullscreen-btn" @click.stop="openFullscreen" aria-label="Открыть на весь экран">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="white"/>
          </svg>
        </button>
      </div>
      <div v-if="detailImages.length > 1" class="hero-thumbnails-strip">
        <button
          v-for="(image, index) in detailImages"
          :key="`hero-thumb-${index}`"
          type="button"
          class="hero-thumbnail"
          :class="{ 'hero-thumbnail--active': index === heroActiveIndex }"
          :aria-label="`Показать фото ${index + 1}`"
          @click="goToHeroThumbnail(index)">
          <img :src="getImageUrl(image)" :alt="`${boat.name} — фото ${index + 1}`" loading="lazy" decoding="async">
        </button>
      </div>
      <div class="boat-header">
        <h1 class="boat-name">{{ boat.name }}</h1>
        <div class="boat-price-block">
          <div class="price-item" v-if="boat.pricePerHour">
            <span class="price-label">от</span>
            <span class="price-value">{{ boat.pricePerHour.toLocaleString('ru-RU') }} ₽</span>
            <span class="price-period">/час</span>
          </div>
          <div class="price-sep" v-if="boat.pricePerHour && boat.pricePerDay"></div>
          <div class="price-item" v-if="boat.pricePerDay">
            <span class="price-label">от</span>
            <span class="price-value price-value--day">{{ boat.pricePerDay.toLocaleString('ru-RU') }} ₽</span>
            <span class="price-period">/сутки</span>
          </div>
          <span class="price-value" v-if="!boat.pricePerHour">Цена по запросу</span>
        </div>
      </div>
    </div>

    <div class="boat-content">
      <div class="content-grid">
        <div class="main-info">
          <section class="info-section">
            <h2 class="section-title">Характеристики</h2>
            <div class="specs-grid">
              <div class="spec-item">
                <span class="spec-kicker">Гостей</span>
                <div class="spec-content">
                  <span class="spec-label">Вместимость</span>
                  <span class="spec-value">до {{ boat.capacity }} гостей</span>
                </div>
              </div>
              <div class="spec-item">
                <span class="spec-kicker">Размер</span>
                <div class="spec-content">
                  <span class="spec-label">Длина</span>
                  <span class="spec-value">{{ boat.length }} метров</span>
                </div>
              </div>
              <div class="spec-item">
                <span class="spec-kicker">Комфорт</span>
                <div class="spec-content">
                  <span class="spec-label">Каюты</span>
                  <span class="spec-value">{{ boat.specifications ? boat.specifications.cabins : boat.cabins }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="info-section">
            <h2 class="section-title">О {{ boatTypeLabelAccusative }}</h2>
            <div class="boat-description">
              <p v-if="generatedLead" class="boat-description__lead">{{ generatedLead }}</p>

              <div v-if="generatedSections.length" class="description-sections">
                <div
                  v-for="(section, index) in generatedSections"
                  :key="`description-section-${index}`"
                  class="description-card"
                  :class="{
                    'description-card--list': section.type === 'list',
                    'description-card--facts': section.type === 'facts'
                  }"
                >
                  <div v-if="section.title" class="description-card__title">{{ section.title }}</div>

                  <template v-if="section.type === 'paragraph'">
                    <p
                      v-for="(paragraph, paragraphIndex) in section.content"
                      :key="`paragraph-${index}-${paragraphIndex}`"
                      class="description-card__text"
                    >
                      {{ paragraph }}
                    </p>
                  </template>

                  <ul v-else-if="section.type === 'list'" class="description-list">
                    <li
                      v-for="(item, itemIndex) in section.items"
                      :key="`list-item-${index}-${itemIndex}`"
                      class="description-list__item"
                    >
                      {{ item }}
                    </li>
                  </ul>

                  <div v-else-if="section.type === 'facts'" class="description-facts">
                    <div
                      v-for="(fact, factIndex) in section.items"
                      :key="`fact-${index}-${factIndex}`"
                      class="description-fact"
                    >
                      {{ fact }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="info-section">
            <h2 class="section-title">Что включено</h2>
            <div class="features-grid">
              <div v-for="(feature, idx) in displayFeatures" :key="idx" class="feature-item">
                <svg class="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#0076FC"/>
                  <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="feature-item__text">{{ feature }}</span>
              </div>
            </div>
          </section>
        </div>

        <div class="sidebar">
          <div class="booking-card">
            <h3 class="booking-title">Забронировать</h3>
            <div class="booking-price-block">
              <div class="booking-price-item" v-if="boat.pricePerHour">
                <span class="booking-price-value">{{ boat.pricePerHour.toLocaleString('ru-RU') }} ₽</span>
                <span class="booking-price-period">/час</span>
              </div>
              <span class="booking-price-value" v-if="!boat.pricePerHour">Цена по запросу</span>
            </div>
            
            <!-- Сообщения -->
            <div v-if="successMessage" class="message success-message">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="message error-message">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="goToBooking" class="booking-form">
              <div class="form-group">
                <label class="group-name" for="booking-name">Имя</label>
                <input 
                  v-model="formData.name"
                  class="group-value" 
                  type="text" 
                  id="booking-name" 
                  name="name" 
                  placeholder="Введите ваше имя"
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
                <label class="group-name" for="booking-date">Дата прогулки</label>
                <div class="date-field">
                  <input
                    v-model="formData.date"
                    :class="['group-value', { 'group-value--date-empty': !formData.date }]"
              type="date"
                    id="booking-date"
                    name="date"
                    placeholder="Выберите дату"
                  />
                  <span v-if="!formData.date" class="date-field__placeholder">Выберите дату</span>
                </div>
              </div>
              <button type="submit" class="btn-book" :disabled="isLoading">
                {{ isLoading ? 'Отправка...' : 'Забронировать' }}
              </button>
              <p class="booking-note">Минимальное время аренды — 1 час</p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Смотрите также -->
    <!-- <section class="also-section" v-if="relatedVessels.length">
      <div class="also-header">
        <h2 class="also-title">Смотрите также</h2>
        <router-link :to="{ name: 'Catalog' }" class="section-link">Весь каталог →</router-link>
      </div>
      <div class="also-grid">
        <div class="also-card" v-for="v in relatedVessels" :key="v.slug" @click="goToVessel(v.slug)">
          <div class="also-img-wrap">
            <img :src="v._image" :alt="v.name" class="also-img">
            <span class="also-type-tag">{{ v._type }}</span>
          </div>
          <div class="also-info">
            <span class="also-name">{{ v.name }}</span>
            <div class="also-meta">
              <span class="also-capacity">до {{ v.capacity }} чел.</span>
              <span class="also-price" v-if="v.pricePerHour">от {{ v.pricePerHour.toLocaleString('ru-RU') }} ₽/ч</span>
              <span class="also-price" v-else>Цена по запросу</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="routes-preview-section">
      <div class="routes-preview-header">
        <h2 class="routes-preview-title">Популярные маршруты</h2>
        <router-link :to="{ name: 'Routes' }" class="section-link">Все маршруты →</router-link>
      </div>
      <div class="routes-preview-grid">
        <div class="route-preview-card" v-for="r in previewRoutes" :key="r.id" @click="handlePreviewRoute(r)">
          <div class="route-preview-img-wrap" :class="{ 'route-preview-img-wrap--placeholder': !r.image }">
            <img v-if="r.image" :src="r.image" :alt="r.title" class="route-preview-img">
            <div v-else class="route-preview-placeholder">Ваш маршрут</div>
            <span class="route-duration-badge">{{ r.duration || 'По договоренности' }}</span>
          </div>
          <div class="route-preview-info">
            <span class="route-preview-name">{{ r.title }}</span>
            <span class="route-preview-desc">{{ getPreviewDescription(r) }}</span>
            <button class="route-preview-btn" @click.stop="handlePreviewRoute(r)">{{ getPreviewActionText(r) }}</button>
          </div>
        </div>
      </div>
    </section> -->

    <DetailPageSections :routes-type="detailRoutesType" />
  </div>
  <div v-else class="not-found">
    <h1>Катер не найден</h1>
    <router-link to="/" class="btn-back">Вернуться на главную</router-link>
  </div>

  <!-- Fullscreen Gallery Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isFullscreenOpen && boat" class="fullscreen-modal" @click.self="closeFullscreen">
        <button class="close-btn" @click="closeFullscreen" aria-label="Закрыть">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="fullscreen-carousel-wrapper">
          <Carousel :key="fullscreenKey" :images="detailImages" :showDots="false" :showArrows="true" ref="fullscreenCarousel" @slideChange="fullscreenActiveIndex = $event" />
          <div class="thumbnails-strip">
            <div
              v-for="(image, index) in detailImages"
              :key="index"
              class="thumbnail"
              :class="{ 'thumbnail--active': index === fullscreenActiveIndex }"
              @click="goToThumbnail(index)"
            >
              <img :src="getImageUrl(image)" :alt="`Миниатюра ${index + 1}`" loading="lazy" decoding="async">
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  <BookingModal v-model="isBookingOpen" />
</template>

<script setup>
/* eslint-disable */
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { boats, getBoatBySlug } from '../data/boats';
import { yachts, getYachtBySlug } from '../data/yachts';
import { sailingYachts, getSailingBySlug } from '../data/sailing';
import { boatsRoutes } from '../data/boatsRoutes';
import { yachtsRoutes } from '../data/yachtsRoutes';
import {
  buildFleetDescriptionSections,
  buildFleetLead,
  getFleetHighlights,
} from '../utils/fleetCopy';
import { buildRouteExcerpt } from '../utils/pageCopy';
import Carousel from './Carousel.vue';
import BookingModal from './BookingModal.vue';
import DetailPageSections from './DetailPageSections.vue';

const route = useRoute();
const router = useRouter();
const boat = ref(null);
const isFullscreenOpen = ref(false);
const isBookingOpen = ref(false);
const fullscreenActiveIndex = ref(0);
const fullscreenCarousel = ref(null);
const fullscreenKey = ref(0);
const heroActiveIndex = ref(0);
const heroCarousel = ref(null);

const boatTypeLabel = computed(() => {
  if (isSailing.value) return 'парусная яхта';
  if (isYacht.value) return 'яхта';
  return 'катер';
});

const boatTypeLabelAccusative = computed(() => {
  if (isSailing.value) return 'парусной яхте';
  if (isYacht.value) return 'яхте';
  return 'катере';
});

const generatedLead = computed(() => buildFleetLead(boat.value));
const generatedSections = computed(() => buildFleetDescriptionSections(boat.value));
const displayFeatures = computed(() => getFleetHighlights(boat.value, 10));

const relatedVessels = computed(() => {
  if (!boat.value) return [];
  const currentSlug = boat.value.slug;
  const all = [
    ...boats.map(b => ({
      slug: b.slug,
      name: b.name,
      capacity: b.capacity,
      pricePerHour: b.pricePerHour,
      _image: Array.isArray(b.cardImage) ? getImageUrl(b.cardImage[0]) : getImageUrl(b.cardImage),
      _type: 'Катер'
    })),
    ...yachts.map(y => ({
      slug: y.slug,
      name: y.name,
      capacity: y.capacity,
      pricePerHour: y.pricePerHour,
      _image: Array.isArray(y.cardImage) ? getImageUrl(y.cardImage[0]) : getImageUrl(y.cardImage),
      _type: 'Яхта'
    })),
    ...sailingYachts.filter(s => s.slug).map(s => ({
      slug: s.slug,
      name: s.name,
      capacity: s.capacity,
      pricePerHour: s.pricePerHour,
      _image: Array.isArray(s.cardImage) ? getImageUrl(s.cardImage[0]) : getImageUrl(s.cardImage),
      _type: 'Парусная яхта'
    }))
  ];
  return all.filter(v => v.slug !== currentSlug).slice(0, 4);
});


const isYacht = computed(() => boat.value && yachts.some(y => y.slug === boat.value.slug));
const isSailing = computed(() => boat.value && sailingYachts.some(s => s.slug === boat.value.slug));
const detailRoutesType = computed(() => (isYacht.value || isSailing.value ? 'yachts' : 'boats'))
const detailImages = computed(() => (boat.value?.images || []).map(getImageUrl))

const previewRoutes = computed(() => {
  const source = (isYacht.value || isSailing.value) ? yachtsRoutes : boatsRoutes;
  return source.slice(0, 4);
});

// API endpoint
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost/wp-admin/admin-ajax.php';

// Данные формы бронирования
const formData = ref({
  name: '',
  phone: '',
  date: ''
});

// Состояния формы
const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  const slug = route.params.slug;
  boat.value = getBoatBySlug(slug) || getYachtBySlug(slug) || getSailingBySlug(slug);
});

function getImageUrl(imageName) {
  if (!imageName) return ''
  if (typeof imageName !== 'string') return imageName
  if (/^(https?:)?\/\//i.test(imageName) || imageName.startsWith('data:') || imageName.startsWith('/')) {
    return imageName
  }
  return `/images/${encodeURIComponent(imageName)}`
}

function goToVessel(slug) {
  router.push({ name: 'BoatDetail', params: { slug } });
}

function handlePreviewRoute(route) {
  if (route.link && !route.isPopup && route.link.startsWith('/')) {
    router.push(route.link);
    return;
  }
  isBookingOpen.value = true;
}

function getPreviewActionText(route) {
  if (/свой маршрут/i.test(route.title)) return 'Обсудить';
  if (route.link && !route.isPopup) return 'Подробнее';
  return 'Оставить заявку';
}

function getPreviewDescription(route) {
  if (/свой маршрут/i.test(route.title)) {
    return 'Соберем индивидуальный маршрут под ваши пожелания.';
  }
  return buildRouteExcerpt(route);
}

function openFullscreen() {
  fullscreenKey.value++;
  isFullscreenOpen.value = true;
  document.body.style.overflow = 'hidden';
  nextTick(() => {
    if (fullscreenCarousel.value?.$el) {
      fullscreenCarousel.value.$el.focus();
    }
  });
}

function closeFullscreen() {
  isFullscreenOpen.value = false;
  document.body.style.overflow = '';
}

function goToThumbnail(index) {
  fullscreenActiveIndex.value = index;
  if (fullscreenCarousel.value) {
    fullscreenCarousel.value.goTo(index);
  }
}

function goToHeroThumbnail(index) {
  heroActiveIndex.value = index;
  if (heroCarousel.value) {
    heroCarousel.value.goTo(index);
  }
}

function handleEscKey(e) {
  if (e.key === 'Escape' && isFullscreenOpen.value) {
    closeFullscreen();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey);
  document.body.style.overflow = '';
});

// Функция отправки формы бронирования
async function goToBooking() {
  // Очистка сообщений
  successMessage.value = '';
  errorMessage.value = '';
  
  // Валидация
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Пожалуйста, введите ваше имя';
    return;
  }
  
  if (!formData.value.phone.trim()) {
    errorMessage.value = 'Пожалуйста, введите номер телефона';
    return;
  }
  
  if (!boat.value) {
    errorMessage.value = 'Информация о катере не найдена';
    return;
  }
  
  isLoading.value = true;
  
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('action', 'gallery_yachts_booking');
    formDataToSend.append('name', formData.value.name);
    formDataToSend.append('phone', formData.value.phone);
    formDataToSend.append('date', formData.value.date);
    formDataToSend.append('boat_id', boat.value.id || boat.value.slug);
    formDataToSend.append('boat_name', boat.value.name);
    formDataToSend.append('consent', 'true');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formDataToSend
    });
    
    const data = await response.json();
    
    if (data.success) {
      successMessage.value = data.data.message || 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.';
      // Очистка формы
      formData.value = {
        name: '',
        phone: '',
        date: ''
      };
    } else {
      errorMessage.value = data.data.message || 'Произошла ошибка при отправке заявки';
    }
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    errorMessage.value = 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.';
  } finally {
    isLoading.value = false;
  }
}

// Phone mask functions
function formatPhoneDigits(digits) {
  if (!digits) return '';
  digits = digits.replace(/[^0-9]/g, '');
  if (digits[0] === '8') digits = '7' + digits.slice(1);
  if (digits[0] !== '7') digits = '7' + digits;
  digits = digits.slice(0, 11);

  const d = digits;
  const rest = d.slice(1);
  const p1 = rest.slice(0, 3);
  const p2 = rest.slice(3, 6);
  const p3 = rest.slice(6, 8);
  const p4 = rest.slice(8, 10);

  let out = '+' + d[0];
  if (p1) out += ' (' + p1 + ')';
  if (p2) out += ' ' + p2;
  if (p3) out += '-' + p3;
  if (p4) out += '-' + p4;
  return out;
}

function onPhoneInput(e) {
  const el = e.target;
  const raw = el.value || '';
  let digits = raw.replace(/\D/g, '');
  if (!digits) {
    el.value = '';
    formData.value.phone = '';
    return;
  }
  if (digits[0] !== '7') {
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    else digits = '7' + digits;
  }
  digits = digits.slice(0, 11);
  const formatted = formatPhoneDigits(digits);
  el.value = formatted;
  formData.value.phone = formatted;
}

function onPhonePaste(e) {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text') || '';
  let digits = text.replace(/\D/g, '');
  if (!digits) return;
  if (digits[0] !== '7') digits = '7' + digits.slice(0, 10);
  digits = digits.slice(0, 11);
  const formatted = formatPhoneDigits(digits);
  const el = e.target;
  el.value = formatted;
}

function buildFormatted(digits) {
  const formatted = formatPhoneDigits(digits);
  const positions = [];
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) positions.push(i);
  }
  return { formatted, positions };
}

function getDigitsFromValue(val) {
  return (val || '').replace(/\D/g, '');
}

function onPhoneKeydown(e) {
  const key = e.key;
  if (key !== 'Backspace' && key !== 'Delete') return;
  const el = e.target;
  const selStart = el.selectionStart;
  const selEnd = el.selectionEnd;
  if (selStart == null) return;

  const curDigits = getDigitsFromValue(el.value);
  const { formatted } = buildFormatted(curDigits);

  let digitIndex = 0;
  for (let i = 0; i < selStart; i++) if (/\d/.test(formatted[i])) digitIndex++;

  if (selEnd > selStart) {
    let digitIndexEnd = 0;
    for (let i = 0; i < selEnd; i++) if (/\d/.test(formatted[i])) digitIndexEnd++;
    const newDigits = curDigits.slice(0, digitIndex) + curDigits.slice(digitIndexEnd);
    const { formatted: newF, positions } = buildFormatted(newDigits);
    el.value = newF;
    const caretPos = positions[digitIndex] ?? newF.length;
    el.setSelectionRange(caretPos, caretPos);
    e.preventDefault();
    return;
  }

  if (key === 'Backspace') {
    if (digitIndex <= 0) {
      e.preventDefault();
      return;
    }
    const removeAt = digitIndex - 1;
    const newDigits = curDigits.slice(0, removeAt) + curDigits.slice(removeAt + 1);
    const { formatted: newF, positions } = buildFormatted(newDigits);
    el.value = newF;
    const caretPos = positions[removeAt - 0] ? positions[removeAt - 0] + 1 : 0;
    el.setSelectionRange(caretPos, caretPos);
    e.preventDefault();
    return;
  }

  if (key === 'Delete') {
    if (digitIndex >= curDigits.length) {
      e.preventDefault();
      return;
    }
    const removeAt = digitIndex;
    const newDigits = curDigits.slice(0, removeAt) + curDigits.slice(removeAt + 1);
    const { formatted: newF, positions } = buildFormatted(newDigits);
    el.value = newF;
    const caretPos = positions[removeAt] ?? newF.length;
    el.setSelectionRange(caretPos, caretPos);
    e.preventDefault();
    return;
  }
}
</script>

<style scoped>
.boat-detail {
  width: 100%;
  min-height: 100vh;
}

.hero-section {
  width: 100%;
  margin-bottom: 48px;
}

.hero-image {
   position: relative;
   width: 100%;
   max-height: 500px;
   aspect-ratio: 16 / 9;
   overflow: hidden;
   cursor: pointer;
}

/* Carousel inside hero-image should not have border-radius */
.hero-image :deep(.carousel) {
  border-radius: 0;
  z-index: 0;
}

/* Arrows should be always visible and above the overlay */
.hero-image :deep(.arrow) {
  z-index: 10;
  opacity: 1 !important;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.hero-image :deep(.arrow:hover) {
  background: rgba(0, 0, 0, 0.85);
  transform: translateY(-50%) scale(1.1);
}

/* Dots should be visible and above the overlay */
.hero-image :deep(.dots) {
  z-index: 10;
  bottom: 20px;
  gap: 10px;
}

.hero-image :deep(.dot) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.hero-image :deep(.dot--active) {
  background: #FFFFFF;
  border-color: #FFFFFF;
  transform: scale(1.3);
}

.hero-image :deep(.carousel-track) {
  border-radius: 0;
}

.hero-image :deep(.carousel-slide) {
  background: #000;
}

.hero-image :deep(.carousel-slide img) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.hero-thumbnails-strip {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding: 0 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.hero-thumbnails-strip::-webkit-scrollbar {
  height: 6px;
}

.hero-thumbnail {
  flex: 0 0 84px;
  width: 84px;
  height: 56px;
  border-radius: 10px;
  border: 2px solid transparent;
  padding: 0;
  overflow: hidden;
  background: #0f172a;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.82;
}

.hero-thumbnail:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.hero-thumbnail--active {
  border-color: #0076FC;
  opacity: 1;
}

.hero-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.boat-header {
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.boat-name {
  color: #1A1A1A;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin: 0;
}

.boat-price-block {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  padding: 16px 24px;
  border-radius: 16px;
}

.price-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-sep {
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.15);
  margin: 0 20px;
  align-self: center;
}

.price-value--day {
  font-size: 24px;
}

.price-label {
  color: #949CA4;
  font-size: 14px;
  font-weight: 400;
}

.price-value {
  color: #1A1A1A;
  font-size: 32px;
  font-weight: 700;
}

.price-period {
  color: #949CA4;
  font-size: 16px;
  font-weight: 400;
}

.boat-content {
  width: 100%;
  padding: 0 40px 40px 40px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;
}

.main-info {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-section {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(17, 34, 68, 0.06);
  box-shadow: 0 18px 50px rgba(18, 32, 56, 0.06);
}

.section-title {
  color: #1A1A1A;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 24px 0;
  letter-spacing: 0px;
}

.boat-description {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #1A1A1A;
  margin: 0;
}

.boat-description__lead {
  margin: 0;
  padding: 22px 24px;
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(0, 118, 252, 0.12), rgba(0, 118, 252, 0.04)),
    #F7FAFF;
  color: #10233D;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.65;
}

.description-sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.description-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 24px;
  border-radius: 22px;
  background: #FAFBFD;
  border: 1px solid rgba(17, 34, 68, 0.08);
}

.description-card--list,
.description-card--facts {
  background:
    linear-gradient(180deg, rgba(0, 118, 252, 0.04) 0%, rgba(0, 118, 252, 0.01) 100%),
    #FFFFFF;
}

.description-card__title {
  color: #0076FC;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.description-card__text {
  margin: 0;
  color: #334155;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
}

.description-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.description-list__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  min-height: 100%;
  padding: 14px 16px 14px 38px;
  border-radius: 16px;
  background: #F4F8FF;
  color: #1F2F46;
  font-size: 15px;
  line-height: 1.6;
}

.description-list__item::before {
  content: '';
  position: absolute;
  top: 19px;
  left: 16px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #0076FC;
  box-shadow: 0 0 0 4px rgba(0, 118, 252, 0.12);
}

.description-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.description-fact {
  padding: 14px 16px;
  border-radius: 16px;
  background: #F7F9FC;
  color: #1F2F46;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 22px;
  min-height: 170px;
  background:
    radial-gradient(circle at top right, rgba(0, 118, 252, 0.14), transparent 42%),
    #F7FAFF;
  border: 1px solid rgba(0, 118, 252, 0.1);
  border-radius: 22px;
}

.spec-kicker {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(0, 118, 252, 0.1);
  color: #0076FC;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.spec-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-label {
  color: #6E7C90;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.spec-value {
  color: #0F172A;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-height: 100%;
  padding: 18px 20px;
  border-radius: 18px;
  background: #F8FAFD;
  border: 1px solid rgba(17, 34, 68, 0.08);
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.check-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-item__text {
  display: block;
}

.sidebar {
  position: sticky;
  top: 96px;
}

.booking-card {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.booking-title {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  letter-spacing: 0px;
}

.booking-price-block {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E5E5E5;
}

.booking-price-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.booking-price-value {
  color: #1A1A1A;
  font-size: 32px;
  font-weight: 700;
}

.booking-price-period {
  color: #949CA4;
  font-size: 16px;
  font-weight: 400;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.group-value[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-height: 48px;
  line-height: 1.2;
  padding-right: 44px;
}



.group-value[type="date"].group-value--date-empty {
  color: transparent;
}

.group-value[type="date"].group-value--date-empty::-webkit-date-and-time-value,
.group-value[type="date"].group-value--date-empty::-webkit-datetime-edit,
.group-value[type="date"].group-value--date-empty::-webkit-datetime-edit-text,
.group-value[type="date"].group-value--date-empty::-webkit-datetime-edit-month-field,
.group-value[type="date"].group-value--date-empty::-webkit-datetime-edit-day-field,
.group-value[type="date"].group-value--date-empty::-webkit-datetime-edit-year-field {
  color: transparent;
}


.group-value[type="date"]::-webkit-inner-spin-button,
.group-value[type="date"]::-webkit-clear-button {
  display: none;
}

.group-value[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 1;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.date-field {
  position: relative;
}

.date-field__placeholder {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  max-width: calc(100% - 72px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #949CA4;
  font-size: 16px;
  line-height: 1;
  pointer-events: none;
}

.date-field:focus-within .date-field__placeholder {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  max-width: calc(100% - 72px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #949CA4;
  font-size: 16px;
  line-height: 1;
  pointer-events: none;
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

.booking-note {
  color: #949CA4;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  margin: 0;
}

/* Сообщения */
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

.btn-book:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  transition: background-color 0.2s ease;
}

.btn-back:hover {
  background-color: #0061D1;
}

@media (max-width: 1024px) {
  .boat-content {
    padding: 40px 60px;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .sidebar {
    position: static;
  }

  .booking-card {
    position: static;
  }

  .section-title {
    font-size: 26px;
  }

  .boat-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 24px 60px;
  }

  .boat-name {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .hero-image {
    height: 400px;
  }

  .hero-thumbnails-strip {
    gap: 8px;
    margin-top: 10px;
    padding: 0 4px;
  }

  .hero-thumbnail {
    flex-basis: 68px;
    width: 68px;
    height: 46px;
    border-radius: 8px;
  }

  .hero-image :deep(.carousel) {
    border-radius: 0;
  }

  .boat-header {
    padding: 24px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .boat-name {
    font-size: 28px;
  }

  .boat-price-block {
    flex-wrap: wrap;
    gap: 12px;
  }

  .price-value {
    font-size: 24px;
  }

  .price-sep {
    display: none;
  }

  .boat-content {
    padding: 30px 20px;
  }

  .main-info {
    padding: 0;
  }

  .section-title {
    font-size: 24px;
  }

  .boat-description {
    gap: 16px;
  }

  .boat-description__lead {
    font-size: 17px;
    padding: 20px;
  }

  .specs-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .description-list,
  .description-facts {
    grid-template-columns: 1fr;
  }

  .booking-card {
    padding: 24px;
  }

  .booking-title {
    font-size: 22px;
  }

  .booking-price-block {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .hero-image {
    height: 350px;
  }

  .hero-thumbnail {
    flex-basis: 60px;
    width: 60px;
    height: 40px;
  }

  .boat-header {
    padding: 20px 16px;
  }

  .boat-name {
    font-size: 22px;
  }

  .price-label,
  .price-period {
    font-size: 14px;
  }

  .price-value {
    font-size: 24px;
  }

  .boat-content {
    padding: 24px 16px;
  }

  .section-title {
    font-size: 20px;
  }

  .boat-description {
    gap: 14px;
  }

  .boat-description__lead {
    padding: 18px;
    font-size: 16px;
    border-radius: 18px;
  }

  .description-card {
    padding: 18px;
    border-radius: 18px;
    gap: 12px;
  }

  .description-card__text,
  .description-list__item,
  .description-fact,
  .feature-item {
    font-size: 14px;
  }

  .description-list__item,
  .feature-item {
    padding: 14px 14px 14px 36px;
  }

  .description-fact {
    padding: 14px;
  }

  .description-list__item::before {
    top: 18px;
    left: 14px;
  }

  .spec-item {
    min-height: unset;
    padding: 18px;
    border-radius: 18px;
  }

  .spec-label {
    font-size: 12px;
  }

  .spec-value {
    font-size: 20px;
  }

  .booking-card {
    padding: 20px;
  }

  .booking-title {
    font-size: 20px;
  }

  .booking-price-block {
    font-size: 24px;
  }

  .booking-label {
    font-size: 12px;
  }

  .booking-input {
    padding: 12px;
    font-size: 14px;
  }

  .booking-btn {
    padding: 14px 24px;
    font-size: 14px;
  }

  .not-found h1 {
    font-size: 24px;
  }
}

/* Fullscreen Gallery Styles */
.fullscreen-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.fullscreen-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 20px 20px;
  overflow: hidden;
}

.close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: rotate(90deg);
}

.fullscreen-carousel-wrapper {
  width: 100%;
  max-width: 1400px;
  height: calc(100dvh - 80px);
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.fullscreen-carousel-wrapper :deep(.carousel) {
  position: relative !important;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  flex: 1 1 auto !important;
  min-height: 0 !important;
  background: #000 !important;
  overflow: hidden !important;
}

.fullscreen-carousel-wrapper :deep(.carousel-track) {
  height: 100% !important;
  background: #000 !important;
}

.fullscreen-carousel-wrapper :deep(.carousel-slide) {
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #000 !important;
}

.fullscreen-carousel-wrapper :deep(.carousel-slide img) {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  object-position: center center !important;
  background: #000 !important;
}

.thumbnails-strip {
  display: flex;
  gap: 12px;
  padding: 16px 0 0;
  overflow-x: auto;
  justify-content: center;
  max-width: 100%;
  scrollbar-width: none;
  flex-shrink: 0;
}

.thumbnails-strip::-webkit-scrollbar {
  display: none;
}

.thumbnail {
  flex-shrink: 0;
  width: 72px;
  height: 52px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;
  border: 2px solid transparent;
}

.thumbnail:hover {
  opacity: 0.9;
}

.thumbnail--active {
  opacity: 1;
  border-color: #0076FC;
  transform: scale(1.05);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fullscreen-carousel-wrapper :deep(.arrow) {
  width: 56px;
  height: 56px;
  font-size: 32px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  opacity: 1;
}

.fullscreen-carousel-wrapper :deep(.arrow:hover) {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.fullscreen-carousel-wrapper :deep(.dots) {
  bottom: 12px;
  gap: 12px;
}

.fullscreen-carousel-wrapper :deep(.dot) {
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.fullscreen-carousel-wrapper :deep(.dot--active) {
  background: #FFFFFF;
  border-color: #FFFFFF;
  transform: scale(1.4);
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .fullscreen-carousel-wrapper,
.modal-leave-active .fullscreen-carousel-wrapper {
  transition: transform 0.3s ease;
}

.modal-enter-from .fullscreen-carousel-wrapper {
  transform: scale(0.9);
  opacity: 0;
}

.modal-leave-to .fullscreen-carousel-wrapper {
  transform: scale(0.9);
  opacity: 0;
}

@media (max-width: 768px) {
  .fullscreen-btn {
    width: 40px;
    height: 40px;
    top: 15px;
    right: 15px;
  }

  .fullscreen-btn svg {
    width: 20px;
    height: 20px;
  }

  .close-btn {
    width: 48px;
    height: 48px;
    top: 15px;
    right: 15px;
  }

  .close-btn svg {
    width: 24px;
    height: 24px;
  }

  .fullscreen-modal {
    padding: 58px 10px 12px;
  }

  .fullscreen-carousel-wrapper {
    max-width: 100%;
    height: calc(100dvh - 70px);
    max-height: calc(100dvh - 70px);
  }

  .fullscreen-carousel-wrapper :deep(.carousel) {
    height: auto !important;
  }

  .fullscreen-carousel-wrapper :deep(.arrow) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .fullscreen-carousel-wrapper :deep(.arrow--prev) {
    left: 5px;
  }

  .fullscreen-carousel-wrapper :deep(.arrow--next) {
    right: 5px;
  }

  .fullscreen-carousel-wrapper :deep(.dots) {
    bottom: 10px;
  }

  .fullscreen-carousel-wrapper :deep(.dot) {
    width: 10px;
    height: 10px;
  }
}

/* ─── Смотрите также ─────────────────────────── */
.also-section {
  padding: 0 40px 56px;
}

.also-header,
.routes-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.also-title,
.routes-preview-title {
  color: #1A1A1A;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
}

.section-link {
  color: #0076FC;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.section-link:hover {
  opacity: 0.7;
}

.also-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.also-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.also-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.also-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.also-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.also-card:hover .also-img {
  transform: scale(1.06);
}

.also-type-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 118, 252, 0.85);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
}

.also-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.also-name {
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
}

.also-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.also-capacity {
  color: #949CA4;
  font-size: 13px;
}

.also-price {
  color: #0076FC;
  font-size: 13px;
  font-weight: 600;
}

/* ─── Маршруты ───────────────────────────────── */
.routes-preview-section {
  padding: 0 40px 56px;
}

.routes-preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.route-preview-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.route-preview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.route-preview-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f2f4f7;
}

.route-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.route-preview-img-wrap--placeholder {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background: linear-gradient(135deg, rgba(0, 118, 252, 0.2), rgba(0, 118, 252, 0.05));
}

.route-preview-placeholder {
  padding: 16px;
  color: #1A1A1A;
  font-weight: 600;
  font-size: 14px;
}

.route-preview-card:hover .route-preview-img {
  transform: scale(1.06);
}

.route-duration-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
}

.route-preview-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.route-preview-name {
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
}

.route-preview-desc {
  color: #5a6a8a;
  font-size: 13px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.route-preview-btn {
  margin-top: 4px;
  padding: 10px 14px;
  background: #0076FC;
  color: #fff;
  border-radius: 12px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.route-preview-btn:hover {
  background: #0061D1;
  transform: translateY(-1px);
}

/* ─── Responsive ──────────────────────────────── */
@media (max-width: 1024px) {
  .also-grid,
  .routes-preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .also-section,
  .routes-preview-section {
    padding: 0 20px 40px;
  }

  .also-title,
  .routes-preview-title {
    font-size: 22px;
  }

  .also-grid,
  .routes-preview-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .also-grid,
  .routes-preview-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .fullscreen-btn {
    width: 40px;
    height: 40px;
    bottom: 12px;
    right: 12px;
  }

  .fullscreen-btn svg {
    width: 18px;
    height: 18px;
  }

  .close-btn {
    width: 44px;
    height: 44px;
    top: 12px;
    right: 12px;
  }

  .close-btn svg {
    width: 20px;
    height: 20px;
  }

  .fullscreen-modal {
    padding: 54px 5px 10px;
  }

  .fullscreen-carousel-wrapper {
    height: calc(100dvh - 64px);
    max-height: calc(100dvh - 64px);
  }

  .fullscreen-carousel-wrapper :deep(.carousel) {
    border-radius: 8px;
    height: auto !important;
  }

  .fullscreen-carousel-wrapper :deep(.arrow) {
    width: 36px;
    height: 36px;
    font-size: 18px;
    border-width: 1px;
  }

  .fullscreen-carousel-wrapper :deep(.arrow--prev) {
    left: 2px;
  }

  .fullscreen-carousel-wrapper :deep(.arrow--next) {
    right: 2px;
  }

  .fullscreen-carousel-wrapper :deep(.dots) {
    bottom: 8px;
    gap: 8px;
  }

  .fullscreen-carousel-wrapper :deep(.dot) {
    width: 8px;
    height: 8px;
    border-width: 1px;
  }

  .fullscreen-carousel-wrapper :deep(.dot--active) {
    transform: scale(1.2);
  }
}
</style>
