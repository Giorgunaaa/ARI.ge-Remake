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
    renderMap();
  }

  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.dataset.lang); });
  });

  /* ---------- projects ---------- */

  function renderProjects() {
    var countEl = document.getElementById("project-count");
    if (countEl) countEl.dataset.count = PROJECTS.length;
  }

  /* ---------- hero map ---------- */

  // Static map of central Tbilisi: no panning, zoom only (buttons, pinch, double-click).
  var mapEl = document.getElementById("projects");
  var map, mapLayer;
  var MAP_CENTER = [41.708, 44.795];

  function pinIcon(p) {
    var s = p.highlight ? 52 : 40;
    var tip = Math.round(s / 2 + s * 0.7071);
    return L.divIcon({
      className: "pin" + (p.highlight ? " pin-lg" : ""),
      html: '<span class="pin-inner"><span class="pin-drop" style="width:' + s + "px;height:" + s + 'px"><img src="' + p.img + '" alt=""></span></span>',
      iconSize: [s, tip],
      iconAnchor: [s / 2, tip],
      popupAnchor: [0, -tip - 4]
    });
  }

  function mapCard(p) {
    return '<button type="button" class="map-card" data-id="' + p.id + '">' +
      '<img src="' + p.img + '" alt="">' +
      '<span class="map-card-body"><strong>' + esc(p.name[lang]) + "</strong>" +
      '<span class="loc">' + icon("pin") + esc(p.location[lang]) + "</span></span>" +
      '<span class="map-card-go">' + icon("arrow") + "</span>" +
    "</button>";
  }

  function isWide() {
    return mapEl.clientWidth >= 900;
  }

  // Where the map's visual centre sits: pushed right on wide screens so the copy stays clear.
  function focusPoint() {
    return L.point(mapEl.clientWidth * (isWide() ? 0.7 : 0.5), mapEl.clientHeight / 2);
  }

  function fitMap() {
    map.setView(MAP_CENTER, isWide() ? 13 : 12, { animate: false });
    if (isWide()) map.panBy([-mapEl.clientWidth * 0.2, 0], { animate: false });
  }

  function zoomBy(delta) {
    var z = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), map.getZoom() + delta));
    map.setZoomAround(focusPoint(), z);
  }

  function addControls() {
    var box = L.DomUtil.create("div", "map-controls", mapEl);
    box.innerHTML =
      '<div class="map-zoom">' +
        '<button type="button" data-zoom="1" aria-label="Zoom in"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>' +
        '<button type="button" data-zoom="-1" aria-label="Zoom out"><svg viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>' +
      "</div>" +
      '<button type="button" class="map-reset" data-reset aria-label="Reset view"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>';
    L.DomEvent.disableClickPropagation(box);
    box.addEventListener("click", function (e) {
      var z = e.target.closest("[data-zoom]");
      if (z) return zoomBy(+z.dataset.zoom);
      if (e.target.closest("[data-reset]")) {
        map.closePopup();
        fitMap();
      }
    });
  }

  function renderMap() {
    if (!mapEl || typeof L === "undefined") return;

    if (!map) {
      map = L.map(mapEl, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: "center",
        doubleClickZoom: "center",
        minZoom: 12,
        maxZoom: 16,
        zoomSnap: 0.5,
        fadeAnimation: false
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      // Bottom corners sit under the fade and the features card, so attribution goes up top.
      map.attributionControl.setPosition("topright");
      addControls();
      fitMap();
      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { map.invalidateSize(); fitMap(); }, 200);
      });
    }

    if (mapLayer) mapLayer.remove();
    mapLayer = L.layerGroup().addTo(map);

    var opened;
    PROJECTS.forEach(function (p) {
      if (!p.coords) return;
      var m = L.marker(p.coords, { icon: pinIcon(p), title: p.name[lang], riseOnHover: true, zIndexOffset: p.highlight ? 500 : 0 })
        .bindPopup(mapCard(p), { className: "map-popup", closeButton: false, autoPan: false, maxWidth: 320, minWidth: 260 })
        .addTo(mapLayer);
      if (p.highlight && !opened) opened = m;
    });
    if (opened && isWide()) opened.openPopup();
  }

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
