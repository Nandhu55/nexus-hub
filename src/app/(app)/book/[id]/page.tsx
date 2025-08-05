'use client';

import { useParams } from 'next/navigation';
import BookDetails from '@/components/features/BookDetails';

export default function BookPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    // Optionally, handle the case where id is not available yet
    return <div>Loading...</div>;
  }

  return <BookDetails bookId={id} />;
}
