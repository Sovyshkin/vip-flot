<template>
  <div v-if="service" class="service-detail">
    <div class="hero-section">
      <div class="hero-image">
        <img
          :src="service.image"
          :alt="service.name"
          :style="service.heroImagePosition ? { objectPosition: service.heroImagePosition } : undefined"
          loading="lazy"
          decoding="async"
        >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="service-name">{{ service.name }}</h1>
          <div class="service-price">
            <span class="price-value">{{ service.price }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="service-content">
      <div class="content-grid">
        <div class="main-info">
          <section class="info-section">
            <h2 class="section-title">Описание услуги</h2>
            <p class="service-description">{{ serviceLead }}</p>
          </section>

          <section
            v-for="(section, sectionIndex) in serviceSections"
            :key="`service-section-${sectionIndex}`"
            class="info-section">
            <h2 class="section-title">{{ section.title }}</h2>
            <p class="service-description">{{ section.text }}</p>
          </section>

          <section v-if="serviceHighlights.length" class="info-section">
            <h2 class="section-title">Что входит</h2>
            <div class="features-grid">
              <div v-for="(feature, idx) in serviceHighlights" :key="idx" class="feature-item">
                <svg class="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#0076FC"/>
                  <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>
          </section>
        </div>

        <div class="sidebar">
          <div class="booking-card">
            <h3 class="booking-title">Заказать услугу</h3>
            <div class="booking-price">
              <span class="booking-price-value">{{ service.price }}</span>
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
                <label class="group-name" for="booking-date">Дата мероприятия</label>
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
              <div class="form-group">
                <label class="group-name" for="booking-comment">Комментарий</label>
                <textarea 
                  v-model="formData.comment"
                  class="group-value" 
                  id="booking-comment" 
                  name="comment" 
                  rows="3" 
                  placeholder="Расскажите о вашем мероприятии"
                ></textarea>
              </div>
              <button type="submit" class="btn-book" :disabled="isLoading">
                {{ isLoading ? 'Отправка...' : 'Отправить заявку' }}
              </button>
              <p class="booking-note">Мы свяжемся с вами в ближайшее время</p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <DetailPageSectionsEvents />
  </div>
  <div v-else class="not-found">
    <h1>Услуга не найдена</h1>
    <router-link to="/" class="btn-back">Вернуться на главную</router-link>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getServiceBySlug } from '../data/services';
import DetailPageSectionsEvents from './DetailPageSectionsEvents.vue';
import {
  buildServiceHighlights,
  buildServiceLead,
  buildServiceSections
} from '../utils/pageCopy';

const route = useRoute();
const service = ref(null);

// API endpoint
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost/vip-flot/wp-admin/admin-ajax.php';

// Данные формы
const formData = ref({
  name: '',
  phone: '',
  date: '',
  comment: ''
});

// Состояния формы
const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const serviceLead = computed(() => (service.value ? buildServiceLead(service.value) : ''));
const serviceSections = computed(() => (service.value ? buildServiceSections(service.value) : []));
const serviceHighlights = computed(() => (service.value ? buildServiceHighlights(service.value) : []));

onMounted(() => {
  const slug = route.params.slug;
  service.value = getServiceBySlug(slug);
});

// Функции форматирования телефона
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
  formData.value.phone = formatted;
}

function onPhoneKeydown(e) {
  const key = e.key;
  if (key !== 'Backspace' && key !== 'Delete') return;
  const el = e.target;
  const selStart = el.selectionStart;
  const selEnd = el.selectionEnd;
  if (selStart == null) return;

  const curDigits = (el.value || '').replace(/\D/g, '');
  const formatted = formatPhoneDigits(curDigits);

  let digitIndex = 0;
  for (let i = 0; i < selStart; i++) if (/\d/.test(formatted[i])) digitIndex++;

  if (selEnd > selStart) {
    let digitIndexEnd = 0;
    for (let i = 0; i < selEnd; i++) if (/\d/.test(formatted[i])) digitIndexEnd++;
    const newDigits = curDigits.slice(0, digitIndex) + curDigits.slice(digitIndexEnd);
    const newFormatted = formatPhoneDigits(newDigits);
    el.value = newFormatted;
    formData.value.phone = newFormatted;
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
    const newFormatted = formatPhoneDigits(newDigits);
    el.value = newFormatted;
    formData.value.phone = newFormatted;
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
    const newFormatted = formatPhoneDigits(newDigits);
    el.value = newFormatted;
    formData.value.phone = newFormatted;
    e.preventDefault();
    return;
  }
}

