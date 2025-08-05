'use client';

import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Remark {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    timestamp: string;
}

const initialRemarks: Remark[] = [
    {
        id: 1,
        user: { name: 'Student User', avatar: 'https://placehold.co/100x100.png' },
        text: 'This book was incredibly helpful for understanding the core concepts. Highly recommended!',
        timestamp: '2 days ago',
    },
    {
        id: 2,
        user: { name: 'Jane Doe', avatar: 'https://placehold.co/100x100.png' },
        text: 'The examples in chapter 3 were a bit confusing, but the overall explanation was great.',
        timestamp: '1 week ago',
    }
];

export default function Remarks({ bookId }: { bookId: number }) {
    const [remarks, setRemarks] = useState(initialRemarks);
    const [newRemark, setNewRemark] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRemark.trim()) {
            const remarkToAdd: Remark = {
                id: Date.now(),
                user: { name: 'Current User', avatar: 'https://placehold.co/100x100.png' },
                text: newRemark.trim(),
                timestamp: 'Just now',
            };
            setRemarks([remarkToAdd, ...remarks]);
            setNewRemark('');
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
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!newRemark.trim()}>
                            <Send className="mr-2 h-4 w-4" />
                            Post Remark
                        </Button>
                    </div>
                </form>

                <Separator />

                <div className="space-y-6">
                    {remarks.map(remark => (
                        <div key={remark.id} className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={remark.user.avatar} />
                                <AvatarFallback>{remark.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{remark.user.name}</p>
                                    <p className="text-xs text-muted-foreground">{remark.timestamp}</p>
                                </div>
                                <p className="text-muted-foreground mt-1">{remark.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
