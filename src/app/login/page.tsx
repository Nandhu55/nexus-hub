'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookMarked, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithPassword({
      email: studentEmail,
      password: studentPassword,
    });

    if (error) {
        toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive',
        });
    } else {
        router.push('/library');
        router.refresh(); // to re-run server-side auth checks
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
            <CardTitle className="font-headline text-2xl">Student Login</CardTitle>
            <CardDescription>Sign in to access your digital library</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStudentLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="student-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="student-email" type="email" placeholder="student@example.com" required className="pl-10" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} disabled={loading} />
                </div>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="student-password" type="password" placeholder="••••••••" required className="pl-10" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} disabled={loading} />
                </div>
              </div>
              <Button type="submit" className="w-full !mt-6" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline text-primary hover:text-primary/80">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
