/* PAR ORDO — FUTURE ARENA V125 SVG ICONS
   Loaded after app.js. Replaces text glyphs with consistent inline SVG.
   Does not alter booking logic or API calls. */
(() => {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const shapes = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    coins: '<ellipse cx="9" cy="6" rx="6" ry="2.5"/><path d="M3 6v4c0 1.4 2.7 2.5 6 2.5 1.2 0 2.4-.2 3.3-.5M3 10v4c0 1.4 2.7 2.5 6 2.5"/><ellipse cx="16" cy="14" rx="5" ry="2.2"/><path d="M11 14v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-4M11 17.5c0 1.2 2.2 2.2 5 2.2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h3M14 14h3M14 17h3"/>',
    steam: '<path d="M7 21h10a3 3 0 0 0 2.7-4.3L17 12H7l-2.7 4.7A3 3 0 0 0 7 21Z"/><path d="M9 10c-1.2-1.2-1.2-2.5 0-3.7M13 10c-1.2-1.2-1.2-2.5 0-3.7M17 10c-1.2-1.2-1.2-2.5 0-3.7"/>',
    snow: '<path d="M12 2v20M4 7l16 10M20 7 4 17M8 3l4 3 4-3M8 21l4-3 4 3M3 10l1-3 4 0M16 17l4 0 1-3M3 14l1 3 4 0M16 7l4 0 1 3"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1Z"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    spark: '<path d="m12 2 2.1 6.1L20 10l-5.9 2.1L12 18l-2.1-5.9L4 10l5.9-1.9L12 2Z"/><path d="m19 15 1.2 3.3L23 19l-2.8 1-1.2 3-1-3-3-1 3-.7L19 15Z"/>',
    map: '<path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.2"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2Z"/>'
  };
  function makeSvg(name) {
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "fa-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.innerHTML = shapes[name] || shapes.spark;
    return svg;
  }
  function setIcon(el, name) {
    if (!el || (el.dataset.faIcon === name && el.querySelector("svg.fa-icon"))) return;
    el.dataset.faIcon = name;
    el.replaceChildren(makeSvg(name));
  }
  function refresh() {
    document.querySelectorAll(".hero-guest span").forEach(el => setIcon(el, "users"));
    const benefitIcons = ["steam", "snow", "home", "shield"];
    document.querySelectorAll(".hero-benefits li b").forEach((el, i) => setIcon(el, benefitIcons[i] || "spark"));
    document.querySelectorAll(".neon-book-button .calendar-symbol").forEach(el => setIcon(el, "calendar"));
    const statIcons = ["users", "clock", "coins", "clock"];
    document.querySelectorAll(".stats-grid .stat-icon").forEach((el, i) => setIcon(el, statIcons[i] || "spark"));
    const roomIcons = ["steam", "snow", "home", "spark"];
    document.querySelectorAll(".room-card").forEach(card => {
      const strong = card.querySelector(".room-card-caption strong");
      if (!strong) return;
      const index = Math.max(0, Number(card.dataset.room) || 0);
      const name = roomIcons[index] || "spark";
      if (strong.dataset.faIcon === name && strong.querySelector("svg.fa-icon")) return;
      const oldLabel = strong.querySelector(".fa-icon-label");
      const label = document.createElement("span");
      label.className = "fa-icon-label";
      label.textContent = oldLabel ? oldLabel.textContent : strong.textContent.replace(/^[^\p{L}\p{N}]+/u, "").trim();
      strong.dataset.faIcon = name;
      strong.replaceChildren(makeSvg(name), label);
    });
    document.querySelectorAll(".contact-icon").forEach(el => setIcon(el, "map"));
    document.querySelectorAll(".contact-arrow").forEach(el => setIcon(el, "arrow"));
    const navIcons = ["home", "calendar", "gallery", "user"];
    document.querySelectorAll(".nav-button span").forEach((el, i) => setIcon(el, navIcons[i] || "spark"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refresh, { once: true });
  else refresh();
  const app = document.getElementById("app");
  if (app) {
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; refresh(); });
    });
    observer.observe(app, { childList: true, subtree: true });
  }
})();
