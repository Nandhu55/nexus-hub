import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const supabase = createClient();

        // Check if the OTP is valid and not expired
        const { data, error } = await supabase
            .from('otps')
            .select('*')
            .eq('email', email)
            .eq('otp', otp)
            .single();

        if (error || !data) {
             return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // Check if OTP is expired
        const now = new Date();
        const expiresAt = new Date(data.expires_at);
        if (now > expiresAt) {
            return NextResponse.json({ error: 'Expired OTP' }, { status: 400 });
        }
        
        // Optionally, you can delete the OTP after verification
        await supabase.from('otps').delete().eq('id', data.id);

        return NextResponse.json({ message: 'OTP verified successfully' });

    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
    }
}
