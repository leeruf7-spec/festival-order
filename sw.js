// 음식 나왔어요 알림용 서비스워커
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.length ? cs[0].focus() : self.clients.openWindow('/')));
});

// 서버(관리자)가 보낸 푸시 → 앱이 꺼져 있어도 알림 표시
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { title: e.data && e.data.text() }; }
  const title = d.title || '🍜 주문 나왔습니다!';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || '부스로 와주세요', tag: d.tag || 'ready', renotify: true, requireInteraction: true,
    vibrate: [500, 200, 500, 200, 500], icon: '/icon-192.png', badge: '/icon-192.png', data: { url: d.url || '/' }
  }));
});
