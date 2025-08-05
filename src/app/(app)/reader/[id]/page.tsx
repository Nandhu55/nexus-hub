'use client';

import AcademicBookDetails from '@/components/features/academic-book-details';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default function AcademicBookPage({ params }: BookDetailPageProps) {
  const { id } = params;

  return <AcademicBookDetails bookId={id} />;
}
