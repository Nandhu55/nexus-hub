'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookMarked, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyEmailPage() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
            <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Card className="w-full max-w-md mx-auto shadow-2xl">
                    <CardHeader className="text-center">
                         <Link href="/" className="flex justify-center items-center gap-2 mb-2 group">
                            <BookMarked className="h-10 w-10 text-primary group-hover:text-primary/80 transition-colors" />
                            <h1 className="font-headline text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">B-Tech Hub</h1>
                        </Link>
                        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
                           <Mail className="h-6 w-6" /> Check Your Email
                        </CardTitle>
                        <CardDescription>
                            We've sent a verification link to your email address. Please click the link to complete your registration.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-sm">
                        <p>You can close this tab.</p>
                        <Link href="/login" className="underline text-primary hover:text-primary/80 mt-4 inline-block">
                           Back to Login
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
