import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    return NextResponse.json({ message: "This route is deprecated. Use Supabase Edge Functions instead." }, { status: 410 });
}

    