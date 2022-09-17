const CACHE_NAME = "Version 0.1";
const urlsToCache = ['index.html', 'offline.html']

const self = this;

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				cache.addAll(urlsToCache)
				console.log("Hey")
			})
	)
})

this.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then(() => {
				return fetch(event.request)
					.catch((e) => {
						return caches.match("offline.html")
					})
			})
	)
})

this.addEventListener('activate', (event) => {
	const cacheWhitelist = []
	cacheWhitelist.push(CACHE_NAME)
	event.waitUntil(
		caches.keys()
			.then((cacheNames) => Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName)
					}
				})
			))
	)
})
