const CACHE_NAME = "earthquake-data-v1";
const DATA_CACHE_NAME = "earthquake-api-cache-v1";

// URLs to cache
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
];

// Install event - cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Handle API requests differently
  if (event.request.url.includes("earthquake.usgs.gov")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // Clone the response before caching
            const responseClone = response.clone();

            // Cache successful responses for 1 hour
            if (response.status === 200) {
              cache.put(event.request, responseClone);
            }

            return response;
          })
          .catch(() => {
            // If network fails, try to serve from cache
            return cache.match(event.request);
          });
      })
    );
  } else {
    // Handle other requests
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
    );
  }
});

// Background sync for offline support
self.addEventListener("sync", (event) => {
  if (event.tag === "earthquake-data-sync") {
    event.waitUntil(
      // Sync earthquake data when back online
      fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
      )
        .then((response) => {
          if (response.ok) {
            return caches
              .open(DATA_CACHE_NAME)
              .then((cache) =>
                cache.put(
                  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv",
                  response.clone()
                )
              );
          }
        })
        .catch((error) => {
          console.error("Background sync failed:", error);
        })
    );
  }
});

// Handle cache cleanup periodically
setInterval(() => {
  caches.open(DATA_CACHE_NAME).then((cache) => {
    cache.keys().then((requests) => {
      requests.forEach((request) => {
        cache.match(request).then((response) => {
          if (response) {
            const cachedDate = new Date(response.headers.get("date") || 0);
            const now = new Date();
            const hoursDiff =
              (now.getTime() - cachedDate.getTime()) / (1000 * 60 * 60);

            // Remove cache entries older than 2 hours
            if (hoursDiff > 2) {
              cache.delete(request);
            }
          }
        });
      });
    });
  });
}, 30 * 60 * 1000); // Run every 30 minutes
