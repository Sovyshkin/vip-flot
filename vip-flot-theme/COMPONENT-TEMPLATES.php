<!-- 
    ШАБЛОН КОМПОНЕНТА
    
    Инструкция:
    1. Скопируйте этот файл и переименуйте (например, component-card.php)
    2. Замените COMPONENT_NAME на имя вашего компонента
    3. Добавьте соответствующие стили в style.css
    4. Подключите компонент в нужном месте темы
-->

<!-- Пример 1: CARD (Карточка) -->
<div class="galleryyachts-card">
    <div class="galleryyachts-card__image">
        <img src="путь/к/изображению.jpg" alt="Описание">
    </div>
    <div class="galleryyachts-card__content">
        <h3 class="galleryyachts-card__title">Заголовок карточки</h3>
        <p class="galleryyachts-card__description">Описание карточки</p>
        <a href="#" class="galleryyachts-card__link">Подробнее</a>
    </div>
</div>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: CARD (Карточка)
   Префикс: .galleryyachts-card
   ============================================ */

.galleryyachts-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.galleryyachts-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.galleryyachts-card__image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.galleryyachts-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.galleryyachts-card__content {
    padding: 20px;
}

.galleryyachts-card__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 24px;
    color: #1A1A1A;
    margin-bottom: 10px;
}

.galleryyachts-card__description {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
}

.galleryyachts-card__link {
    display: inline-block;
    color: #1A1A1A;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.galleryyachts-card__link:hover {
    color: #949CA4;
}

/* Адаптивность */
@media (max-width: 768px) {
    .galleryyachts-card__image {
        height: 150px;
    }
    
    .galleryyachts-card__content {
        padding: 15px;
    }
}

-->


<!-- Пример 2: BUTTON (Кнопка) -->
<button class="galleryyachts-btn galleryyachts-btn--primary">
    Первичная кнопка
</button>

<button class="galleryyachts-btn galleryyachts-btn--secondary">
    Вторичная кнопка
</button>

<button class="galleryyachts-btn galleryyachts-btn--primary galleryyachts-btn--large">
    Большая кнопка
</button>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: BUTTON (Кнопка)
   Префикс: .galleryyachts-btn
   ============================================ */

.galleryyachts-btn {
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

.galleryyachts-btn--primary {
    background-color: #1A1A1A;
    color: #fff;
    border-color: #1A1A1A;
}

.galleryyachts-btn--primary:hover {
    background-color: #333;
    border-color: #333;
}

.galleryyachts-btn--secondary {
    background-color: transparent;
    color: #1A1A1A;
    border-color: #1A1A1A;
}

.galleryyachts-btn--secondary:hover {
    background-color: #1A1A1A;
    color: #fff;
}

.galleryyachts-btn--large {
    padding: 16px 40px;
    font-size: 16px;
}

.galleryyachts-btn--small {
    padding: 8px 20px;
    font-size: 12px;
}

.galleryyachts-btn--block {
    display: block;
    width: 100%;
}

.galleryyachts-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

-->


<!-- Пример 3: SECTION (Секция контента) -->
<section class="galleryyachts-section">
    <div class="galleryyachts-section__container">
        <h2 class="galleryyachts-section__title">Заголовок секции</h2>
        <div class="galleryyachts-section__content">
            <p>Контент секции...</p>
        </div>
    </div>
</section>

<!-- Вариант с темным фоном -->
<section class="galleryyachts-section galleryyachts-section--dark">
    <div class="galleryyachts-section__container">
        <h2 class="galleryyachts-section__title">Заголовок на темном фоне</h2>
        <div class="galleryyachts-section__content">
            <p>Контент...</p>
        </div>
    </div>
</section>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: SECTION (Секция)
   Префикс: .galleryyachts-section
   ============================================ */

.galleryyachts-section {
    padding: 80px 40px;
    background-color: #fff;
}

.galleryyachts-section__container {
    max-width: 1200px;
    margin: 0 auto;
}

.galleryyachts-section__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 48px;
    letter-spacing: 2px;
    color: #1A1A1A;
    margin-bottom: 40px;
    text-align: center;
}

.galleryyachts-section__content {
    font-size: 16px;
    line-height: 1.8;
    color: #1A1A1A;
}

.galleryyachts-section--dark {
    background-color: #1A1A1A;
}

.galleryyachts-section--dark .galleryyachts-section__title,
.galleryyachts-section--dark .galleryyachts-section__content {
    color: #fff;
}

.galleryyachts-section--no-padding {
    padding: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
    .galleryyachts-section {
        padding: 60px 20px;
    }
    
    .galleryyachts-section__title {
        font-size: 36px;
        margin-bottom: 30px;
    }
}

-->


<!-- Пример 4: GRID (Сетка) -->
<div class="galleryyachts-grid">
    <div class="galleryyachts-grid__item">
        <!-- Контент элемента сетки 1 -->
    </div>
    <div class="galleryyachts-grid__item">
        <!-- Контент элемента сетки 2 -->
    </div>
    <div class="galleryyachts-grid__item">
        <!-- Контент элемента сетки 3 -->
    </div>
    <div class="galleryyachts-grid__item">
        <!-- Контент элемента сетки 4 -->
    </div>
</div>

<!-- Соответствующие стили для добавления в style.css:

/* ============================================
   КОМПОНЕНТ: GRID (Сетка)
   Префикс: .galleryyachts-grid
   ============================================ */

.galleryyachts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    padding: 40px;
}

.galleryyachts-grid__item {
    /* Стили элементов сетки */
}

.galleryyachts-grid--2-cols {
    grid-template-columns: repeat(2, 1fr);
}

.galleryyachts-grid--3-cols {
    grid-template-columns: repeat(3, 1fr);
}

.galleryyachts-grid--4-cols {
    grid-template-columns: repeat(4, 1fr);
}

/* Адаптивность */
@media (max-width: 1024px) {
    .galleryyachts-grid--4-cols {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .galleryyachts-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
    }
    
    .galleryyachts-grid--2-cols,
    .galleryyachts-grid--3-cols,
    .galleryyachts-grid--4-cols {
        grid-template-columns: 1fr;
    }
}

-->


<!-- 
    ЧЕКЛИСТ ДЛЯ СОЗДАНИЯ КОМПОНЕНТА:
    
    □ Выбрано уникальное имя компонента
    □ Добавлен префикс .galleryyachts-
    □ Создана структура HTML с правильными классами
    □ Добавлена секция в style.css с комментарием
    □ Добавлены базовые стили компонента
    □ Добавлены стили для элементов (.galleryyachts-comp__element)
    □ Добавлены модификаторы если нужны (.galleryyachts-comp--modifier)
    □ Добавлены адаптивные стили (медиа-запросы)
    □ Проверена работа на разных разрешениях
    □ Нет конфликтов с другими компонентами
    □ Код документирован комментариями
    
    ГОТОВО! 🎉
-->
