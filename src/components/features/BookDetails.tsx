'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useBooks } from '@/hooks/use-books';
import BookDisplay from '@/components/features/book-display';
import { Loader2 } from 'lucide-react';
import type { Book } from '@/lib/data';

interface BookDetailsProps {
  bookId: string;
}

// This client component safely handles data loading, auth checks, and rendering.
export default function BookDetails({ bookId }: BookDetailsProps) {
  const { books } = useBooks();
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
  const [bookData, setBookData] = useState<Book | null | undefined>(undefined); // undefined: not checked, null: not found

  useEffect(() => {
    // This effect handles client-side authentication check
    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticated');
        // No redirect here. Let the UI handle the unauthenticated state if necessary,
        // or rely on a higher-level layout to manage protected routes.
      }
    }
  }, []);

  useEffect(() => {
    // This effect finds the book once the books array is populated.
    // It will only run when `books` has loaded.
    if (books.length > 0) {
      const foundBook = books.find(b => String(b.id) === bookId);
      setBookData(foundBook || null); // Set to the book or null if not found
    }
  }, [books, bookId]);

  // Combined loading state: wait for auth and for the book search to complete.
  if (authStatus === 'checking' || bookData === undefined) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading book details...</span>
      </div>
    );
  }

  // If after checking, the user is not authenticated, you could show a message
  // or a login prompt, but a hard redirect from here can be problematic.
  if (authStatus !== 'authenticated') {
    return (
       <div className="flex justify-center items-center h-96">
        <p>Please log in to view this content.</p>
      </div>
    )
  }

  // After loading, if the book is definitively not found, show the 404 page.
  if (bookData === null) {
    notFound();
    return null; // notFound() throws an error, so this is for type safety.
  }

  // If auth is good and the book is found, render the display component.
  return <BookDisplay book={bookData} />;
}
