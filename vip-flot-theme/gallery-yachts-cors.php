<?php
/**
 * Plugin Name: Галерея яхт CORS Handler
 * Description: Добавляет CORS заголовки для REST API
 * Version: 1.0
 */

// Добавление CORS заголовков для всех запросов
add_action('init', function() {
    $allowed_origins = array(
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:3000',
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    // Обработка OPTIONS запросов
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}, 1);

// Дополнительная обработка для REST API
add_filter('rest_pre_serve_request', function($served, $result, $request, $server) {
    $allowed_origins = array(
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:3000',
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
    }
    
    return $served;
}, 15, 4);

// Удаление стандартных CORS заголовков WP, которые могут конфликтовать
remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
add_filter('rest_pre_serve_request', function($value) {
    $allowed_origins = array(
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:3000',
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (!in_array($origin, $allowed_origins)) {
        return $value;
    }
    
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-WP-Nonce');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    
    return $value;
}, 15);
