import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('M-Pesa Callback Received:', JSON.stringify(data, null, 2));

    // M-Pesa sends the transaction result here.
    // You can access the result code and description:
    // const resultCode = data.Body.stkCallback.ResultCode;
    // const resultDesc = data.Body.stkCallback.ResultDesc;

    // Return a success response to acknowledge receipt
    return NextResponse.json({ 
      ResultCode: 0, 
      ResultDesc: 'Service accepted successfully' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process callback' }, { status: 500 });
  }
}
