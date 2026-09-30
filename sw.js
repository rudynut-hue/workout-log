// Saves the app on first visit and always opens from that saved copy.
// It never refreshes itself in the background. A new version is only picked up when VERSION changes here.
var VERSION='wl-v21';
var CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png'];
var PICS=["pics/Ab_Roller/0.jpg", "pics/Ab_Roller/1.jpg", "pics/Barbell_Deadlift/0.jpg", "pics/Barbell_Deadlift/1.jpg", "pics/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg", "pics/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg", "pics/Barbell_Shoulder_Press/0.jpg", "pics/Barbell_Shoulder_Press/1.jpg", "pics/Barbell_Squat/0.jpg", "pics/Barbell_Squat/1.jpg", "pics/Bent_Over_Barbell_Row/0.jpg", "pics/Bent_Over_Barbell_Row/1.jpg", "pics/Cross-Body_Crunch/0.jpg", "pics/Cross-Body_Crunch/1.jpg", "pics/Dumbbell_Bicep_Curl/0.jpg", "pics/Dumbbell_Bicep_Curl/1.jpg", "pics/Dumbbell_Clean/0.jpg", "pics/Dumbbell_Clean/1.jpg", "pics/Dumbbell_Lunges/0.jpg", "pics/Dumbbell_Lunges/1.jpg", "pics/Dumbbell_Shoulder_Press/0.jpg", "pics/Dumbbell_Shoulder_Press/1.jpg", "pics/Dumbbell_Step_Ups/0.jpg", "pics/Dumbbell_Step_Ups/1.jpg", "pics/EZ-Bar_Curl/0.jpg", "pics/EZ-Bar_Curl/1.jpg", "pics/EZ-Bar_Skullcrusher/0.jpg", "pics/EZ-Bar_Skullcrusher/1.jpg", "pics/External_Rotation_with_Band/0.jpg", "pics/External_Rotation_with_Band/1.jpg", "pics/Farmers_Walk/0.jpg", "pics/Farmers_Walk/1.jpg", "pics/Flutter_Kicks/0.jpg", "pics/Flutter_Kicks/1.jpg", "pics/Hammer_Curls/0.jpg", "pics/Hammer_Curls/1.jpg", "pics/Hammer_Grip_Incline_DB_Bench_Press/0.jpg", "pics/Hammer_Grip_Incline_DB_Bench_Press/1.jpg", "pics/Incline_Dumbbell_Press/0.jpg", "pics/Incline_Dumbbell_Press/1.jpg", "pics/Inverted_Row/0.jpg", "pics/Inverted_Row/1.jpg", "pics/Kettlebell_Turkish_Get-Up_Squat_style/0.jpg", "pics/Kettlebell_Turkish_Get-Up_Squat_style/1.jpg", "pics/Leg_Extensions/0.jpg", "pics/Leg_Extensions/1.jpg", "pics/Monster_Walk/0.jpg", "pics/Monster_Walk/1.jpg", "pics/One-Arm_Dumbbell_Row/0.jpg", "pics/One-Arm_Dumbbell_Row/1.jpg", "pics/One-Arm_Kettlebell_Swings/0.jpg", "pics/One-Arm_Kettlebell_Swings/1.jpg", "pics/Plank/0.jpg", "pics/Plank/1.jpg", "pics/Seated_Cable_Rows/0.jpg", "pics/Seated_Cable_Rows/1.jpg", "pics/Seated_Leg_Curl/0.jpg", "pics/Seated_Leg_Curl/1.jpg", "pics/Sled_Push/0.jpg", "pics/Sled_Push/1.jpg", "pics/Sledgehammer_Swings/0.jpg", "pics/Sledgehammer_Swings/1.jpg", "pics/Standing_Calf_Raises/0.jpg", "pics/Standing_Calf_Raises/1.jpg", "pics/Triceps_Pushdown/0.jpg", "pics/Triceps_Pushdown/1.jpg", "pics/Underhand_Cable_Pulldowns/0.jpg", "pics/Underhand_Cable_Pulldowns/1.jpg", "pics/Walking_Treadmill/0.jpg", "pics/Walking_Treadmill/1.jpg", "pics/Wide-Grip_Lat_Pulldown/0.jpg", "pics/Wide-Grip_Lat_Pulldown/1.jpg", "pics/Wrist_Roller/0.jpg", "pics/Wrist_Roller/1.jpg"];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){
    return c.addAll(CORE).then(function(){return Promise.all(PICS.map(function(u){return c.add(u).catch(function(){})}))});
  }).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
    if(hit)return hit;                       // saved copy: no network at all
    return fetch(e.request).then(function(r){ // only for things not saved yet (such as fonts)
      if(r&&(r.ok||r.type==='opaque')){var copy=r.clone();caches.open(VERSION).then(function(c){c.put(e.request,copy)})}
      return r;
    });
  }));
});
