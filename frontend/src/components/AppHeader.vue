<template>
  <header class="site-header">
    <router-link to="/" class="site-header__logo">
      <img
        src="/favicon.png"
        alt="Галерея яхт"
        class="site-header__logo-mark"
        width="52"
        height="52"
        loading="eager"
        decoding="async"
      />
      <span class="site-header__logo-copy">
        <span class="site-header__logo-text">Галерея Яхт</span>
        <span class="site-header__logo-subtitle">Аренда яхт и катеров</span>
      </span>
    </router-link>

    <nav class="site-header__nav">
      <li class="site-header__nav-item" @click="scrollToSection('boats')">Катера</li>
      <li class="site-header__nav-item" @click="scrollToSection('yachts')">Яхты</li>
      <li class="site-header__nav-item" @click="scrollToSection('sailing')">Парусные</li>
      <li class="site-header__nav-item" @click="goToRoutes">Маршруты</li>
      <li class="site-header__nav-item" @click="goToTours">Длительные яхт-туры</li>
      <li class="site-header__nav-item" @click="scrollToSection('activities')">Мероприятия</li>
      <li class="site-header__nav-item" @click="scrollToSection('services')">Услуги</li>
      <li class="site-header__nav-item" @click="scrollToSection('booking')">Контакты</li>
    </nav>

    <div class="site-header__contacts">
      <a href="tel:+70000000000" class="site-header__contacts-phone">+7 000 000 0000</a>
      <span class="site-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>

    <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <!-- Mobile Drawer -->
  <transition name="drawer">
    <div v-if="mobileMenuOpen" class="mobile-drawer">
      <div class="mobile-drawer__header">
        <span class="mobile-drawer__logo">
          <img
            src="/favicon.png"
            alt="Галерея яхт"
            class="mobile-drawer__logo-mark"
            width="34"
            height="34"
            loading="eager"
            decoding="async"
          />
          <span class="mobile-drawer__logo-copy">
            <span class="mobile-drawer__logo-text">Галерея Яхт</span>
            <span class="mobile-drawer__logo-subtitle">Аренда яхт и катеров</span>
          </span>
        </span>
        <button class="mobile-drawer__close" @click="toggleMobileMenu" aria-label="Закрыть">×</button>
      </div>

      <nav class="mobile-drawer__nav">
        <button class="mobile-drawer__item" @click="navigate('boats')">Катера</button>
        <button class="mobile-drawer__item" @click="navigate('yachts')">Яхты</button>
        <button class="mobile-drawer__item" @click="navigate('sailing')">Парусные</button>
        <button class="mobile-drawer__item" @click="navigateRoutes">Маршруты</button>
        <button class="mobile-drawer__item" @click="navigateTours">Длительные яхт-туры</button>
        <button class="mobile-drawer__item" @click="navigate('activities')">Мероприятия</button>
        <button class="mobile-drawer__item" @click="navigate('services')">Услуги</button>
        <button class="mobile-drawer__item" @click="navigate('booking')">Контакты</button>
      </nav>

      <div class="mobile-drawer__contacts">
        <a href="tel:+70000000000" class="mobile-drawer__phone">+7 000 000 0000</a>
        <a href="mailto:mail@mail.ru" class="mobile-drawer__email">mail@mail.ru</a>
        <div class="mobile-drawer__socials">
          <a href="mailto:mail@mail.ru" class="mobile-drawer__social" aria-label="Telegram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          <a href="tel:+70000000000" class="mobile-drawer__social" aria-label="VK">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.032-1-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
            </svg>
          </a>
          <a href="mailto:mail@mail.ru" class="mobile-drawer__social" aria-label="YouTube">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </transition>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { navigateToSection } from '../utils/scrollToSection'

const router = useRouter()
const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function navigate(sectionId) {
  toggleMobileMenu()
  scrollToSection(sectionId)
}

function navigateRoutes() {
  toggleMobileMenu()
  goToRoutes()
}

function navigateTours() {
  toggleMobileMenu()
  goToTours()
}

function goToRoutes() {
  mobileMenuOpen.value = false
  router.push({ name: 'Routes' })
}

