"""
Hero background video: a thermal-camera view of a heating pipe at night.
Cold ink-grey field, only the leaks glow ember, isotherm lines around the
heat, a spot-meter reticle that stays on the main leak, and a light glitch:
three short bursts per loop where horizontal bands slip and the colour
channels split. Seamless 12 s loop; posters are clean first frames.

Two cuts: landscape (desktop) and portrait (phones), where the pipe runs
low so the leak sits below the text.

    python3 scripts/hero-video.py      # writes public/video/hero*.mp4 and poster*.jpg
"""
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
FPS, SECONDS = 24, 12
N = FPS * SECONDS
PAD = 80  # margin so the camera can drift

CUTS = {
    # name: size, pipe line (height share, slope, wave), leaks (x share, strength, radius, pulse phase), reticle radius
    "hero": dict(size=(1600, 900), pipe=(0.70, 0.05, 20, 250),
                 spots=[(0.78, 1.00, 48, 0.0), (0.93, 0.62, 32, 1.9), (0.13, 0.30, 22, 3.1), (0.47, 0.20, 18, 4.4)], reticle=36),
    "hero-portrait": dict(size=(900, 1600), pipe=(0.88, 0.04, 14, 200),
                          spots=[(0.62, 1.00, 40, 0.0), (0.93, 0.60, 26, 1.9), (0.12, 0.30, 18, 3.1)], reticle=32),
}

stops = np.array([
    [0.00, 8, 10, 16], [0.30, 20, 24, 34], [0.48, 42, 48, 62], [0.60, 80, 86, 100],
    [0.70, 150, 96, 70], [0.80, 214, 92, 42], [0.90, 246, 132, 52], [1.00, 255, 196, 128]], np.float32)
LUT = np.stack([np.interp(np.linspace(0, 1, 256), stops[:, 0], stops[:, c + 1]) for c in range(3)], 1).astype(np.uint8)
SNOW = np.array([238, 240, 245], np.float32)
# glitch bursts: (first frame, length); all well inside the loop so frame N-1 joins frame 0 cleanly
BURSTS = [(70, 4), (178, 3), (255, 3)]
GLITCH = {f: (start, i) for start, length in BURSTS for i, f in enumerate(range(start, start + length))}


def noise(scale, seed, w, h):
    r = np.random.default_rng(seed).random((h // scale + 4, w // scale + 4)).astype(np.float32)
    return np.asarray(Image.fromarray((r * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), np.float32) / 255


def make(name, size, pipe, spots, reticle):
    W, H = size
    tex = sum(noise(s, seed, W + 2 * PAD, H + 2 * PAD) * k for s, seed, k in [(70, 1, 0.55), (20, 2, 0.3), (7, 3, 0.15)])
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    level, slope, wave, period = pipe

    def pipe_y(x):
        return H * level + (x - W / 2) * slope + wave * np.sin(x / period)

    main_x = spots[0][0] * W

    def field(f):
        ph = 2 * np.pi * f / N
        dx, dy = 26 * np.sin(ph), 10 * np.sin(2 * ph + 0.6)  # slow drift, like a moving truck
        X, Y = xx + dx, yy + dy
        ox, oy = int(PAD + dx), int(PAD + dy)
        v = tex[oy:oy + H, ox:ox + W] * 0.18 + 0.09
        d = np.abs(Y - pipe_y(X))
        v = v + 0.15 * np.exp(-(d / 30) ** 2) + 0.06 * np.exp(-(d / 120) ** 2)
        for u, amp, r, phase in spots:
            cx = u * W
            cy = pipe_y(cx)
            pulse = 0.86 + 0.14 * np.sin(ph + phase)
            v = v + 0.52 * amp * pulse * np.exp(-(((X - cx) / (r * 3.0)) ** 2 + ((Y - cy) / (r * 1.9)) ** 2))
        cy = pipe_y(main_x)
        for k in range(3):  # steam over the main leak, rising and fading
            t = (f / N + k / 3) % 1
            sx, sy = main_x + 18 * np.sin(t * 6 + k), cy - 60 - t * 260
            v = v + 0.07 * (1 - t) * np.exp(-(((X - sx) / (50 + 90 * t)) ** 2 + ((Y - sy) / (40 + 60 * t)) ** 2))
        v = v + np.random.default_rng(1000 + f).normal(0, 0.006, (H, W)).astype(np.float32)
        return np.clip(v, 0, 1), (main_x - dx, pipe_y(main_x) - dy)

    def render(f):
        v, (rx, ry) = field(f)
        img = LUT[(v * 255).astype(np.uint8)].astype(np.float32)
        smooth = np.asarray(Image.fromarray((v * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3)), np.float32) / 255
        iso = np.zeros((H, W), bool)
        for lv in (0.34, 0.42, 0.52):
            m = smooth > lv
            iso |= (m ^ np.roll(m, 1, 0)) | (m ^ np.roll(m, 1, 1))
        iso[0, :] = iso[:, 0] = False  # np.roll wraps the far edge round; that is not a contour
        iso = np.asarray(Image.fromarray((iso * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)), np.float32)[..., None] / 255
        img = img * (1 - iso * 0.22) + SNOW * iso * 0.22
        im = Image.fromarray(img.astype(np.uint8))

        draw = ImageDraw.Draw(im)
        rr, line = reticle, (238, 240, 245)
        draw.ellipse([rx - rr, ry - rr, rx + rr, ry + rr], outline=line, width=3)
        for a, b in [((rx, ry - rr - 22), (rx, ry - rr + 7)), ((rx, ry + rr - 7), (rx, ry + rr + 22)),
                     ((rx - rr - 22, ry), (rx - rr + 7, ry)), ((rx + rr - 7, ry), (rx + rr + 22, ry))]:
            draw.line([a, b], fill=line, width=3)

        out = np.asarray(im).copy()
        if f in GLITCH:
            start, i = GLITCH[f]
            rng = np.random.default_rng(start * 31 + i)
            strength = 1.0 if i == 0 else 0.6
            for _ in range(rng.integers(3, 7)):
                y0 = int(rng.integers(0, H - 80))
                h = int(rng.integers(6, 64))
                shift = int(rng.choice([-1, 1]) * rng.integers(10, 72) * strength)
                out[y0:y0 + h] = np.roll(out[y0:y0 + h], shift, axis=1)
            s = int(rng.integers(3, 8) * strength) or 2
            out[..., 0] = np.roll(out[..., 0], s, axis=1)
            out[..., 2] = np.roll(out[..., 2], -s, axis=1)
            y = int(rng.integers(40, H - 40))
            out[y:y + 2] = (out[y:y + 2] * 0.6 + SNOW * 0.4).astype(np.uint8)
        return out

    video = ROOT / f"public/video/{name}.mp4"
    poster = ROOT / ("public/video/poster.jpg" if name == "hero" else f"public/video/poster-portrait.jpg")
    ff = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "25", "-preset", "slow", "-movflags", "+faststart", "-an", str(video)],
        stdin=subprocess.PIPE)
    for f in range(N):
        frame = render(f)
        if f == 0:
            Image.fromarray(frame).save(poster, quality=88)
        ff.stdin.write(frame.tobytes())
    ff.stdin.close()
    ff.wait()
    print("wrote", video.relative_to(ROOT), "and", poster.relative_to(ROOT))


if __name__ == "__main__":
    import sys
    for cut, cfg in CUTS.items():
        if len(sys.argv) < 2 or cut in sys.argv[1:]:
            make(cut, **cfg)
