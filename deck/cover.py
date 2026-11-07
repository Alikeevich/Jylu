"""
Cover art: a thermal-camera frame of a heating pipe at night, in the site's
palette (cold ink-grey, only the leaks glow ember), with isotherm lines, a
spot-meter reticle on the hottest spot and viewfinder corners. The centre
stays calm for the title.

    python3 deck/cover.py
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 1350
OUT = Path(__file__).resolve().parent / "assets" / "cover.jpg"
rng = np.random.default_rng(11)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)

# palette: ink-grey ramp, ember only at the top of the scale
stops = np.array([
    [0.00, 8, 10, 16], [0.30, 20, 24, 34], [0.48, 42, 48, 62], [0.60, 80, 86, 100],
    [0.70, 150, 96, 70], [0.80, 214, 92, 42], [0.90, 246, 132, 52], [1.00, 255, 196, 128]], np.float32)
lut = np.stack([np.interp(np.linspace(0, 1, 256), stops[:, 0], stops[:, c + 1]) for c in range(3)], 1).astype(np.uint8)


def noise(scale, seed):
    r = np.random.default_rng(seed).random((H // scale + 4, W // scale + 4)).astype(np.float32)
    im = Image.fromarray((r * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)
    return np.asarray(im, np.float32) / 255


tex = noise(90, 1) * 0.55 + noise(26, 2) * 0.3 + noise(8, 3) * 0.15
v = tex * 0.18 + 0.09

# faint warm walls of buildings along the top edge
walls = np.zeros((H, W), np.float32)
for x0, y0, x1, y1 in [(0, 0, 520, 230), (760, 0, 1300, 170), (1560, 0, 2400, 260)]:
    walls[y0:y1, x0:x1] = 1
walls = np.asarray(Image.fromarray((walls * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(40)), np.float32) / 255
v += walls * 0.07


def pipe_y(x):
    return H * 0.74 + (x - W / 2) * 0.05 + 30 * np.sin(x / 380)


d = np.abs(yy - pipe_y(xx))
v += 0.15 * np.exp(-(d / 34) ** 2) + 0.06 * np.exp(-(d / 140) ** 2)

spots = [(0.80, 1.00, 74), (0.935, 0.62, 48), (0.13, 0.30, 34), (0.47, 0.20, 26)]
for u, amp, r in spots:
    cx = u * W
    cy = pipe_y(cx)
    v += 0.52 * amp * np.exp(-(((xx - cx) / (r * 3.0)) ** 2 + ((yy - cy) / (r * 1.9)) ** 2))

# steam over the main leak, drifting up and to the right
cx = 0.80 * W
cy = pipe_y(cx)
for k in range(5):
    t = k / 5
    sx, sy = cx + 40 * t + 30 * np.sin(k), cy - 90 - t * 420
    v += 0.09 * (1 - t) * np.exp(-(((xx - sx) / (70 + 120 * t)) ** 2 + ((yy - sy) / (60 + 90 * t)) ** 2))

v += rng.normal(0, 0.008, (H, W)).astype(np.float32)
v = np.clip(v, 0, 1)
img = lut[(v * 255).astype(np.uint8)]

# isotherms: thin lines where the field crosses a few warm levels
iso = np.zeros((H, W), bool)
smooth = np.asarray(Image.fromarray((v * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3)), np.float32) / 255
for level in (0.34, 0.42, 0.52):
    m = smooth > level
    iso |= (m ^ np.roll(m, 1, 0)) | (m ^ np.roll(m, 1, 1))
iso = np.asarray(Image.fromarray((iso * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)), np.float32) / 255
snow = np.array([238, 240, 245], np.float32)
img = (img * (1 - iso[..., None] * 0.22) + snow * iso[..., None] * 0.22).astype(np.uint8)

im = Image.fromarray(img)
draw = ImageDraw.Draw(im)
line = (238, 240, 245)

# viewfinder corners
inset, arm, w = 96, 84, 4
for (x, y, dx, dy) in [(inset, inset, 1, 1), (W - inset, inset, -1, 1), (W - inset, H - inset, -1, -1), (inset, H - inset, 1, -1)]:
    draw.line([(x, y + dy * arm), (x, y), (x + dx * arm, y)], fill=line, width=w)

# spot-meter reticle on the hottest spot
rx, ry, rr = 0.80 * W, pipe_y(0.80 * W), 54
draw.ellipse([rx - rr, ry - rr, rx + rr, ry + rr], outline=line, width=4)
for (a, b) in [((rx, ry - rr - 34), (rx, ry - rr + 10)), ((rx, ry + rr - 10), (rx, ry + rr + 34)),
               ((rx - rr - 34, ry), (rx - rr + 10, ry)), ((rx + rr - 10, ry), (rx + rr + 34, ry))]:
    draw.line([a, b], fill=line, width=4)

im.save(OUT, quality=92)
print("cover", OUT.name, im.size)
