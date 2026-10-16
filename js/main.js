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

  var featuredEl = document.getElementById("featured");
  var gridEl = document.getElementById("project-grid");
  var toggleBtn = document.getElementById("toggle-all");

  function statusBadge(p) {
    return p.status ? '<span class="badge badge-' + p.status + '">' + esc(t("status." + p.status)) + "</span>" : "";
  }

  function renderProjects() {
    var featured = PROJECTS.filter(function (p) { return p.featured; })[0] || PROJECTS[0];

    var stats = [];
    if (featured.floors) stats.push(icon("building") + "<span>" + featured.floors + " " + esc(t("stat.floors")) + "</span>");
    if (featured.apartments) stats.push(icon("home") + "<span>" + featured.apartments + " " + esc(t("stat.apartments")) + "</span>");
    if (featured.delivery) stats.push(icon("calendar") + "<span>" + esc(featured.delivery[lang] || featured.delivery) + "</span>");

    featuredEl.innerHTML =
      '<article class="featured" data-id="' + featured.id + '" tabindex="0" role="button">' +
        '<img src="' + featured.img + '" alt="' + esc(featured.name[lang]) + '" loading="lazy">' +
        '<div class="featured-body">' +
          "<h3>" + esc(featured.name[lang]) + "</h3>" +
          '<p class="loc">' + esc(featured.location[lang]) + "</p>" +
          statusBadge(featured) +
          (stats.length
            ? '<ul class="featured-stats">' + stats.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>"
            : '<p class="featured-desc">' + esc(featured.desc[lang]) + "</p>") +
        "</div>" +
        '<span class="round-arrow">' + icon("arrow") + "</span>" +
      "</article>";

    gridEl.innerHTML = PROJECTS.filter(function (p) { return p !== featured; }).map(function (p) {
      return '<article class="tile" data-id="' + p.id + '" tabindex="0" role="button">' +
        '<div class="tile-img"><img src="' + p.img + '" alt="' + esc(p.name[lang]) + '" loading="lazy">' + statusBadge(p) + "</div>" +
        "<h3>" + esc(p.name[lang]) + "</h3>" +
        '<p class="loc">' + icon("pin") + esc(p.location[lang]) + "</p>" +
      "</article>";
    }).join("");

    document.getElementById("project-count").dataset.count = PROJECTS.length;
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

  document.getElementById("projects").addEventListener("click", function (e) {
    var card = e.target.closest("[data-id]");
    if (card) openProject(card.dataset.id);
  });
  document.getElementById("projects").addEventListener("keydown", function (e) {
    var card = e.target.closest("[data-id]");
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

  document.getElementById("year").textContent = new Date().getFullYear();
  applyLang(lang);
})();
