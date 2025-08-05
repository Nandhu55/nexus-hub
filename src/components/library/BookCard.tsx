import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/reader/${book.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            data-ai-hint="book cover"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <Badge variant="secondary" className="self-start mb-2">{book.category}</Badge>
          <h3 className="font-semibold font-headline text-lg leading-tight truncate">{book.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 flex-grow">{book.author}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
