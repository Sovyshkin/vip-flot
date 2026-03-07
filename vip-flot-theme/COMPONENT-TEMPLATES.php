<!-- 
    ШАБЛОН КОМПОНЕНТА
    
    Инструкция:
    1. Скопируйте этот файл и переименуйте (например, component-card.php)
    2. Замените COMPONENT_NAME на имя вашего компонента
    3. Добавьте соответствующие стили в style.css
    4. Подключите компонент в нужном месте темы
-->

<!-- Пример 1: CARD (Карточка) -->
<div class="vipflot-card">
    <div class="vipflot-card__image">
        <img src="путь/к/изображению.jpg" alt="Описание">
    </div>
    <div class="vipflot-card__content">
        <h3 class="vipflot-card__title">Заголовок карточки</h3>
        <p class="vipflot-card__description">Описание карточки</p>
        <a href="#" class="vipflot-card__link">Подробнее</a>
    </div>
</div>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: CARD (Карточка)
   Префикс: .vipflot-card
   ============================================ */

.vipflot-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.vipflot-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.vipflot-card__image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.vipflot-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.vipflot-card__content {
    padding: 20px;
}

.vipflot-card__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 24px;
    color: #1A1A1A;
    margin-bottom: 10px;
}

.vipflot-card__description {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
}

.vipflot-card__link {
    display: inline-block;
    color: #1A1A1A;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.vipflot-card__link:hover {
    color: #949CA4;
}

/* Адаптивность */
@media (max-width: 768px) {
    .vipflot-card__image {
        height: 150px;
    }
    
    .vipflot-card__content {
        padding: 15px;
    }
}

-->


<!-- Пример 2: BUTTON (Кнопка) -->
<button class="vipflot-btn vipflot-btn--primary">
    Первичная кнопка
</button>

<button class="vipflot-btn vipflot-btn--secondary">
    Вторичная кнопка
</button>

<button class="vipflot-btn vipflot-btn--primary vipflot-btn--large">
    Большая кнопка
</button>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: BUTTON (Кнопка)
   Префикс: .vipflot-btn
   ============================================ */

.vipflot-btn {
    display: inline-block;
    padding: 12px 32px;
    font-family: "Manrope", sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.vipflot-btn--primary {
    background-color: #1A1A1A;
    color: #fff;
    border-color: #1A1A1A;
}

.vipflot-btn--primary:hover {
    background-color: #333;
    border-color: #333;
}

.vipflot-btn--secondary {
    background-color: transparent;
    color: #1A1A1A;
    border-color: #1A1A1A;
}

.vipflot-btn--secondary:hover {
    background-color: #1A1A1A;
    color: #fff;
}

.vipflot-btn--large {
    padding: 16px 40px;
    font-size: 16px;
}

.vipflot-btn--small {
    padding: 8px 20px;
    font-size: 12px;
}

.vipflot-btn--block {
    display: block;
    width: 100%;
}

.vipflot-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

-->


<!-- Пример 3: SECTION (Секция контента) -->
<section class="vipflot-section">
    <div class="vipflot-section__container">
        <h2 class="vipflot-section__title">Заголовок секции</h2>
        <div class="vipflot-section__content">
            <p>Контент секции...</p>
        </div>
    </div>
</section>

<!-- Вариант с темным фоном -->
<section class="vipflot-section vipflot-section--dark">
    <div class="vipflot-section__container">
        <h2 class="vipflot-section__title">Заголовок на темном фоне</h2>
        <div class="vipflot-section__content">
            <p>Контент...</p>
        </div>
    </div>
</section>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: SECTION (Секция)
   Префикс: .vipflot-section
   ============================================ */

.vipflot-section {
    padding: 80px 40px;
    background-color: #fff;
}

.vipflot-section__container {
    max-width: 1200px;
    margin: 0 auto;
}

.vipflot-section__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 48px;
    letter-spacing: 2px;
    color: #1A1A1A;
    margin-bottom: 40px;
    text-align: center;
}

.vipflot-section__content {
    font-size: 16px;
    line-height: 1.8;
    color: #1A1A1A;
}

.vipflot-section--dark {
    background-color: #1A1A1A;
}

.vipflot-section--dark .vipflot-section__title,
.vipflot-section--dark .vipflot-section__content {
    color: #fff;
}

.vipflot-section--no-padding {
    padding: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
    .vipflot-section {
        padding: 60px 20px;
    }
    
    .vipflot-section__title {
        font-size: 36px;
        margin-bottom: 30px;
    }
}

-->


<!-- Пример 4: GRID (Сетка) -->
<div class="vipflot-grid">
    <div class="vipflot-grid__item">
        <!-- Контент элемента сетки 1 -->
    </div>
    <div class="vipflot-grid__item">
        <!-- Контент элемента сетки 2 -->
    </div>
    <div class="vipflot-grid__item">
        <!-- Контент элемента сетки 3 -->
    </div>
    <div class="vipflot-grid__item">
        <!-- Контент элемента сетки 4 -->
    </div>
</div>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: GRID (Сетка)
   Префикс: .vipflot-grid
   ============================================ */

.vipflot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    padding: 40px;
}

.vipflot-grid__item {
    /* Стили элементов сетки */
}

.vipflot-grid--2-cols {
    grid-template-columns: repeat(2, 1fr);
}

.vipflot-grid--3-cols {
    grid-template-columns: repeat(3, 1fr);
}

.vipflot-grid--4-cols {
    grid-template-columns: repeat(4, 1fr);
}

/* Адаптивность */
@media (max-width: 1024px) {
    .vipflot-grid--4-cols {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .vipflot-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
    }
    
    .vipflot-grid--2-cols,
    .vipflot-grid--3-cols,
    .vipflot-grid--4-cols {
        grid-template-columns: 1fr;
    }
}

-->


<!-- 
    ЧЕКЛИСТ ДЛЯ СОЗДАНИЯ КОМПОНЕНТА:
    
    □ Выбрано уникальное имя компонента
    □ Добавлен префикс .vipflot-
    □ Создана структура HTML с правильными классами
    □ Добавлена секция в style.css с комментарием
    □ Добавлены базовые стили компонента
    □ Добавлены стили для элементов (.vipflot-comp__element)
    □ Добавлены модификаторы если нужны (.vipflot-comp--modifier)
    □ Добавлены адаптивные стили (медиа-запросы)
    □ Проверена работа на разных разрешениях
    □ Нет конфликтов с другими компонентами
    □ Код документирован комментариями
    
    ГОТОВО! 🎉
-->
