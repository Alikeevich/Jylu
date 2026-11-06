# Jylu — сайт

Лендинг Jylu: Next.js 15, статический экспорт, без внешних UI-библиотек.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # готовый сайт в папке out/
```

Папку `out/` можно выложить на любой статический хостинг (Vercel, Netlify, GitHub Pages, nginx).

## Фоновое видео

Сейчас стоит сгенерированная заглушка. Чтобы поставить настоящее видео, замените два файла, имена оставьте прежними:

- `public/video/hero.mp4` — H.264, 1920×1080 или 1280×720, без звука, 8–15 секунд, бесшовный цикл, желательно до 5 МБ;
- `public/video/poster.jpg` — первый кадр, показывается до загрузки видео.

Сжать и сделать постер:

```bash
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart public/video/hero.mp4
ffmpeg -i public/video/hero.mp4 -frames:v 1 -q:v 3 public/video/poster.jpg
```

## Где что лежит

- `app/page.tsx` — весь текст сайта и контактный email (`CONTACT_EMAIL`);
- `app/globals.css` — стили, цвета задаются в `:root`;
- `components/` — шапка, фоновое видео, появление блоков при прокрутке.
