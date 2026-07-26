# 🚀 Быстрый старт - Галерея яхт Theme

## ⚡ Установка за 5 минут

### Шаг 1: Установка темы
```bash
# 1. Скопируйте папку gallery-yachts-theme в wp-content/themes/
cp -r gallery-yachts-theme /path/to/wordpress/wp-content/themes/

# 2. Откройте WordPress админ-панель
# 3. Перейдите: Внешний вид → Темы
# 4. Активируйте "Галерея яхт Theme"
```

### Шаг 2: Проверка
Откройте ваш сайт — вы должны увидеть:
- ✅ Шапку с логотипом "Галерея яхт"
- ✅ Навигационное меню
- ✅ Контактный телефон в правом верхнем углу

---

## 📝 Начало работы

### Создание новой страницы

1. **Админ-панель → Страницы → Добавить новую**
2. Введите заголовок страницы
3. Добавьте контент
4. **Опционально**: В правой панели "Атрибуты страницы" → "Шаблон" выберите "Полная ширина с компонентами"
5. Нажмите "Опубликовать"

### Изменение контактных данных

Отредактируйте `header.php` (строки 24-25):
```php
<span class="galleryyachts-header__contacts-phone">+7 (YOUR) PHONE-NUMBER</span>
<span class="galleryyachts-header__contacts-schedule">Ваш график работы</span>
```

### Настройка меню (опционально)

1. **Внешний вид → Меню**
2. Создайте новое меню "Главное меню"
3. Добавьте пункты меню
4. Назначьте меню к позиции "Основное меню"
5. Переименуйте `header-with-menu.php` → `header.php` (сохраните оригинал как backup)

---

## 🎨 Добавление нового компонента

### Пример: Создание секции "Услуги"

**1. Откройте `style.css` и добавьте в конец:**

```css
/* ============================================
   КОМПОНЕНТ: SERVICES (Услуги)
   Префикс: .galleryyachts-services
   ============================================ */

.galleryyachts-services {
    padding: 80px 40px;
    background: #F5F5F5;
}

.galleryyachts-services__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 48px;
    text-align: center;
    margin-bottom: 60px;
}

.galleryyachts-services__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.galleryyachts-services__item {
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
}

.galleryyachts-services__item-title {
    font-size: 24px;
    margin-bottom: 15px;
    color: #1A1A1A;
}

.galleryyachts-services__item-text {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
}
```

**2. Создайте файл `template-services.php`:**

```php
<?php
/* Template Name: Услуги */
get_header(); ?>

<section class="galleryyachts-services">
    <h2 class="galleryyachts-services__title">Наши услуги</h2>
    
    <div class="galleryyachts-services__grid">
        <div class="galleryyachts-services__item">
            <h3 class="galleryyachts-services__item-title">Аренда яхт</h3>
            <p class="galleryyachts-services__item-text">Современные яхты для любого мероприятия</p>
        </div>
        
        <div class="galleryyachts-services__item">
            <h3 class="galleryyachts-services__item-title">Круизы</h3>
            <p class="galleryyachts-services__item-text">Незабываемые морские путешествия</p>
        </div>
        
        <div class="galleryyachts-services__item">
            <h3 class="galleryyachts-services__item-title">Мероприятия</h3>
            <p class="galleryyachts-services__item-text">Организация праздников на воде</p>
        </div>
    </div>
</section>

<?php get_footer(); ?>
```

**3. Создайте новую страницу в WordPress:**
- Заголовок: "Услуги"
- Шаблон: "Услуги"
- Опубликовать

**Готово!** ✨

---

## 🔧 Часто используемые компоненты

### Кнопка
```html
<a href="#" class="galleryyachts-btn galleryyachts-btn--primary">Кнопка</a>
<a href="#" class="galleryyachts-btn galleryyachts-btn--secondary">Кнопка</a>
<a href="#" class="galleryyachts-btn galleryyachts-btn--primary galleryyachts-btn--large">Большая</a>
```

### Секция
```html
<section class="galleryyachts-section">
    <div class="galleryyachts-section__container">
        <h2 class="galleryyachts-section__title">Заголовок</h2>
        <div class="galleryyachts-section__content">
            <!-- Контент -->
        </div>
    </div>
</section>
```

### Сетка
```html
<div class="galleryyachts-grid galleryyachts-grid--3-cols">
    <div class="galleryyachts-grid__item">Элемент 1</div>
    <div class="galleryyachts-grid__item">Элемент 2</div>
    <div class="galleryyachts-grid__item">Элемент 3</div>
</div>
```

---

## 📚 Полезные файлы

| Файл | Описание |
|------|----------|
| [README.md](README.md) | Полная документация темы |
| [CSS-NAMING-GUIDE.md](CSS-NAMING-GUIDE.md) | ⭐ Правила именования классов |
| [COMPONENT-TEMPLATES.php](COMPONENT-TEMPLATES.php) | Готовые шаблоны компонентов |
| [template-full-width.php](template-full-width.php) | Пример полноценной страницы |

---

## 🎯 Золотые правила

### ✅ Всегда:
1. Используйте префикс `.galleryyachts-` для всех классов
2. Следуйте структуре: `.galleryyachts-[компонент]__[элемент]--[модификатор]`
3. Добавляйте комментарии для новых секций CSS
4. Тестируйте на мобильных устройствах
5. Читайте [CSS-NAMING-GUIDE.md](CSS-NAMING-GUIDE.md) перед созданием компонентов

### ❌ Никогда:
1. Не используйте глобальные классы без префикса (`.card`, `.button`)
2. Не создавайте слишком глубокую вложенность селекторов
3. Не используйте ID для стилизации
4. Не смешивайте стили разных компонентов

---

## 🐛 Решение проблем

### Стили не применяются
```bash
# 1. Очистите кеш WordPress
# 2. Проверьте, что тема активна
# 3. Откройте инспектор браузера (F12) → вкладка Network
# 4. Обновите страницу и убедитесь, что style.css загружается
```

### Конфликт с плагином
```css
/* Увеличьте специфичность в style.css */
.galleryyachts-header.galleryyachts-header {
    /* Ваши стили */
}
```

### Мобильная версия не работает
```css
/* Проверьте медиа-запросы в конце style.css */
@media (max-width: 768px) {
    .galleryyachts-YOUR-component {
        /* Адаптивные стили */
    }
}
```

---

## 📞 Поддержка

Если что-то не работает:
1. ✅ Проверьте [CSS-NAMING-GUIDE.md](CSS-NAMING-GUIDE.md)
2. ✅ Посмотрите примеры в [COMPONENT-TEMPLATES.php](COMPONENT-TEMPLATES.php)
3. ✅ Изучите полный пример в [template-full-width.php](template-full-width.php)
4. ✅ Проверьте консоль браузера на ошибки (F12)

---

## 🎉 Готово!

Теперь вы можете:
- ✅ Создавать новые страницы
- ✅ Добавлять компоненты
- ✅ Кастомизировать дизайн
- ✅ Расширять функциональность

**Приятной работы с Галерея яхт Theme!** 🚢
