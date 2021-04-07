self.addEventListener('install', event => {
  event.waitUntil(caches.open('budget-tracker-cache-v1')
    .then(cache => cache.addAll([
      '/',
      '/index.html',
      '/styles.css',
      '/index.js',
      '/manifest.json',
      '/icons/icon-512x512.png',
      '/icons/icon-192x192.png'
    ])))
})

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request)
    .catch(err => {
      if (err) { console.log(err) }

      return caches.match(event.request)
        .then(match => {
          if (match) {
            return match
          } else if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/')
          }
        })
    }))
})