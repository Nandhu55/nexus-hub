'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useBooks } from '@/hooks/use-books';
import { Book, years } from '@/lib/data';
import { useCategories } from '@/hooks/use-categories';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DashboardClient() {
  const { books, addBook, deleteBook } = useBooks();
  const { categories } = useCategories();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRemove = (id: number) => {
    deleteBook(id);
    toast({
      title: 'Book Removed',
      description: 'The book has been successfully deleted from the library.',
    });
  };
  
  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newBook: Omit<Book, 'id'> = {
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        category: formData.get('category') as Book['category'],
        year: formData.get('year') as string,
        rating: parseFloat(formData.get('rating') as string) || undefined,
        description: formData.get('description') as string,
        coverImage: 'https://placehold.co/400x600',
        dataAiHint: 'book cover',
        pdfUrl: formData.get('pdfUrl') as string || '#',
    };

    if (!newBook.title || !newBook.author || !newBook.category || !newBook.description) {
        toast({
            title: "Validation Error",
            description: "Please fill out all required fields.",
            variant: "destructive"
        });
        return;
    }

    const result = addBook(newBook);
    
    if (result.success) {
        toast({
            title: "Book Added!",
            description: `"${newBook.title}" has been added successfully.`,
        });
        setDialogOpen(false);
        (event.target as HTMLFormElement).reset();
    } else {
        toast({
            title: "Failed to Add Book",
            description: result.message || "An unexpected error occurred.",
            variant: "destructive",
        });
    }
  }
  
  const bookCategories = [...categories.filter(c => c !== 'All'), 'Finance', 'Motivation'];

  return (
    <>
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Book</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new book to the library.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBook} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" name="author" required />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                         <Select name="category" required>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {bookCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                         <Select name="year">
                            <SelectTrigger id="year">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                 <SelectItem value="All">All</SelectItem>
                                {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pdfUrl">PDF URL</Label>
                      <Input id="pdfUrl" name="pdfUrl" placeholder="https://..."/>
                    </div>
                 </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
              <DialogFooter className="sticky bottom-0 bg-background pt-4">
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg overflow-hidden mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Cover</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Book cover"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={book.coverImage}
                    width="64"
                    data-ai-hint={book.dataAiHint || "book cover"}
                  />
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{book.category}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{book.author}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                        onClick={() => handleRemove(book.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
