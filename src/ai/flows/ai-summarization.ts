'use server';

/**
 * @fileOverview An AI summarization flow for summarizing book content or specific chapters.
 *
 * - summarizeContent - A function that handles the content summarization process.
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  content: z.string().describe('The book content or chapter to summarize.'),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

const SummarizeContentOutputSchema = z.object({
  summary: z.string().describe('The summarized content.'),
});
export type SummarizeContentOutput = z.infer<typeof SummarizeContentOutputSchema>;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `You are an expert summarizer. Please provide a concise and informative summary of the following content:

Content: {{{content}}}`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
