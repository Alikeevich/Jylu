#!/usr/bin/env node
/**
 * Builds a single-page version of the site from the static export in out/:
 * every language and legal page becomes a <template>, and a small router
 * switches between them by URL hash (#ru, #kz, #en, #ru-privacy, …).
 * Fonts, video and images are copied next to it, so the file works offline
 * and makes no third-party requests.
 *
 *   npm run build
 *   node scripts/build-standalone.mjs [outDir] [--fragment]
 *
 * --fragment writes the page without <!doctype>/<head>/<body>, for hosts
 * that wrap the page in their own document skeleton.
 *
 * Languages, pages and the theme script are read from the export itself,
 * so adding a language or a page needs no change here.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const OUT = "out";
const args = process.argv.slice(2);
const fragment = args.includes("--fragment");
const outDir = resolve(args.find((a) => !a.startsWith("--")) ?? "standalone");
const ASSETS = ["video/hero.mp4", "video/hero-portrait.mp4", "video/poster.jpg", "video/poster-portrait.jpg", "images/heating-main-960.webp", "images/heating-main-1280.webp"];

const read = (file) => readFileSync(file, "utf8");
const htmlLang = (html) => (html.match(/<html lang="([^"]+)"/) || [])[1];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const subdirsWithIndex = (dir) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, "index.html")))
    .map((d) => d.name);

// ── what the export contains: the language list is the one the root redirect was built with
const rootHtml = read(join(OUT, "index.html"));
const langsJson = (rootHtml.match(/langs=(\[[^\]]*\])/) || [])[1];
if (!langsJson) throw new Error("language list not found in out/index.html");
const langs = JSON.parse(langsJson);
const pages = ["home", ...subdirsWithIndex(join(OUT, langs[0]))];
const pageFile = (lang, page) => join(OUT, lang, page === "home" ? "" : page, "index.html");
const HTML_LANG = Object.fromEntries(langs.map((l) => [l, htmlLang(read(pageFile(l, "home")))]));
const rootLang = htmlLang(rootHtml);
const defaultLang = langs.find((l) => HTML_LANG[l] === rootLang) ?? langs[0];
const L = langs.join("|");
const P = pages.filter((p) => p !== "home").join("|");
const viewId = (lang, page) => (page === "home" ? lang : `${lang}-${page}`);

const sample = read(pageFile(defaultLang, "home"));
const themeInit = (sample.match(/<script>(try\{var t=localStorage\.getItem\('jylu-theme'\)[^<]*)<\/script>/) || [])[1];
if (!themeInit) throw new Error("theme init script not found in the export");

// ── pages → templates
function view(lang, page) {
  const html = read(pageFile(lang, page));
  const start = html.indexOf("<header");
  const end = html.lastIndexOf("</aside>");
  if (start < 0 || end < 0) throw new Error(`page markers not found in ${pageFile(lang, page)}`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "Jylu";
  const body = html
    .slice(start, end + "</aside>".length)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(new RegExp(`href="/(${L})/(${P})/"`, "g"), (_, l, p) => `href="#${l}-${p}"`)
    .replace(new RegExp(`href="/(${L})/#([\\w-]+)"`, "g"), (_, l, a) => `href="#${a}" data-view="${l}"`)
    .replace(new RegExp(`href="/(${L})/"`, "g"), (_, l) => `href="#${l}"`)
    .replace(/(["\s,])\/(video|images)\//g, "$1$2/");
  return `<template id="view-${viewId(lang, page)}" data-title="${esc(title)}" data-lang="${HTML_LANG[lang]}">${body}</template>`;
}
const templates = langs.flatMap((l) => pages.map((p) => view(l, p)));

// ── fonts: the faces next/font generated, served from ./fonts
const cssDir = join(OUT, "_next/static/css");
const fontFiles = new Set();
const fontFaces = readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .flatMap((f) => read(join(cssDir, f)).match(/@font-face\{[^}]*\}/g) || [])
  .filter((rule) => !rule.includes("Fallback"))
  .map((rule) =>
    rule.replace(/url\(\/_next\/static\/media\/([^)]+)\)/g, (_, file) => {
      fontFiles.add(file);
      return `url(fonts/${file})`;
    })
  )
  .join("\n");

const css = read("app/globals.css")
  .replace("--sans: var(--font-sans), ui-sans-serif", '--sans: "IBM Plex Sans", ui-sans-serif')
  .replace("--mono: var(--font-mono), ui-monospace", '--mono: "IBM Plex Mono", ui-monospace');
const siteJs = read("public/site.js");

const router = `(function () {
  var LANGS = ${JSON.stringify(langs)};
  var DEFAULT = ${JSON.stringify(defaultLang)};
  var app = document.getElementById("app");
  var current = null;
  function saved() {
    var l = null;
    try { l = localStorage.getItem("jylu-lang"); } catch (e) {}
    return LANGS.indexOf(l) >= 0 ? l : DEFAULT;
  }
  function show(id, anchor) {
    var t = document.getElementById("view-" + id);
    if (!t) return false;
    if (id !== current) {
      app.innerHTML = t.innerHTML;
      current = id;
      document.title = t.getAttribute("data-title");
      document.documentElement.lang = t.getAttribute("data-lang");
      if (window.jylu) window.jylu.init();
      if (!anchor) window.scrollTo(0, 0);
    }
    if (anchor) {
      var el = document.getElementById(anchor);
      if (el) el.scrollIntoView();
    }
    return true;
  }
  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h && show(h)) return;
    if (!current) show(saved(), h || null);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-view]");
    if (!a) return;
    var target = a.getAttribute("data-view");
    if (target === current) return;
    e.preventDefault();
    show(target, a.getAttribute("href").slice(1));
  });
  window.addEventListener("hashchange", route);
  route();
})();`;

const head = `<title>Jylu</title>
<script>${themeInit}</script>
<style>
${fontFaces}
${css}
</style>`;

const body = `<div id="app"></div>
${templates.join("\n")}
<script>
${siteJs}
${router}
</script>`;

const page = fragment
  ? `${head}\n${body}\n`
  : `<!doctype html>
<html lang="${HTML_LANG[defaultLang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
${body}
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), page);
const copies = [
  ...ASSETS.map((a) => [join("public", a), join(outDir, a)]),
  ...[...fontFiles].map((f) => [join(OUT, "_next/static/media", f), join(outDir, "fonts", f)]),
];
for (const [from, to] of copies) {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
}
console.log(
  `standalone: ${join(outDir, "index.html")} (${(page.length / 1024).toFixed(0)} KB, ${templates.length} views, ` +
    `${langs.length} languages, ${fontFiles.size} font files, default ${defaultLang})`
);
