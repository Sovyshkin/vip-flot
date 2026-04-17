<template>
  <div v-if="activity" class="activity-detail">
    <div class="hero-section">
      <div class="hero-image">
        <img :src="activity.image" :alt="activity.name">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="activity-name">{{ activity.name }}</h1>
          <div class="activity-meta">
            <div class="meta-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ activity.duration }}</span>
            </div>
            <div class="meta-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ activity.capacity }}</span>
            </div>
            <div class="meta-item price-badge">
              <span>{{ activity.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="activity-content">
      <div class="content-grid">
        <div class="main-info">
          <section class="info-section">
            <h2 class="section-title">О мероприятии</h2>
            <p class="activity-description">{{ activity.fullDescription }}</p>
          </section>

          <section class="info-section">
            <h2 class="section-title">Подробная информация</h2>
            <div class="details-content" v-html="activity.details"></div>
          </section>

          <section class="info-section">
            <h2 class="section-title">Что входит в программу</h2>
            <div class="features-grid">
              <div v-for="(feature, idx) in activity.features" :key="idx" class="feature-item">
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
            <h3 class="booking-title">Забронировать</h3>
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Длительность:</span>
                <span class="detail-value">{{ activity.duration }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Вместимость:</span>
                <span class="detail-value">{{ activity.capacity }}</span>
              </div>
              <div class="detail-row highlight">
                <span class="detail-label">Стоимость:</span>
                <span class="detail-value price">{{ activity.price }}</span>
              </div>
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
                <input 
                  v-model="formData.date"
                  class="group-value" 
                  type="date" 
                  id="booking-date" 
                  name="date" 
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
                />
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
              <p class="booking-note">Мы свяжемся с вами в течение 15 минут</p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <DetailPageSections />
  </div>
  <div v-else class="not-found">
    <h1>Мероприятие не найдено</h1>
    <router-link to="/" class="btn-back">Вернуться на главную</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getActivityBySlug } from '../data/activities'
import DetailPageSections from './DetailPageSections.vue'

const route = useRoute()
const activity = ref(null)

// API endpoint
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost/vip-flot/wp-admin/admin-ajax.php'

// Данные формы
const formData = ref({
  name: '',
  phone: '',
  date: '',
  guests: '',
  comment: ''
})

// Состояния формы
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(() => {
  const slug = route.params.slug
  activity.value = getActivityBySlug(slug)
})

// Функции форматирования телефона
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
  const raw = el.value || ''
  let digits = raw.replace(/\D/g, '')
  if (!digits) {
    el.value = ''
    formData.value.phone = ''
    return
  }
  if (digits[0] !== '7') {
    if (digits[0] === '8') digits = '7' + digits.slice(1)
    else digits = '7' + digits
  }
  digits = digits.slice(0, 11)
  const formatted = formatPhoneDigits(digits)
  el.value = formatted
  formData.value.phone = formatted
}

function onPhonePaste(e) {
  e.preventDefault()
  const text = (e.clipboardData || window.clipboardData).getData('text') || ''
  let digits = text.replace(/\D/g, '')
  if (!digits) return
  if (digits[0] !== '7') digits = '7' + digits.slice(0, 10)
  digits = digits.slice(0, 11)
  const formatted = formatPhoneDigits(digits)
  const el = e.target
  el.value = formatted
  formData.value.phone = formatted
}

function onPhoneKeydown(e) {
  const key = e.key
  if (key !== 'Backspace' && key !== 'Delete') return
  const el = e.target
  const selStart = el.selectionStart
  const selEnd = el.selectionEnd
  if (selStart == null) return

  const curDigits = (el.value || '').replace(/\D/g, '')
  const formatted = formatPhoneDigits(curDigits)

  let digitIndex = 0
  for (let i = 0; i < selStart; i++) if (/\d/.test(formatted[i])) digitIndex++

  if (selEnd > selStart) {
    let digitIndexEnd = 0
    for (let i = 0; i < selEnd; i++) if (/\d/.test(formatted[i])) digitIndexEnd++
    const newDigits = curDigits.slice(0, digitIndex) + curDigits.slice(digitIndexEnd)
    const newFormatted = formatPhoneDigits(newDigits)
    el.value = newFormatted
    formData.value.phone = newFormatted
    e.preventDefault()
    return
  }

  if (key === 'Backspace') {
    if (digitIndex <= 0) {
      e.preventDefault()
      return
    }
    const removeAt = digitIndex - 1
    const newDigits = curDigits.slice(0, removeAt) + curDigits.slice(removeAt + 1)
    const newFormatted = formatPhoneDigits(newDigits)
    el.value = newFormatted
    formData.value.phone = newFormatted
    e.preventDefault()
    return
  }

  if (key === 'Delete') {
    if (digitIndex >= curDigits.length) {
      e.preventDefault()
      return
    }
    const removeAt = digitIndex
    const newDigits = curDigits.slice(0, removeAt) + curDigits.slice(removeAt + 1)
    const newFormatted = formatPhoneDigits(newDigits)
    el.value = newFormatted
    formData.value.phone = newFormatted
    e.preventDefault()
    return
  }
}

// Функция отправки формы
async function goToBooking() {
  // Очистка сообщений
  successMessage.value = ''
  errorMessage.value = ''
  
  // Валидация
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Пожалуйста, введите ваше имя'
    return
  }
  
  if (!formData.value.phone.trim()) {
    errorMessage.value = 'Пожалуйста, введите номер телефона'
    return
  }
  
  if (!activity.value) {
    errorMessage.value = 'Информация о мероприятии не найдена'
    return
  }
  
  isLoading.value = true
  
  try {
    const formDataToSend = new FormData()
    formDataToSend.append('action', 'vip_flot_booking')
    formDataToSend.append('name', formData.value.name)
    formDataToSend.append('phone', formData.value.phone)
    formDataToSend.append('date', formData.value.date)
    formDataToSend.append('comment', formData.value.comment)
    formDataToSend.append('guests', formData.value.guests)
    formDataToSend.append('activity_id', activity.value.id || activity.value.slug)
    formDataToSend.append('activity_name', activity.value.name)
    formDataToSend.append('consent', 'true')
    
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formDataToSend
    })
    
    const data = await response.json()
    
    if (data.success) {
      successMessage.value = data.data.message || 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
      // Очистка формы
      formData.value = {
        name: '',
        phone: '',
        date: '',
        guests: '',
        comment: ''
      }
    } else {
      errorMessage.value = data.data.message || 'Произошла ошибка при отправке заявки'
    }
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error)
    errorMessage.value = 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.activity-detail {
  width: 100%;
  min-height: 100vh;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.hero-image {
  position: relative;
  width: 100%;
  height: 100%;
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  pointer-events: none;
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  color: #FFFFFF;
  pointer-events: none;
}

.activity-name {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 24px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
}

.meta-item svg {
  color: #FFFFFF;
}

.price-badge {
  background: #0076FC;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
}

.activity-content {
  padding: 60px 40px;
  background: #F8F8F8;
}

.content-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.main-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.info-section {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 20px 0;
  text-transform: uppercase;
}

.activity-description {
  font-size: 16px;
  line-height: 1.6;
  color: #1A1A1A;
  margin: 0;
}

.details-content {
  font-size: 15px;
  line-height: 1.7;
  color: #1A1A1A;
}

.details-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 12px 0;
  color: #1A1A1A;
}

