'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Sun, Moon, Palette, Camera, BookCopy, CalendarDays, GraduationCap, LogOut, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { User as UserType } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ProfilePage() {
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // This effect runs once on component mount to load the user from session storage.
     if (typeof window !== 'undefined') {
      const userJson = sessionStorage.getItem('currentUser');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          // Ensure signedUpAt is a valid date string before creating a Date object
          if (user.signedUpAt && !isNaN(new Date(user.signedUpAt).getTime())) {
            setCurrentUser(user);
          } else {
            // If signedUpAt is missing or invalid, add a default one.
            setCurrentUser({ ...user, signedUpAt: new Date().toISOString() });
          }
        } catch (e) {
          console.error("Failed to parse user data from session storage", e);
        }
      }
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'Image Too Large',
          description: 'Please select an image smaller than 5MB.',
          variant: 'destructive',
        });
        return;
      }
      
      const newAvatarUrl = URL.createObjectURL(file);
      const updatedUser = { ...currentUser, avatarUrl: newAvatarUrl };

      // Update the component's state for immediate UI feedback.
      setCurrentUser(updatedUser);

       // Update session storage so the change persists across the app until reload
      if (typeof window !== 'undefined') {
          sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
          // Manually trigger a storage event to update the header
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'currentUser',
            newValue: JSON.stringify(updatedUser)
          }));
      }
      
      toast({
        title: 'Avatar Updated',
        description: 'Your new profile picture has been set for this session.',
      });
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      router.push('/login');
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading profile...</p>
      </div>
    )
  }
  
  const ProfileDetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string }) => (
    <div className="flex items-start gap-4">
      <Icon className="h-6 w-6 text-muted-foreground mt-1" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || 'Not set'}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
       <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/library">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Library</span>
                </Link>
            </Button>
             <div className="text-left">
                <h1 className="font-headline text-4xl font-bold tracking-tight">Your Profile</h1>
                <p className="mt-1 text-muted-foreground">View your account details and manage preferences.</p>
            </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative group shrink-0">
            <Avatar className="h-24 w-24 mb-4 sm:mb-0 border-4 border-primary/50 shadow-lg">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person portrait" />
              <AvatarFallback>
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="h-8 w-8" />
              <span className="sr-only">Change profile picture</span>
            </button>
            <Input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
           <div>
             <CardTitle className="text-2xl font-bold">{currentUser.name}</CardTitle>
             <CardDescription>@{currentUser.username}</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <ProfileDetailItem icon={Mail} label="Email Address" value={currentUser.email} />
                <ProfileDetailItem icon={CalendarDays} label="Member Since" value={format(new Date(currentUser.signedUpAt), "PPP")} />
                <ProfileDetailItem icon={BookCopy} label="Course/Branch" value={currentUser.course} />
                <ProfileDetailItem icon={GraduationCap} label="Year" value={currentUser.year} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Choose how B-Tech Hub looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>Contact Support</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Need help? Reach out to our team.</p>
                <Button asChild className="w-full">
                    <Link href="/contact">
                       Contact Us
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="border-destructive/50">
            <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </CardTitle>
            </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground mb-2">End your current session.</p>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    Logout
                </Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
