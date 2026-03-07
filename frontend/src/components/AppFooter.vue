<template>
  <footer class="vipflot-footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-column footer-brand">
          <div class="footer-logo">
            <span class="footer-logo-text">VIP FLOT</span>
            <span class="footer-logo-subtitle">Аренда яхт и катеров</span>
          </div>
          <div class="footer-socials">
            <a href="https://t.me/vipflot" target="_blank" class="social-link" aria-label="Telegram">
              <img src="../assets/telegram.svg" alt="Telegram">
            </a>
            <a href="https://wa.me/78126605516" target="_blank" class="social-link" aria-label="WhatsApp">
              <img src="../assets/whatsapp.svg" alt="WhatsApp">
            </a>
            <a href="https://www.instagram.com/vipflot?igsh=cGRvc3ExdDJ4djZv" target="_blank" class="social-link" aria-label="Instagram">
              <img src="../assets/instagram.svg" alt="Instagram">
            </a>
          </div>
          <div class="footer-contacts">
            <a href="tel:+78126605516" class="footer-phone">+7 (812) 660-55-16</a>
            <a href="mailto:mail@vipflot.ru" class="footer-email">mail@vipflot.ru</a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Аренда судна</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('boats')">Аренда судна</a></li>
            <li><a href="#" @click.prevent="scrollToSection('boats')">Прогулка на яхте</a></li>
            <li><a href="#" @click.prevent="scrollToSection('boats')">Прогулка на катере</a></li>
            <li><a href="#">Прогулка на парусной яхте</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Услуги</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('services')">Кейтеринг</a></li>
            <li><a href="#" @click.prevent="scrollToSection('activities')">Экскурсии</a></li>
            <li><a href="#">Подарочные сертификаты</a></li>
            <li><a href="#" @click.prevent="scrollToSection('routes')">Маршруты</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Маршруты</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('routes')">Развод мостов</a></li>
            <li><a href="#" @click.prevent="scrollToSection('routes')">По рекам и каналам</a></li>
            <li><a href="#">Выход в залив</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Круизы</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('tours')">Валаам</a></li>
            <li><a href="#" @click.prevent="scrollToSection('tours')">Петергоф</a></li>
            <li><a href="#" @click.prevent="scrollToSection('tours')">Кронштадт</a></li>
            <li><a href="#">Крепость Орешек</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Мероприятия</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('activities')">День рождения на яхте</a></li>
            <li><a href="#" @click.prevent="scrollToSection('activities')">Свадьба на яхте</a></li>
            <li><a href="#">Девичники/Мальчишники</a></li>
            <li><a href="#">Корпоратив на яхте</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Информация</h3>
          <ul class="footer-links">
            <li><a href="#">Контакты</a></li>
            <li><a href="#">О нас</a></li>
            <li><a href="#" @click.prevent="scrollToSection('blog')">Новости и статьи</a></li>
            <li><a href="#">Условия бронирования</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>© 2025 VIPFLOT</p>
          <p>Информация на сайте не является публичной офертой</p>
        </div>
        <div class="footer-meta">
          <p>*Meta Platforms Inc, признана экстремистской организацией на территории РФ</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollToSection(sectionId) {
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
.vipflot-footer {
  width: 100%;
  background-color: #1A1A1A;
  color: #fff;
  padding: 60px 40px 30px;
}

.footer-content {
  max-width: 1440px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.2fr repeat(6, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-brand {
  gap: 24px;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-logo-text {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 600;
  font-size: 25px;
  letter-spacing: 9px;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
}

.footer-logo-subtitle {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
}

.footer-socials {
  display: flex;
  gap: 12px;
  align-items: center;
}

.social-link {
  transition: background 0.3s, transform 0.2s;
}

.social-link:hover {
  transform: translateY(-2px);
}

.social-link img {
  width: 24px;
  height: 24px;
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-phone,
.footer-email {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-phone:hover,
.footer-email:hover {
  color: #0066FF;
}

.footer-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.3s;
  line-height: 1.4;
}

.footer-links a:hover {
  color: #fff;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright,
.footer-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-copyright p,
.footer-meta p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
}

.footer-meta {
  text-align: right;
}

@media (max-width: 1200px) {
  .footer-main {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px 30px;
  }
}

@media (max-width: 768px) {
  .vipflot-footer {
    padding: 40px 20px 20px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .footer-meta {
    text-align: left;
  }
}
</style>
