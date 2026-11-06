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

Видео на первом экране — сгенерированная заглушка. Чтобы поставить настоящее, замените файлы, имена оставьте прежними:

- `public/video/hero.mp4` — H.264, 1920×1080 или 1280×720, без звука, 8–15 секунд, бесшовный цикл, желательно до 5 МБ;
- `public/video/poster.jpg` — первый кадр, показывается до загрузки видео.

```bash
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart public/video/hero.mp4
ffmpeg -i public/video/hero.mp4 -frames:v 1 -q:v 3 public/video/poster.jpg
```

Фото ночного двора (`public/images/courtyard-*.webp`, `og.jpg`) сгенерировано нейросетью и подписано на сайте как иллюстрация. Своё фото положите под теми же именами: 1536×864 и 960×540 в WebP.

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
