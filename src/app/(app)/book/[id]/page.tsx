'use client';

import BookDetails from '@/components/features/BookDetails';

interface BookPageProps {
  params: {
    id: string;
  };
}

export default function BookPage({ params }: BookPageProps) {
  const { id } = params;

  return <BookDetails bookId={id} />;
}
