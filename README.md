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
- `2/`: the building page with floors, apartments, parking and commercial spaces. `2/units.js` holds parking and commercial data, `2/sales.js` loads status and price from Supabase.
- `admin/`: a simple admin page to mark units as sold and set prices.
- `assets/`: ARI logo (`ari-logo.svg` full, `ari-mark.svg` mark only), plus photos and video taken from ari.ge.

## Admin (sales on /2)

Status and price for each apartment, parking space and commercial space live in Supabase. `/2` reads them, and `/admin/` changes them. Units missing from the table show as for sale with no price.

One-time setup:

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run `supabase/schema.sql`.
3. In **Authentication → Users**, add the admin user (email + password). In **Authentication → Sign In / Providers**, turn off "Allow new users to sign up".
4. Back in **SQL Editor**, give that email write access: `insert into public.admins (email) values ('admin@example.com');`
5. In **Project Settings → API**, copy the Project URL and the `anon` public key into `URL` and `KEY` at the top of `2/sales.js`.

Then open `/admin/`, sign in, and change status or price. Changes appear on `/2` on the next page load.
