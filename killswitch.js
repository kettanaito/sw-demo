addEventListener('install', (event) => {
  event.skipWaiting()
})

addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))

      await registration.unregister()
    })(),
  )
})
