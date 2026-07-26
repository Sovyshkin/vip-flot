# 🎨 Руководство по CSS и именованию классов

## 📋 Соглашения об именовании

### Общая концепция

Все классы компонентов используют **префикс `.galleryyachts-`** для предотвращения конфликтов с:
- WordPress плагинами
- Другими темами
- Сторонними библиотеками
- Глобальными стилями

### Структура именования (BEM-подобная)

```
.galleryyachts-[компонент]__[элемент]--[модификатор]
```

#### Примеры:

**Базовый класс компонента:**
```css
.galleryyachts-header { }
```

**Элемент внутри компонента:**
```css
.galleryyachts-header__logo { }
.galleryyachts-header__nav { }
.galleryyachts-header__contacts { }
```

**Вложенный элемент:**
```css
.galleryyachts-header__logo-text { }
.galleryyachts-header__nav-item { }
.galleryyachts-header__contacts-phone { }
```

**Модификатор (состояние или вариант):**
```css
.galleryyachts-button--primary { }
.galleryyachts-button--disabled { }
.galleryyachts-header--sticky { }
```

---

## 🏗️ Структура компонентов

### Компонент Header (Шапка)

```html
<header class="galleryyachts-header">
    <div class="galleryyachts-header__logo">
        <a class="galleryyachts-header__logo-link">
            <span class="galleryyachts-header__logo-text">Галерея яхт</span>
            <span class="galleryyachts-header__logo-subtitle">Аренда яхт и катеров</span>
        </a>
    </div>
    
    <nav class="galleryyachts-header__nav">
        <li class="galleryyachts-header__nav-item">Пункт меню</li>
    </nav>
    
    <div class="galleryyachts-header__contacts">
        <span class="galleryyachts-header__contacts-phone">+7 000 000 0000</span>
        <span class="galleryyachts-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>
</header>
```

### Компонент Layout (Структура)

```html
<main class="galleryyachts-layout__main">
    <div class="galleryyachts-layout__container">
        <!-- Контент -->
    </div>
</main>
```

### Компонент Page (Страница)

```html
<article>
    <h1 class="galleryyachts-page__title">Заголовок</h1>
    <div class="galleryyachts-page__content">
        <!-- Контент страницы -->
    </div>
</article>
```

---

## ✍️ Правила добавления новых компонентов

### 1. Создание нового компонента

**Шаг 1:** Определите имя компонента (например, `card`, `button`, `form`)

**Шаг 2:** Добавьте секцию в `style.css`:

```css
/* ============================================
   КОМПОНЕНТ: CARD (Карточка)
   Префикс: .galleryyachts-card
   ============================================ */

.galleryyachts-card {
    /* Основные стили компонента */
}

.galleryyachts-card__header {
    /* Шапка карточки */
}

.galleryyachts-card__body {
    /* Тело карточки */
}

.galleryyachts-card__footer {
    /* Подвал карточки */
}

.galleryyachts-card--featured {
    /* Модификатор для выделенной карточки */
}
```

**Шаг 3:** Используйте в HTML/PHP:

```php
<div class="galleryyachts-card">
    <div class="galleryyachts-card__header">
        <h3 class="galleryyachts-card__title">Заголовок</h3>
    </div>
    <div class="galleryyachts-card__body">
        <p>Контент карточки</p>
    </div>
</div>
```

### 2. Пример: Кнопки

```css
/* ============================================
   КОМПОНЕНТ: BUTTON
   Префикс: .galleryyachts-btn
   ============================================ */

.galleryyachts-btn {
    display: inline-block;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.galleryyachts-btn--primary {
    background-color: #1A1A1A;
    color: #fff;
}

.galleryyachts-btn--secondary {
    background-color: transparent;
    border: 1px solid #1A1A1A;
    color: #1A1A1A;
}

.galleryyachts-btn--large {
    padding: 16px 32px;
    font-size: 18px;
}
```

Использование:
```html
<button class="galleryyachts-btn galleryyachts-btn--primary">Первичная кнопка</button>
<button class="galleryyachts-btn galleryyachts-btn--secondary galleryyachts-btn--large">Большая вторичная</button>
```

### 3. Пример: Секции

