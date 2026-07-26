self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : { title: 'The Care Club', body: 'New notification!' };

  const options = {
    body: data.body,
    icon: data.icon || '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [200, 100, 200, 100, 200], // Makes the phone vibrate
    tag: 'care-club-notification',
    requireInteraction: true, // Keeps it on the notification bar until tapped
    actions: [
      { action: 'open', title: 'View App' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
