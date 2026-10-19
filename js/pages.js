// Projects list (projects.html) and single project (project.html?id=…).
// Re-renders on the "langchange" event fired by main.js, so load it before main.js.
(function () {
  "use strict";

  var page = document.body.dataset.page;
  if (page !== "projects" && page !== "project") return;

  var root = document.getElementById("page-root");

  function tr(lang, key) {
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

  function url(p) {
    return "project.html?id=" + encodeURIComponent(p.id);
  }

  function badge(p, lang) {
    return p.status ? '<span class="status-badge is-' + p.status + '">' + esc(tr(lang, "status." + p.status)) + "</span>" : "";
  }

  /* ---------- list ---------- */

  function renderList(lang) {
    document.title = tr(lang, "meta.projects");
    root.querySelector(".projects-grid").innerHTML = PROJECTS.map(function (p) {
      return '<a class="project-card" href="' + url(p) + '">' +
        '<span class="project-card-media"><img src="' + p.img + '" alt="" loading="lazy">' + badge(p, lang) + "</span>" +
        '<span class="project-card-body">' +
          "<strong>" + esc(p.name[lang]) + "</strong>" +
          '<span class="loc">' + icon("pin") + esc(p.location[lang]) + "</span>" +
          '<span class="desc">' + esc(p.desc[lang]) + "</span>" +
          '<span class="project-card-go">' + esc(tr(lang, "modal.more")) + icon("arrow") + "</span>" +
        "</span>" +
      "</a>";
    }).join("");
  }

  /* ---------- single project ---------- */
  // Split view like ari.ge: a scrolling info panel on the left, a photo slider
  // (autoplay, dots, progress, thumbnails strip) on the right.

  var box, boxPhotos = [], boxAt = 0;

  function lightbox() {
    if (box) return box;
    document.body.insertAdjacentHTML("beforeend",
      '<dialog class="lightbox" id="lightbox">' +
        '<img class="lightbox-img" alt="">' +
        '<button type="button" class="lightbox-btn lightbox-close" data-box="close" aria-label="Close">' + icon("close") + "</button>" +
        '<button type="button" class="lightbox-btn lightbox-prev" data-box="-1" aria-label="Previous">' + icon("arrow") + "</button>" +
        '<button type="button" class="lightbox-btn lightbox-next" data-box="1" aria-label="Next">' + icon("arrow") + "</button>" +
        '<p class="lightbox-count"></p>' +
      "</dialog>");
    box = document.getElementById("lightbox");
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-box]");
      if (b) return b.dataset.box === "close" ? box.close() : show(boxAt + +b.dataset.box);
      if (e.target === box) box.close();
    });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(boxAt + 1);
      if (e.key === "ArrowLeft") show(boxAt - 1);
    });
    return box;
  }

  function show(i) {
    boxAt = (i + boxPhotos.length) % boxPhotos.length;
    box.querySelector(".lightbox-img").src = boxPhotos[boxAt];
    box.querySelector(".lightbox-count").textContent = (boxAt + 1) + " / " + boxPhotos.length;
  }

  var SLIDE_MS = 6000;
  var slider = null;

  function pad(n) {
    return "." + (n < 10 ? "0" : "") + n;
  }

  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  var PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>';

  function startSlider(photos, lang) {
    var el = root.querySelector(".project-stage");
    var track = el.querySelector(".slides-track");
    var dots = el.querySelectorAll(".slider-dots button");
    var thumbs = root.querySelectorAll("[data-go]");
    var bar = el.querySelector(".slider-progress i");
    var playBtn = el.querySelector("[data-slide=play]");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var st = { at: 0, timer: 0, playing: photos.length > 1 && !reduce };

    function go(i) {
      st.at = (i + photos.length) % photos.length;
      track.style.transform = "translateX(" + (-100 * st.at) + "%)";
      el.querySelector(".slider-count").textContent = pad(st.at + 1);
      dots.forEach(function (d, k) { d.setAttribute("aria-current", String(k === st.at)); });
      thumbs.forEach(function (t) { t.classList.toggle("is-active", +t.dataset.go === st.at); });
      tick();
    }

    function tick() {
      clearTimeout(st.timer);
      bar.style.animation = "none";
      void bar.offsetWidth;
      if (!st.playing) return;
      bar.style.animation = "slide-progress " + SLIDE_MS + "ms linear forwards";
      st.timer = setTimeout(function () { go(st.at + 1); }, SLIDE_MS);
    }

    function setPlaying(on) {
      st.playing = on;
      playBtn.innerHTML = on ? PAUSE : PLAY;
      playBtn.setAttribute("aria-label", tr(lang, on ? "slider.pause" : "slider.play"));
      tick();
    }

    root.querySelector(".project-split").addEventListener("click", function (e) {
      var t = e.target.closest("[data-go]");
      if (t) return go(+t.dataset.go);
      var b = e.target.closest("[data-slide]");
      if (!b) return;
      var k = b.dataset.slide;
      if (k === "prev") go(st.at - 1);
      else if (k === "next") go(st.at + 1);
      else if (k === "play") setPlaying(!st.playing);
      else if (k === "thumbs") {
        var open = el.classList.toggle("thumbs-open");
        b.setAttribute("aria-expanded", String(open));
      } else if (k === "panel") {
        var wide = root.querySelector(".project-split").classList.toggle("is-wide");
        b.setAttribute("aria-expanded", String(!wide));
      } else if (k === "open") {
        boxPhotos = photos;
        setPlaying(false);
        lightbox().showModal();
        show(st.at);
      }
    });

    // swipe on touch screens
    var x0 = null;
    track.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    track.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(st.at + (dx < 0 ? 1 : -1));
    });

    setPlaying(st.playing);
    go(0);
    return st;
  }

  function renderProject(lang) {
    if (slider) { clearTimeout(slider.timer); slider = null; }
    var id = new URLSearchParams(location.search).get("id");
    var i = PROJECTS.map(function (p) { return p.id; }).indexOf(id);
    if (i < 0) {
      document.title = tr(lang, "meta.projects");
      root.innerHTML = '<div class="container project-page"><a class="back-link" href="projects.html">' + icon("arrow") + esc(tr(lang, "project.back")) + "</a>" +
        '<p class="project-empty">' + esc(tr(lang, "project.notfound")) + "</p></div>";
      return;
    }
    var p = PROJECTS[i];
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];
    var groups = p.gallery && p.gallery.length ? p.gallery : [{ kind: null, photos: [p.img] }];
    var photos = groups.reduce(function (all, g) { return all.concat(g.photos); }, []);
    document.title = p.name[lang] + " — ARI Development";

    var n = 0;
    var panelGroups = groups.map(function (g) {
      return '<section class="panel-group">' +
        "<h3>" + esc(tr(lang, g.kind ? "gallery." + g.kind : "gallery.title")) + "</h3>" +
        '<div class="panel-thumbs">' + g.photos.map(function (src) {
          return '<button type="button" data-go="' + (n++) + '" aria-label="' + n + '"><img src="' + src + '" alt="" loading="lazy"></button>';
        }).join("") + "</div>" +
      "</section>";
    }).join("");

    root.innerHTML =
      '<div class="project-split">' +
        '<aside class="project-panel">' +
          '<a class="back-link" href="projects.html">' + icon("arrow") + esc(tr(lang, "project.back")) + "</a>" +
          '<header class="project-head">' +
            badge(p, lang) +
            "<h1>" + esc(p.name[lang]) + "</h1>" +
            '<p class="loc">' + icon("pin") + esc(p.location[lang]) + "</p>" +
          "</header>" +
          '<div class="panel-frame"><h2>' + esc(tr(lang, "project.about")) + "</h2></div>" +
          '<p class="panel-desc">' + esc(p.desc[lang]) + "</p>" +
          panelGroups +
          '<dl class="panel-facts">' +
            (p.status ? "<div><dt>" + esc(tr(lang, "project.status")) + "</dt><dd>" + esc(tr(lang, "status." + p.status)) + "</dd></div>" : "") +
            "<div><dt>" + esc(tr(lang, "project.location")) + "</dt><dd>" + esc(p.location[lang]) + "</dd></div>" +
            "<div><dt>" + esc(tr(lang, "gallery.title")) + "</dt><dd>" + photos.length + "</dd></div>" +
          "</dl>" +
          '<nav class="panel-nav" aria-label="Projects">' +
            '<a href="' + url(prev) + '"><small>' + esc(tr(lang, "project.prev")) + "</small><strong>" + esc(prev.name[lang]) + "</strong></a>" +
            '<a href="' + url(next) + '"><small>' + esc(tr(lang, "project.next")) + "</small><strong>" + esc(next.name[lang]) + "</strong></a>" +
          "</nav>" +
        "</aside>" +
        '<section class="project-stage" aria-roledescription="carousel" aria-label="' + esc(p.name[lang]) + '">' +
          '<div class="slides">' +
            '<div class="slides-track">' + photos.map(function (src, k) {
              return '<button type="button" class="slide" data-slide="open" aria-label="' + (k + 1) + " / " + photos.length + '">' +
                '<img src="' + src + '" alt="" ' + (k ? 'loading="lazy"' : "") + "></button>";
            }).join("") + "</div>" +
            (photos.length > 1 ?
              '<button type="button" class="slider-arrow is-prev" data-slide="prev" aria-label="' + esc(tr(lang, "slider.prev")) + '">' + icon("arrow") + "</button>" +
              '<button type="button" class="slider-arrow is-next" data-slide="next" aria-label="' + esc(tr(lang, "slider.next")) + '">' + icon("arrow") + "</button>" : "") +
            '<div class="slider-thumbs">' + photos.map(function (src, k) {
              return '<button type="button" data-go="' + k + '"><img src="' + src + '" alt="" loading="lazy"></button>';
            }).join("") + "</div>" +
          "</div>" +
          '<div class="slider-bar">' +
            '<span class="slider-count">.01</span>' +
            '<button type="button" class="slider-play" data-slide="play"></button>' +
            '<div class="slider-dots">' + photos.map(function (src, k) {
              return '<button type="button" data-go="' + k + '" aria-label="' + (k + 1) + '"></button>';
            }).join("") + "</div>" +
            '<span class="slider-progress"><i></i></span>' +
            '<button type="button" class="slider-thumbs-btn" data-slide="thumbs" aria-expanded="false">' + esc(tr(lang, "slider.thumbs")) + "</button>" +
            '<button type="button" class="slider-panel-btn" data-slide="panel" aria-expanded="true" aria-label="' + esc(tr(lang, "slider.panel")) + '"><span></span><span></span><span></span></button>' +
          "</div>" +
        "</section>" +
      "</div>";

    slider = startSlider(photos, lang);
  }

  document.addEventListener("langchange", function (e) {
    if (page === "projects") renderList(e.detail); else renderProject(e.detail);
  });
})();
