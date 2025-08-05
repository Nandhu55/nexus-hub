import { books } from '@/lib/data';
import { BookCard } from '@/components/library/BookCard';
import { BookRecommender } from '@/components/library/BookRecommender';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">Explore the Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse our collection of digital books and find your next great read.
          </p>
        </div>
        <BookRecommender />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by title or author..." className="pl-10 w-full max-w-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