function goToTours() {
  mobileMenuOpen.value = false
  router.push({ name: 'Tours' })
}

function scrollToSection(sectionId) {
  mobileMenuOpen.value = false
  navigateToSection(router, sectionId)
}
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  min-height: 60px;
  background-color: #f5f5f5;
  z-index: 1000;
  transition: box-shadow 0.3s ease;
  contain: layout paint;
}

/* Header - Блок Логотипа */
.site-header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.site-header__logo-mark {
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  object-fit: contain;
  filter: drop-shadow(0 10px 18px rgba(16, 42, 95, 0.14));
}

.site-header__logo-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.site-header__logo:hover {
  opacity: 0.8;
}

.site-header__logo-text {
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.04em;
  text-transform: none;
  color: #102a5f;
  line-height: 0.95;
  white-space: nowrap;
}

.site-header__logo-subtitle {
  font-family: var(--font-base);
  font-weight: 500;
  font-size: 8px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #949ca4;
  line-height: 1;
  white-space: nowrap;
}

/* Header - Навигация */
.site-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  list-style: none;
}

.site-header__nav-item {
  color: #1a1a1a;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}

.site-header__nav-item:hover {
  color: #949ca4;
}

.site-header__nav-item a {
  color: inherit;
  text-decoration: none;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 4px;
  padding-top: 12px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 12px 8px 8px 8px;
  min-width: 160px;
  z-index: 1001;
  animation: fadeInDown 0.2s ease;
}

/* Invisible bridge between menu item and dropdown */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  height: 12px;
  background: transparent;
}

.dropdown-item {
  padding: 12px 16px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #0076FC;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Header - Блок контактов */
.site-header__contacts {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.site-header__contacts-phone {
  color: #1a1a1a;
  font-weight: 600;
  font-family: var(--font-base);
  text-transform: uppercase;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-header__contacts-phone:hover {
  color: #0076FC;
}

.site-header__contacts-schedule {
  font-weight: 200;
  font-size: 12px;
  color: #949ca4;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  flex: 0 0 28px;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.mobile-menu-btn span {
  width: 100%;
  height: 2.5px;
  background-color: #1a1a1a;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 1024px) {
  .site-header__nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 768px) {
  .site-header {
    padding: 8px 20px;
    min-height: 60px;
  }
  
  .site-header__contacts {
    display: none;
  }
  
  .site-header__logo-text {
    font-size: 15px;
    letter-spacing: 0.03em;
  }
  
  .site-header__logo-subtitle {
    font-size: 6px;
    letter-spacing: 0.12em;
  }

  .site-header__logo {
    gap: 8px;
    min-height: 42px;
  }

  .site-header__logo-mark {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }
}

/* ===== Mobile Drawer ===== */
.mobile-drawer__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1099;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: #ffffff;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 20px;
  border-bottom: 1px solid #ebebeb;
}

.mobile-drawer__logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-drawer__logo-mark {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  object-fit: contain;
}

.mobile-drawer__logo-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mobile-drawer__logo-text {
  font-family: "Cormorant Garamond", serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #102a5f;
  line-height: 1;
}

.mobile-drawer__logo-subtitle {
  font-family: var(--font-base);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #949ca4;
  line-height: 1;
}

.mobile-drawer__close {
  background: none;
  border: none;
  font-size: 32px;
  line-height: 1;
  color: #555;
  cursor: pointer;
  padding: 0 2px;
}

.mobile-drawer__nav {
  flex: 1;
  padding: 8px 0 24px;
}

.mobile-drawer__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 18px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.15s;
  text-align: left;
  color: #1a1a1a;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.mobile-drawer__item:active {
  background: #f8f8f8;
}

.mobile-drawer__contacts {
  padding: 24px;
  border-top: 1px solid #ebebeb;
}

.mobile-drawer__phone {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  margin-bottom: 6px;
}

.mobile-drawer__email {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #777;
  text-decoration: none;
  margin-bottom: 20px;
}

.mobile-drawer__socials {
  display: flex;
  gap: 16px;
}

.mobile-drawer__social {
  color: #888;
  transition: color 0.2s;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-drawer__social:hover {
  color: #0076FC;
}

/* Drawer transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
