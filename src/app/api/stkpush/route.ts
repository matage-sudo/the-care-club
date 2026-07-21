import { NextResponse } from 'next/server';
const IntaSend = require('intasend-node');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, email, first_name, last_name } = body;
        const rawPhone = body.phoneNumber || body.phone || "";

        let cleanPhone = rawPhone.toString().trim();
        if (cleanPhone.startsWith('+')) cleanPhone = cleanPhone.slice(1);
        if (cleanPhone.startsWith('0')) cleanPhone = '254' + cleanPhone.slice(1);

        const intasend = new IntaSend(
            process.env.INTASEND_PUBLISHABLE_KEY,
            process.env.INTASEND_SECRET_KEY,
            false // Live Mode
        );

        const response = await intasend.collection().mpesaStkPush({
            first_name: first_name || "Valued",
            last_name: last_name || "Donor",
            email: email || "donor@careclub.com",
            amount: Number(amount),
            phone_number: cleanPhone,
            api_ref: 'TheCareClub_' + Date.now(),
        });

        return NextResponse.json({ success: true, data: response });
    } catch (error: any) {
        // This handles the error output to help us see the 400 Bad Request details
        if (error.response && error.response.data) {
            console.error("IntaSend API Error Details:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("IntaSend Error:", error);
        }
        
        return NextResponse.json(
            { success: false, error: "Payment initiation failed" },
            { status: 500 }
        );
    }
}
