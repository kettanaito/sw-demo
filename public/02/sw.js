const assetsCacheName = 'assets-v1'
const pagesCacheName = 'pages-v1'

addEventListener('install', (event) => {
  event.waitUntil(Promise.all([caches.open(assetsCacheName), caches.open(pagesCacheName)]))
})

addEventListener('fetch', (event) => {
  if (
    event.request.destination === 'image' ||
    event.request.destination === 'font' ||
    event.request.destination === 'style' ||
    event.request.destination === 'script'
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(assetsCacheName)
        const cachedResponse = await cache.match(event.request)

        if (cachedResponse) {
          return cachedResponse
        }

        const originalResponse = await fetch(event.request)
        if (originalResponse.ok) {
          cache.put(event.request, originalResponse.clone())
        }
        return originalResponse
      })(),
    )
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(pagesCacheName)

        return fetch(event.request)
          .then((originalResponse) => {
            if (originalResponse.ok) {
              cache.put(event.request, originalResponse.clone())
            }
            return originalResponse
          })
          .catch(() => {
            return cache.match(event.request)
          })
      })(),
    )
  }
})
