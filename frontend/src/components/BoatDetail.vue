<template>
  <div v-if="boat" class="boat-detail">
    <div class="hero-section">
      <div class="hero-image">
        <img :src="boat.images[0]" :alt="boat.name">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="boat-name">{{ boat.name }}</h1>
          <div class="boat-price">
            <span class="price-label">от</span>
            <span class="price-value">{{ boat.pricePerHour.toLocaleString('ru-RU') }} ₽</span>
            <span class="price-period">/час</span>
          </div>
        </div>
      </div>
    </div>

    <div class="boat-content">
      <div class="content-grid">
        <div class="main-info">
          <section class="info-section">
            <h2 class="section-title">О катере</h2>
            <p class="boat-description">{{ boat.description }}</p>
          </section>

          <section class="info-section">
            <h2 class="section-title">Характеристики</h2>
            <div class="specs-grid">
              <div class="spec-item">
                <img src="../assets/card-desc-icon-1.svg" alt="">
                <div class="spec-content">
                  <span class="spec-label">Вместимость</span>
                  <span class="spec-value">до {{ boat.capacity }} гостей</span>
                </div>
              </div>
              <div class="spec-item">
                <img src="../assets/card-desc-icon-2.svg" alt="">
                <div class="spec-content">
                  <span class="spec-label">Длина</span>
                  <span class="spec-value">{{ boat.length }} метров</span>
                </div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">🚤</div>
                <div class="spec-content">
                  <span class="spec-label">Двигатель</span>
                  <span class="spec-value">{{ boat.specifications.engine }}</span>
                </div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">⚡</div>
                <div class="spec-content">
                  <span class="spec-label">Макс. скорость</span>
                  <span class="spec-value">{{ boat.specifications.maxSpeed }}</span>
                </div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">⛽</div>
                <div class="spec-content">
                  <span class="spec-label">Топливо</span>
                  <span class="spec-value">{{ boat.specifications.fuelType }}</span>
                </div>
              </div>
              <div class="spec-item">
                <div class="spec-icon">🛏️</div>
                <div class="spec-content">
                  <span class="spec-label">Каюты</span>
                  <span class="spec-value">{{ boat.specifications.cabins }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="info-section">
            <h2 class="section-title">Что включено</h2>
            <div class="features-grid">
              <div v-for="(feature, idx) in boat.features" :key="idx" class="feature-item">
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
            <div class="booking-price">
              <span class="booking-price-value">{{ boat.pricePerHour.toLocaleString('ru-RU') }} ₽</span>
              <span class="booking-price-period">/час</span>
            </div>
            <div class="booking-form">
              <div class="form-group">
                <label class="group-name" for="booking-name">Имя</label>
                <input class="group-value" type="text" id="booking-name" name="name" placeholder="Введите ваше имя"/>
              </div>
              <div class="form-group">
                <label class="group-name" for="booking-phone">Телефон</label>
                <input class="group-value" type="text" id="booking-phone" name="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" autocomplete="tel" maxlength="18" @input="onPhoneInput" @paste="onPhonePaste" @keydown="onPhoneKeydown"/>
              </div>
              <div class="form-group">
                <label class="group-name" for="booking-date">Дата прогулки</label>
                <input class="group-value" type="date" id="booking-date" name="date" />
              </div>
              <button class="btn-book" @click="goToBooking">Забронировать</button>
              <p class="booking-note">Минимальное время аренды — 1 час</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h1>Катер не найден</h1>
    <router-link to="/" class="btn-back">Вернуться на главную</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getBoatBySlug } from '../data/boats';

const route = useRoute();
const router = useRouter();
const boat = ref(null);

onMounted(() => {
  const slug = route.params.slug;
  boat.value = getBoatBySlug(slug);
});

function goToBooking() {
  router.push({ path: '/', hash: '#booking' });
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
    return;
  }
  if (digits[0] !== '7') {
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    else digits = '7' + digits;
  }
  digits = digits.slice(0, 11);
  const formatted = formatPhoneDigits(digits);
  el.value = formatted;
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
  height: 500px;
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
}

.boat-name {
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin: 0;
}

.boat-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 16px;
}

.price-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
}

.price-value {
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
}

.price-period {
  color: rgba(255, 255, 255, 0.7);
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
  color: #1A1A1A;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F5F5F5;
  border-radius: 12px;
}

.spec-item img {
  width: 24px;
  height: 24px;
}

.spec-icon {
  font-size: 24px;
}

.spec-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-label {
  color: #949CA4;
  font-size: 12px;
  font-weight: 500;
}

.spec-value {
  color: #1A1A1A;
  font-size: 14px;
  font-weight: 600;
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
  color: #1A1A1A;
  font-size: 15px;
  font-weight: 400;
}

.check-icon {
  flex-shrink: 0;
}

.sidebar {
  position: sticky;
  top: 24px;
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

.booking-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E5E5E5;
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
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-image {
    height: 400px;
  }

  .hero-content {
    padding: 30px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .boat-name {
    font-size: 32px;
  }
  
  .price-value {
    font-size: 36px;
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
    font-size: 15px;
  }

  .specs-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-card {
    padding: 24px;
  }
  
  .booking-title {
    font-size: 22px;
  }
  
  .booking-price {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 350px;
  }
  
  .hero-content {
    padding: 24px 16px;
  }
  
  .boat-name {
    font-size: 26px;
  }
  
  .price-label,
  .price-period {
    font-size: 14px;
  }
  
  .price-value {
    font-size: 30px;
  }
  
  .boat-content {
    padding: 24px 16px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .boat-description {
    font-size: 14px;
  }
  
  .spec-label,
  .feature-item {
    font-size: 13px;
  }
  
  .booking-card {
    padding: 20px;
  }
  
  .booking-title {
    font-size: 20px;
  }
  
  .booking-price {
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
</style>
