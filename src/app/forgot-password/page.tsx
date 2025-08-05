'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/reset-password`,
    });

    if (error) {
        toast({
            title: "Error sending reset link",
            description: error.message,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Password Reset Email Sent",
            description: "Check your email for a link to reset your password.",
        });
        // We don't redirect here, just inform the user to check their email.
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
            <CardTitle className="font-headline text-2xl">Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="student@example.com" 
                    required 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={loading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full !mt-6" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
            <Button variant="link" asChild className="mt-4 w-full">
                <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
