'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import { recommendBooks, RecommendBooksInput } from '@/ai/flows/book-recommender';
import { useCategories } from '@/hooks/use-categories';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function BookRecommender() {
  const [open, setOpen] = useState(false);
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const bookCategories = categories;

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setError('Please select at least one category.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setRecommendations([]);

    try {
      const input: RecommendBooksInput = {
        preferredCategories: selectedCategories,
        numberOfRecommendations: 3,
      };
      const result = await recommendBooks(input);
      setRecommendations(result.recommendations);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setSelectedCategories([]);
    setRecommendations([]);
    setError(null);
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetState();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">AI Book Recommender</DialogTitle>
          <DialogDescription>
            Select your favorite categories and let our AI suggest your next read.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h4 className="font-medium">Categories</h4>
          <div className="grid grid-cols-2 gap-4">
            {bookCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={category} className="text-sm font-normal">
                  {category}
                </Label>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        
        {recommendations.length > 0 && (
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle className="font-headline">Here are your recommendations!</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
