'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Download, Share2, BookOpen, ArrowLeft, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn, transformGoogleDriveLink } from '@/lib/utils';
import type { Book } from '@/lib/data';
import Remarks from '@/components/features/remarks';
import PdfViewer from './PdfViewer';
import { Separator } from '../ui/separator';

interface BookDisplayProps {
  book: Book;
}

export default function BookDisplay({ book }: BookDisplayProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isReading, setIsReading] = useState(false);

  const hasPdf = book.pdf_url && book.pdf_url !== '#';
  const readUrl = hasPdf ? transformGoogleDriveLink(book.pdf_url, false) : '#';

  const handleShare = async () => {
    const fallbackCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "A link to this book has been copied to your clipboard.",
      });
    };

    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out this book: ${book.title} by ${book.author}`,
          url: window.location.href,
        });
      } catch (error) {
        fallbackCopyLink();
      }
    } else {
      fallbackCopyLink();
    }
  };

  const handleDownload = () => {
    if (!hasPdf) {
      toast({
          title: "Download Unavailable",
          description: "No PDF document is available for this book.",
          variant: "destructive"
      });
      return;
    }
    const downloadUrl = transformGoogleDriveLink(book.pdf_url, true);
    window.open(downloadUrl, '_blank');
  };

  const handleRead = () => {
     if (!hasPdf) {
      toast({
          title: "Read Unavailable",
          description: "No PDF document is available for this book.",
          variant: "destructive"
      });
      return;
    }
    setIsReading(true);
  }

  if (isReading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <header className="flex items-center justify-between p-2 sm:p-4 border-b bg-card">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setIsReading(false)} className="hidden sm:inline-flex">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Details
                </Button>
                 <div className="w-px h-8 bg-border mx-2 hidden sm:block" />
                <div>
                    <h1 className="font-bold text-lg line-clamp-1">{book.title}</h1>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsReading(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Reader</span>
              </Button>
          </header>
          <div className="flex-1 overflow-auto p-4">
             <PdfViewer file={readUrl} />
          </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to library
        </Button>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 lg:col-span-3">
                <div className="relative aspect-[2/3] w-full max-w-xs mx-auto shadow-2xl rounded-lg overflow-hidden border-4 border-primary/20">
                    <Image
                    src={book.cover_image}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    data-ai-hint={book.data_ai_hint}
                    />
                </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9 space-y-6">
                <div className="space-y-3">
                    <Badge variant="secondary">{book.category}</Badge>
                    <h1 className="font-headline text-3xl md:text-5xl font-bold">{book.title}</h1>
                    <p className="text-lg md:text-xl text-muted-foreground">by {book.author}</p>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            className={cn(
                                'h-6 w-6',
                                book.rating && i < Math.floor(book.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            )}
                            />
                        ))}
                        </div>
                        <span className="text-muted-foreground font-medium">{book.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button size="lg" onClick={handleRead}>
                        <BookOpen className="mr-2 h-5 w-5" />
                        Read Now
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-5 w-5" />
                        Download
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="mr-2 h-5 w-5" />
                        Share
                    </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-8">
                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="font-headline text-2xl font-semibold">Description</h2>
                        <p>{book.description}</p>
                    </div>

                    <Remarks bookId={book.id} />
                </div>
            </div>
        </div>
    </div>
  );
}
