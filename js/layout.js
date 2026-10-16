// Page chrome: icon sprite, header, footer, contact bar, project modal.
(function () {
  "use strict";

  var sprite =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 48 48"><path d="M24 5 9 10.5v11.2C9 32 15.4 40.3 24 43c8.6-2.7 15-11 15-21.3V10.5L24 5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m17.5 24 4.5 4.5 9-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-leaf" viewBox="0 0 48 48"><path d="M39 9C20 9 10 18 10 30c0 4 1.5 7 3 9 2-.5 4-.6 6-.6C31 38.4 39 28 39 9Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 41c6-10 13-17 22-23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-chart" viewBox="0 0 48 48"><path d="M7 8v32h34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m13 32 9-10 6 6 12-14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 14h7v7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-building" viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l6-4v17M11 21V3l8 4v14M8 10v.01M8 13v.01M8 16v.01M14 9h2M14 12h2M14 15h2M14 18h2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11 12 4l9 7M5 9.5V20h5v-6h4v6h5V9.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 16.5h2M11 16.5h2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" fill="currentColor"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-fb" viewBox="0 0 24 24"><path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.5h-3c-3.3 0-4 2.4-4 4v2H8V12h2v9.5h4V12h2.7l.4-3.5H14Z" fill="currentColor"/></symbol>' +
    '<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></symbol>' +
    '<symbol id="i-ari" viewBox="164 159 494 277"><path fill="currentColor" fill-rule="evenodd" d="M354.64 352.13L340.07 354.99L360.4 402.03L376.55 402.03L354.64 352.13M276.77 194.58L278.89 199.99L322.5 310.75L336.7 308.06L277.12 160.91L166.43 434.37L180.78 434.37L274.61 199.97L276.77 194.58M557 194.23C548.66 187.94 539.31 183.26 529.21 180.32C519.04 177.36 508.65 175.86 498.34 175.86L436.44 175.86L436.44 288.52L451.24 285.73L451.24 192.17L451.24 189.87L453.54 189.87L501.1 189.87C511.32 189.87 520.81 191.59 529.33 194.99C537.75 198.39 545.06 203.1 551.08 208.98C557.1 214.85 561.74 221.72 564.88 229.37C568.02 237.02 569.61 245.31 569.61 254.01C569.61 257.17 569.4 260.34 568.98 263.47L584.54 260.53C584.72 258.16 584.81 255.76 584.81 253.23C584.81 239.66 582.24 227.89 577.16 218.23C572.06 208.54 565.27 200.47 557 194.23M641.56 202.99L641.56 241.12L656.38 238.31L656.38 202.99L641.56 202.99M645.45 295.01L645.24 295.05L645.23 295.05L641.56 295.77L641.56 402.03L656.38 402.03L656.38 292.95L649.66 294.22L645.45 295.01M235.89 344.12L230.01 359.03L327.94 339.79L549.29 296.21L549.51 296.17L549.55 296.17L553.54 295.42L567.35 292.81C569.49 290.87 571.59 288.75 573.59 286.49C576.29 283.36 578.73 279.99 580.85 276.43L574.72 277.6L235.89 344.12M451.24 333.16L436.44 336.07L436.44 402.03L451.24 402.03L451.24 333.16M513.52 321L562.53 402.03L579.92 402.03L529.36 318.01L513.52 321"/></symbol>' +
    "</svg>";

  var links = [
    ["#top", "nav.home"],
    ["#about", "nav.about"],
    ["#projects", "nav.projects"],
    ["#contacts", "nav.contacts"]
  ];

  var header =
    '<header class="site-header">' +
      '<div class="container header-inner">' +
        '<a class="brand" href="#top" aria-label="ARI Development Company">' +
          '<svg class="brand-mark" aria-hidden="true"><use href="#i-ari"/></svg>' +
          '<span class="brand-text"><span>DEVELOPMENT</span><span>COMPANY</span></span>' +
        "</a>" +
        '<nav class="nav" id="nav" aria-label="Main">' +
          links.map(function (l) {
            return '<a href="' + l[0] + '" data-i18n="' + l[1] + '"></a>';
          }).join("") +
          '<div class="lang" role="group" aria-label="Language">' +
            '<button type="button" data-lang="ka">KA</button>' +
            '<button type="button" data-lang="en">EN</button>' +
          "</div>" +
        "</nav>" +
        '<button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="nav" data-i18n-attr="aria-label:nav.menu">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
      "</div>" +
    "</header>";

  var footer =
    '<footer class="site-footer">' +
      '<div class="container footer-inner">' +
        '<a class="brand brand-footer" href="#top" aria-label="ARI Development Company">' +
          '<svg class="brand-mark" aria-hidden="true"><use href="#i-ari"/></svg>' +
          '<span class="brand-text"><span>DEVELOPMENT</span><span>COMPANY</span></span>' +
        "</a>" +
        '<div class="footer-links">' +
          '<a href="tel:+995551002200"><small>01. <span data-i18n="footer.call"></span></small>+995 551 00 22 00</a>' +
          '<a href="mailto:info@ari.ge"><small>02. <span data-i18n="footer.write"></span></small>info@ari.ge</a>' +
        "</div>" +
        '<div class="socials">' +
          '<a href="https://www.facebook.com/aridevelopment.georgia" target="_blank" rel="noopener" aria-label="Facebook"><svg><use href="#i-fb"/></svg></a>' +
          '<a href="https://www.instagram.com/ari_development_company" target="_blank" rel="noopener" aria-label="Instagram"><svg><use href="#i-ig"/></svg></a>' +
        "</div>" +
        '<p class="copyright">© ' + new Date().getFullYear() + ' ARI AND CRONA. <span data-i18n="footer.rights"></span></p>' +
      "</div>" +
    "</footer>" +
    '<div class="contact-bar">' +
      '<div class="container contact-bar-inner">' +
        '<a class="contact-phone" href="tel:+995551002200">' +
          '<svg><use href="#i-phone"/></svg>' +
          '<span><strong>+995 551 00 22 00</strong><small data-i18n="hours"></small></span>' +
        "</a>" +
        '<a class="btn btn-primary" href="#contacts"><svg><use href="#i-user"/></svg><span data-i18n="cta.contact"></span></a>' +
      "</div>" +
    "</div>" +
    '<dialog class="modal" id="project-modal">' +
      '<button class="modal-close" type="button" data-close data-i18n-attr="aria-label:modal.close"><svg><use href="#i-close"/></svg></button>' +
      '<img class="modal-img" alt="">' +
      '<div class="modal-body">' +
        '<h3 class="modal-title"></h3>' +
        '<p class="modal-loc"><svg><use href="#i-pin"/></svg><span></span></p>' +
        '<p class="modal-desc"></p>' +
      "</div>" +
    "</dialog>";

  document.body.insertAdjacentHTML("afterbegin", sprite + header);
  document.body.insertAdjacentHTML("beforeend", footer);
})();
