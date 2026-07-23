/* ============================================================
   SERVICE WORKER - JK Pool House PWA
   ============================================================ */

const CACHE_NAME = 'jkpoolhouse-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/responsive.css',
    '/css/variables.css',
    '/css/animations.css',
    '/js/main.js',
    '/js/gallery.js',
    '/js/modal.js',
    '/js/whatsapp.js',
    '/js/calendar.js',
    '/js/cookie-banner.js',
    '/js/social-share.js',
    '/js/analytics.js',
    '/js/notifications.js',
    '/js/performance.js',
    '/js/blog.js',
    '/manifest.json',
    '/imagens/logo.jpg',
    '/imagens/piscina com hidro.jpg'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        // Cache the fetched response
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    })
                    .catch(() => {
                        // Return offline page if available
                        return caches.match('/index.html');
                    });
            })
    );
});

// Handle push notifications
self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body || 'Novidades na JK Pool House!',
        icon: '/imagens/logo.jpg',
        badge: '/imagens/logo.jpg',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };
    event.waitUntil(
        self.registration.showNotification(data.title || 'JK Pool House', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

