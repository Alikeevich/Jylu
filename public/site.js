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

  // The status bar matches the top of the page: the dark hero on the home page,
  // the header on legal pages. Only needed once the user picked a theme by hand.
  var STATUS_BAR = { light: "#f4f6f9", dark: "#0b0d14" };
  function syncThemeColor() {
    var header = document.querySelector(".header");
    if (!header || !header.hasAttribute("data-solid") || !root.hasAttribute("data-theme")) return;
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", STATUS_BAR[effectiveTheme()]);
  }

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  // ── How it works: the truck route. components/RouteScene.tsx draws the scene
  // and passes its geometry in data-route; this plays it. A lap is a pure
  // function of its clock, so picking a step or pausing only moves the clock.

  function cubic(x1, y1, x2, y2) {
    function at(t, a, b) {
      return 3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t;
    }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var lo = 0;
      var hi = 1;
      var t = x;
      for (var i = 0; i < 20; i++) {
        var v = at(t, x1, x2);
        if (Math.abs(v - x) < 1e-4) break;
        if (v < x) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
      }
      return at(t, y1, y2);
    };
  }
  var EASE = cubic(0.22, 1, 0.36, 1); // --ease: whatever arrives
  // the truck is heavy: easeInOutQuad / easeOutQuad (easings.net), so it pulls
  // away, cruises and brakes instead of darting; --ease-move in globals.css
  var MOVE = cubic(0.45, 0, 0.55, 1);
  var ROLL_IN = cubic(0.5, 1, 0.89, 1); // drives in at cruising speed and brakes

  function part(t, from, length) {
    var p = (t - from) / length;
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }
  function mix(a, b, p) {
    return a + (b - a) * p;
  }
  function r2(v) {
    return Math.round(v * 100) / 100;
  }
  function r3(v) {
    return Math.round(v * 1000) / 1000;
  }
  function about(sx, sy, x, y) {
    return "translate(" + x + " " + y + ") scale(" + r3(sx) + " " + r3(sy) + ") translate(" + -x + " " + -y + ")";
  }
  // writes only what changed since the last frame
  function attr(el, name, value) {
    var key = "_jy" + name;
    if (el[key] === value) return;
    el[key] = value;
    el.setAttribute(name, value);
  }

  // one lap, in seconds; every stop has one event and the truck stands still for it
  var LAP = {
    enter: 1.8,
    mount: 1.9, // the camera goes on the cab roof
    lit: 2.35, // and turns on
    beam: 2.5, // its view opens; recording starts
    legs: [
      [4.1, 1.8],
      [7.4, 1.8],
      [11.6, 1.8],
      [15.6, 1.8],
    ], // [start, length] of the drive from stop i to i + 1
    detect: 9.4, // the finds get boxes; the leak's locks on
    pins: 13.6, // the boxes become marks on the map, sized by risk
    card: 17.5, // the crew list opens
    fly: 17.7, // the marks fly into it, riskiest first
    exit: 20.4, // the truck leaves; the result stays a moment longer
    clear: 22.8,
    back: 23, // a narrow screen pans back to the start
    end: 24,
  };
  var DETECT = [0, 0.08, 0.13]; // boxes appear left to right, as the model reads the drive
  var BY_RANK = [0, 0.09, 0.15]; // marks move in risk order
  var route = null;

  function makeRoute(el) {
    var C = JSON.parse(el.getAttribute("data-route"));
    var scene = el.querySelector(".route__scene");
    var svg = el.querySelector(".route__svg");
    var list = el.querySelector(".route__steps");
    var steps = el.querySelectorAll(".route__step");
    function all(name) {
      return el.querySelectorAll('[data-r="' + name + '"]');
    }
    function one(name) {
      return el.querySelector('[data-r="' + name + '"]');
    }
    var truck = one("truck");
    var body = one("body");
    var beam = one("beam");
    var cam = one("cam");
    var lit = one("lit");
    var scan = one("scan");
    var heat = one("heat");
    var feather = one("feather");
    var scanned = one("scanned");
    var state = one("state");
    var card = one("card");
    var far = one("far");
    var wisps = one("steam").children;
    var wheels = all("wheel");
    var boxes = all("box");
    var stems = all("stem");
    var marks = all("mark");
    var bars = all("bar");
    var wheelX = [];
    for (var w = 0; w < wheels.length; w++) wheelX.push(wheels[w].getAttribute("data-cx"));

    var reduce = reducedMotion();
    var scanFrom = C.stops[0] + C.scan[0];
    var viewW = 0;
    var active = -1;
    var clock = 0;
    var startedAt = 0;
    var lastNow = 0;
    var raf = 0;
    var visible = false;
    var still = 2;
    var pitch = 0;
    var pitchV = 0;

    function truckX(t) {
      var S = C.stops;
      var L = LAP.legs;
      if (t < LAP.enter) return mix(S[0] - 240, S[0], ROLL_IN(part(t, 0, LAP.enter)));
      for (var i = 0; i < L.length; i++) {
        if (t < L[i][0]) return S[i];
        if (t < L[i][0] + L[i][1]) return mix(S[i], S[i + 1], MOVE(part(t, L[i][0], L[i][1])));
      }
      return mix(S[4], S[4] + 360, MOVE(part(t, LAP.exit, 1.6)));
    }
    // a narrow screen shows part of the yard and follows the truck
    function camAt(i) {
      return Math.max(0, Math.min(C.w - viewW, C.focus[i] - viewW / 2));
    }
    function camX(t) {
      var L = LAP.legs;
      for (var i = 0; i < L.length; i++) {
        if (t < L[i][0]) return camAt(i);
        if (t < L[i][0] + L[i][1]) return mix(camAt(i), camAt(i + 1), MOVE(part(t, L[i][0], L[i][1])));
      }
      return mix(camAt(4), camAt(0), MOVE(part(t, LAP.back, LAP.end - LAP.back)));
    }
    // the step lights just before the truck pulls up to it
    function stepAt(t) {
      for (var i = 0; i < LAP.legs.length; i++) {
        if (t < LAP.legs[i][0] + LAP.legs[i][1] - 0.4) return i;
      }
      return 4;
    }
    // the body leans against the acceleration: nose down when braking
    function lean(t) {
      var h = 1 / 60;
      var c = Math.max(t, h);
      var a = (truckX(c + h) - 2 * truckX(c) + truckX(c - h)) / (h * h);
      return Math.max(-2, Math.min(2, -a * 0.004));
    }
    // the moment before the truck leaves stop i: a still that tells the whole step
    function stillAt(i) {
      return i < 4 ? LAP.legs[i][0] - 0.05 : LAP.exit - 0.05;
    }

    function setActive(i) {
      active = i;
      for (var k = 0; k < steps.length; k++) {
        if (k < i) steps[k].setAttribute("data-state", "done");
        else if (k === i) steps[k].setAttribute("data-state", "active");
        else steps[k].removeAttribute("data-state");
      }
      list.style.setProperty("--route-p", String(i / 4));
    }

    function render(t, now) {
      var x = truckX(t);
      attr(truck, "transform", "translate(" + r2(x - C.half) + " " + C.g + ")");
      attr(body, "transform", "rotate(" + r3(pitch) + " " + C.half + " -27)");
      var turn = r2(((x / 13) * 57.29578) % 360);
      for (var i = 0; i < wheels.length; i++) attr(wheels[i], "transform", "rotate(" + turn + " " + wheelX[i] + " -13)");

      var m = EASE(part(t, LAP.mount, 0.35));
      attr(cam, "transform", "translate(0 " + r2(-14 * (1 - m)) + ")");
      attr(cam, "opacity", r3(m));
      attr(lit, "opacity", r3(part(t, LAP.lit, 0.15)));
      var b = EASE(part(t, LAP.beam, 0.4));
      attr(beam, "opacity", r3(b));
      attr(scanned, "opacity", r3(b));
      var reach = Math.max(scanFrom, x + C.scan[1]);
      attr(scan, "width", r2(reach - scanFrom));
      attr(heat, "width", r2(reach - scanFrom + 60));
      attr(feather, "x1", r2(reach - 60));
      attr(feather, "x2", r2(reach));
      attr(state, "opacity", r3(1 - EASE(part(t, LAP.clear, 0.4))));

      for (var j = 0; j < boxes.length; j++) {
        var bx = C.boxes[j];
        var pin = C.pins[j];
        var d = BY_RANK[pin.rank];
        var show = EASE(part(t, LAP.detect + DETECT[j], pin.rank ? 0.3 : 0.45));
        var hide = EASE(part(t, LAP.pins + d, 0.2));
        // the leak's box closes in on it like a lock-on; the others just settle
        var s = (pin.rank ? 0.92 + 0.08 * show : 1.3 - 0.3 * show) * (1 - 0.1 * hide);
        attr(boxes[j], "opacity", r3(Math.min(1, show * 2) * (1 - hide)));
        attr(boxes[j], "transform", about(s, s, (bx[0] + bx[2]) / 2, (bx[1] + bx[3]) / 2));

        var rise = EASE(part(t, LAP.pins + d, 0.45));
        var fly = MOVE(part(t, LAP.fly + d, 0.7));
        var drop = EASE(part(t, LAP.fly + d, 0.3));
        var base = C.g - 20;
        var top = mix(base, pin.top, rise);
        attr(stems[j], "d", "M" + pin.x + " " + base + "V" + r2(mix(top, base, drop)));
        attr(stems[j], "opacity", r3(rise > 0 ? 1 - drop : 0));
        var slot = C.slots[pin.rank];
        var px = pin.x;
        var py = top;
        var size = pin.size;
        if (fly > 0) {
          // an arc over the yard into its row
          var cx = (pin.x + slot[0]) / 2;
          var cy = Math.min(pin.top, slot[1]) - 50;
          var u = 1 - fly;
          px = u * u * pin.x + 2 * u * fly * cx + fly * fly * slot[0];
          py = u * u * pin.top + 2 * u * fly * cy + fly * fly * slot[1];
          size = mix(pin.size, 8, fly);
        }
        attr(marks[j], "transform", "translate(" + r2(px) + " " + r2(py) + ") scale(" + r2(size) + ")");
        attr(marks[j], "opacity", r3(Math.min(1, rise * 4)));
      }

      var c = EASE(part(t, LAP.card, 0.3));
      attr(card, "opacity", r3(c));
      attr(card, "transform", about(0.96 + 0.04 * c, 0.96 + 0.04 * c, C.card[0], C.card[1] + C.card[3]));
      for (var k = 0; k < bars.length; k++) {
        // a row fills in as its mark lands
        var filled = EASE(part(t, LAP.fly + BY_RANK[k] + 0.62, 0.35));
        attr(bars[k], "transform", about(filled, 1, 882, 0));
      }

      // steam keeps rising over the chamber whatever the truck does
      for (var n = 0; n < wisps.length; n++) {
        var p = (now / 4200 + n / wisps.length) % 1;
        attr(wisps[n], "cx", r2(C.hatch[0] + 4 + p * 18 + 5 * Math.sin(p * 5 + n)));
        attr(wisps[n], "cy", r2(C.hatch[1] - 8 - p * 120));
        attr(wisps[n], "r", r2(10 + p * 26));
        attr(wisps[n], "opacity", r3(Math.min(1, p * 4) * (1 - p)));
      }

      if (viewW < C.w) {
        var camera = camX(t);
        attr(svg, "viewBox", r2(camera) + " 0 " + viewW + " " + C.h);
        attr(far, "transform", "translate(" + r2(camera * 0.45) + " 0)"); // the far blocks drift slower
      }

      var at = stepAt(t);
      if (at !== active) setActive(at);
    }

    function frame(now) {
      var dt = Math.min(0.05, Math.max(0, (now - lastNow) / 1000));
      lastNow = now;
      clock = ((now - startedAt) / 1000) % LAP.end;
      // the body sits on springs (stiffness 100, damping 10)
      var target = lean(clock);
      var n = Math.max(1, Math.ceil(dt * 240));
      for (var i = 0; i < n; i++) {
        pitchV += (-100 * (pitch - target) - 10 * pitchV) * (dt / n);
        pitch += pitchV * (dt / n);
      }
      render(clock, now);
      raf = requestAnimationFrame(frame);
    }
    function play() {
      if (raf || reduce) return;
      lastNow = performance.now();
      startedAt = lastNow - clock * 1000;
      raf = requestAnimationFrame(frame);
    }
    function pause() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function show(t) {
      clock = t;
      startedAt = performance.now() - t * 1000;
      pitch = reduce ? 0 : lean(t);
      pitchV = 0;
      render(t, reduce ? 1500 : performance.now());
    }

    function measure() {
      var next = Math.round(Math.max(640, Math.min(C.w, (scene.clientWidth || C.w) * 1.6)));
      if (next === viewW) return;
      viewW = next;
      svg.style.aspectRatio = viewW + " / " + C.h;
      attr(svg, "viewBox", "0 0 " + viewW + " " + C.h);
      attr(far, "transform", "translate(0 0)");
      if (!raf) show(clock);
    }

    function onStep(e) {
      var sel = window.getSelection && window.getSelection();
      if (sel && String(sel)) return; // selecting text, not picking a step
      var i = Array.prototype.indexOf.call(steps, e.currentTarget);
      if (reduce) {
        still = i;
        show(stillAt(i));
        return;
      }
      show(i === 0 ? 0 : LAP.legs[i - 1][0]); // from the stop before, so the truck drives in
    }
    for (var k = 0; k < steps.length; k++) steps[k].addEventListener("click", onStep);

    function onVisibility() {
      if (visible && !document.hidden) play();
      else pause();
    }
    document.addEventListener("visibilitychange", onVisibility);
    var io = null;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver(
        function (entries) {
          var e = entries[entries.length - 1];
          visible = e.isIntersecting && e.intersectionRatio >= 0.2;
          onVisibility();
        },
        { threshold: [0, 0.2] }
      );
      io.observe(scene);
    } else {
      visible = true;
    }
    var ro = window.ResizeObserver ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(scene);
    else window.addEventListener("resize", measure);

    measure();
    // reduced motion: no drive, the steps switch between stills
    show(reduce ? stillAt(still) : 0);
    if (!io) onVisibility();

    return {
      el: el,
      destroy: function () {
        pause();
        if (io) io.disconnect();
        if (ro) ro.disconnect();
        else window.removeEventListener("resize", measure);
        document.removeEventListener("visibilitychange", onVisibility);
      },
    };
  }

  function initRoute() {
    var el = document.querySelector("[data-route]");
    if (route && route.el === el) return;
    if (route) route.destroy();
    route = el ? makeRoute(el) : null;
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
          syncThemeColor();
        });
      }
    }

    var langLinks = document.querySelectorAll("[data-lang-link]");
    for (var j = 0; j < langLinks.length; j++) {
      if (langLinks[j].hasAttribute("data-bound")) continue;
      langLinks[j].setAttribute("data-bound", "");
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
          if (reducedMotion()) {
            notice.hidden = true;
            return;
          }
          // leaves faster than it came in (150ms vs 300ms), see .cookie--leaving
          notice.classList.add("cookie--leaving");
          setTimeout(function () {
            notice.hidden = true;
            notice.classList.remove("cookie--leaving");
          }, 160);
        });
      }
    }

    var video = document.querySelector(".hero__video");
    if (video && window.matchMedia) {
      // the portrait cut has its own first frame
      if (window.matchMedia("(max-aspect-ratio: 4/5)").matches && video.poster.indexOf("poster-portrait") < 0) {
        video.poster = video.getAttribute("poster").replace("poster.jpg", "poster-portrait.jpg");
      }
      if (reducedMotion()) {
        video.pause();
      } else {
        var playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      }
    }

    initRoute();
    syncHeader();
    syncThemeColor();
    if (!scrollBound) {
      scrollBound = true;
      window.addEventListener("scroll", syncHeader, { passive: true });
      // iOS Safari applies :active (the press feedback) only when a touch listener exists
      document.addEventListener("touchstart", function () {}, { passive: true });
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
