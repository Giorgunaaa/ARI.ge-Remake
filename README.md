# ARI.ge Remake

A static one-page rebuild of [ari.ge](https://ari.ge) in plain HTML, CSS and JS, with Georgian (default) and English versions.

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173. Add `?lang=en` to the URL to load the English version.

## Structure

- `index.html`: the whole site on one page (home, projects, about, contacts). Text is pulled in through `data-i18n` keys.
- `js/layout.js`: header, footer, contact bar and project modal, injected into the page.
- `css/style.css`: styles, built mobile-first.
- `js/i18n.js`: all UI text in KA and EN.
- `js/projects.js`: the project list. Fill in `floors`, `apartments` and `delivery` to show stats on the featured card.
- `js/main.js`: language switch, projects, modal, menu and counters.
- `assets/`: ARI logo (`ari-logo.svg` full, `ari-mark.svg` mark only), plus photos and video taken from ari.ge.
