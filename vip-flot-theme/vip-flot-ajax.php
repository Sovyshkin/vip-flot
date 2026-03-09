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
    $consent = isset($_POST['consent']) && ($_POST['consent'] === 'true' || $_POST['consent'] === true || $_POST['consent'] === '1');
    $comment = isset($_POST['comment']) ? sanitize_textarea_field($_POST['comment']) : '';
    $guests = isset($_POST['guests']) ? intval($_POST['guests']) : 0;
    $boat_id = isset($_POST['boat_id']) ? sanitize_text_field($_POST['boat_id']) : '';
    $boat_name = isset($_POST['boat_name']) ? sanitize_text_field($_POST['boat_name']) : '';
    $service_id = isset($_POST['service_id']) ? sanitize_text_field($_POST['service_id']) : '';
    $service_name = isset($_POST['service_name']) ? sanitize_text_field($_POST['service_name']) : '';
    $activity_id = isset($_POST['activity_id']) ? sanitize_text_field($_POST['activity_id']) : '';
    $activity_name = isset($_POST['activity_name']) ? sanitize_text_field($_POST['activity_name']) : '';
    
    // Валидация
    if (empty($name) || empty($phone)) {
        wp_send_json_error(array(
            'message' => 'Имя и телефон обязательны'
        ), 400);
    }
    
    // Формирование заголовка заявки
    $title_parts = array('Заявка от ' . $name);
    if (!empty($boat_name)) {
        $title_parts[] = 'Катер: ' . $boat_name;
    }
    if (!empty($service_name)) {
        $title_parts[] = 'Услуга: ' . $service_name;
    }
    if (!empty($activity_name)) {
        $title_parts[] = 'Мероприятие: ' . $activity_name;
    }
    $title_parts[] = date('d.m.Y H:i');
    $post_title = implode(' - ', $title_parts);
    
    // Подготовка meta данных
    $meta_input = array(
        'booking_name'    => $name,
        'booking_phone'   => $phone,
        'booking_date'    => $date,
        'booking_consent' => $consent,
        'booking_ip'      => $_SERVER['REMOTE_ADDR'],
        'booking_created' => current_time('mysql'),
    );
    
    if (!empty($comment)) {
        $meta_input['booking_comment'] = $comment;
    }
    if ($guests > 0) {
        $meta_input['booking_guests'] = $guests;
    }
    if (!empty($boat_id)) {
        $meta_input['booking_boat_id'] = $boat_id;
    }
    if (!empty($boat_name)) {
        $meta_input['booking_boat_name'] = $boat_name;
    }
    if (!empty($service_id)) {
        $meta_input['booking_service_id'] = $service_id;
    }
    if (!empty($service_name)) {
        $meta_input['booking_service_name'] = $service_name;
    }
    if (!empty($activity_id)) {
        $meta_input['booking_activity_id'] = $activity_id;
    }
    if (!empty($activity_name)) {
        $meta_input['booking_activity_name'] = $activity_name;
    }
    
    // Создание заявки
    $post_id = wp_insert_post(array(
        'post_type'   => 'vip_flot_booking',
        'post_title'  => $post_title,
        'post_status' => 'publish',
        'meta_input'  => $meta_input,
    ));
    
    if (is_wp_error($post_id)) {
        wp_send_json_error(array(
            'message' => 'Не удалось создать заявку'
        ), 500);
    }
    
    // Отправка email
    $admin_email = get_option('admin_email');
    $subject = 'Новая заявка на бронирование - VIP Flot';
    
    // Формирование тела письма
    $email_body = "Новая заявка на бронирование:\n\n";
    $email_body .= "Имя: " . $name . "\n";
    $email_body .= "Телефон: " . $phone . "\n";
    
    if (!empty($date)) {
        $email_body .= "Дата: " . $date . "\n";
    }
    
    if (!empty($boat_name)) {
        $email_body .= "Катер: " . $boat_name . "\n";
    }
    
    if (!empty($service_name)) {
        $email_body .= "Услуга: " . $service_name . "\n";
    }
    
    if (!empty($activity_name)) {
        $email_body .= "Мероприятие: " . $activity_name . "\n";
    }
    
    if ($guests > 0) {
        $email_body .= "Количество гостей: " . $guests . "\n";
    }
    
    if (!empty($comment)) {
        $email_body .= "Комментарий: " . $comment . "\n";
    }
    
    $email_body .= "\nПросмотреть: " . admin_url('post.php?post=' . $post_id . '&action=edit');
    
    $message = $email_body;
    
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
