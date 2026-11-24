/* Maps • TelzonOS — service worker (offline tiles + app shell) */
const TILES = 'telzonos-tiles-v1';
const SHELL = 'telzonos-shell-v1';
const SHELL_URLS = [
  './', './index.html',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => Promise.all(SHELL_URLS.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);

  // Map tiles: saved (offline) copy first, then network
  if (u.hostname === 'tile.openstreetmap.org') {
    e.respondWith(
      caches.open(TILES)
        .then(c => c.match(r.url))
        .then(hit => hit || fetch(r).catch(() => new Response('', { status: 504 })))
    );
    return;
  }

  // App shell + Leaflet: network first, fall back to cache
  if (u.origin === location.origin || u.hostname === 'unpkg.com') {
    e.respondWith(
      fetch(r)
        .then(res => {
          const copy = res.clone();
          caches.open(SHELL).then(c => c.put(r, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(r))
    );
  }
});
