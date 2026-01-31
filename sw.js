const CACHE_NAME = "mayamaxx-onlinegallery-v1";
const PRECACHE_URLS = [
  "/OnlineGallery/",
  "/OnlineGallery/index.html",
  "/OnlineGallery/app.webmanifest",
  "/OnlineGallery/icon-192.png",
  "/OnlineGallery/icon-512.png"
];

// インストール時に最低限をキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// 古いキャッシュ掃除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

// まずキャッシュ、なければネット（超シンプル）
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
