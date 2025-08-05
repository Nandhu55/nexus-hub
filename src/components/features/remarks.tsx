'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface Remark {
    id: string;
    text: string;
    timestamp: string;
    user_id: string;
    users: {
        name: string;
        avatar_url: string;
    } | null;
}

export default function Remarks({ bookId }: { bookId: string }) {
    const { toast } = useToast();
    const [remarks, setRemarks] = useState<Remark[]>([]);
    const [newRemark, setNewRemark] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    const fetchRemarks = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('remarks')
            .select(`
                id,
                text,
                timestamp,
                user_id,
                users (
                    name,
                    avatar_url
                )
            `)
            .eq('book_id', bookId)
            .order('timestamp', { ascending: false });

        if (error) {
            toast({ title: 'Error fetching remarks', description: error.message, variant: 'destructive' });
        } else {
            setRemarks(data as Remark[]);
        }
        setLoading(false);
    }, [supabase, bookId, toast]);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
        fetchRemarks();
    }, [fetchRemarks, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRemark.trim() || !user) return;
        
        const { error } = await supabase
            .from('remarks')
            .insert({ text: newRemark.trim(), book_id: bookId, user_id: user.id });

        if (error) {
            toast({ title: 'Error posting remark', description: error.message, variant: 'destructive' });
        } else {
            setNewRemark('');
            fetchRemarks();
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <MessageSquare />
                    Remarks & Reviews
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        value={newRemark}
                        onChange={(e) => setNewRemark(e.target.value)}
                        placeholder="Share your thoughts on this book..."
                        rows={3}
                        disabled={!user}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!newRemark.trim() || !user}>
                            <Send className="mr-2 h-4 w-4" />
                            Post Remark
                        </Button>
                    </div>
                </form>

                <Separator />

                <div className="space-y-6">
                    {loading ? (
                        <p>Loading remarks...</p>
                    ) : remarks.length === 0 ? (
                        <p className="text-muted-foreground text-center">No remarks yet. Be the first to share your thoughts!</p>
                    ) : (
                        remarks.map(remark => (
                        <div key={remark.id} className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={remark.users?.avatar_url} />
                                <AvatarFallback>{remark.users?.name.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{remark.users?.name || 'Anonymous'}</p>
                                    <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(remark.timestamp), { addSuffix: true })}</p>
                                </div>
                                <p className="text-muted-foreground mt-1">{remark.text}</p>
                            </div>
                        </div>
                    )))}
                </div>
            </CardContent>
        </Card>
    );
}
