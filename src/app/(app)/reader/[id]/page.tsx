import { notFound } from 'next/navigation';
import Image from 'next/image';
import { books } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { AiSummarizer } from '@/components/reader/AiSummarizer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookRecommender } from '@/components/library/BookRecommender';

export default function ReaderPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === parseInt(params.id, 10));

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-4">
            <div className="shadow-lg rounded-lg overflow-hidden">
                <Image
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    width={400}
                    height={600}
                    data-ai-hint={book.dataAiHint || 'book cover'}
                    className="w-full"
                />
            </div>
            <h1 className="text-3xl font-bold font-headline">{book.title}</h1>
            <p className="text-lg text-muted-foreground">{book.author}</p>
            <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{book.category}</Badge>
                {book.year && <Badge variant="secondary">{book.year}</Badge>}
            </div>
            <p className="text-sm">{book.description}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <AiSummarizer book={book} />

          <div>
             <h2 className="text-2xl font-bold font-headline mb-4 border-b pb-2">Book Content</h2>
             <ScrollArea className="h-[600px] p-4 border rounded-lg bg-secondary/30">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{book.content}</p>
                <p className="text-base leading-relaxed whitespace-pre-wrap mt-4">
                  {book.content.repeat(5)}
                </p>
                <p className="text-base leading-relaxed whitespace-pre-wrap mt-4 font-bold text-center">
                    ... End of preview ...
                </p>
             </ScrollArea>
          </div>

          <div className="space-y-4">
             <h2 className="text-2xl font-bold font-headline mb-4 border-b pb-2">Find Your Next Read</h2>
             <BookRecommender />
          </div>
        </div>
      </div>
    </div>
  );
}
