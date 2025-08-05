'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookMarked, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useUsers } from '@/hooks/use-users';
import type { User } from '@/lib/data';

const DUMMY_OTP = '123456';

function VerifyEmailContent() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { addUser } = useUsers();
    
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const verificationType = searchParams.get('type'); // 'signup' or 'reset'

    useEffect(() => {
        setMounted(true);
        const storedEmail = verificationType === 'signup'
            ? JSON.parse(sessionStorage.getItem('userToVerify') || '{}').email
            : sessionStorage.getItem('passwordResetEmail');

        if (!storedEmail) {
            toast({
                title: "Something went wrong",
                description: "No email found for verification. Please try again.",
                variant: "destructive"
            });
            router.replace(verificationType === 'signup' ? '/signup' : '/forgot-password');
        } else {
            setEmail(storedEmail);
            toast({
                title: "Check your email",
                description: "We've sent you a verification code. Please enter it below. (Hint: it's 123456)"
            });
        }
    }, [router, toast, verificationType]);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (otp !== DUMMY_OTP) {
            toast({
                title: "Invalid Code",
                description: "The verification code is incorrect. Please try again.",
                variant: "destructive"
            });
            setIsSubmitting(false);
            return;
        }

        if (verificationType === 'signup') {
            const userJson = sessionStorage.getItem('userToVerify');
            if (userJson) {
                const userToCreate = JSON.parse(userJson) as User;
                const newUser = addUser(userToCreate);
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', JSON.stringify(newUser));
                sessionStorage.removeItem('userToVerify');
                toast({ title: "Email Verified!", description: "Your account has been created successfully." });
                router.push('/library');
            }
        } else if (verificationType === 'reset') {
             router.push('/reset-password');
        }
    };

    const handleResendCode = () => {
        toast({
            title: "New Code Sent",
            description: "A new verification code has been sent to your email. (Hint: it's still 123456)"
        });
    }

    const backLink = useMemo(() => {
        return verificationType === 'signup' ? '/signup' : '/login';
    }, [verificationType]);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
            <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Card className="w-full max-w-md mx-auto shadow-2xl">
                    <CardHeader className="text-center">
                         <Link href="/" className="flex justify-center items-center gap-2 mb-2 group">
                            <BookMarked className="h-10 w-10 text-primary group-hover:text-primary/80 transition-colors" />
                            <h1 className="font-headline text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">B-Tech Hub</h1>
                        </Link>
                        <CardTitle className="font-headline text-2xl">Verify Your Email</CardTitle>
                        <CardDescription>
                            We&apos;ve sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2 flex flex-col items-center">
                                <Label htmlFor="otp">Verification Code</Label>
                                <InputOTP maxLength={6} value={otp} onChange={setOtp} id="otp">
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <Button type="submit" className="w-full" disabled={otp.length < 6 || isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Verify Email"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            Didn&apos;t receive the code?{' '}
                            <Button variant="link" className="p-0 h-auto" onClick={handleResendCode}>
                                Resend Code
                            </Button>
                        </div>
                        <Button variant="link" asChild className="mt-2 w-full">
                            <Link href={backLink}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}
