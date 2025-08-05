import { useState } from 'react';
import { questionPapers as initialQuestionPapers } from '@/lib/data';

export const useQuestionPapers = () => {
  const [questionPapers, setQuestionPapers] = useState(initialQuestionPapers);

  return { questionPapers };
};
