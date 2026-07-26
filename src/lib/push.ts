import webpush from 'web-push';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Configure web-push with your keys
webpush.setVapidDetails(
  'mailto:admin@thecareclub.org',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendNotificationToAllAdmins(title: string, body: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    // Fetch all admin subscriptions from Supabase
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*');

    if (error || !subscriptions) {
      console.error('Error fetching subscriptions:', error);
      return;
    }

    const payload = JSON.stringify({ title, body, icon: '/icon.png' });

    // Send notification to every registered admin device
    const promises = subscriptions.map(async (subRecord) => {
      try {
        await webpush.sendNotification(subRecord.subscription, payload);
      } catch (err: any) {
        // If a subscription is expired or invalid, remove it from the database
        if (err.statusCode === 410 || err.statusCode === 404) {
          await supabase
            .from('push_subscriptions')
            .delete()
            .eq('id', subRecord.id);
        } else {
          console.error('Error sending push notification to a device:', err);
        }
      }
    });

    await Promise.all(promises);
    console.log('Notifications sent successfully to all admins!');
  } catch (error) {
    console.error('Failed to broadcast notifications:', error);
  }
}