// Функция отправки формы
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
  
  if (!service.value) {
    errorMessage.value = 'Информация об услуге не найдена';
    return;
  }
  
  isLoading.value = true;
  
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('action', 'vip_flot_booking');
    formDataToSend.append('name', formData.value.name);
    formDataToSend.append('phone', formData.value.phone);
    formDataToSend.append('date', formData.value.date);
    formDataToSend.append('comment', formData.value.comment);
    formDataToSend.append('service_id', service.value.id || service.value.slug);
    formDataToSend.append('service_name', service.value.name);
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
        date: '',
        comment: ''
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
</script>

<style scoped>
.service-detail {
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
  max-height: 400px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  pointer-events: none;
}

.service-name {
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin: 0;
}

.service-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 16px;
}

.price-value {
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 700;
}

.service-content {
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
}

.section-title {
  color: #1A1A1A;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 24px 0;
  letter-spacing: 0px;
}

.service-description {
  color: #1A1A1A;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
}

.details-content {
  color: #1A1A1A;
  font-size: 16px;
  line-height: 1.6;
}

.details-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 12px 0;
  color: #1A1A1A;
}

.details-content :deep(h3:first-child) {
  margin-top: 0;
}

.details-content :deep(p) {
  margin: 12px 0;
}

.details-content :deep(ul) {
  margin: 12px 0;
  padding-left: 20px;
  list-style: none;
}

.details-content :deep(li) {
  margin: 8px 0;
  padding-left: 16px;
  position: relative;
}

.details-content :deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background: #0076FC;
  border-radius: 50%;
}

.details-content :deep(strong) {
  font-weight: 600;
  color: #0076FC;
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
  padding: 12px;
  background: #F5F5F5;
  border-radius: 12px;
}

.check-icon {
  flex-shrink: 0;
}

.feature-item span {
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 400;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 120px;
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
  margin: 0 0 16px 0;
}

.booking-price {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E6E6E6;
}

.booking-price-value {
  color: #0076FC;
  font-size: 28px;
  font-weight: 700;
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
  padding: 12px 16px;
  border: 1px solid #E6E6E6;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.group-value:focus {
  outline: none;
  border-color: #0076FC;
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

textarea.group-value {
  resize: vertical;
  min-height: 80px;
}

.btn-book {
  width: 100%;
  padding: 16px;
  background: #0076FC;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-book:hover {
  background: #0061D1;
}

.btn-book:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.booking-note {
  color: #949CA4;
  font-size: 13px;
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

.info-card {
  background: #F5F5F5;
  border-radius: 24px;
  padding: 24px;
}

.info-title {
  color: #1A1A1A;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.info-text {
  color: #1A1A1A;
  font-size: 14px;
  line-height: 1.5;
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px;
}

.not-found h1 {
  color: #1A1A1A;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.btn-back {
  padding: 16px 32px;
  background: #0076FC;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.btn-back:hover {
  background: #0061D1;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .hero-image {
    max-height: 350px;
  }

  .service-name {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .hero-image {
    max-height: 300px;
  }

  .hero-content {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .service-name {
    font-size: 28px;
  }

  .price-value {
    font-size: 20px;
  }

  .service-content {
    padding: 20px;
  }

  .info-section {
    padding: 24px;
  }

  .section-title {
    font-size: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .booking-card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .service-name {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .service-description {
    font-size: 15px;
  }
}
</style>
