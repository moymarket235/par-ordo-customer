/* PAR ORDO V146 — AZA DIGITAL PROJECT SHOWCASE
   Replaces V145's abbreviated project chips with the requested four product names. */
(() => {
  "use strict";

  const root = document.getElementById("app");
  if (!root) return;

  function mountPanel() {
    const contact = root.querySelector("#homeScreen .contact-panel");
    if (!contact) return;

    const next = contact.nextElementSibling;
    if (next && next.dataset.azaVersion === "146") return;

    if (next && next.classList.contains("aza-ecosystem-card")) {
      next.remove();
    }

    const panel = document.createElement("section");
    panel.className = "aza-ecosystem-card";
    panel.dataset.azaVersion = "146";
    panel.setAttribute("aria-label", "AZA DIGITAL ECOSYSTEM");
    panel.innerHTML = `
      <div class="aza-eco-emblem" aria-hidden="true"><span>AZA</span></div>
      <div class="aza-eco-heading">
        <span class="aza-eco-overline">ONE CONNECTED WORLD</span>
        <h2><span>AZA</span> DIGITAL</h2>
        <p>ECOSYSTEM</p>
      </div>
      <div class="aza-eco-modules" aria-label="AZA ecosystem projects">
        <article class="aza-eco-project">
          <strong>PAR ORDO PRO</strong>
          <small>Система управления</small>
        </article>
        <article class="aza-eco-project">
          <strong>PAR ORDO</strong>
          <small>Премиум баня в Бишкеке</small>
        </article>
        <article class="aza-eco-project">
          <strong>MOI MARKET PRO</strong>
          <small>Интернет-магазин</small>
        </article>
        <article class="aza-eco-project">
          <strong>MOI MARKET CONTROL</strong>
          <small>Система управления</small>
        </article>
      </div>
    `;
    contact.insertAdjacentElement("afterend", panel);
  }

  mountPanel();

  const observer = new MutationObserver(() => mountPanel());
  observer.observe(root, { childList: true, subtree: true });
})();
