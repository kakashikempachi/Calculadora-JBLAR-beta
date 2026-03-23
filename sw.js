const CACHE_NAME = 'jblar-v1';
// Note que removemos a barra inicial para o caminho ser relativo à pasta do repositório
const ASSETS = [
  './',
  './index.html',
  'https://raw.githubusercontent.com/kakashikempachi/Calculadora-JBLAR/refs/heads/main/file_000000002f64720e9e886d9bc8e6a94f.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
