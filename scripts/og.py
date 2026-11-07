"""Link preview image (1200x630): the site photo with the wordmark.

    python3 scripts/og.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630

photo = Image.open(ROOT / "public/images/heating-main-1280.webp").convert("RGB")
scale = max(W / photo.width, H / photo.height)
photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
x0 = (photo.width - W) // 2
y0 = (photo.height - H) // 2
canvas = photo.crop((x0, y0, x0 + W, y0 + H)).convert("RGBA")

# darken the lower left, where the wordmark sits
shade = Image.new("RGBA", (W, H))
px = shade.load()
for y in range(H):
    for x in range(W):
        t = max(0.0, 1 - ((x / W) * 0.9 + (1 - y / H) * 1.1))
        px[x, y] = (11, 13, 20, int(215 * min(1.0, t * 1.6)))
canvas = Image.alpha_composite(canvas, shade)

mark = Image.open(ROOT / "public/brand/jylu-wordmark-on-dark.png").convert("RGBA")
mh = 112
mark = mark.resize((round(mark.width * mh / mark.height), mh), Image.LANCZOS)
canvas.alpha_composite(mark, (72, H - mh - 64))
canvas.convert("RGB").save(ROOT / "public/images/og.jpg", quality=86, optimize=True)
print("wrote public/images/og.jpg")
