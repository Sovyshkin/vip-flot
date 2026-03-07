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

<header class="vipflot-header">
    <div class="vipflot-header__logo">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="vipflot-header__logo-link">
            <span class="vipflot-header__logo-text">VIP FLOT</span>
            <span class="vipflot-header__logo-subtitle">Аренда яхт и катеров</span>
        </a>
    </div>

    <nav class="vipflot-header__nav">
        <li class="vipflot-header__nav-item">Наш флот</li>
        <li class="vipflot-header__nav-item">Яхт-туры</li>
        <li class="vipflot-header__nav-item">Маршруты</li>
        <li class="vipflot-header__nav-item">Мероприятия</li>
        <li class="vipflot-header__nav-item">Услуги</li>
    </nav>

    <div class="vipflot-header__contacts">
        <span class="vipflot-header__contacts-phone">+7 (812) 660-55-16</span>
        <span class="vipflot-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>
</header>
