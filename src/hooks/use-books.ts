import { useState } from 'react';
import { books as initialBooks } from '@/lib/data';

export const useBooks = () => {
  const [books, setBooks] = useState(initialBooks);

  // In a real app, you might have functions here to add, update, or remove books.
  // For now, we're just returning the static list.

  return { books };
};
