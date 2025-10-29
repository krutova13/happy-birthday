# THE LAST NIGHT — Horror Birthday Party

Одностраничный сайт-приглашение в стиле хоррор-фильма 2000-х.

## Технологии

- React 18
- Vite
- Tailwind CSS
- Framer Motion

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Откройте браузер по адресу `http://localhost:5173`

## Звуки

Для полной атмосферы добавьте звуковые файлы в папку `public/`:

1. **door-sound.mp3** - звук двери (стук/скрип) для кнопки "Войти в дом"
2. **scream-sound.mp3** - звук крика для кнопки "Нет, я не переживу эту ночь"

### Быстрая установка

Запустите скрипт для автоматической загрузки (может не сработать из-за ограничений источников):
```bash
bash download-sounds.sh
```

### Ручная установка

Если скрипт не сработал, скачайте звуки вручную:

**Рекомендации:**
- Формат: MP3
- Длительность: 1-3 секунды
- Размер: до 200KB для быстрой загрузки

**Источники бесплатных звуков:**
- [Freesound.org](https://freesound.org) - поиск: "door knock", "scream"
- [Zapsplat](https://www.zapsplat.com) - бесплатно после регистрации
- [FreeSoundEffects](https://www.freesoundeffects.com)

После скачивания поместите файлы в папку `public/`.

## Структура проекта

```
src/
  components/
    Hero.jsx       - Главная секция с названием и кнопкой входа
    About.jsx      - Информация о вечеринке
    DressCode.jsx  - Дресс-код
    Games.jsx      - Игры ночи
    RSVP.jsx       - Кнопки подтверждения участия
    Footer.jsx     - Подвал сайта
  App.jsx          - Главный компонент
  main.jsx         - Точка входа
  index.css        - Глобальные стили и анимации
```

## Настройки

### Telegram группа

В файле `src/components/RSVP.jsx` замените ссылку `telegramLink` на вашу реальную Telegram-группу:

```jsx
const telegramLink = 'https://t.me/your_telegram_group'
```

### Цвета

Цвета определены в `tailwind.config.js`:
- `horror-black`: #000000
- `horror-dark-red`: #8b0000
- `horror-red`: #b22222
- `horror-white`: #ffffff

### Шрифты

- **Creepster** - для заголовков (подключается через Google Fonts)
- **EB Garamond** - для основного текста (подключается через Google Fonts)

## Эффекты

- **Дым**: CSS-анимация частиц дыма на главном экране
- **Свечи**: Анимация пламени свечей внизу экрана
- **Мигающий свет**: CSS-анимация flicker для заголовков
- **Плавный скролл**: Автоматическая прокрутка к секциям
- **FadeIn**: Появление элементов при скролле с помощью Framer Motion

## Сборка для продакшена

```bash
npm run build
```

Готовые файлы будут в папке `dist/`

