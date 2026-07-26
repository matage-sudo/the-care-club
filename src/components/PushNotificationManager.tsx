'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Error registering service worker:', error);
    }
  }

  async function subscribeToPush() {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      setSubscription(sub);

      // Send the subscription token to our backend API to save in Supabase
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      });

      alert('Successfully subscribed to notifications!');
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      alert('Failed to subscribe. Please check browser permissions.');
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribeFromPush() {
    setLoading(true);
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        // Optionally remove from database here
        alert('Unsubscribed from notifications.');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!isSupported) {
    return <p className="text-xs text-slate-500">Push notifications not supported on this browser.</p>;
  }

  return (
    <div className="flex items-center">
      {subscription ? (
        <button
          onClick={unsubscribeFromPush}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-rose-600 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Bell size={16} className="text-rose-500 animate-pulse" /> Notifications Enabled
        </button>
      ) : (
        <button
          onClick={subscribeToPush}
          disabled={loading}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg"
        >
          <BellOff size={16} /> Enable Notifications
        </button>
      )}
    </div>
  );
}
