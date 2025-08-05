'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/library">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Library</span>
                </Link>
            </Button>
            <h1 className="font-headline text-4xl font-bold tracking-tight">Profile</h1>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This profile page is currently under construction. Please check back later for more features!</p>
        </CardContent>
      </Card>
    </div>
  );
}
