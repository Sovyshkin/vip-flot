<?php
/**
 * VIP FLOT AJAX Handler
 * Обработчик AJAX запросов для форм бронирования
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Обработчик AJAX для создания заявки (для неавторизованных пользователей)
 */
function vip_flot_ajax_create_booking() {
    // CORS заголовки
    $allowed_origins = array(
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:3000',
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Credentials: true');
    }
    
    // Обработка preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    // Получение данных из POST
    $name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $date = isset($_POST['date']) ? sanitize_text_field($_POST['date']) : '';
    $consent = isset($_POST['consent']) && $_POST['consent'] === 'true';
    
    // Валидация
    if (empty($name) || empty($phone)) {
        wp_send_json_error(array(
            'message' => 'Имя и телефон обязательны'
        ), 400);
    }
    
    if (!$consent) {
        wp_send_json_error(array(
            'message' => 'Необходимо согласие на обработку данных'
        ), 400);
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
        wp_send_json_error(array(
            'message' => 'Не удалось создать заявку'
        ), 500);
    }
    
    // Отправка email
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
    
    // Успешный ответ
    wp_send_json_success(array(
        'message' => 'Заявка успешно отправлена',
        'booking_id' => $post_id
    ));
}

// Регистрация AJAX действий
// wp_ajax_nopriv_ для неавторизованных пользователей
add_action('wp_ajax_nopriv_vip_flot_booking', 'vip_flot_ajax_create_booking');
// wp_ajax_ для авторизованных пользователей
add_action('wp_ajax_vip_flot_booking', 'vip_flot_ajax_create_booking');
