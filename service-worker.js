const CACHE_NAME = "word-scrambler-v1";

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll([
"/",
"/index.html",
"/output.css",
"javascript/index.js"
]);
})
);
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});