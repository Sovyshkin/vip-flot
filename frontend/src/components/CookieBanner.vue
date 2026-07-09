<template>
  <transition name="cookie-banner-fade">
    <div v-if="isVisible" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Уведомление об использовании cookie">
      <div class="cookie-banner__content">
        <div class="cookie-banner__text">
          <h2 class="cookie-banner__title">Мы используем cookie</h2>
          <p class="cookie-banner__description">
            Сайт использует cookie-файлы для корректной работы, улучшения сервиса и анализа посещаемости.
            Продолжая пользоваться сайтом, вы соглашаетесь с
            <router-link to="/privacy-policy">политикой конфиденциальности</router-link>
            и
            <router-link to="/personal-data-consent">согласием на обработку персональных данных</router-link>.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-banner__button" @click="acceptCookies">
            Понятно
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'gallery-yachts-cookie-consent'
const isVisible = ref(false)

function acceptCookies() {
  localStorage.setItem(STORAGE_KEY, 'accepted')
  isVisible.value = false
}

onMounted(() => {
  isVisible.value = localStorage.getItem(STORAGE_KEY) !== 'accepted'
})
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
  z-index: 1200;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.cookie-banner__content {
  width: min(100%, 1040px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  border-radius: 20px;
  background: rgba(26, 26, 26, 0.94);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(14px);
  pointer-events: auto;
}

.cookie-banner__text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cookie-banner__title {
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
}

.cookie-banner__description {
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 14px;
  line-height: 1.6;
}

.cookie-banner__description a {
  color: #4fa0ff;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cookie-banner__actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.cookie-banner__button {
  min-width: 168px;
  padding: 16px 24px;
  border-radius: 14px;
  background: #0076fc;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.cookie-banner__button:hover {
  background: #0061d1;
  transform: translateY(-1px);
}

.cookie-banner-fade-enter-active,
.cookie-banner-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.cookie-banner-fade-enter-from,
.cookie-banner-fade-leave-to {
  opacity: 0;
  transform: translateY(14px);
}

@media (max-width: 768px) {
  .cookie-banner {
    left: 12px;
    right: 12px;
    bottom: 12px;
  }

  .cookie-banner__content {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 18px;
    border-radius: 18px;
  }

  .cookie-banner__title {
    font-size: 18px;
  }

  .cookie-banner__description {
    font-size: 13px;
    line-height: 1.5;
  }

  .cookie-banner__button {
    width: 100%;
    min-width: 0;
  }
}
</style>
