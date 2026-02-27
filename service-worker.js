const CACHE_NAME = "word-scrambler-v3";

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll([
  "/Word-Scrambler/",
  "/Word-Scrambler/index.html",
  "/Word-Scrambler/output.css",
  "/Word-Scrambler/javascript/index.js"
]);
})
);
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match("/Word-Scrambler/index.html");
    })
  );
});