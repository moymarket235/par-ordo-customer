/* PAR ORDO V147 — PROFESSIONAL HEADER LOCATION ICON
   Converts the small text glyph next to the city into a clean inline SVG map pin.
   Re-applies after app.js language/tab re-renders. */
(() => {
  "use strict";

  const root = document.getElementById("app");
  if (!root) return;

  const NS = "http://www.w3.org/2000/svg";

  function upgradeCityMarker() {
    const target = root.querySelector(".brand-name em");
    if (!target || target.dataset.cityPinReady === "true") return;

    const cityName = target.textContent.replace(/^[\s⌖⌗⚲•]+/, "").trim() || "Бишкек";

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "brand-city-pin");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const pin = document.createElementNS(NS, "path");
    pin.setAttribute("d", "M20 10c0 5.2-8 12-8 12S4 15.2 4 10a8 8 0 1 1 16 0Z");

    const center = document.createElementNS(NS, "circle");
    center.setAttribute("cx", "12");
    center.setAttribute("cy", "10");
    center.setAttribute("r", "2.6");

    svg.append(pin, center);

    const label = document.createElement("span");
    label.textContent = cityName;

    target.classList.add("brand-location");
    target.dataset.cityPinReady = "true";
    target.replaceChildren(svg, label);
  }

  upgradeCityMarker();

  const observer = new MutationObserver(() => upgradeCityMarker());
  observer.observe(root, { childList: true, subtree: true });
})();
