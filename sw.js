const C='quran-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith((async()=>{
    const cache=await caches.open(C);
    const net=fetch(r).then(res=>{if(res&&res.ok)cache.put(r,res.clone());return res;});
    const slow=new Promise(ok=>setTimeout(()=>ok(null),4000));
    try{
      const res=await Promise.race([net,slow]);
      if(res)return res;
      const hit=await cache.match(r)||await cache.match('./index.html');
      return hit||net;
    }catch(err){
      return (await cache.match(r))||(await cache.match('./index.html'))||(await cache.match('./'))||Response.error();
    }
  })());
});
