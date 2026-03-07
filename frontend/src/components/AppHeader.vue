<template>
  <header class="vipflot-header">
    <router-link to="/" class="vipflot-header__logo">
      <span class="vipflot-header__logo-text">VIP FLOT</span>
      <span class="vipflot-header__logo-subtitle">Аренда яхт и катеров</span>
    </router-link>

    <nav class="vipflot-header__nav" :class="{ 'nav-open': mobileMenuOpen }">
      <li class="vipflot-header__nav-item" @click="scrollToSection('boats')">Наш флот</li>
      <li class="vipflot-header__nav-item" @click="scrollToSection('routes')">Яхт-туры</li>
      <li class="vipflot-header__nav-item" @click="scrollToSection('routes')">Маршруты</li>
      <li class="vipflot-header__nav-item" @click="scrollToSection('activities')">Мероприятия</li>
      <li class="vipflot-header__nav-item" @click="scrollToSection('services')">Услуги</li>
    </nav>

    <div class="vipflot-header__contacts">
      <a href="tel:+78126605516" class="vipflot-header__contacts-phone">+7 (812) 660-55-16</a>
      <span class="vipflot-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>

    <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function scrollToSection(sectionId) {
  // Close mobile menu if open
  mobileMenuOpen.value = false
  
  // If not on main page, navigate first
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
    setTimeout(() => {
      scrollToElement(sectionId)
    }, 300)
  } else {
    scrollToElement(sectionId)
  }
}

function scrollToElement(id) {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.vipflot-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: transparent;
}

/* Header - Блок Логотипа */
.vipflot-header__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.vipflot-header__logo:hover {
  opacity: 0.8;
}

.vipflot-header__logo-text {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 600;
  font-size: 25px;
  letter-spacing: 9px;
  text-transform: uppercase;
  color: #1a1a1a;
}

.vipflot-header__logo-subtitle {
  font-weight: 200;
  font-size: 12px;
  color: #949ca4;
}

/* Header - Навигация */
.vipflot-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
}

.vipflot-header__nav-item {
  color: #1a1a1a;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.vipflot-header__nav-item:hover {
  color: #949ca4;
}

.vipflot-header__nav-item a {
  color: inherit;
  text-decoration: none;
}

/* Header - Блок контактов */
.vipflot-header__contacts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.vipflot-header__contacts-phone {
  color: #1a1a1a;
  font-weight: 600;
  font-family: "Golos Text", sans-serif;
  text-transform: uppercase;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.vipflot-header__contacts-phone:hover {
  color: #0076FC;
}

.vipflot-header__contacts-schedule {
  font-weight: 200;
  font-size: 12px;
  color: #949ca4;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.mobile-menu-btn span {
  width: 100%;
  height: 3px;
  background-color: #1a1a1a;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Responsive */
@media (max-width: 1024px) {
  .vipflot-header__nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .vipflot-header__nav.nav-open {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .vipflot-header__nav.nav-open .vipflot-header__nav-item {
    font-size: 24px;
    font-weight: 600;
  }
}

@media (max-width: 768px) {
  .vipflot-header {
    padding: 16px 24px;
  }
  
  .vipflot-header__contacts {
    display: none;
  }
  
  .vipflot-header__logo-text {
    font-size: 20px;
    letter-spacing: 6px;
  }
  
  .vipflot-header__logo-subtitle {
    font-size: 10px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
