let cacheName = "restaurant-cache";
let cacheUrls = [
  "/",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "./index.html",
  "./data/restaurants.json",
  "./restaurant.html",
  "./css/styles.css",
  "./js/dbhelper.js",
  "./js/main.js",
  "./js/restaurant_info.js"
];

self.addEventListener("install", function(event) {
  console.log("Starting installation.");
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("Openning cache.");
      return cache.addAll(cacheUrls);
    })
  );
});

self.addEventListener("fetch", event => {
  console.log("Fetching cache.");
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response && fetch(event.request);
      })
      .catch(err => console.log(err, event.request))
  );
});

self.addEventListener("activate", event => {
  console.log("Activating cache.");
  event.waitUntil(self.clients.claim());
});
