/* PAR ORDO V145 — AZA DIGITAL ECOSYSTEM PANEL
   Adds a designed brand panel after the address card without modifying app.js. */
(() => {
  "use strict";

  const root = document.getElementById("app");
  if (!root) return;

  function mountAzaPanel() {
    const contact = root.querySelector("#homeScreen .contact-panel");
    if (!contact) return;

    const next = contact.nextElementSibling;
    if (next && next.classList.contains("aza-ecosystem-card")) return;

    const panel = document.createElement("section");
    panel.className = "aza-ecosystem-card";
    panel.setAttribute("aria-label", "AZA DIGITAL ECOSYSTEM");
    panel.innerHTML = `
      <div class="aza-eco-emblem" aria-hidden="true"><span>AZA</span></div>
      <div class="aza-eco-heading">
        <span class="aza-eco-overline">ONE CONNECTED WORLD</span>
        <h2><span>AZA</span> DIGITAL</h2>
        <p>ECOSYSTEM</p>
      </div>
      <div class="aza-eco-modules" aria-label="AZA platforms">
        <span>CONNECT</span><i></i>
        <span>UNIVERSE</span><i></i>
        <span>ARENA</span><i></i>
        <span>BIZ PRO</span>
      </div>
    `;

    contact.insertAdjacentElement("afterend", panel);
  }

  mountAzaPanel();

  const observer = new MutationObserver(() => {
    mountAzaPanel();
  });
  observer.observe(root, { childList: true, subtree: true });
})();
