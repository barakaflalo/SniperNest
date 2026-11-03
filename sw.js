// SniperNest service worker — cache name derived from app version at build
const CACHE='snipernest-v0.2.0';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./privacy_policy.html',"./assets/anim/Action_dance.glb","./assets/anim/Death_fall_backwards.glb","./assets/anim/Hit_to_the_head.glb","./assets/anim/Idle_arms_folded_waiting.glb","./assets/anim/Idle_relaxed.glb","./assets/anim/Idle_talking.glb","./assets/anim/Run_sprint.glb","./assets/anim/Walk_formal.glb","./assets/anim/Walk_forwards.glb","./assets/char_f.glb","./assets/char_m.glb","./assets/eyebrows_female.glb","./assets/eyebrows_regular.glb","./assets/guns/bipod.glb","./assets/guns/silencer_long.glb","./assets/guns/sniperrifle_1.glb","./assets/guns/sniperrifle_3.glb","./assets/guns/sniperrifle_5.glb","./assets/guns/sniperrifle_6.glb","./assets/hair_beard.glb","./assets/hair_buns.glb","./assets/hair_buzzed.glb","./assets/hair_buzzedfemale.glb","./assets/hair_long.glb","./assets/hair_simpleparted.glb","./assets/skin_f_light.webp","./assets/skin_m_light.webp","./assets/thumb/bipod.png","./assets/thumb/scope_3.png","./assets/thumb/silencer_long.png","./assets/thumb/sniperrifle_1.png","./assets/thumb/sniperrifle_3.png","./assets/thumb/sniperrifle_5.png","./assets/thumb/sniperrifle_6.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url); if(url.origin!==location.origin) return;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{ if(r&&r.ok){const cp=r.clone(); caches.open(CACHE).then(c=>c.put('./index.html',cp));} return r; }).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{ if(res&&res.ok&&res.type==='basic'){const cp=res.clone(); caches.open(CACHE).then(c=>c.put(req,cp));} return res; })));
});
