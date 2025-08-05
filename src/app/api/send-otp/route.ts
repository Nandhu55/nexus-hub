import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Generate a random OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // OTP expires in 10 minutes

        const supabase = createClient();

        // Store OTP in the database
        // NOTE: You need to create an 'otps' table in Supabase 
        // with columns: id (uuid), email (text), otp (text), created_at (timestamptz), expires_at (timestamptz)
        const { error: dbError } = await supabase
            .from('otps')
            .insert([{ email, otp, expires_at }]);

        if (dbError) {
            console.error('Supabase error:', dbError);
            return NextResponse.json({ error: 'Failed to store OTP' }, { status: 500 });
        }

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or your preferred email service
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
            html: `
                <div style="font-family: sans-serif; text-align: center; padding: 20px;">
                    <h2>B-Tech Hub</h2>
                    <p>Your One-Time Password (OTP) is:</p>
                    <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</p>
                    <p>This code is valid for 10 minutes.</p>
                </div>
            `,
        };
        
        await transporter.sendMail(mailOptions);
        
        return NextResponse.json({ message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Send OTP error:', error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}
