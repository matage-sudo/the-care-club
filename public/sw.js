self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : { title: 'New Notification', body: 'Something happened in The Care Club.' };

  const options = {
    body: data.body,
    icon: data.icon || '/icon.png',
    badge: '/icon.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/admin')
  );
});
