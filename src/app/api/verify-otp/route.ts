import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    const { email, otp } = await request.json();
    const supabase = createClient();
    
    const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('email', email)
        .eq('otp', otp)
        .single();
    
    if (error || !data) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (new Date(data.expires_at) < new Date()) {
         await supabase.from('otps').delete().eq('id', data.id);
         return NextResponse.json({ error: 'Expired OTP' }, { status: 400 });
    }

    await supabase.from('otps').delete().eq('id', data.id);

    return NextResponse.json({ message: 'OTP verified successfully' });
}
