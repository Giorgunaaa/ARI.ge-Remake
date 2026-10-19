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
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
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
  var map, mapLayer, leaderLayer, markers = [];
  var MAP_CENTER = [41.708, 44.795];

  // Fisheye-lens version of a project photo, drawn once on a canvas and cached as a data URL.
  var fisheyeCache = {};

  function fisheye(p, done) {
    if (fisheyeCache[p.id]) return done(fisheyeCache[p.id]);
    var focus = p.fisheye || { x: .5, y: .45 };
    var img = new Image();
    img.onload = function () {
      var OUT = 360, SRC = OUT * 2;
      // square crop around the focus point, sampled at 2x for a crisp result
      var side = Math.min(img.naturalWidth, img.naturalHeight);
      var sx = Math.max(0, Math.min(img.naturalWidth - side, img.naturalWidth * focus.x - side / 2));
      var sy = Math.max(0, Math.min(img.naturalHeight - side, img.naturalHeight * focus.y - side / 2));
      var src = document.createElement("canvas");
      src.width = src.height = SRC;
      var sctx = src.getContext("2d");
      sctx.filter = "saturate(1.3) contrast(1.1) brightness(1.05)";
      sctx.drawImage(img, sx, sy, side, side, 0, 0, SRC, SRC);
      var from = sctx.getImageData(0, 0, SRC, SRC).data;

      var out = document.createElement("canvas");
      out.width = out.height = OUT;
      var ctx = out.getContext("2d");
      var dst = ctx.createImageData(OUT, OUT);
      var c = OUT / 2;
      for (var y = 0; y < OUT; y++) {
        for (var x = 0; x < OUT; x++) {
          var dx = (x + .5 - c) / c, dy = (y + .5 - c) / c;
          var r = Math.sqrt(dx * dx + dy * dy);
          if (r > 1) continue;
          // barrel distortion: centre gently magnified, edges squeezed like a fisheye lens
          var k = 0.78 + 0.22 * r * r;
          var u = Math.min(SRC - 1, Math.max(0, Math.round((dx * k + 1) / 2 * (SRC - 1))));
          var v = Math.min(SRC - 1, Math.max(0, Math.round((dy * k + 1) / 2 * (SRC - 1))));
          var i = (y * OUT + x) * 4, j = (v * SRC + u) * 4;
          dst.data[i] = from[j]; dst.data[i + 1] = from[j + 1]; dst.data[i + 2] = from[j + 2]; dst.data[i + 3] = 255;
        }
      }
      ctx.putImageData(dst, 0, 0);

      // glass sphere: darker rim + soft highlight at the top
      var rim = ctx.createRadialGradient(c, c, c * .7, c, c, c);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,0,.22)");
      ctx.fillStyle = rim;
      ctx.beginPath(); ctx.arc(c, c, c, 0, Math.PI * 2); ctx.fill();
      var shine = ctx.createRadialGradient(c * .7, c * .45, 0, c * .7, c * .45, c * .75);
      shine.addColorStop(0, "rgba(255,255,255,.35)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      ctx.beginPath(); ctx.arc(c, c, c, 0, Math.PI * 2); ctx.fill();

      done(fisheyeCache[p.id] = out.toDataURL("image/jpeg", .9));
    };
    img.src = p.img;
  }

  var PIN_HOVER = 92; // px, size of a pin's photo while hovered

  function pinIcon(p) {
    var s = p.highlight ? 52 : 40;
    var tip = Math.round(s / 2 + s * 0.7071);
    var src = fisheyeCache[p.id] || p.img;
    return L.divIcon({
      className: "pin" + (p.highlight ? " pin-lg" : ""),
      // every pin grows to the same size on hover, whatever its resting size
      html: '<span class="pin-inner" style="--grow:' + (PIN_HOVER / s).toFixed(3) + '"><span class="pin-drop" style="width:' + s + "px;height:" + s + 'px"><img src="' + src + '" alt=""></span></span>',
      iconSize: [s, tip],
      iconAnchor: [s / 2, tip],
      popupAnchor: [0, -tip - 4]
    });
  }

  function isWide() {
    return mapEl.clientWidth >= 900;
  }

  function focusPoint() {
    return L.point(mapEl.clientWidth / 2, mapEl.clientHeight / 2);
  }

  // Frame every project pin: room on top for the faded edge plus the pin height,
  // on the right for the zoom buttons.
  function fitMap() {
    var pts = PROJECTS.filter(function (p) { return p.coords; }).map(function (p) { return p.coords; });
    if (!pts.length) return map.setView(MAP_CENTER, 12, { animate: false });
    var fade = parseFloat(getComputedStyle(mapEl).getPropertyValue("--map-fade")) || 80;
    map.fitBounds(L.latLngBounds(pts), {
      paddingTopLeft: [isWide() ? 60 : 30, fade + 64],
      paddingBottomRight: [isWide() ? 90 : 60, 12],
      animate: false
    });
    declutter();
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
        fitMap();
      }
    });
  }

  // Pins in the dense centre overlap, so push their heads apart until none touch.
  // A displaced pin keeps a dot + thin line back to its real address.
  function declutter() {
    if (!map || !markers.length) return;
    leaderLayer.clearLayers();
    var nodes = markers.map(function (o) {
      var pt = map.latLngToContainerPoint(o.p.coords);
      var head = o.s * 0.7071;
      return { o: o, x: pt.x, y: pt.y - head, x0: pt.x, y0: pt.y - head, r: o.s / 2 + 3 };
    });
    // keep every head inside the visible map: below the faded top, clear of the zoom buttons
    var W = mapEl.clientWidth, H = mapEl.clientHeight;
    var fade = parseFloat(getComputedStyle(mapEl).getPropertyValue("--map-fade")) || 80;
    var right = W - (isWide() ? 76 : 64);
    function clamp(n) {
      var head = n.o.s * 0.7071;
      n.x = Math.max(n.r + 4, Math.min(right - n.r, n.x));
      n.y = Math.max(fade * .7 + n.r, Math.min(H - 8 - head, n.y));
    }
    for (var it = 0; it < 200; it++) {
      var moved = false;
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var a = nodes[i], b = nodes[j];
          var dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy), min = a.r + b.r;
          if (d >= min) continue;
          if (d < .01) { dx = Math.cos(i + j); dy = Math.sin(i + j); d = 1; }
          var push = (min - d) / 2 + .5;
          a.x -= dx / d * push; a.y -= dy / d * push;
          b.x += dx / d * push; b.y += dy / d * push;
          moved = true;
        }
      }
      nodes.forEach(clamp);
      if (!moved) break;
    }
    nodes.forEach(function (n) {
      var head = n.o.s * 0.7071;
      n.o.m.setLatLng(map.containerPointToLatLng([n.x, n.y + head]));
      if (Math.abs(n.x - n.x0) + Math.abs(n.y - n.y0) < 3) return;
      var tip = map.containerPointToLatLng([n.x, n.y + head]);
      L.polyline([n.o.p.coords, tip], { color: "#d2402b", weight: 1.5, opacity: .8, interactive: false }).addTo(leaderLayer);
      L.circleMarker(n.o.p.coords, { radius: 3, color: "#d2402b", weight: 1.5, fillColor: "#fff", fillOpacity: 1, interactive: false }).addTo(leaderLayer);
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
        minZoom: 10,
        maxZoom: 16,
        zoomSnap: 0.1,
        fadeAnimation: false
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      // The top edge fades out, so attribution goes bottom right.
      map.attributionControl.setPosition("bottomright");
      addControls();
      leaderLayer = L.layerGroup().addTo(map);
      map.on("zoomend", declutter);
      fitMap();
      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { map.invalidateSize(); fitMap(); }, 200);
      });
    }

    if (mapLayer) mapLayer.remove();
    mapLayer = L.layerGroup().addTo(map);

    markers = [];
    PROJECTS.forEach(function (p) {
      if (!p.coords) return;
      var m = L.marker(p.coords, { icon: pinIcon(p), title: p.name[lang], riseOnHover: true, riseOffset: 100000, zIndexOffset: p.highlight ? 500 : 0 })
        .on("click", function () { openProject(p.id); })
        .addTo(mapLayer);
      fisheye(p, function (url) {
        var el = m.getElement();
        if (el) el.querySelector("img").src = url;
      });
      markers.push({ p: p, m: m, s: p.highlight ? 52 : 40 });
    });
    declutter();
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
    modal.querySelector(".modal-link").href = "project.html?id=" + encodeURIComponent(p.id);
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
