'use server';

/**
 * @fileOverview An AI agent that recommends books based on user preferences.
 *
 * - recommendBooks - A function that recommends books based on user preferences.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendBooksInputSchema = z.object({
  preferredCategories: z
    .array(z.string())
    .describe('A list of preferred book categories.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of book recommendations to provide.'),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended book titles.'),
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {schema: RecommendBooksInputSchema},
  output: {schema: RecommendBooksOutputSchema},
  prompt: `You are a helpful librarian providing book recommendations.

  Based on the user's preferred categories:
  {{#each preferredCategories}}- {{{this}}}
  {{/each}}

  Recommend {{numberOfRecommendations}} books that the user might enjoy.
  Return only the list of book titles.
  Do not add any other information. Follow the format instructions closely.

  Example:
  {
    "recommendations": ["Book Title 1", "Book Title 2", "Book Title 3"]
  }`,
});

const recommendBooksFlow = ai.defineFlow(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
