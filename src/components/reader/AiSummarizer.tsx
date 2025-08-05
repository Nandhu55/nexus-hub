'use client';

import { useState } from 'react';
import type { Book } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { summarizeContent, SummarizeContentInput } from '@/ai/flows/ai-summarization';
import { Loader2, Wand2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface AiSummarizerProps {
  book: Book;
}

export function AiSummarizer({ book }: AiSummarizerProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const input: SummarizeContentInput = {
        content: book.description + '\n\n' + book.content,
      };
      const result = await summarizeContent(input);
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-headline">
            <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary"/>
                AI Summary
            </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-2">
            <p className="text-sm text-muted-foreground">
              Get a quick, AI-generated summary of the book.
            </p>
            <Button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Summary'
              )}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {summary && (
              <Textarea
                readOnly
                value={summary}
                className="w-full h-48 bg-background"
              />
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
