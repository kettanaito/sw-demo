addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      (async () => {
        const cache = await caches.open('cache')
        const cachedResponse = await cache.match(event.request)

        if (cachedResponse) {
          return cachedResponse
        }

        const originalResponse = await fetch(event.request)
        cache.put(event.request, originalResponse.clone())
        return originalResponse
      })(),
    )
  }
})
