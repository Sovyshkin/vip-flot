<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="galleryyachts-header">
    <div class="galleryyachts-header__logo">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="galleryyachts-header__logo-link">
            <span class="galleryyachts-header__logo-text">Галерея яхт</span>
            <span class="galleryyachts-header__logo-subtitle">Аренда яхт и катеров</span>
        </a>
    </div>

    <nav class="galleryyachts-header__nav">
        <li class="galleryyachts-header__nav-item">Наш флот</li>
        <li class="galleryyachts-header__nav-item">Яхт-туры</li>
        <li class="galleryyachts-header__nav-item">Маршруты</li>
        <li class="galleryyachts-header__nav-item">Мероприятия</li>
        <li class="galleryyachts-header__nav-item">Услуги</li>
    </nav>

    <div class="galleryyachts-header__contacts">
        <span class="galleryyachts-header__contacts-phone">+7 000 000 0000</span>
        <span class="galleryyachts-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>
</header>
