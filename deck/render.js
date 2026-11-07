/**
 * Renders the deck's visual assets with Chromium: backgrounds, logo variants,
 * mockups for the logo slides, screenshots of the real site, step icons.
 *
 *   npx serve out -l 4175 &      # the built site, for the screenshots
 *   python3 deck/prep.py         # photo crops
 *   node deck/render.js
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const Lu = require("react-icons/lu");

const ROOT = path.resolve(__dirname, "..");
const A = path.join(__dirname, "assets");
const SITE = process.env.SITE_URL || "http://localhost:4175";
const INK = "#0b0d14", SNOW = "#eef0f5", EMBER = "#ff6a2b", PAPER = "#f4f6f9", RAISED = "#1a1e28";
const PX = 300; // pixels per inch for slide-sized tiles

const file = (p) => "file://" + p;
const b64 = (p) => `data:${p.endsWith(".png") ? "image/png" : "image/jpeg"};base64,` + fs.readFileSync(p).toString("base64");

// the site's own IBM Plex faces, from the static export
const cssDir = path.join(ROOT, "out/_next/static/css");
const fontFaces = fs
  .readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .flatMap((f) => fs.readFileSync(path.join(cssDir, f), "utf8").match(/@font-face\{[^}]*\}/g) || [])
  .filter((r) => !r.includes("Fallback"))
  .map((r) => r.replace(/url\(\/_next\/static\/media\//g, `url(${file(path.join(ROOT, "out/_next/static/media"))}/`))
  .join("\n");
const BASE = `<style>${fontFaces}
  html,body{margin:0;background:transparent;-webkit-font-smoothing:antialiased}
  *{box-sizing:border-box} body{font-family:"IBM Plex Sans",system-ui,sans-serif}</style>`;

const svg = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const wordmark = (fg, accent) =>
  svg("public/brand/jylu-wordmark-on-dark.svg").replace('stroke="#eef0f5"', `stroke="${fg}"`).replace('fill="#ff6a2b"', `fill="${accent}"`);
const icon = (bg, fg) => svg("public/brand/jylu-icon.svg").replace('fill="#0b0d14"', `fill="${bg}"`).replace('stroke="#eef0f5"', `stroke="${fg}"`);

// four L-shaped corners, like the frame of a thermal camera screen
const brackets = (w, h, inset, arm, stroke, color) =>
  `<svg width="${w}" height="${h}" style="position:absolute;inset:0" fill="none" stroke="${color}" stroke-width="${stroke}">
    <path d="M${inset} ${inset + arm}V${inset}H${inset + arm}M${w - inset - arm} ${inset}H${w - inset}V${inset + arm}
             M${w - inset} ${h - inset - arm}V${h - inset}H${w - inset - arm}M${inset + arm} ${h - inset}H${inset}V${h - inset - arm}"/></svg>`;

async function shot(browser, name, html, w, h, { scale = 1, transparent = false, type } = {}) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await page.setContent(BASE + html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(A, name);
  await page.screenshot({ path: out, omitBackground: transparent, type: type || (name.endsWith(".jpg") ? "jpeg" : "png"), quality: name.endsWith(".jpg") ? 90 : undefined });
  await page.close();
  console.log("asset", name);
}

async function icons() {
  const steps = { "step-truck": Lu.LuTruck, "step-route": Lu.LuRoute, "step-scan": Lu.LuScanSearch, "step-map": Lu.LuMap, "step-list": Lu.LuListChecks };
  for (const [name, Icon] of Object.entries(steps)) {
    const markup = renderToStaticMarkup(React.createElement(Icon, { size: 256, color: SNOW, strokeWidth: 1.6 }));
    await sharp(Buffer.from(markup)).resize(256, 256).png().toFile(path.join(A, `${name}.png`));
    console.log("icon", name);
  }
}

(async () => {
  await icons();
  const b = await chromium.launch();

  // ── backgrounds
  const poster = b64(path.join(ROOT, "public/video/poster.jpg"));
  // cover.jpg is drawn by deck/cover.py

  const court = b64(path.join(A, "courtyard.jpg"));
  await shot(b, "closing.jpg", `<div style="position:relative;width:2400px;height:1350px;background:${INK};overflow:hidden">
      <img src="${court}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 55% 50% at 50% 48%, rgba(11,13,20,.82) 0%, rgba(11,13,20,.55) 60%, rgba(11,13,20,.35) 100%)"></div>
      ${brackets(2400, 1350, 96, 84, 4, "rgba(238,240,245,.55)")}</div>`, 2400, 1350);

  // ── logo files (transparent PNG)
  const wm = (fg, accent) => `<div style="width:1392px;height:768px">${wordmark(fg, accent).replace("<svg ", '<svg width="1392" height="768" ')}</div>`;
  await shot(b, "wm-white.png", wm("#ffffff", "#ffffff"), 1392, 768, { transparent: true });
  await shot(b, "wm-black.png", wm("#0b0d14", "#0b0d14"), 1392, 768, { transparent: true });
  await shot(b, "wm-dark.png", wm(SNOW, EMBER), 1392, 768, { transparent: true });
  await shot(b, "wm-light.png", wm("#111827", EMBER), 1392, 768, { transparent: true });
  const ic = (bg, fg) => `<div style="width:512px;height:512px">${icon(bg, fg).replace("<svg ", '<svg width="512" height="512" ')}</div>`;
  await shot(b, "icon-dark.png", ic(INK, SNOW), 512, 512, { transparent: true });
  await shot(b, "icon-light.png", ic("#ffffff", "#111827"), 512, 512, { transparent: true });

  // ── bento tiles for the no-text logo slide (sizes in inches x 300)
  const R = Math.round(0.14 * PX);
  const tile = (w, h, inner, bg) => `<div style="position:relative;width:${w}px;height:${h}px;border-radius:${R}px;overflow:hidden;background:${bg}">${inner}</div>`;
  const photoW = Math.round(3.6 * PX), photoH = Math.round(3.2 * PX);
  await shot(b, "tile-photo.png", tile(photoW, photoH, `<img src="${court}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:42% 70%">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,13,20,.65),rgba(11,13,20,0) 55%)"></div>
      <div style="position:absolute;left:${0.32 * PX}px;top:${0.3 * PX}px;width:${1.5 * PX}px">${wordmark("#ffffff", "#ffffff").replace("<svg ", '<svg style="width:100%;height:auto;display:block" ')}</div>`, INK), photoW, photoH, { transparent: true });

  const phoneW = Math.round(2.4 * PX), phoneH = Math.round(3.2 * PX);
  const app = (inner) => `<div style="width:118px;height:118px;border-radius:28px;overflow:hidden">${inner}</div>`;
  const ghost = app(`<div style="width:100%;height:100%;background:rgba(238,240,245,.14)"></div>`);
  const ours = app(icon(INK, SNOW).replace("<svg ", '<svg style="width:100%;height:100%;display:block" '));
  const grid = (cells) => `<div style="display:grid;grid-template-columns:repeat(3,118px);gap:46px 34px;justify-content:center">${cells.join("")}</div>`;
  await shot(b, "tile-phone.png", tile(phoneW, phoneH, `
      <div style="position:absolute;left:50%;top:${0.26 * PX}px;transform:translateX(-50%);width:${1.72 * PX}px;height:${3.5 * PX}px;border-radius:84px;background:#05060a;padding:18px;box-shadow:0 0 0 2px rgba(238,240,245,.12)">
        <div style="position:relative;width:100%;height:100%;border-radius:68px;overflow:hidden;background:#141826">
          <img src="${court}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:46% 40%;filter:blur(5px) brightness(.95)">
          <div style="position:absolute;left:50%;top:22px;transform:translateX(-50%);width:120px;height:34px;border-radius:20px;background:#000"></div>
          <div style="position:absolute;inset:150px 0 0 0">${grid([ghost, ours, ghost, ghost, ghost, ghost, ghost, ghost, ghost])}</div>
        </div></div>`, RAISED), phoneW, phoneH, { transparent: true });

  const tabW = Math.round(3.233 * PX), tabH = Math.round(3.2 * PX);
  const bar = (w, c = "rgba(17,24,39,.14)") => `<span style="display:inline-block;height:14px;width:${w}px;border-radius:7px;background:${c}"></span>`;
  const fav = (s) => `<span style="display:inline-block;width:${s}px;height:${s}px">${icon(INK, SNOW).replace("<svg ", `<svg width="${s}" height="${s}" style="display:block" `)}</span>`;
  await shot(b, "tile-tab.png", tile(tabW, tabH, `
      <div style="position:absolute;left:${0.28 * PX}px;right:${0.28 * PX}px;top:${0.62 * PX}px;border-radius:26px;background:#dfe3ea;padding:18px 18px 0;box-shadow:0 18px 40px rgba(17,24,39,.12)">
        <div style="display:flex;gap:10px;align-items:center;padding:0 6px 14px">
          <span style="width:16px;height:16px;border-radius:50%;background:#ff5f57"></span><span style="width:16px;height:16px;border-radius:50%;background:#febc2e"></span><span style="width:16px;height:16px;border-radius:50%;background:#28c840"></span>
          <div style="margin-left:22px;display:flex;align-items:center;gap:16px;background:#fff;border-radius:16px 16px 0 0;padding:16px 22px;width:380px">${fav(36)}${bar(190)}</div>
          <div style="display:flex;align-items:center;gap:14px;padding:16px 18px;opacity:.6">${bar(26, "rgba(17,24,39,.22)")}${bar(110)}</div>
        </div>
        <div style="background:#fff;margin:0 -18px;padding:22px 26px;display:flex;align-items:center;gap:18px;border-radius:0 0 26px 26px">
          <div style="flex:1;height:52px;border-radius:26px;background:#eef1f5;display:flex;align-items:center;gap:16px;padding:0 22px">${bar(18, "rgba(17,24,39,.25)")}${bar(260)}</div>
        </div>
      </div>
      <div style="position:absolute;left:${0.28 * PX}px;bottom:${0.42 * PX}px;display:flex;align-items:end;gap:44px">${fav(128)}${fav(64)}${fav(32)}${fav(16)}</div>`, "#eceff4"), tabW, tabH, { transparent: true });

  // ── screenshots of the real site
  const site = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 1 });
  const sp = await site.newPage();
  await sp.goto(SITE + "/ru/", { waitUntil: "networkidle" });
  await sp.evaluate(() => { try { localStorage.setItem("jylu-notice", "1"); } catch (e) {} });
  await sp.reload({ waitUntil: "networkidle" });
  await sp.waitForTimeout(900);
  await sp.screenshot({ path: path.join(A, "site-desk.png") });
  await site.close();
  console.log("asset site-desk.png");

  // browser window around the screenshot
  const sitePng = b64(path.join(A, "site-desk.png"));
  await shot(b, "browser.png", `<div style="width:1600px;height:1000px;padding:20px;background:transparent">
      <div style="border-radius:22px;overflow:hidden;background:#dfe3ea;box-shadow:0 30px 60px rgba(11,13,20,.25)">
        <div style="display:flex;align-items:center;gap:12px;padding:16px 20px 0">
          <span style="width:14px;height:14px;border-radius:50%;background:#ff5f57"></span><span style="width:14px;height:14px;border-radius:50%;background:#febc2e"></span><span style="width:14px;height:14px;border-radius:50%;background:#28c840"></span>
          <div style="margin-left:18px;display:flex;align-items:center;gap:12px;background:#fff;border-radius:14px 14px 0 0;padding:12px 18px;font-size:15px;color:#111827">${fav(20)}<span>Jylu — тепловая съёмка теплосетей</span></div>
        </div>
        <div style="background:#fff;padding:10px 16px;display:flex"><div style="flex:1;height:36px;border-radius:18px;background:#eef1f5;font-size:15px;color:#4b5565;display:flex;align-items:center;padding:0 18px">jylu</div></div>
        <img src="${sitePng}" style="display:block;width:1560px;height:auto">
      </div></div>`, 1600, 1000, { transparent: true });

  // link preview in a chat
  const og = b64(path.join(ROOT, "public/images/og.jpg"));
  await shot(b, "chat.png", `<div style="width:920px;height:560px;border-radius:28px;background:#0e1621;padding:34px;display:flex;justify-content:flex-end;align-items:flex-start">
      <div style="width:620px;border-radius:22px 22px 6px 22px;background:#2b5278;padding:16px 18px 14px;color:#fff;font-size:21px">
        <div style="color:#8cc8ff;margin-bottom:10px">ребят, вот сайт, гляньте</div>
        <div style="border-left:4px solid #8cc8ff;padding-left:14px">
          <div style="font-weight:500;color:#8cc8ff">Jylu</div>
          <div style="font-weight:500;margin-top:2px">Jylu — тепловая съёмка теплосетей</div>
          <div style="opacity:.85;margin-top:2px;font-size:18px">Тепловизор на коммунальной технике находит участки с утечками до аварии</div>
          <img src="${og}" style="display:block;width:100%;margin-top:12px;border-radius:12px">
        </div>
        <div style="text-align:right;font-size:15px;opacity:.6;margin-top:6px">21:47</div>
      </div></div>`, 920, 560, { scale: 2, transparent: true });

  // home screen strip with the icon
  const labeled = (inner, label) => `<div style="display:grid;justify-items:center;gap:12px;font-size:20px;color:#fff">${app(inner)}<span>${label}</span></div>`;
  await shot(b, "homescreen.png", `<div style="width:920px;height:370px;border-radius:28px;overflow:hidden;position:relative;background:#141826">
      <img src="${court}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:blur(8px) brightness(.9)">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:58px">
        ${labeled(`<div style="width:100%;height:100%;background:rgba(238,240,245,.16)"></div>`, "Карты")}
        ${labeled(icon(INK, SNOW).replace("<svg ", '<svg style="width:100%;height:100%;display:block" '), "Jylu")}
        ${labeled(`<div style="width:100%;height:100%;background:rgba(238,240,245,.16)"></div>`, "Почта")}
        ${labeled(`<div style="width:100%;height:100%;background:rgba(238,240,245,.16)"></div>`, "Заметки")}
      </div></div>`, 920, 370, { scale: 2, transparent: true });

  await b.close();
})();
