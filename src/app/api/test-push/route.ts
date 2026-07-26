import { NextResponse } from 'next/server';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:admin@thecareclub.org',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  try {
    // Fetch your saved subscription from your database here
    // For a quick test, you can mock or pull your stored sub
    const payload = JSON.stringify({
      title: '🚨 Test Ring: New Donation!',
      body: 'Someone just donated 500 KES to The Care Club.',
    });

    // Example loop over your subscriptions
    // await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true, message: 'Test push sent!' });
  } catch (error) {
    console.error('Test push error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 });
  }
}