.details-content :deep(p) {
  margin: 0 0 16px 0;
}

.details-content :deep(ul) {
  margin: 16px 0;
  padding-left: 24px;
}

.details-content :deep(li) {
  margin-bottom: 8px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #1A1A1A;
}

.check-icon {
  flex-shrink: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.booking-card,
.info-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  position: sticky;
  top: 20px;
}

.booking-title {
  font-size: 24px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 20px 0;
  text-transform: uppercase;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid #F5F5F5;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-row.highlight {
  padding: 16px;
  background: #F8F8F8;
  border-radius: 12px;
  margin-top: 8px;
}

.detail-label {
  font-size: 15px;
  color: #949CA4;
  font-weight: 500;
}

.detail-value {
  font-size: 15px;
  color: #1A1A1A;
  font-weight: 600;
}

.detail-value.price {
  font-size: 20px;
  color: #0076FC;
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
  font-size: 14px;
  font-weight: 600;
  color: #1A1A1A;
}

.group-value {
  padding: 12px 16px;
  border: 2px solid #E6E6E6;
  border-radius: 12px;
  font-size: 15px;
  color: #1A1A1A;
  transition: border-color 0.2s ease;
}

.group-value:focus {
  outline: none;
  border-color: #0076FC;
}

.group-value::placeholder {
  color: #949CA4;
}

textarea.group-value {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.btn-book {
  width: 100%;
  padding: 16px;
  background: #0076FC;
  border: none;
  border-radius: 12px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 8px;
}

.btn-book:hover {
  background: #0061D1;
}

.btn-book:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.booking-note {
  text-align: center;
  font-size: 13px;
  color: #949CA4;
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

.info-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 16px 0;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-list li {
  font-size: 14px;
  color: #1A1A1A;
  padding-left: 24px;
  position: relative;
}

.info-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #0076FC;
  font-weight: 700;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 24px;
  padding: 40px;
}

.not-found h1 {
  font-size: 32px;
  color: #1A1A1A;
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
    order: -1;
  }

  .booking-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }

  .hero-content {
    padding: 24px;
  }

  .activity-name {
    font-size: 32px;
  }

  .activity-meta {
    gap: 16px;
  }

  .meta-item {
    font-size: 14px;
  }

  .price-badge {
    font-size: 16px;
    padding: 10px 16px;
  }

  .activity-content {
    padding: 32px 20px;
  }

  .section-title {
    font-size: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 300px;
  }

  .activity-name {
    font-size: 24px;
  }

  .activity-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-section {
    padding: 20px;
  }

  .booking-card,
  .info-card {
    padding: 20px;
  }
}
</style>
