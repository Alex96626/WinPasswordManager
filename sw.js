'use strict';
importScripts('./script.js'); toolbox.precache(['index.html','style.css']); toolbox.router.get('/images/*', toolbox.cacheFirst); toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5});
