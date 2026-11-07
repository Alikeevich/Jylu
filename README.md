# Jylu — сайт

Лендинг Jylu на трёх языках со светлой и тёмной темой. Next.js 15, статический экспорт, без внешних UI-библиотек.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # готовый сайт в папке out/
```

Папку `out/` можно выложить на любой статический хостинг (Vercel, Netlify, GitHub Pages, nginx).

## Адреса

| Страница | RU | KZ | EN |
| --- | --- | --- | --- |
| Главная | `/ru/` | `/kz/` | `/en/` |
| Конфиденциальность | `/ru/privacy/` | `/kz/privacy/` | `/en/privacy/` |
| Условия использования | `/ru/terms/` | `/kz/terms/` | `/en/terms/` |
| Cookie | `/ru/cookies/` | `/kz/cookies/` | `/en/cookies/` |

`/` выбирает язык сам: сохранённый выбор, казахский для браузера на казахском, иначе русский.

Когда появится домен, задайте его при сборке, чтобы появились canonical, hreflang и картинка для превью ссылок:

```bash
NEXT_PUBLIC_SITE_URL=https://jylu.kz npm run build
```

## Где что лежит

- `content/i18n.ts` — список языков и правовых страниц, из него строятся маршруты, переключатель и выбор языка на `/`;
- `content/dictionary.ts` — все тексты сайта на трёх языках;
- `content/legal.ts` — тексты правовых страниц;
- `content/site.ts` — контактный email (`CONTACT_EMAIL`) и список источников;
- `app/globals.css` — стили, цвета обеих тем задаются токенами в начале файла;
- `components/` — шапка, подвал, главная, правовые страницы, уведомление о cookie;
- `app/[lang]/page.tsx` — главная, `app/[lang]/[doc]/page.tsx` — все правовые страницы;
- `public/site.js` — поведение страницы: тема, меню, уведомление, видео.

## Тема и cookie

Без выбора пользователя сайт следует теме устройства. Кнопка в шапке переключает тему и запоминает выбор. В браузере сохраняются только `jylu-theme`, `jylu-lang` и `jylu-notice`, аналитики нет. Если добавите аналитику, обновите `content/legal.ts` и уведомление.

Правовые тексты — заготовка для информационного сайта без форм. Перед запуском их стоит показать юристу и добавить реквизиты оператора (ИП или ТОО, БИН, адрес).

## Фоновое видео и фото

Видео на первом экране рисует `scripts/hero-video.py`: тепловой кадр трубы ночью, изотермы, прицел на утечке и лёгкий глитч (три короткие вспышки за 12-секундный цикл). Версий две: горизонтальная для компьютеров и вертикальная для телефонов, браузер выбирает сам. Уголки видоискателя сделаны разметкой поверх видео.

```bash
python3 scripts/hero-video.py                  # обе версии, около двух минут
python3 scripts/hero-video.py hero-portrait    # только вертикальная
```

Чтобы поставить настоящую съёмку, замените файлы, имена оставьте прежними: `public/video/hero.mp4` и `poster.jpg` (горизонтальные, 1600×900 или больше), `public/video/hero-portrait.mp4` и `poster-portrait.jpg` (вертикальные, 900×1600). H.264 без звука, бесшовный цикл 8–15 секунд, желательно до 5 МБ.

```bash
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart public/video/hero.mp4
ffmpeg -i public/video/hero.mp4 -frames:v 1 -q:v 3 public/video/poster.jpg
```

Фото раскопанной теплотрассы — `public/images/heating-main-1280.webp` и `-960.webp`. Картинку для превью ссылок `public/images/og.jpg` собирает `python3 scripts/og.py` из этого фото и знака.

## Логотип

Строчное `jylu` (казахская латиница, «жылу» — тепло), нарисованное как теплотрасса: одна толщина штриха, прямые участки, изгибы одного радиуса, плоские срезы. Оранжевый квадрат над j — «горячий пиксель», тёплое пятно на кадре тепловизора.

Все версии строятся из одной геометрии:

```bash
python3 scripts/brand.py
```

Скрипт пишет `components/Logo.tsx`, `app/icon.svg` (фавиконка) и SVG в `public/brand/`. PNG (`app/apple-icon.png`, `public/brand/*.png`) и картинка для превью ссылок `public/images/og.jpg` сделаны из этих SVG. Если поменяете геометрию в скрипте, пересоберите и их.

## Презентация для новичков

`deck/Jylu-для-новичков.pptx` — 20 слайдов: идея, словарь и цифры к питчу, ответы на вопросы жюри, логотип. Заметки для выступающего есть на каждом слайде. Пересобрать:

```bash
cd deck && npm install
cd .. && npm run build && (npx serve out -l 4175 &)
python3 deck/prep.py && python3 deck/cover.py && node deck/render.js
cd deck && PPTX_SKILL=<путь к pptx-скиллу> NODE_PATH=$PWD/node_modules node build.js
```

## Однофайловая версия

```bash
npm run build && npm run standalone
```

Собирает `standalone/index.html` со всеми языками и страницами в одном файле, переключение по адресу вида `#kz`, `#en-terms`. Шрифты, видео и фото лежат рядом в той же папке, поэтому версия работает офлайн, например на питче без интернета, и не обращается к сторонним сервисам.

## Скиллы для Claude Code

В `.claude/skills/` лежат скиллы, которые Claude Code подхватывает в этом репозитории:

- [heydamir/unslop](https://github.com/heydamir/unslop) — `/unslop`, убирает «ИИ-вид» интерфейса;
- [emilkowalski/skills](https://github.com/emilkowalski/skills) — анимация и дизайн интерфейсов: `/emil-design-eng`, `/review-animations`, `/mobile-native`, `/break-ui` и другие;
- [mattpocock/skills](https://github.com/mattpocock/skills) — инженерный процесс: `/grill-me`, `/to-spec`, `/tdd`, `/code-review-pocock` и другие.

Два скилла переименованы из-за совпадения имён: `prototype` Эмиля Ковальски стал `ui-prototype`, `code-review` Мэтта Покока стал `code-review-pocock`. Лицензии и источники — в `.claude/skills/THIRD-PARTY-LICENSES.md`.
