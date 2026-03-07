# Тестирование AJAX интеграции

## Что изменилось

Переключились с REST API на **admin-ajax.php** — стандартный и надежный метод WordPress для обработки AJAX запросов. Это решает все проблемы с permalinks и mod_rewrite.

## Шаги для проверки

### 1. Перезагрузите WordPress тему

В админке WordPress:
```
Внешний вид → Темы → 
  Деактивировать "VIP FLOT" (выберите любую другую тему)
  Активировать "VIP FLOT" снова
```

### 2. Перезапустите Vue dev-сервер

```bash
# В терминале где запущен npm run serve - нажмите Ctrl+C
# Затем:
cd /Users/vadim/Desktop/vip-flot/app
npm run serve
```

### 3. Проверьте endpoint в браузере

Откройте:
```
http://localhost/vip-flot/wp-admin/admin-ajax.php?action=vip_flot_booking
```

Должен вернуться JSON с ошибкой (это нормально, т.к. нет POST данных):
```json
{"success":false,"data":{"message":"Имя и телефон обязательны"}}
```

Если видите это — значит endpoint работает!

### 4. Тест через curl

```bash
curl -X POST 'http://localhost/vip-flot/wp-admin/admin-ajax.php' \
  -H 'Origin: http://localhost:8080' \
  -d 'action=vip_flot_booking' \
  -d 'name=Тестовый пользователь' \
  -d 'phone=+7 (999) 123-45-67' \
  -d 'date=2026-06-15' \
  -d 'consent=true'
```

Ожидаемый ответ:
```json
{"success":true,"data":{"message":"Заявка успешно отправлена","booking_id":123}}
```

### 5. Проверьте форму на сайте

1. Откройте `http://localhost:8080`
2. Прокрутите до формы бронирования
3. Заполните:
   - Имя: Тест
   - Телефон: +7 (999) 111-22-33
   - Дата: любая
   - ✓ Согласие
4. Нажмите "Забронировать"

**Ожидаемый результат:**
- Появится зеленое сообщение "Заявка успешно отправлена!"
- Форма очистится
- В DevTools → Network вы увидите успешный POST запрос к admin-ajax.php

### 6. Проверьте заявку в WordPress

```
Админка → Заявки
```

Должна появиться новая заявка с данными из формы.

## Что было исправлено

### Файлы WordPress темы:

1. **`vip-flot-ajax.php`** (создан)
   - AJAX обработчик для создания заявок
   - CORS заголовки для localhost:8080
   - Обработка OPTIONS запросов
   - Валидация и санитизация данных
   - Сохранение в БД WordPress
   - Email уведомления

2. **`functions.php`** (обновлен)
   - Добавлено подключение vip-flot-ajax.php

### Файлы Vue:

1. **`.env`** (обновлен)
   ```
   VUE_APP_API_URL=http://localhost/vip-flot/wp-admin/admin-ajax.php
   ```

2. **`RequestBook.vue`** (обновлен)
   - Используется FormData вместо JSON
   - Добавлен параметр `action=vip_flot_booking`
   - Обновлена обработка ответа WordPress AJAX

## Преимущества admin-ajax.php

- ✅ Не требует настройки permalinks
- ✅ Работает на любом хостинге
- ✅ Не зависит от mod_rewrite
- ✅ Стандартный метод WordPress
- ✅ Гарантированная совместимость

## Если всё равно не работает

1. **Проверьте консоль PHP**
   - Поищите файл error.log в папке WordPress
   - Или включите debug: в wp-config.php добавьте:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```

2. **Проверьте Network tab**
   - Откройте DevTools → Network
   - Отправьте форму
   - Кликните на запрос admin-ajax.php
   - Посмотрите Response

3. **Проверьте файлы созданы**
   ```
   vip-flot-theme/vip-flot-ajax.php - должен существовать
   vip-flot-theme/vip-flot-cors.php - должен существовать
   ```

## Готово к продакшену

Для продакшена просто:
1. Обновите `.env` с реальным URL:
   ```
   VUE_APP_API_URL=https://yourdomain.com/wp-admin/admin-ajax.php
   ```
2. В `vip-flot-ajax.php` добавьте домен фронта в `$allowed_origins`
3. Соберите Vue: `npm run build`
4. Деплойте
