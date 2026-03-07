# 🎨 Руководство по CSS и именованию классов

## 📋 Соглашения об именовании

### Общая концепция

Все классы компонентов используют **префикс `.vipflot-`** для предотвращения конфликтов с:
- WordPress плагинами
- Другими темами
- Сторонними библиотеками
- Глобальными стилями

### Структура именования (BEM-подобная)

```
.vipflot-[компонент]__[элемент]--[модификатор]
```

#### Примеры:

**Базовый класс компонента:**
```css
.vipflot-header { }
```

**Элемент внутри компонента:**
```css
.vipflot-header__logo { }
.vipflot-header__nav { }
.vipflot-header__contacts { }
```

**Вложенный элемент:**
```css
.vipflot-header__logo-text { }
.vipflot-header__nav-item { }
.vipflot-header__contacts-phone { }
```

**Модификатор (состояние или вариант):**
```css
.vipflot-button--primary { }
.vipflot-button--disabled { }
.vipflot-header--sticky { }
```

---

## 🏗️ Структура компонентов

### Компонент Header (Шапка)

```html
<header class="vipflot-header">
    <div class="vipflot-header__logo">
        <a class="vipflot-header__logo-link">
            <span class="vipflot-header__logo-text">VIP FLOT</span>
            <span class="vipflot-header__logo-subtitle">Аренда яхт и катеров</span>
        </a>
    </div>
    
    <nav class="vipflot-header__nav">
        <li class="vipflot-header__nav-item">Пункт меню</li>
    </nav>
    
    <div class="vipflot-header__contacts">
        <span class="vipflot-header__contacts-phone">+7 (812) 660-55-16</span>
        <span class="vipflot-header__contacts-schedule">Пн-вс 9:00 - 23:00</span>
    </div>
</header>
```

### Компонент Layout (Структура)

```html
<main class="vipflot-layout__main">
    <div class="vipflot-layout__container">
        <!-- Контент -->
    </div>
</main>
```

### Компонент Page (Страница)

```html
<article>
    <h1 class="vipflot-page__title">Заголовок</h1>
    <div class="vipflot-page__content">
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
   Префикс: .vipflot-card
   ============================================ */

.vipflot-card {
    /* Основные стили компонента */
}

.vipflot-card__header {
    /* Шапка карточки */
}

.vipflot-card__body {
    /* Тело карточки */
}

.vipflot-card__footer {
    /* Подвал карточки */
}

.vipflot-card--featured {
    /* Модификатор для выделенной карточки */
}
```

**Шаг 3:** Используйте в HTML/PHP:

```php
<div class="vipflot-card">
    <div class="vipflot-card__header">
        <h3 class="vipflot-card__title">Заголовок</h3>
    </div>
    <div class="vipflot-card__body">
        <p>Контент карточки</p>
    </div>
</div>
```

### 2. Пример: Кнопки

```css
/* ============================================
   КОМПОНЕНТ: BUTTON
   Префикс: .vipflot-btn
   ============================================ */

.vipflot-btn {
    display: inline-block;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.vipflot-btn--primary {
    background-color: #1A1A1A;
    color: #fff;
}

.vipflot-btn--secondary {
    background-color: transparent;
    border: 1px solid #1A1A1A;
    color: #1A1A1A;
}

.vipflot-btn--large {
    padding: 16px 32px;
    font-size: 18px;
}
```

Использование:
```html
<button class="vipflot-btn vipflot-btn--primary">Первичная кнопка</button>
<button class="vipflot-btn vipflot-btn--secondary vipflot-btn--large">Большая вторичная</button>
```

### 3. Пример: Секции

```css
/* ============================================
   КОМПОНЕНТ: SECTION (Секция)
   Префикс: .vipflot-section
   ============================================ */

.vipflot-section {
    padding: 60px 0;
}

.vipflot-section__title {
    font-family: "Bebas Neue", sans-serif;
    font-size: 42px;
    margin-bottom: 40px;
}

.vipflot-section__content {
    max-width: 800px;
    margin: 0 auto;
}

.vipflot-section--dark {
    background-color: #1A1A1A;
    color: #fff;
}

.vipflot-section--no-padding {
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
.vipflot-header .logo .text .inner .span { }

/* Использование ID для стилей */
#header { }
#main-nav { }

/* Смешивание стилей компонентов */
.vipflot-header .vipflot-card__title { }
```

### ✅ Правильно:

```css
/* С префиксом */
.vipflot-card { }
.vipflot-btn { }
.vipflot-header__nav-item { }

/* Плоская структура */
.vipflot-header__logo-text { }

/* Используйте классы */
.vipflot-header { }

/* Каждый компонент независим */
.vipflot-header__title { }
.vipflot-card__title { }
```

---

## 🛠️ Утилитарные классы

Для переиспользуемых стилей создайте утилитарные классы с префиксом `.vipflot-util-`:

```css
.vipflot-util-text-center {
    text-align: center;
}

.vipflot-util-mb-20 {
    margin-bottom: 20px;
}

.vipflot-util-hidden {
    display: none;
}

.vipflot-util-flex {
    display: flex;
}

.vipflot-util-grid {
    display: grid;
}
```

---

## 📱 Адаптивность

Все компоненты должны быть адаптивными. Добавляйте медиа-запросы в конец секции каждого компонента:

```css
/* Компонент */
.vipflot-hero {
    padding: 100px 40px;
}

.vipflot-hero__title {
    font-size: 64px;
}

/* Адаптивность компонента */
@media (max-width: 768px) {
    .vipflot-hero {
        padding: 60px 20px;
    }
    
    .vipflot-hero__title {
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
   Префикс: .vipflot-[name]
   ============================================ */
```

---

## 🎯 Быстрая шпаргалка

| Цель | Формат | Пример |
|------|--------|--------|
| Компонент | `.vipflot-[name]` | `.vipflot-card` |
| Элемент | `.vipflot-[component]__[element]` | `.vipflot-card__title` |
| Модификатор | `.vipflot-[component]--[modifier]` | `.vipflot-card--featured` |
| Утилита | `.vipflot-util-[utility]` | `.vipflot-util-text-center` |
| Вложенный элемент | `.vipflot-[component]__[element]-[subelement]` | `.vipflot-header__logo-text` |

---

## 📝 Контрольный список для нового компонента

- [ ] Имя компонента начинается с `vipflot-`
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
