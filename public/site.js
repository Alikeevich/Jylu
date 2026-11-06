/*
 * Jylu — page behaviour. Plain JS so the same file runs on the Next.js site
 * and in the standalone build (scripts/build-standalone.mjs).
 * Storage keys are listed in the cookie policy: jylu-theme, jylu-lang, jylu-notice.
 */
(function () {
  var root = document.documentElement;
  var scrollBound = false;

  function get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function effectiveTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function syncHeader() {
    var header = document.querySelector(".header");
    if (!header || header.hasAttribute("data-solid")) return;
    var solid = header.classList.contains("header--open") || window.scrollY > 24;
    header.classList.toggle("header--solid", solid);
  }

  function setMenu(header, open) {
    header.classList.toggle("header--open", open);
    var button = header.querySelector(".menu");
    if (button) button.setAttribute("aria-expanded", String(open));
    syncHeader();
  }

  function init() {
    var header = document.querySelector(".header");
    if (header && !header.hasAttribute("data-bound")) {
      header.setAttribute("data-bound", "");
      var menu = header.querySelector(".menu");
      var nav = header.querySelector(".nav");
      if (menu) {
        menu.addEventListener("click", function () {
          setMenu(header, !header.classList.contains("header--open"));
        });
      }
      if (nav) {
        nav.addEventListener("click", function (e) {
          if (e.target.closest && e.target.closest("a")) setMenu(header, false);
        });
      }
      var toggles = header.querySelectorAll("[data-theme-toggle]");
      for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", function () {
          var next = effectiveTheme() === "dark" ? "light" : "dark";
          root.setAttribute("data-theme", next);
          set("jylu-theme", next);
        });
      }
    }

    var langLinks = document.querySelectorAll("[data-lang-link]");
    for (var j = 0; j < langLinks.length; j++) {
      langLinks[j].addEventListener("click", function (e) {
        set("jylu-lang", e.currentTarget.getAttribute("data-lang-link"));
      });
    }

    var notice = document.querySelector(".cookie");
    if (notice && !notice.hasAttribute("data-bound")) {
      notice.setAttribute("data-bound", "");
      if (!get("jylu-notice")) notice.hidden = false;
      var ok = notice.querySelector("[data-cookie-ok]");
      if (ok) {
        ok.addEventListener("click", function () {
          set("jylu-notice", "1");
          notice.hidden = true;
        });
      }
    }

    var video = document.querySelector(".hero__video");
    if (video && window.matchMedia) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
      } else {
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      }
    }

    syncHeader();
    if (!scrollBound) {
      scrollBound = true;
      window.addEventListener("scroll", syncHeader, { passive: true });
      document.addEventListener("keydown", function (e) {
        var h = document.querySelector(".header--open");
        if (e.key === "Escape" && h) setMenu(h, false);
      });
    }
  }

  window.jylu = { init: init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
