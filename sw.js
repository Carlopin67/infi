 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/sw.js b/sw.js
index e77f27f56a4dd2ad7e49a636097bb9184e0ed83d..cbe8c4d1209c6506edca72e578c3d14c2b7249cf 100644
--- a/sw.js
+++ b/sw.js
@@ -1,44 +1,36 @@
 /* ─────────────────────────────────────────
    Infiniversal — Service Worker v1
    100% offline support
 ───────────────────────────────────────── */
-const CACHE  = 'infiniversal-v1';
+const CACHE  = 'infiniversal-v2';
 const ASSETS = [
   './',
   './index.html',
   './manifest.json',
-  './icons/icon-72x72.png',
-  './icons/icon-96x96.png',
-  './icons/icon-128x128.png',
-  './icons/icon-144x144.png',
-  './icons/icon-152x152.png',
-  './icons/icon-180x180.png',
-  './icons/icon-192x192.png',
-  './icons/icon-384x384.png',
-  './icons/icon-512x512.png',
-  './icons/icon-512x512-maskable.png'
+  './icon-192x192.png',
+  './icon-512x512.png'
 ];
 
 /* Install — pre-cache all assets */
 self.addEventListener('install', e => {
   e.waitUntil(
     caches.open(CACHE)
       .then(cache => cache.addAll(ASSETS))
       .then(() => self.skipWaiting())
   );
 });
 
 /* Activate — remove old caches */
 self.addEventListener('activate', e => {
   e.waitUntil(
     caches.keys()
       .then(keys => Promise.all(
         keys.filter(k => k !== CACHE).map(k => caches.delete(k))
       ))
       .then(() => self.clients.claim())
   );
 });
 
 /* Fetch — cache-first, fallback to network then offline page */
 self.addEventListener('fetch', e => {
   if (e.request.method !== 'GET') return;
 
EOF
)
