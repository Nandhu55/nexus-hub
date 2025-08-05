'use client';

import { useState, useMemo, useEffect } from 'react';
import { BookCard } from '@/components/library/BookCard';
import { Terminal, Search } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Book } from '@/lib/data';
import { years } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function LibraryPage() {
    const { toast } = useToast();
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBooksAndCategories = async () => {
            const supabase = createClient();
            setLoading(true);

            const { data: booksData, error: booksError } = await supabase
                .from('books')
                .select('*');

            if (booksError) {
                toast({ title: "Error fetching books", description: booksError.message, variant: "destructive" });
            } else {
                setBooks(booksData || []);
                const uniqueCategories = [...new Set(booksData.map(book => book.category))];
                setCategories(uniqueCategories);
            }
            setLoading(false);
        }
        fetchBooksAndCategories();
    }, [toast]);

    const featuredBooks = useMemo(() => books.slice(0, 10), [books]);
    const academicCategories = useMemo(() => ['All', ...categories], [categories]);
    const displayYears = useMemo(() => ['All', ...years], []);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
            const yearMatch = selectedYear === 'All' || book.year === selectedYear;
            const searchMatch = searchQuery.trim() === '' || 
                                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                book.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            return categoryMatch && yearMatch && searchMatch;
        });
    }, [books, selectedCategory, selectedYear, searchQuery]);

  return (
    <div className="space-y-8 sm:space-y-12">
        <div className="space-y-8">
            <div className="text-center p-6 sm:p-8 border border-primary/20 rounded-lg bg-card/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-cyan bg-cyan-950/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
                <div className="relative">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">B-TECH HUB</h1>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg">Welcome back, Student. Access your digital library.</p>
                </div>
            </div>

            <div>
                <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-4 sm:mb-6 flex items-center gap-3">
                <Terminal />
                Featured Books
                </h2>
                {loading ? (
                    <div className="w-full overflow-hidden">
                        <div className="flex -ml-2 sm:-ml-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 sm:pl-4">
                                    <Skeleton className="aspect-[2/3] w-full" />
                                    <Skeleton className="h-4 w-3/4 mt-2" />
                                    <Skeleton className="h-3 w-1/2 mt-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <Carousel
                        opts={{ align: "start", loop: true, }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 sm:-ml-4">
                            {featuredBooks.map((book) => (
                            <CarouselItem key={book.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 sm:pl-4">
                                <div className="p-1 h-full">
                                <BookCard book={book} />
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hover:bg-primary/20 hidden sm:flex" />
                        <CarouselNext className="hover:bg-primary/20 hidden sm:flex" />
                    </Carousel>
                )}
            </div>
        </div>
      
      <Separator className="my-6 bg-primary/20" />
      
      <div>
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-primary">Full Library Access</h2>
                        <p className="text-muted-foreground">Browse, search, and filter our entire collection.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, author, or category..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-medium text-muted-foreground w-full sm:w-20 shrink-0">Category:</span>
                        {academicCategories.map(category => (
                            <Button 
                                key={category}
                                size="sm"
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-medium text-muted-foreground w-full sm:w-20 shrink-0">Year:</span>
                        {displayYears.map(year => (
                            <Button 
                                key={year}
                                size="sm"
                                variant={selectedYear === year ? 'default' : 'outline'}
                                onClick={() => setSelectedYear(year)}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
                    {[...Array(12)].map((_, i) => (
                         <div key={i} className="space-y-2">
                             <Skeleton className="aspect-[2/3] w-full" />
                             <Skeleton className="h-4 w-3/4" />
                             <Skeleton className="h-3 w-1/2" />
                         </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">No books found for the selected filters.</p>
                        </div>
                    )}
                </div>
            )}
       </div>

    </div>
  );
}
