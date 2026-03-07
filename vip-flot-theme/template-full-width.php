<?php
/**
 * Template Name: Полная ширина с компонентами
 * Description: Пример страницы с использованием компонентов темы VIP FLOT
 * 
 * @package VIP_FLOT
 */

get_header(); ?>

<!-- Секция Hero -->
<section class="vipflot-hero">
    <div class="vipflot-hero__container">
        <h1 class="vipflot-hero__title">
            <?php the_title(); ?>
        </h1>
        <p class="vipflot-hero__subtitle">
            Добро пожаловать в VIP FLOT - аренда яхт и катеров премиум-класса
        </p>
        <div class="vipflot-hero__actions">
            <a href="#fleet" class="vipflot-btn vipflot-btn--primary vipflot-btn--large">
                Наш флот
            </a>
            <a href="#contact" class="vipflot-btn vipflot-btn--secondary vipflot-btn--large">
                Связаться с нами
            </a>
        </div>
    </div>
</section>

<!-- Секция с основным контентом -->
<main class="vipflot-layout__main">
    <div class="vipflot-layout__container">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="vipflot-page__content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<!-- Секция с карточками (пример) -->
<section class="vipflot-section vipflot-section--light" id="fleet">
    <div class="vipflot-section__container">
        <h2 class="vipflot-section__title">Наш флот</h2>
        
        <div class="vipflot-grid vipflot-grid--3-cols">
            <!-- Карточка 1 -->
            <div class="vipflot-card">
                <div class="vipflot-card__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/yacht-1.jpg" alt="Яхта 1">
                </div>
                <div class="vipflot-card__content">
                    <h3 class="vipflot-card__title">Морская принцесса</h3>
                    <p class="vipflot-card__description">Роскошная яхта премиум-класса для незабываемого отдыха</p>
                    <a href="#" class="vipflot-card__link">Подробнее →</a>
                </div>
            </div>
            
            <!-- Карточка 2 -->
            <div class="vipflot-card">
                <div class="vipflot-card__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/yacht-2.jpg" alt="Яхта 2">
                </div>
                <div class="vipflot-card__content">
                    <h3 class="vipflot-card__title">Океанская звезда</h3>
                    <p class="vipflot-card__description">Современный катер для морских приключений</p>
                    <a href="#" class="vipflot-card__link">Подробнее →</a>
                </div>
            </div>
            
            <!-- Карточка 3 -->
            <div class="vipflot-card">
                <div class="vipflot-card__image">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/yacht-3.jpg" alt="Яхта 3">
                </div>
                <div class="vipflot-card__content">
                    <h3 class="vipflot-card__title">Белый лебедь</h3>
                    <p class="vipflot-card__description">Элегантная яхта для особых мероприятий</p>
                    <a href="#" class="vipflot-card__link">Подробнее →</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Темная секция -->
<section class="vipflot-section vipflot-section--dark">
    <div class="vipflot-section__container">
        <h2 class="vipflot-section__title">Почему выбирают нас</h2>
        
        <div class="vipflot-features">
            <div class="vipflot-features__item">
                <div class="vipflot-features__icon">
                    <!-- Иконка или изображение -->
                    <span>⚓</span>
                </div>
                <h3 class="vipflot-features__title">Премиум качество</h3>
                <p class="vipflot-features__description">Только проверенные яхты и катеры в отличном состоянии</p>
            </div>
            
            <div class="vipflot-features__item">
                <div class="vipflot-features__icon">
                    <span>👨‍✈️</span>
                </div>
                <h3 class="vipflot-features__title">Опытный экипаж</h3>
                <p class="vipflot-features__description">Профессиональные капитаны с многолетним стажем</p>
            </div>
            
            <div class="vipflot-features__item">
                <div class="vipflot-features__icon">
                    <span>🌟</span>
                </div>
                <h3 class="vipflot-features__title">VIP сервис</h3>
                <p class="vipflot-features__description">Индивидуальный подход к каждому клиенту</p>
            </div>
        </div>
    </div>
</section>

<!-- Секция с призывом к действию -->
<section class="vipflot-cta" id="contact">
    <div class="vipflot-cta__container">
        <h2 class="vipflot-cta__title">Готовы отправиться в плавание?</h2>
        <p class="vipflot-cta__text">Свяжитесь с нами прямо сейчас и забронируйте яхту своей мечты</p>
        <div class="vipflot-cta__actions">
            <a href="tel:+78126605516" class="vipflot-btn vipflot-btn--primary vipflot-btn--large">
                Позвонить: +7 (812) 660-55-16
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>


<!-- 
    СТИЛИ ДЛЯ ЭТОЙ СТРАНИЦЫ (добавить в style.css):

/* ============================================
   КОМПОНЕНТ: HERO (Главный баннер)
   Префикс: .vipflot-hero
   ============================================ */

.vipflot-hero {
    background: linear-gradient(135deg, #1A1A1A 0%, #333 100%);
    padding: 120px 40px;
    text-align: center;
    color: #fff;
}

.vipflot-hero__container {
    max-width: 900px;
    margin: 0 auto;
}

.vipflot-hero__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 64px;
    letter-spacing: 3px;
    margin-bottom: 20px;
}

.vipflot-hero__subtitle {
    font-size: 18px;
    color: #949CA4;
    margin-bottom: 40px;
    line-height: 1.6;
}

.vipflot-hero__actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .vipflot-hero {
        padding: 80px 20px;
    }
    
    .vipflot-hero__title {
        font-size: 36px;
    }
    
    .vipflot-hero__actions {
        flex-direction: column;
    }
}


/* ============================================
   КОМПОНЕНТ: FEATURES (Преимущества)
   Префикс: .vipflot-features
   ============================================ */

.vipflot-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 60px;
}

.vipflot-features__item {
    text-align: center;
}

.vipflot-features__icon {
    font-size: 48px;
    margin-bottom: 20px;
}

.vipflot-features__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 24px;
    color: #fff;
    margin-bottom: 10px;
}

.vipflot-features__description {
    font-size: 14px;
    color: #949CA4;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .vipflot-features {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}


/* ============================================
   КОМПОНЕНТ: CTA (Призыв к действию)
   Префикс: .vipflot-cta
   ============================================ */

.vipflot-cta {
    background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%);
    padding: 100px 40px;
    text-align: center;
}

.vipflot-cta__container {
    max-width: 800px;
    margin: 0 auto;
}

.vipflot-cta__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 48px;
    color: #fff;
    margin-bottom: 20px;
}

.vipflot-cta__text {
    font-size: 18px;
    color: #949CA4;
    margin-bottom: 40px;
}

.vipflot-cta__actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .vipflot-cta {
        padding: 60px 20px;
    }
    
    .vipflot-cta__title {
        font-size: 32px;
    }
    
    .vipflot-cta__text {
        font-size: 16px;
    }
}


/* ============================================
   ДОПОЛНИТЕЛЬНЫЕ МОДИФИКАТОРЫ
   ============================================ */

.vipflot-section--light {
    background-color: #F5F5F5;
}

-->
