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
    <Link href={`/reader/${book.id}`} className="group block h-full">
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
        <CardContent className="p-3 flex flex-col flex-grow">
          <h3 className="font-semibold font-headline text-base leading-tight truncate group-hover:text-primary">{book.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 flex-grow">{book.author}</p>
          <Badge variant="secondary" className="self-start mt-2 text-xs">{book.category}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
