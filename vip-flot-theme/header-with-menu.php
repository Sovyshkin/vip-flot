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

    <?php
    /**
     * Вариант с WordPress меню
     * Для использования этой версии:
     * 1. Переименуйте этот файл в header.php (сохранив старый header.php как резервную копию)
     * 2. Создайте меню в админ-панели WordPress (Внешний вид → Меню)
     * 3. Добавьте пункты меню
     * 4. Назначьте меню к позиции "Основное меню"
     */
    if (has_nav_menu('primary')) :
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_class'     => 'vipflot-header__nav',
            'container'      => 'nav',
            'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
            'link_before'    => '<span class="vipflot-header__nav-item">',
            'link_after'     => '</span>',
        ));
    else :
        // Резервный вариант - статичное меню
        ?>
        <nav class="vipflot-header__nav">
            <li class="vipflot-header__nav-item"><a href="#">Наш флот</a></li>
            <li class="vipflot-header__nav-item"><a href="#">Яхт-туры</a></li>
            <li class="vipflot-header__nav-item"><a href="#">Маршруты</a></li>
            <li class="vipflot-header__nav-item"><a href="#">Мероприятия</a></li>
            <li class="vipflot-header__nav-item"><a href="#">Услуги</a></li>
        </nav>
    <?php endif; ?>

    <div class="vipflot-header__contacts">
        <span class="vipflot-header__contacts-phone">+7 (812) 660-55-16</span>
        <span class="vipflot-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>
</header>
