# ARI.ge Remake

A static rebuild of [ari.ge](https://ari.ge) in plain HTML, CSS and JS, with Georgian (default) and English versions.

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173. Add `?lang=en` to the URL to load the English version.

## Structure

- `index.html`: the home page (hero, project map, about, contacts). Text is pulled in through `data-i18n` keys.
- `projects.html`: all projects as cards.
- `project.html?id=<project id>`: one project, laid out like ari.ge: an info panel (description, photo groups, details, previous/next) beside an autoplay photo slider. Its photos come from the project's `gallery` groups in `js/projects.js` (photos live in `assets/img/projects/<id>/`).
- `js/layout.js`: header, footer, contact bar and project modal, injected into the page.
- `css/style.css`: styles, built mobile-first.
- `js/i18n.js`: all UI text in KA and EN.
- `js/projects.js`: the project list. Fill in `floors`, `apartments` and `delivery` to show stats on the featured card.
- `js/main.js`: language switch, project map, modal, menu and counters.
- `js/pages.js`: renders `projects.html` and `project.html`.
- `assets/`: ARI logo (`ari-logo.svg` full, `ari-mark.svg` mark only), plus photos and video taken from ari.ge.
