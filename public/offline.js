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
    // Try network and if it fails, go for the cached copy.
    evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
      return fromCache(evt.request);
    }));
  });

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
        `/`,
        `/index.html`,
        `/css/bootstrap.min.css`,
        `https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css`,
        `https://netdna.bootstrapcdn.com/font-awesome/3.2.1/font/fontawesome-webfont.woff?v=3.2.1`,
        `/css/styles.css`,
        `https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js`,
        `/js/bootstrap.min.js`,
        `/static/js/2.e1555c66.chunk.js`,
        `/static/js/main.c563fd84.chunk.js`,
        `/day0.json`,
        `/day1.json`
    ]);
  });
}
// Time limited network request. If the network fails or the response is not
// served before timeout, the promise is rejected.
function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
      // Reject in case of timeout.
      var timeoutId = setTimeout(reject, timeout);
      // Fulfill in case of success.
      fetch(request).then(function (response) {
        clearTimeout(timeoutId);
        fulfill(response);
      // Reject also if network fetch rejects.
      }, reject);
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