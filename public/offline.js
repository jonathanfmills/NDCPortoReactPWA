var CACHE = 'cache-only';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache only strategy.
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
        `/`,
        `/index.html`,
        `/static/js/bundle.js`,
        `/css/bootstrap.min.css`,
        `http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css`,
        `http://netdna.bootstrapcdn.com/font-awesome/3.2.1/font/fontawesome-webfont.woff?v=3.2.1`,
        `/css/styles.css`,
        `http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js`,
        `/js/bootstrap.min.js`,
        `/static/js/1.chunk.js`,
        `/static/js/0.chunk.js`,
        `/static/js/main.chunk.js`,
        `/main.41b4fc5f30f0eb0e1364.hot-update.js`,
        `/day0.json`,
        `/day1.json`
    ]);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}