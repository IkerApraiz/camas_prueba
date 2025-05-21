self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('miapp-cache').then((cache) => cache.addAll([
      '/index.html',
      '/statics/styles.css',
      '/statics/js.js',
      '/statics/www/Osakidetza.png'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});