<?php
/**
 * Template Name: Полная ширина с компонентами
 * Description: Пример страницы с использованием компонентов темы Галерея яхт
 * 
 * @package GALLERY_YACHTS
 */

get_header(); ?>

<!-- Секция Hero -->
<section class="galleryyachts-hero">
    <div class="galleryyachts-hero__container">
        <h1 class="galleryyachts-hero__title">
            <?php the_title(); ?>
        </h1>
        <p class="galleryyachts-hero__subtitle">
            Добро пожаловать в Галерея яхт - аренда яхт и катеров премиум-класса
        </p>
        <div class="galleryyachts-hero__actions">
            <a href="#fleet" class="galleryyachts-btn galleryyachts-btn--primary galleryyachts-btn--large">
                Наш флот
            </a>
            <a href="#contact" class="galleryyachts-btn galleryyachts-btn--secondary galleryyachts-btn--large">
                Связаться с нами
            </a>
        </div>
    </div>
</section>

<!-- Секция с основным контентом -->
<main class="galleryyachts-layout__main">
    <div class="galleryyachts-layout__container">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="galleryyachts-page__content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<!-- Секция с карточками (пример) -->
<section class="galleryyachts-section galleryyachts-section--light" id="fleet">
    <div class="galleryyachts-section__container">
        <h2 class="galleryyachts-section__title">Наш флот</h2>
        
        <div class="galleryyachts-grid galleryyachts-grid--3-cols">
            <!-- Карточка 1 -->
            <div class="galleryyachts-card">
                <div class="galleryyachts-card__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/yacht-1.jpg" alt="Яхта 1">
                </div>
                <div class="galleryyachts-card__content">
                    <h3 class="galleryyachts-card__title">Морская принцесса</h3>
                    <p class="galleryyachts-card__description">Роскошная яхта премиум-класса для незабываемого отдыха</p>
                    <a href="#" class="galleryyachts-card__link">Подробнее →</a>
                </div>
            </div>
            
            <!-- Карточка 2 -->
            <div class="galleryyachts-card">
                <div class="galleryyachts-card__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/yacht-2.jpg" alt="Яхта 2">
                </div>
                <div class="galleryyachts-card__content">
                    <h3 class="galleryyachts-card__title">Океанская звезда</h3>
                    <p class="galleryyachts-card__description">Современный катер для морских приключений</p>
                    <a href="#" class="galleryyachts-card__link">Подробнее →</a>
                </div>
            </div>
            
            <!-- Карточка 3 -->
            <div class="galleryyachts-card">
                <div class="galleryyachts-card__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/yacht-3.jpg" alt="Яхта 3">
                </div>
                <div class="galleryyachts-card__content">
                    <h3 class="galleryyachts-card__title">Белый лебедь</h3>
                    <p class="galleryyachts-card__description">Элегантная яхта для особых мероприятий</p>
                    <a href="#" class="galleryyachts-card__link">Подробнее →</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Темная секция -->
<section class="galleryyachts-section galleryyachts-section--dark">
    <div class="galleryyachts-section__container">
        <h2 class="galleryyachts-section__title">Почему выбирают нас</h2>
        
        <div class="galleryyachts-features">
            <div class="galleryyachts-features__item">
                <div class="galleryyachts-features__icon">
                    <!-- Иконка или изображение -->
                    <span>⚓</span>
                </div>
                <h3 class="galleryyachts-features__title">Премиум качество</h3>
                <p class="galleryyachts-features__description">Только проверенные яхты и катеры в отличном состоянии</p>
            </div>
            
            <div class="galleryyachts-features__item">
                <div class="galleryyachts-features__icon">
                    <span>👨‍✈️</span>
                </div>
                <h3 class="galleryyachts-features__title">Опытный экипаж</h3>
                <p class="galleryyachts-features__description">Профессиональные капитаны с многолетним стажем</p>
            </div>
            
            <div class="galleryyachts-features__item">
                <div class="galleryyachts-features__icon">
                    <span>🌟</span>
                </div>
                <h3 class="galleryyachts-features__title">VIP сервис</h3>
                <p class="galleryyachts-features__description">Индивидуальный подход к каждому клиенту</p>
            </div>
        </div>
    </div>
</section>

<!-- Секция с призывом к действию -->
<section class="galleryyachts-cta" id="contact">
    <div class="galleryyachts-cta__container">
        <h2 class="galleryyachts-cta__title">Готовы отправиться в плавание?</h2>
        <p class="galleryyachts-cta__text">Свяжитесь с нами прямо сейчас и забронируйте яхту своей мечты</p>
        <div class="galleryyachts-cta__actions">
            <a href="tel:+70000000000" class="galleryyachts-btn galleryyachts-btn--primary galleryyachts-btn--large">
                Позвонить: +7 000 000 0000
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>


<!-- 
    СТИЛИ ДЛЯ ЭТОЙ СТРАНИЦЫ (добавить в style.css):

/* ============================================
   КОМПОНЕНТ: HERO (Главный баннер)
   Префикс: .galleryyachts-hero
   ============================================ */

.galleryyachts-hero {
    background: linear-gradient(135deg, #1A1A1A 0%, #333 100%);
    padding: 120px 40px;
    text-align: center;
    color: #fff;
}

.galleryyachts-hero__container {
    max-width: 900px;
    margin: 0 auto;
}

.galleryyachts-hero__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 64px;
    letter-spacing: 3px;
    margin-bottom: 20px;
}

.galleryyachts-hero__subtitle {
    font-size: 18px;
    color: #949CA4;
    margin-bottom: 40px;
    line-height: 1.6;
}

.galleryyachts-hero__actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .galleryyachts-hero {
        padding: 80px 20px;
    }
    
    .galleryyachts-hero__title {
        font-size: 36px;
    }
    
    .galleryyachts-hero__actions {
        flex-direction: column;
    }
}


/* ============================================
   КОМПОНЕНТ: FEATURES (Преимущества)
   Префикс: .galleryyachts-features
   ============================================ */

.galleryyachts-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 60px;
}

.galleryyachts-features__item {
    text-align: center;
}

.galleryyachts-features__icon {
    font-size: 48px;
    margin-bottom: 20px;
}

.galleryyachts-features__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 24px;
    color: #fff;
    margin-bottom: 10px;
}

.galleryyachts-features__description {
    font-size: 14px;
    color: #949CA4;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .galleryyachts-features {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}


/* ============================================
   КОМПОНЕНТ: CTA (Призыв к действию)
   Префикс: .galleryyachts-cta
   ============================================ */

.galleryyachts-cta {
    background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%);
    padding: 100px 40px;
    text-align: center;
}

.galleryyachts-cta__container {
    max-width: 800px;
    margin: 0 auto;
}

.galleryyachts-cta__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 48px;
    color: #fff;
    margin-bottom: 20px;
}

.galleryyachts-cta__text {
    font-size: 18px;
    color: #949CA4;
    margin-bottom: 40px;
}

.galleryyachts-cta__actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .galleryyachts-cta {
        padding: 60px 20px;
    }
    
    .galleryyachts-cta__title {
        font-size: 32px;
    }
    
    .galleryyachts-cta__text {
        font-size: 16px;
    }
}


/* ============================================
   ДОПОЛНИТЕЛЬНЫЕ МОДИФИКАТОРЫ
   ============================================ */

.galleryyachts-section--light {
    background-color: #F5F5F5;
}

-->
