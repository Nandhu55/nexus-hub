import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return NextResponse.json({ error: 'Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in .env' }, { status: 500 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // OTP expires in 10 minutes

    const supabase = createClient();
    const { error: dbError } = await supabase
        .from('otps')
        .insert([{ email, otp, expires_at }]);

    if (dbError) {
        return NextResponse.json({ error: 'Failed to store OTP' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your B-Tech Hub OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}
