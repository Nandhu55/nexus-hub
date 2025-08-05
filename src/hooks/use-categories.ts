import { useState, useMemo } from 'react';
import { courses } from '@/lib/data';

export const useCategories = () => {
    const categoryList = useMemo(() => ['All', ...courses], []);
    const [categories] = useState(categoryList);

    return { categories };
}
