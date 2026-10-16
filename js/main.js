(function () {
  "use strict";

  var LANGS = ["ka", "en"];
  var lang = pickLang();

  function pickLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(fromUrl) > -1) return fromUrl;
    try {
      var saved = localStorage.getItem("lang");
      if (LANGS.indexOf(saved) > -1) return saved;
    } catch (e) {}
    return "ka";
  }

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.ka[key] || "";
  }

  function icon(name) {
    return '<svg aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- i18n ---------- */

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.dataset.i18nAttr.split(";").forEach(function (pair) {
        var p = pair.split(":");
        el.setAttribute(p[0], t(p[1]));
      });
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    renderProjects();
    syncToggleLabel();
  }

  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.dataset.lang); });
  });

  /* ---------- projects ---------- */

  var carouselEl = document.getElementById("carousel");
  var trackEl = document.getElementById("carousel-track");
  var dotsEl = document.getElementById("carousel-dots");
  var gridEl = document.getElementById("project-grid");
  var toggleBtn = document.getElementById("toggle-all");
  var highlights = PROJECTS.filter(function (p) { return p.highlight; }).slice(0, 5);

  function statusBadge(p) {
    return p.status ? '<span class="badge badge-' + p.status + '">' + esc(t("status." + p.status)) + "</span>" : "";
  }

  function renderCarousel() {
    trackEl.innerHTML = highlights.map(function (p, i) {
      return '<article class="slide" data-id="' + p.id + '" tabindex="0" role="button" aria-label="' + esc(p.name[lang]) + '">' +
        '<img src="' + p.img + '" alt="" ' + (i < 2 ? "" : 'loading="lazy"') + ">" +
        statusBadge(p) +
        '<div class="slide-body">' +
          "<h3>" + esc(p.name[lang]) + "</h3>" +
          '<p class="loc">' + icon("pin") + esc(p.location[lang]) + "</p>" +
        "</div>" +
        '<span class="round-arrow">' + icon("arrow") + "</span>" +
      "</article>";
    }).join("");
    dotsEl.innerHTML = highlights.map(function (p, i) {
      return '<button type="button" data-slide="' + i + '" aria-label="' + (i + 1) + " / " + highlights.length + '"></button>';
    }).join("");
    slideIndex = 0;
    trackEl.scrollLeft = 0;
    syncDots();
  }

  function renderGrid() {
    gridEl.innerHTML = PROJECTS.filter(function (p) { return highlights.indexOf(p) < 0; }).map(function (p) {
      return '<article class="tile" data-id="' + p.id + '" tabindex="0" role="button">' +
        '<div class="tile-img"><img src="' + p.img + '" alt="' + esc(p.name[lang]) + '" loading="lazy">' + statusBadge(p) + "</div>" +
        "<h3>" + esc(p.name[lang]) + "</h3>" +
        '<p class="loc">' + icon("pin") + esc(p.location[lang]) + "</p>" +
      "</article>";
    }).join("");
  }

  function renderProjects() {
    if (trackEl) renderCarousel();
    if (gridEl) renderGrid();
    var countEl = document.getElementById("project-count");
    if (countEl) countEl.dataset.count = PROJECTS.length;
  }

  /* carousel: native scroll-snap, arrows + dots + gentle autoplay */

  function slideWidth() {
    var s = trackEl.querySelector(".slide");
    return s ? s.getBoundingClientRect().width + parseFloat(getComputedStyle(trackEl).columnGap || 0) : 0;
  }

  var slideIndex = 0;

  function maxIndex() {
    var w = slideWidth();
    return w ? Math.max(0, Math.round((trackEl.scrollWidth - trackEl.clientWidth) / w)) : 0;
  }

  function goTo(i) {
    var max = maxIndex();
    slideIndex = i > max ? 0 : i < 0 ? max : i;
    trackEl.scrollTo({ left: slideIndex * slideWidth(), behavior: "smooth" });
    syncDots();
  }

  function step(dir) {
    goTo(slideIndex + dir);
  }

  function syncDots() {
    var active = slideIndex >= maxIndex() ? highlights.length - 1 : slideIndex;
    dotsEl.querySelectorAll("button").forEach(function (b, n) {
      b.setAttribute("aria-current", String(n === active));
    });
  }

  if (carouselEl) {
    carouselEl.querySelector("[data-prev]").addEventListener("click", function () { step(-1); });
    carouselEl.querySelector("[data-next]").addEventListener("click", function () { step(1); });
    dotsEl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-slide]");
      if (b) goTo(Math.min(+b.dataset.slide, maxIndex()));
    });
    // Keep the index in sync when the user swipes the track themselves.
    var settle;
    trackEl.addEventListener("scroll", function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var w = slideWidth();
        if (!w) return;
        slideIndex = Math.min(maxIndex(), Math.round(trackEl.scrollLeft / w));
        syncDots();
      }, 150);
    }, { passive: true });

    var paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
    ["mouseenter", "focusin", "touchstart"].forEach(function (ev) {
      carouselEl.addEventListener(ev, function () { paused = true; }, { passive: true });
    });
    carouselEl.addEventListener("mouseleave", function () { paused = false; });
    setInterval(function () {
      if (!paused && !document.hidden) step(1);
    }, 5000);
  }

  function syncToggleLabel() {
    var open = !gridEl.hidden;
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.classList.toggle("is-open", open);
    toggleBtn.querySelector("span").textContent = t(open ? "projects.less" : "projects.all");
  }

  toggleBtn.addEventListener("click", function () {
    gridEl.hidden = !gridEl.hidden;
    syncToggleLabel();
  });

  /* ---------- modal ---------- */

  var modal = document.getElementById("project-modal");

  function openProject(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    modal.querySelector(".modal-img").src = p.img;
    modal.querySelector(".modal-img").alt = p.name[lang];
    modal.querySelector(".modal-title").textContent = p.name[lang];
    modal.querySelector(".modal-loc span").textContent = p.location[lang];
    modal.querySelector(".modal-desc").textContent = p.desc[lang];
    if (modal.showModal) modal.showModal(); else modal.setAttribute("open", "");
  }

  document.addEventListener("click", function (e) {
    var card = e.target.closest("main [data-id]");
    if (card) openProject(card.dataset.id);
  });
  document.addEventListener("keydown", function (e) {
    var card = e.target.closest("main [data-id]");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProject(card.dataset.id); }
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.closest("[data-close]")) modal.close();
  });

  /* ---------- mobile nav ---------- */

  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  function setNav(open) {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }
  burger.addEventListener("click", function () { setNav(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });

  /* ---------- counters ---------- */

  function runCounter(el) {
    var end = +el.dataset.count, start = performance.now(), dur = 1600;
    (function step(now) {
      var k = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(start);
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.dataset.count; });
  }

  applyLang(lang);
})();
