'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, Mail, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function ContactPage() {
    const { toast } = useToast();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (!error && data.user) {
                setUserId(data.user.id);
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;
        
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you shortly.",
        });
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/profile">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Profile</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="font-headline text-4xl font-bold tracking-tight">Contact Us</h1>
                    <p className="mt-1 text-muted-foreground">Have a question or feedback? Let us know.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                    <CardDescription>Fill out the form below and our team will get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="name" name="name" placeholder="John Doe" required className="pl-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                             <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="pl-10" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                             <div className="relative">
                                <Input id="subject" name="subject" placeholder="e.g., Feedback on a book" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Your message..." required rows={6} />
                        </div>
                        <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
