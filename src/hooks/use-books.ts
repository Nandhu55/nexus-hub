import { useState } from 'react';
import { allBooks } from '@/lib/data';

export const useBooks = () => {
  const [books, setBooks] = useState(allBooks);

  // In a real app, you might have functions here to add, update, or remove books.
  // For now, we're just returning the static list.

  return { books };
};
