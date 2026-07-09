<template>
  <div :class="['request-book', { 'request-book--hide-image-mobile': hideImageOnMobile }]">
    <div class="form-to-book">
      <div class="wrap-title">
        <h2>
          Заполните заявку на бронирование <span class="blue">за 1 минуту</span>
        </h2>
        <p>Наш менеджер свяжется с вами и поможет с выбором и бронированием</p>
      </div>
      
      <!-- Сообщение об успехе -->
      <div v-if="successMessage" class="message success-message">
        {{ successMessage }}
      </div>
      
      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage" class="message error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="submitBooking" class="form-info">
        <div class="input-group">
          <label class="group-name" for="name">Имя</label>
          <input 
            v-model="formData.name" 
            class="group-value" 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Введите ваше имя"
            required
          />
        </div>
        <div class="input-group">
          <label class="group-name" for="phone">Телефон</label>
          <input 
            v-model="formData.phone" 
            class="group-value" 
            type="text" 
            id="phone" 
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
        <div class="input-group">
          <label class="group-name" for="date">Дата прогулки</label>
          <div class="date-field">
            <input 
              v-model="formData.date" 
              :class="['group-value', { 'group-value--date-empty': !formData.date }]"
              type="date" 
              id="date" 
              name="date"
              placeholder="Выберите дату"
            />
            <span v-if="!formData.date" class="date-field__placeholder">Выберите дату</span>
          </div>
        </div>
        <div class="checkbox-group">
          <input 
            v-model="formData.consent" 
            type="checkbox" 
            id="consent" 
            name="consent"
            required
          />
          <label for="consent">
            Нажимая на кнопку, вы даете согласие на обработку персональных
            данных
          </label>
        </div>
        <button type="submit" class="btn to-book" :disabled="isLoading">
          {{ isLoading ? 'Отправка...' : 'Заказать подбор яхты' }}
        </button>
      </form>
    </div>
    <div class="wrap-image">
        <img src="../assets/card-1.webp" alt="" width="1200" height="1200" loading="lazy" decoding="async">
    </div>
  </div>
</template>
<style scoped>
.request-book {
  width: 100%;
  display: flex;
  gap: 12px;
}

.form-to-book {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  border-radius: 24px;
  background-color: #1A1A1A;
}

.wrap-image {
    flex: 1;
    overflow: hidden;
    border-radius: 16px;
}

.wrap-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
}

.wrap-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h2, .blue {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0px;
}

.blue {
    color: #0076FC;
}

p {
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    opacity: 0.7;
}

.form-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.group-name {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
}

.group-value {
    width: 100%;
    padding: 14px 16px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
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

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Custom styled checkbox: visually-hidden native input + styled label */
.checkbox-group input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

.checkbox-group label {
  position: relative;
  padding-left: 36px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0px;
}

.checkbox-group label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px solid rgba(255,255,255,0.22);
  background: transparent;
  box-sizing: border-box;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.checkbox-group label::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10'%3E%3Cpolyline points='1 5 4.5 8 11 1' stroke='%23FFFFFF' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  opacity: 0;
  transition: opacity 0.12s ease;
}

/* Inline SVG icon inside label: center and hide by default 
.checkbox-group label .cb-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 12px;
  display: block;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease;
  z-index: 2;
}*/

/* Ensure pseudo elements are behind the inline SVG */
.checkbox-group label::before,
.checkbox-group label::after {
  z-index: 0;
}

/* Show inline SVG when checked */
.checkbox-group input[type="checkbox"]:checked + label .cb-icon {
  opacity: 1;
}

.checkbox-group input[type="checkbox"]:checked + label::before {
  background: #0076FC;
  border-color: #0076FC;
}

.checkbox-group input[type="checkbox"]:checked + label::after {
  opacity: 1;
}

.checkbox-group input[type="checkbox"]:focus + label::before {
  box-shadow: 0 0 0 6px rgba(0,118,252,0.12);
  border-color: #0076FC;
}

.btn {
    background-color: #0076FC;
    border-radius: 16px;
    padding: 18.5px 32px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0px;
    cursor: pointer;
    transition: background-color 0.3s ease, opacity 0.3s ease;
}

