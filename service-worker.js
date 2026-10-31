const CACHE_NAME = "par-ordo-future-arena-v20";
const APP_FILES = [
  "./", "./index.html", "./style.css", "./app.js", "./manifest.json",
  "./par-ordo-future-arena-v133.css",
  "./par-ordo-future-arena-v134-icons.css",
  "./par-ordo-future-arena-v135-vcut.css",
  "./par-ordo-future-arena-v136-clean-vcut.css",
  "./par-ordo-future-arena-v137-glass-edge.css",
  "./par-ordo-future-arena-v138-gloss-glass.css",
  "./par-ordo-future-arena-v139-emerald-glass.css",
  "./par-ordo-future-arena-v140-deep-emerald.css",
  "./par-ordo-future-arena-v141-reservation-glass.css",
  "./par-ordo-future-arena-v142-emerald-crystal.css",
  "./par-ordo-future-arena-v126.js",
  "./par-ordo-logo.png", "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(async () => (await caches.match(event.request)) || caches.match("./index.html"))
  );
});
