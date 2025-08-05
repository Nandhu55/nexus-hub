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
import { books as initialBooks, Book } from '@/lib/data';
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

export function DashboardClient() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Mock remove function
  const handleRemove = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };
  
  // Mock add function
  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newBook: Book = {
        id: Math.max(...books.map(b => b.id), 0) + 1,
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        category: formData.get('category') as Book['category'],
        cover: 'https://placehold.co/400x600',
        description: formData.get('description') as string,
        content: 'Newly added book content.'
    };
    setBooks(prev => [newBook, ...prev]);
    setDialogOpen(false);
  }

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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Book</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new book to the library.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBook}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" name="title" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">Author</Label>
                  <Input id="author" name="author" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input id="category" name="category" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" name="description" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg overflow-hidden">
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
                    src={book.cover}
                    width="64"
                    data-ai-hint="book cover"
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
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
