/* PAR ORDO — FUTURE ARENA V126 ICONS
   Consistent SVG line icons, loaded after app.js.
   Booking logic/API are intentionally untouched. */
(() => {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const paths = {
    people: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M17 4.5a3.5 3.5 0 0 1 0 6.8M17 14.5h1a3.5 3.5 0 0 1 3.5 3.5V20"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5v5.7l3.7 2.2"/>',
    coins: '<ellipse cx="8" cy="6" rx="5.5" ry="2.2"/><path d="M2.5 6v3.5c0 1.2 2.5 2.2 5.5 2.2 1.3 0 2.5-.2 3.5-.6M2.5 9.5V13c0 1.2 2.5 2.2 5.5 2.2"/><ellipse cx="16.5" cy="13.5" rx="5" ry="2.1"/><path d="M11.5 13.5V17c0 1.2 2.2 2.1 5 2.1s5-1 5-2.1v-3.5M11.5 17c0 1.2 2.2 2.1 5 2.1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M7.5 3v4M16.5 3v4M3 10h18"/>',
    steam: '<path d="M6 20h12a3 3 0 0 0 2.6-4.5L17 10H7l-3.6 5.5A3 3 0 0 0 6 20Z"/><path d="M8 8c-1.2-1.4-1.2-2.8 0-4.2M12 8c-1.2-1.4-1.2-2.8 0-4.2M16 8c-1.2-1.4-1.2-2.8 0-4.2"/>',
    snow: '<path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10M8.5 3.5 12 6l3.5-2.5M8.5 20.5 12 18l3.5 2.5M3.5 10.5 4 7l3.5.5M16.5 16.5 20 17l.5-3.5M3.5 13.5 4 17l3.5-.5M16.5 7.5 20 7l.5 3.5"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1Z"/>',
    shield: '<path d="M12 22s8-3.8 8-10.5V5l-8-3-8 3v6.5C4 18.2 12 22 12 22Z"/><path d="m8.5 12 2.3 2.3 4.8-5"/>',
    spark: '<path d="m12 2 2.1 6.1L20 10l-5.9 2.1L12 18l-2.1-5.9L4 10l5.9-1.9L12 2Z"/><path d="m19 15 1.2 3.3L23 19l-2.8 1-1.2 3-1-3-3-1 3-.7L19 15Z"/>',
    map: '<path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.2"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    gallery: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2Z"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>'
  };

  function svg(name) {
    const node = document.createElementNS(NS, "svg");
    node.setAttribute("viewBox", "0 0 24 24");
    node.setAttribute("class", "fa-icon");
    node.setAttribute("aria-hidden", "true");
    node.setAttribute("focusable", "false");
    node.innerHTML = paths[name] || paths.spark;
    return node;
  }
  function replace(el, name) {
    if (!el || (el.dataset.faIcon === name && el.querySelector("svg.fa-icon"))) return;
    el.dataset.faIcon = name;
    el.replaceChildren(svg(name));
  }
  function refresh() {
    document.querySelectorAll(".hero-guest span").forEach(el => replace(el, "people"));
    ["steam","snow","home","shield"].forEach((name,i) => {
      const el = document.querySelectorAll(".hero-benefits li b")[i];
      replace(el,name);
    });
    document.querySelectorAll(".neon-book-button .calendar-symbol").forEach(el => replace(el,"calendar"));
    ["people","clock","coins","clock"].forEach((name,i) => {
      const el = document.querySelectorAll(".stats-grid .stat-icon")[i];
      replace(el,name);
    });
    const roomNames=["steam","snow","home","spark"];
    document.querySelectorAll(".room-card").forEach(card => {
      const el=card.querySelector(".room-card-caption strong");
      if(!el) return;
      const n=Math.max(0,Number(card.dataset.room)||0);
      const name=roomNames[n]||"spark";
      if(el.dataset.faIcon===name && el.querySelector("svg.fa-icon")) return;
      const label=document.createElement("span");
      label.className="fa-icon-label";
      label.textContent=el.textContent.replace(/^[^\p{L}\p{N}]+/u,"").trim();
      el.dataset.faIcon=name;
      el.replaceChildren(svg(name),label);
    });
    document.querySelectorAll(".contact-icon").forEach(el=>replace(el,"map"));
    document.querySelectorAll(".contact-arrow").forEach(el=>replace(el,"arrow"));
    ["home","calendar","gallery","user"].forEach((name,i)=>{
      const el=document.querySelectorAll(".nav-button span")[i];
      replace(el,name);
    });
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",refresh,{once:true});
  }else{refresh();}

  const root=document.getElementById("app");
  if(root){
    let pending=false;
    const observer=new MutationObserver(()=>{
      if(pending) return;
      pending=true;
      requestAnimationFrame(()=>{pending=false;refresh();});
    });
    observer.observe(root,{childList:true,subtree:true});
  }
})();