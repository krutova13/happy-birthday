# Папка public

## Звуки для сайта

Для полноценной работы сайта нужны два звуковых файла:

### 1. door-sound.mp3
Звук стука/скрипа двери для кнопки "Войти в дом"
- Длительность: 1-3 секунды
- Формат: MP3

**Где скачать:**
- https://freesound.org/search/?q=door+knock (бесплатно после регистрации)
- https://www.zapsplat.com/sound-effect-categories/door-sounds/
- https://pixabay.com/sound-effects/search/door/ (Pixabay - бесплатные звуки)

### 2. scream-sound.mp3
Звук крика для скримера (кнопка "Нет, я не переживу эту ночь")
- Длительность: 1-2 секунды
- Формат: MP3

**Где скачать:**
- https://freesound.org/search/?q=scream (бесплатно после регистрации)
- https://www.zapsplat.com/sound-effect-categories/screams/
- https://pixabay.com/sound-effects/search/scream/

### Быстрая загрузка через терминал

Можно использовать curl для прямого скачивания (пример - замените URL на реальный):

```bash
# Пример (работает не всегда из-за CORS):
curl -L "URL_ЗВУКА" -o door-sound.mp3
```

**Рекомендация:** Лучше скачать вручную с Freesound.org или Zapsplat и поместить файлы в эту папку.
