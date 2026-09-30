// Caches the app on first visit so it opens with no signal. Bump VERSION to push an update.
var VERSION='wl-v3';
var CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(r){
      if(r&&(r.ok||r.type==='opaque')){var copy=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,copy)})}
      return r;
    }).catch(function(){return hit});
    return hit||net;
  }));
});
