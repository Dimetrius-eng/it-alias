// ВЕРСІЯ 20 - Додано звуки
const CACHE_NAME = 'it-alias-v20-sounds';

// ЗМІНА ТУТ: Додано звуки у список
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './words.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
  // Нова папка
  './sounds/correct.mp3',
  './sounds/skip.mp3',
  './sounds/times-up.mp3',
  './sounds/tick.mp3'
];

// 1. Подія "install"
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Відкрито кеш v20');
        const localUrls = urlsToCache.filter(url => !url.startsWith('http'));
        const externalUrls = urlsToCache.filter(url => url.startsWith('http'));
        
        return cache.addAll(localUrls)
          .then(() => {
            const externalRequests = externalUrls.map(url => new Request(url, { mode: 'no-cors' }));
            return Promise.all(externalRequests.map(req => cache.add(req)));
          });
      })
      .catch(err => console.error('Помилка cache.addAll у v20 (Можливо, відсутні звуки?):', err))
  );
});

// 2. Подія "fetch" (без змін)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request); 
      })
  );
});

// 3. Подія "activate" (оновлюємо "білий список")
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Залишити тільки v20
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Видалення старого кешу:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
        console.log('Service Worker v20 активовано і перехоплює контроль!');
        return self.clients.claim();
    })
  );
});
