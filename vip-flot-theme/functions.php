<?php
/**
 * VIP FLOT Theme Functions
 * 
 * @package VIP_FLOT
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Подключение CORS обработчика
 */
require_once get_template_directory() . '/vip-flot-cors.php';

/**
 * Подключение AJAX обработчика
 */
require_once get_template_directory() . '/vip-flot-ajax.php';

/**
 * Подключение стилей и скриптов темы
 */
function vip_flot_enqueue_styles() {
    // Подключаем основной файл style.css
    wp_enqueue_style(
        'vip-flot-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'vip_flot_enqueue_styles');

/**
 * Настройка темы
 */
function vip_flot_theme_setup() {
    // Добавление поддержки заголовка документа
    add_theme_support('title-tag');
    
    // Добавление поддержки миниатюр записей
    add_theme_support('post-thumbnails');
    
    // Добавление поддержки HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Регистрация меню навигации
    register_nav_menus(array(
        'primary' => __('Основное меню', 'vip-flot'),
    ));
}
add_action('after_setup_theme', 'vip_flot_theme_setup');

/**
 * Установка ширины контента
 */
if (!isset($content_width)) {
    $content_width = 1200;
}

/**
 * Регистрация Custom Post Type для заявок на бронирование
 */
function vip_flot_register_booking_post_type() {
    $labels = array(
        'name'               => 'Заявки',
        'singular_name'      => 'Заявка',
        'menu_name'          => 'Заявки',
        'add_new'            => 'Добавить заявку',
        'add_new_item'       => 'Добавить новую заявку',
        'edit_item'          => 'Редактировать заявку',
        'new_item'           => 'Новая заявка',
        'view_item'          => 'Просмотреть заявку',
        'search_items'       => 'Искать заявки',
        'not_found'          => 'Заявки не найдены',
        'not_found_in_trash' => 'В корзине заявок не найдено',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_icon'           => 'dashicons-clipboard',
        'capability_type'     => 'post',
        'hierarchical'        => false,
        'supports'            => array('title', 'custom-fields'),
        'show_in_rest'        => true,
        'menu_position'       => 5,
    );

    register_post_type('vip_flot_booking', $args);
}
add_action('init', 'vip_flot_register_booking_post_type');

/**
 * REST API endpoint для создания заявки
 */
function vip_flot_register_booking_api() {
    register_rest_route('vip-flot/v1', '/booking', array(
        'methods'  => 'POST',
        'callback' => 'vip_flot_create_booking',
        'permission_callback' => '__return_true', // Публичный endpoint
    ));
}
add_action('rest_api_init', 'vip_flot_register_booking_api');

/**
 * Обработчик создания заявки
 */
function vip_flot_create_booking($request) {
    $params = $request->get_json_params();
    
    // Валидация данных
    if (empty($params['name']) || empty($params['phone'])) {
        return new WP_Error(
            'missing_fields',
            'Имя и телефон обязательны',
            array('status' => 400)
        );
    }
    
    // Санитизация данных
    $name = sanitize_text_field($params['name']);
    $phone = sanitize_text_field($params['phone']);
    $date = !empty($params['date']) ? sanitize_text_field($params['date']) : '';
    $consent = !empty($params['consent']) ? true : false;
    
    if (!$consent) {
        return new WP_Error(
            'no_consent',
            'Необходимо согласие на обработку данных',
            array('status' => 400)
        );
    }
    
    // Создание заявки
    $post_id = wp_insert_post(array(
        'post_type'   => 'vip_flot_booking',
        'post_title'  => sprintf('Заявка от %s - %s', $name, date('d.m.Y H:i')),
        'post_status' => 'publish',
        'meta_input'  => array(
            'booking_name'    => $name,
            'booking_phone'   => $phone,
            'booking_date'    => $date,
            'booking_consent' => $consent,
            'booking_ip'      => $_SERVER['REMOTE_ADDR'],
            'booking_created' => current_time('mysql'),
        ),
    ));
    
    if (is_wp_error($post_id)) {
        return new WP_Error(
            'create_failed',
            'Не удалось создать заявку',
            array('status' => 500)
        );
    }
    
    // Отправка email уведомления администратору (опционально)
    $admin_email = get_option('admin_email');
    $subject = 'Новая заявка на бронирование - VIP Flot';
    $message = sprintf(
        "Новая заявка на бронирование:\n\nИмя: %s\nТелефон: %s\nДата: %s\n\nПросмотреть: %s",
        $name,
        $phone,
        $date ? $date : 'Не указана',
        admin_url('post.php?post=' . $post_id . '&action=edit')
    );
    
    wp_mail($admin_email, $subject, $message);
    
    return array(
        'success' => true,
        'message' => 'Заявка успешно отправлена',
        'booking_id' => $post_id,
    );
}

/**
 * Добавление колонок в админ-панель заявок
 */
function vip_flot_booking_columns($columns) {
    $new_columns = array(
        'cb'            => $columns['cb'],
        'title'         => 'Заявка',
        'booking_name'  => 'Имя',
        'booking_phone' => 'Телефон',
        'booking_date'  => 'Дата прогулки',
        'date'          => 'Создана',
    );
    return $new_columns;
}
add_filter('manage_vip_flot_booking_posts_columns', 'vip_flot_booking_columns');

/**
 * Заполнение колонок данными
 */
function vip_flot_booking_column_content($column, $post_id) {
    switch ($column) {
        case 'booking_name':
            echo esc_html(get_post_meta($post_id, 'booking_name', true));
            break;
        case 'booking_phone':
            $phone = get_post_meta($post_id, 'booking_phone', true);
            echo '<a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a>';
            break;
        case 'booking_date':
            $date = get_post_meta($post_id, 'booking_date', true);
            echo $date ? esc_html($date) : '—';
            break;
    }
}
add_action('manage_vip_flot_booking_posts_custom_column', 'vip_flot_booking_column_content', 10, 2);

/**
 * Сортировка колонок
 */
function vip_flot_booking_sortable_columns($columns) {
    $columns['booking_name'] = 'booking_name';
    $columns['booking_date'] = 'booking_date';
    return $columns;
}
add_filter('manage_edit-vip_flot_booking_sortable_columns', 'vip_flot_booking_sortable_columns');

/**
 * Meta Box для отображения информации о заявке
 */
function vip_flot_booking_meta_box() {
    add_meta_box(
        'vip_flot_booking_details',
        'Детали заявки',
        'vip_flot_booking_meta_box_callback',
        'vip_flot_booking',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'vip_flot_booking_meta_box');

/**
 * Вывод данных в Meta Box
 */
function vip_flot_booking_meta_box_callback($post) {
    $name = get_post_meta($post->ID, 'booking_name', true);
    $phone = get_post_meta($post->ID, 'booking_phone', true);
    $date = get_post_meta($post->ID, 'booking_date', true);
    $ip = get_post_meta($post->ID, 'booking_ip', true);
    $created = get_post_meta($post->ID, 'booking_created', true);
    
    ?>
    <table class="form-table">
        <tr>
            <th><label>Имя клиента:</label></th>
            <td><strong><?php echo esc_html($name); ?></strong></td>
        </tr>
        <tr>
            <th><label>Телефон:</label></th>
            <td><a href="tel:<?php echo esc_attr($phone); ?>"><?php echo esc_html($phone); ?></a></td>
        </tr>
        <tr>
            <th><label>Желаемая дата:</label></th>
            <td><?php echo $date ? esc_html($date) : '—'; ?></td>
        </tr>
        <tr>
            <th><label>IP адрес:</label></th>
            <td><?php echo esc_html($ip); ?></td>
        </tr>
        <tr>
            <th><label>Дата создания:</label></th>
            <td><?php echo esc_html($created); ?></td>
        </tr>
    </table>
    <?php
}
