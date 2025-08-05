'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookMarked, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

function ResetPasswordForm() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        const code = searchParams.get('code');
        // If the user lands here without a code from the email link, they should be redirected.
        // Supabase handles the session creation from the code via onAuthStateChange listener in middleware.
        // Here we just need the UI to update the password.
    }, [searchParams]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password.length < 6) {
            toast({
                title: "Password Too Short",
                description: "Password must be at least 6 characters long.",
                variant: "destructive",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords Do Not Match",
                description: "Please make sure your new passwords match.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            toast({ title: "Error updating password", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Password Updated Successfully", description: "You can now log in with your new password." });
            router.push('/login');
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <div 
            className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <Card className="w-full max-w-md mx-auto shadow-2xl">
            <CardHeader className="text-center">
                <Link href="/" className="flex justify-center items-center gap-2 mb-2 group">
                <BookMarked className="h-10 w-10 text-primary group-hover:text-primary/80 transition-colors" />
                <h1 className="font-headline text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">B-Tech Hub</h1>
                </Link>
                <CardTitle className="font-headline text-2xl">Set New Password</CardTitle>
                <CardDescription>Create a new password for your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="password" 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        required 
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <EyeOff /> : <Eye />}
                    </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="confirmPassword" 
                        type={confirmPasswordVisible ? "text" : "password"} 
                        placeholder="••••••••" 
                        required 
                        className="pl-10 pr-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                    />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                    </Button>
                    </div>
                </div>
                <Button type="submit" className="w-full !mt-6" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
                </form>
            </CardContent>
            </Card>
        </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    )
}
