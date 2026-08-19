<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-column footer-brand">
          <div class="footer-logo">
            <img
              src="/favicon.png"
              alt="Галерея яхт"
              class="footer-logo-mark"
              width="60"
              height="60"
              loading="lazy"
              decoding="async"
            >
            <span class="footer-logo-copy">
              <span class="footer-logo-text">Галерея Яхт</span>
              <span class="footer-logo-subtitle">Аренда яхт и катеров</span>
            </span>
          </div>
          <div class="footer-socials">
            <a href="mailto:mail@mail.ru" class="social-link" aria-label="Telegram">
              <img src="../assets/telegram.svg" alt="Telegram" width="24" height="24" loading="lazy" decoding="async">
            </a>
            <a href="tel:+70000000000" class="social-link" aria-label="WhatsApp">
              <img src="../assets/whatsapp.svg" alt="WhatsApp" width="24" height="24" loading="lazy" decoding="async">
            </a>
            <a href="mailto:mail@mail.ru" class="social-link" aria-label="Instagram">
              <img src="../assets/instagram.svg" alt="Instagram" width="24" height="24" loading="lazy" decoding="async">
            </a>
          </div>
          <div class="footer-contacts">
            <a href="tel:+70000000000" class="footer-phone">+7 000 000 0000</a>
            <a href="mailto:mail@mail.ru" class="footer-email">mail@mail.ru</a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Аренда судна</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('boats')">Катера</a></li>
            <li><a href="#" @click.prevent="scrollToSection('yachts')">Яхты</a></li>
            <li><a href="#" @click.prevent="scrollToSection('sailing')">Парусные яхты</a></li>
            <li><router-link to="/catalog">Весь каталог</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Услуги</h3>
          <ul class="footer-links">
            <li><router-link to="/services/catering">Кейтеринг</router-link></li>
            <li><router-link to="/services/photographer">Фотограф</router-link></li>
            <li><router-link to="/services/decoration">Украшение палубы</router-link></li>
            <li><router-link to="/services/live-music">Живая музыка</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Маршруты</h3>
          <ul class="footer-links">
            <li><router-link to="/routes">Все маршруты</router-link></li>
            <li><router-link to="/routes/reki-kanaly">Реки и каналы</router-link></li>
            <li><router-link to="/routes/nevskiy-prospekt">Невский проспект</router-link></li>
            <li><router-link to="/routes/kronshtadt">Кронштадт</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Яхт-туры</h3>
          <ul class="footer-links">
            <li><router-link to="/routes/razvod-mostov">Развод мостов</router-link></li>
            <li><router-link to="/tours/petergof">Петергоф морем</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Мероприятия</h3>
          <ul class="footer-links">
            <li><router-link to="/events/den-rozhdeniya">День рождения на яхте</router-link></li>
            <li><router-link to="/events/svadba">Свадьба на яхте</router-link></li>
            <li><router-link to="/events/devichnik">Девичник на яхте</router-link></li>
            <li><router-link to="/events/malchishnik">Мальчишник на яхте</router-link></li>
            <li><router-link to="/events/korporativy">Корпоратив на яхте</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Информация</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToSection('blog')">Новости и статьи</a></li>
            <li><router-link to="/privacy-policy">Политика конфиденциальности</router-link></li>
            <li><router-link to="/personal-data-consent">Согласие на обработку данных</router-link></li>
          </ul>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>© 2025 Галерея яхт</p>
            <p>Информация на сайте не является публичной офертой</p>
          </div>
          <div class="footer-meta">
            <p>*Meta Platforms Inc, признана экстремистской организацией на территории РФ</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { navigateToSection } from '../utils/scrollToSection'

const router = useRouter()

function scrollToSection(sectionId) {
  navigateToSection(router, sectionId)
}
</script>

<style scoped>
.site-footer {
  width: 100%;
  background-color: #1A1A1A;
  color: #fff;
  padding: 60px 40px 30px;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
}

.footer-content {
  max-width: 1440px;
  margin: 0 auto;
  min-width: 0;
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(240px, 1.35fr) repeat(6, minmax(130px, 1fr));
  gap: 36px;
  margin-bottom: 60px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.footer-brand {
  gap: 24px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-logo-mark {
  width: 60px;
  height: 60px;
  flex: 0 0 60px;
  object-fit: contain;
  filter: drop-shadow(0 14px 24px rgba(0, 118, 252, 0.12));
}

.footer-logo-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-logo-text {
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  font-size: 34px;
  letter-spacing: 0.05em;
  text-transform: none;
  color: #fff;
  line-height: 1;
}

.footer-logo-subtitle {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
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
  overflow-wrap: anywhere;
}

.footer-links a:hover {
  color: #fff;
}

.footer-bottom {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-left: -40px;
  margin-right: -40px;
  padding-left: 40px;
  padding-right: 40px;
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

@media (max-width: 1440px) {
  .site-footer {
    padding: 48px 32px 28px;
  }

  .footer-main {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 34px 28px;
    margin-bottom: 42px;
  }

  .footer-brand {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(220px, 1fr) auto minmax(190px, auto);
    align-items: center;
    gap: 24px;
  }

  .footer-socials {
    justify-content: center;
  }

  .footer-contacts {
    align-items: flex-end;
    text-align: right;
  }

  .footer-title {
    font-size: 16px;
  }

  .footer-links {
    gap: 10px;
  }

  .footer-links a {
    font-size: 13px;
  }

  .footer-bottom {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }
}

@media (max-width: 920px) {
  .site-footer {
    padding: 44px 24px 24px;
  }

  .footer-main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px 24px;
  }

  .footer-brand {
    grid-template-columns: 1fr;
    justify-items: flex-start;
    gap: 18px;
  }

  .footer-socials {
    justify-content: flex-start;
  }

  .footer-contacts {
    align-items: flex-start;
    text-align: left;
  }

  .footer-bottom {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .footer-meta {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .site-footer {
    padding: 40px 20px 20px;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .footer-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 24px;
  }

  .footer-brand {
    grid-column: 1 / -1;
    display: flex;
    margin-bottom: 16px;
  }

  .footer-logo {
    align-items: flex-start;
  }

  .footer-logo-mark {
    width: 48px;
    height: 48px;
    flex-basis: 48px;
  }

  .footer-logo-text {
    font-size: 28px;
  }

  .footer-logo-subtitle {
    font-size: 10px;
    letter-spacing: 0.14em;
  }

  .footer-main > .footer-column {
    margin-bottom: 24px;
  }

  .footer-main > .footer-column .footer-title {
    margin-bottom: 12px;
  }

  .footer-main > .footer-column .footer-links a {
    font-size: 13px;
  }

  .footer-bottom {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin: 0;
    padding: 0;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-copyright,
  .footer-meta {
    gap: 4px;
  }

  .footer-copyright p,
  .footer-meta p {
    font-size: 11px;
  }

  .footer-meta {
    text-align: left;
  }
}

@media (max-width: 520px) {
  .site-footer {
    padding: 36px 20px 22px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 0;
    margin-bottom: 34px;
  }

  .footer-logo-text {
    font-size: 26px;
  }
}
</style>
