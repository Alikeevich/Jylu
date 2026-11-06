#!/usr/bin/env node
/**
 * Builds a single-page version of the site from the static export in out/:
 * every language and legal page becomes a <template>, and a small router
 * switches between them by URL hash (#ru, #kz, #en, #ru-privacy, …).
 * Useful as an offline demo file and for hosts that serve one HTML page.
 *
 *   npm run build
 *   node scripts/build-standalone.mjs [outDir] [--fragment]
 *
 * --fragment writes the page without <!doctype>/<head>/<body>, for hosts
 * that wrap the page in their own document skeleton.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const args = process.argv.slice(2);
const fragment = args.includes("--fragment");
const outDir = resolve(args.find((a) => !a.startsWith("--")) ?? "standalone");

const LANGS = ["kz", "ru", "en"];
const PAGES = ["home", "privacy", "terms", "cookies"];
const HTML_LANG = { kz: "kk", ru: "ru", en: "en" };
const view = (lang, page) => (page === "home" ? lang : `${lang}-${page}`);
const ASSETS = [
  "video/hero.mp4",
  "video/poster.jpg",
  "images/courtyard-960.webp",
  "images/courtyard-1536.webp",
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function read(lang, page) {
  const file = join("out", lang, page === "home" ? "" : page, "index.html");
  const html = readFileSync(file, "utf8");
  const start = html.indexOf("<header");
  const end = html.lastIndexOf("</aside>");
  if (start < 0 || end < 0) throw new Error(`page markers not found in ${file}`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "Jylu";
  const body = html
    .slice(start, end + "</aside>".length)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/href="\/(kz|ru|en)\/(privacy|terms|cookies)\/"/g, (_, l, p) => `href="#${l}-${p}"`)
    .replace(/href="\/(kz|ru|en)\/#([\w-]+)"/g, (_, l, a) => `href="#${a}" data-view="${l}"`)
    .replace(/href="\/(kz|ru|en)\/"/g, (_, l) => `href="#${l}"`)
    .replace(/(["\s,])\/(video|images)\//g, "$1$2/");
  return { title, body };
}

const views = [];
for (const lang of LANGS) {
  for (const page of PAGES) {
    const { title, body } = read(lang, page);
    views.push(
      `<template id="view-${view(lang, page)}" data-title="${esc(title)}" data-lang="${HTML_LANG[lang]}">${body}</template>`
    );
  }
}

const css = readFileSync("app/globals.css", "utf8")
  .replace("--sans: var(--font-sans), ui-sans-serif", '--sans: "IBM Plex Sans", ui-sans-serif')
  .replace("--mono: var(--font-mono), ui-monospace", '--mono: "IBM Plex Mono", ui-monospace');
const siteJs = readFileSync("public/site.js", "utf8");
const themeInit =
  "try{var t=localStorage.getItem('jylu-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}";

const router = `(function () {
  var app = document.getElementById("app");
  var current = null;
  function saved() {
    try { var l = localStorage.getItem("jylu-lang"); } catch (e) { l = null; }
    return l === "kz" || l === "en" || l === "ru" ? l : "ru";
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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap">
<script>${themeInit}</script>
<style>
${css}
</style>`;

const body = `<div id="app"></div>
${views.join("\n")}
<script>
${siteJs}
${router}
</script>`;

const page = fragment
  ? `${head}\n${body}\n`
  : `<!doctype html>
<html lang="ru">
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
for (const asset of ASSETS) {
  const to = join(outDir, asset);
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(join("public", asset), to);
}
console.log(`standalone: ${join(outDir, "index.html")} (${(page.length / 1024).toFixed(0)} KB, ${views.length} views)`);
