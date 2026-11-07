"""Photo crops for the deck (PowerPoint takes JPEG/PNG, not WebP)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
A = ROOT / "deck" / "assets"
A.mkdir(parents=True, exist_ok=True)

court = Image.open(ROOT / "deck/source/courtyard-1536.webp").convert("RGB")   # 1536x864
poster = Image.open(ROOT / "public/video/poster.jpg").convert("RGB")             # thermal frame

def save(im, name, size=None, q=88):
    if size:
        im = im.resize(size, Image.LANCZOS)
    im.save(A / name, quality=q, optimize=True)
    print(name, im.size)

save(court, "courtyard.jpg")
# right half of a 16:9 slide (6.67 x 7.5 in): portrait crop with the melted strip and the steam
save(court.crop((300, 0, 1068, 864)), "courtyard-half.jpg", (1200, 1350))
# meme punchline: the strip and the steam, wide
save(court.crop((120, 330, 1260, 864)), "meme-strip.jpg")
# Ekibastuz slide: thermal crop with the hot spots, portrait
W, H = poster.size
cw = int(H * 1200 / 1350)
x0 = int(W * 0.66) - cw // 2
save(poster.crop((max(0, x0), 0, max(0, x0) + cw, H)), "thermal-half.jpg", (1200, 1350))