```css
/* ============================================
   КОМПОНЕНТ: SECTION (Секция)
   Префикс: .galleryyachts-section
   ============================================ */

.galleryyachts-section {
    padding: 60px 0;
}

.galleryyachts-section__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 42px;
    margin-bottom: 40px;
}

.galleryyachts-section__content {
    max-width: 800px;
    margin: 0 auto;
}

.galleryyachts-section--dark {
    background-color: #1A1A1A;
    color: #fff;
}

.galleryyachts-section--no-padding {
    padding: 0;
}
```

---

## 🚫 Что НЕ делать

### ❌ Неправильно:

```css
/* Глобальные селекторы без префикса */
.card { }
.button { }
.nav-item { }

/* Слишком глубокая вложенность */
.galleryyachts-header .logo .text .inner .span { }

/* Использование ID для стилей */
#header { }
#main-nav { }

/* Смешивание стилей компонентов */
.galleryyachts-header .galleryyachts-card__title { }
```

### ✅ Правильно:

```css
/* С префиксом */
.galleryyachts-card { }
.galleryyachts-btn { }
.galleryyachts-header__nav-item { }

/* Плоская структура */
.galleryyachts-header__logo-text { }

/* Используйте классы */
.galleryyachts-header { }

/* Каждый компонент независим */
.galleryyachts-header__title { }
.galleryyachts-card__title { }
```

---

## 🛠️ Утилитарные классы

Для переиспользуемых стилей создайте утилитарные классы с префиксом `.galleryyachts-util-`:

```css
.galleryyachts-util-text-center {
    text-align: center;
}

.galleryyachts-util-mb-20 {
    margin-bottom: 20px;
}

.galleryyachts-util-hidden {
    display: none;
}

.galleryyachts-util-flex {
    display: flex;
}

.galleryyachts-util-grid {
    display: grid;
}
```

---

## 📱 Адаптивность

Все компоненты должны быть адаптивными. Добавляйте медиа-запросы в конец секции каждого компонента:

```css
/* Компонент */
.galleryyachts-hero {
    padding: 100px 40px;
}

.galleryyachts-hero__title {
    font-size: 64px;
}

/* Адаптивность компонента */
@media (max-width: 768px) {
    .galleryyachts-hero {
        padding: 60px 20px;
    }
    
    .galleryyachts-hero__title {
        font-size: 36px;
    }
}
```

---

## 📂 Организация файла style.css

Структура файла должна быть следующей:

```css
/* 1. Метаданные темы */
/* 2. Импорт шрифтов */
/* 3. Базовые reset стили */
/* 4. Компоненты (каждый в своей секции) */
/* 5. Утилитарные классы */
/* 6. Глобальные медиа-запросы */
```

Каждая секция компонента начинается с комментария:

```css
/* ============================================
   КОМПОНЕНТ: [NAME] ([Описание])
   Префикс: .galleryyachts-[name]
   ============================================ */
```

---

## 🎯 Быстрая шпаргалка

| Цель | Формат | Пример |
|------|--------|--------|
| Компонент | `.galleryyachts-[name]` | `.galleryyachts-card` |
| Элемент | `.galleryyachts-[component]__[element]` | `.galleryyachts-card__title` |
| Модификатор | `.galleryyachts-[component]--[modifier]` | `.galleryyachts-card--featured` |
| Утилита | `.galleryyachts-util-[utility]` | `.galleryyachts-util-text-center` |
| Вложенный элемент | `.galleryyachts-[component]__[element]-[subelement]` | `.galleryyachts-header__logo-text` |

---

## 📝 Контрольный список для нового компонента

- [ ] Имя компонента начинается с `galleryyachts-`
- [ ] Добавлен комментарий-заголовок секции в CSS
- [ ] Все элементы используют двойное подчеркивание `__`
- [ ] Модификаторы используют двойной дефис `--`
- [ ] Нет конфликтов с существующими классами
- [ ] Добавлены адаптивные стили
- [ ] Компонент работает независимо от других
- [ ] Код документирован комментариями

---

**Следуя этим правилам, вы гарантируете:**
- ✅ Отсутствие конфликтов стилей
- ✅ Легкую поддержку кода
- ✅ Масштабируемость проекта
- ✅ Понятную структуру для других разработчиков