.btn:hover:not(:disabled) {
    background-color: #0066E0;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Сообщения */
.message {
    width: 100%;
    padding: 16px;
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

/* Responsive */
@media (max-width: 1024px) {
    h2, .blue {
        font-size: 28px;
    }
    
    .form-to-book {
        padding: 28px;
    }
}

@media (max-width: 768px) {
    .request-book {
        flex-direction: column;
    }

    .request-book--hide-image-mobile .wrap-image {
        display: none;
    }
    
    .wrap-image {
        height: 250px;
        order: -1;
    }
    
    .form-to-book {
        padding: 24px;
        gap: 20px;
    }
    
    h2, .blue {
        font-size: 24px;
        line-height: 1.2;
    }
    
    p {
        font-size: 14px;
    }
    
    .input-group {
        gap: 8px;
    }
    
    .group-name {
        font-size: 13px;
    }
    
    .group-value {
        padding: 14px;
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .form-to-book {
        padding: 20px;
    }
    
    h2, .blue {
        font-size: 20px;
    }
    
    p {
        font-size: 13px;
    }
    
    .btn {
        padding: 16px 24px;
        font-size: 14px;
    }
}
</style>

<script setup>
import { ref } from 'vue'

defineProps({
  hideImageOnMobile: {
    type: Boolean,
    default: false
  }
})

// API endpoint - замените на свой URL WordPress
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost/wp-admin/admin-ajax.php'

// Данные формы
const formData = ref({
  name: '',
  phone: '',
  date: '',
  consent: false
})

// Состояния
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Функция отправки формы
async function submitBooking() {
  // Очистка предыдущих сообщений
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
  
  if (!formData.value.consent) {
    errorMessage.value = 'Необходимо согласие на обработку данных'
    return
  }
  
  isLoading.value = true
  
  try {
    // Формирование FormData для WordPress AJAX
    const formDataToSend = new FormData()
    formDataToSend.append('action', 'gallery_yachts_booking')
    formDataToSend.append('name', formData.value.name)
    formDataToSend.append('phone', formData.value.phone)
    formDataToSend.append('date', formData.value.date)
    formDataToSend.append('consent', formData.value.consent)
    
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
        consent: false
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

// Функции форматирования телефона
function formatPhoneDigits(digits) {
  if (!digits) return '';
  // normalize leading 7
  digits = digits.replace(/[^0-9]/g, '');
  if (digits[0] === '8') digits = '7' + digits.slice(1);
  if (digits[0] !== '7') digits = '7' + digits;
  digits = digits.slice(0, 11); // +7 and 10 digits

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

  // current digits and formatted
  const curDigits = getDigitsFromValue(el.value);
  const { formatted } = buildFormatted(curDigits);

  // count digits before caret
  let digitIndex = 0;
  for (let i = 0; i < selStart; i++) if (/\d/.test(formatted[i])) digitIndex++;

  // if range selected, remove all digits in selection
  if (selEnd > selStart) {
    let digitIndexEnd = 0;
    for (let i = 0; i < selEnd; i++) if (/\d/.test(formatted[i])) digitIndexEnd++;
    const newDigits = curDigits.slice(0, digitIndex) + curDigits.slice(digitIndexEnd);
    const { formatted: newF, positions } = buildFormatted(newDigits);
    el.value = newF;
    formData.value.phone = newF;
    const caretPos = positions[digitIndex] ?? newF.length;
    el.setSelectionRange(caretPos, caretPos);
    e.preventDefault();
    return;
  }

  if (key === 'Backspace') {
    if (digitIndex <= 0) {
      // nothing to delete
      e.preventDefault();
      return;
    }
    const removeAt = digitIndex - 1;
    const newDigits = curDigits.slice(0, removeAt) + curDigits.slice(removeAt + 1);
    const { formatted: newF, positions } = buildFormatted(newDigits);
    el.value = newF;
    formData.value.phone = newF;
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
    formData.value.phone = newF;
    const caretPos = positions[removeAt] ?? newF.length;
    el.setSelectionRange(caretPos, caretPos);
    e.preventDefault();
    return;
  }
}
</script>
