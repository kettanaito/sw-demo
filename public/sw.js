const assetsCacheName = 'assets-v1'
const pagesCacheName = 'pages-v1'
const precachedAssets = ['/', '/about', '/contacts']

addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()

      for (const key of keys) {
        await caches.delete(key)
      }
    })(),
  )

  event.waitUntil(
    Promise.all([caches.open(assetsCacheName), caches.open(pagesCacheName)]),
  )
})

addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(pagesCacheName).then((cache) => {
      return cache.addAll(precachedAssets)
    }),
  )
})

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (precachedAssets.includes(url.pathname)) {
    return event.respondWith(
      (async () => {
        const cache = await caches.open(pagesCacheName)
        const cachedResponse = await cache.match(event.request)

        console.warn('preloaded', url.pathname, { cachedResponse })

        if (cachedResponse) {
          event.waitUntil(
            fetch(event.request).then((originalResponse) => {
              if (originalResponse.ok) {
                cache.put(event.request, originalResponse.clone())
              }
            }),
          )

          return cachedResponse
        }

        return fetch(event.request)
      })(),
    )
  }

  if (
    event.request.destination === 'image' ||
    event.request.destination === 'font' ||
    event.request.destination === 'style' ||
    event.request.destination === 'script'
  ) {
    return event.respondWith(
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
    return event.respondWith(
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
