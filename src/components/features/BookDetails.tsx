'use client';

import { useEffect, useState, useCallback } from 'react';
import { notFound, useRouter } from 'next/navigation';
import BookDisplay from '@/components/features/book-display';
import { Loader2 } from 'lucide-react';
import type { Book } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BookDetailsProps {
  bookId: string;
}

export default function BookDetails({ bookId }: BookDetailsProps) {
  const [bookData, setBookData] = useState<Book | null | undefined>(undefined);
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();

  const fetchBook = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        toast({ title: "Unauthorized", description: "You must be logged in to view book details.", variant: "destructive" });
        router.push('/login');
        return;
    }

    const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', bookId)
        .single();
    
    if (error) {
        toast({ title: 'Error fetching book', description: 'This book could not be found.', variant: 'destructive' });
        setBookData(null);
    } else {
        setBookData(data);
    }
  }, [supabase, bookId, toast, router]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);
  

  if (bookData === undefined) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading book details...</span>
      </div>
    );
  }
  
  if (bookData === null) {
    notFound();
    return null;
  }

  return <BookDisplay book={bookData} />;
}
