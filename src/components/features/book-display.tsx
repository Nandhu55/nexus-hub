'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Download, Share2, BookOpen, ArrowLeft, Star, ExternalLink, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn, transformGoogleDriveLink } from '@/lib/utils';
import type { Book } from '@/lib/data';
import { Separator } from '../ui/separator';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Card } from '../ui/card';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface BookDisplayProps {
  book: Book;
}

export default function BookDisplay({ book }: BookDisplayProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showPdf, setShowPdf] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(true);

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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    setPageNumber(1);
  };
  
  const onDocumentLoadError = (error: Error) => {
    console.error(error);
    toast({ title: 'Error loading PDF', description: 'Could not load the book. The file may be corrupt or inaccessible.', variant: 'destructive' });
    setPdfLoading(false);
    setShowPdf(false);
  }

  const handleRead = () => {
     if (!hasPdf) {
        toast({
            title: "Read Unavailable",
            description: "No PDF document is available for this book.",
            variant: "destructive"
        });
        return;
      }
      setShowPdf(true);
  }

  const changePage = (offset: number) => {
    if (numPages) {
        setPageNumber(prevPageNumber => Math.max(1, Math.min(prevPageNumber + offset, numPages)));
    }
  }

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);
  
  if (showPdf) {
    return (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 p-4 flex flex-col items-center gap-4">
           <div className="w-full max-w-4xl flex justify-between items-center bg-card p-2 rounded-lg border">
                <h3 className="font-headline text-lg truncate px-2">{book.title}</h3>
                <Button variant="destructive" size="icon" onClick={() => setShowPdf(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close Reader</span>
                </Button>
           </div>
            <Card className="w-full max-w-4xl flex-1 overflow-hidden p-0">
                <div className="relative h-full w-full">
                    {pdfLoading && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-background/50">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4"/>
                            <p className="text-muted-foreground">Loading Book...</p>
                        </div>
                    )}
                    <div className={cn("h-full w-full overflow-auto", pdfLoading ? "opacity-0" : "opacity-100")}>
                        <Document
                            file={readUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            options={{ CMapReaderFactory: null }}
                        >
                           <Page pageNumber={pageNumber} width={1000} />
                        </Document>
                    </div>
                </div>
            </Card>
            {numPages && !pdfLoading && (
                <div className="flex items-center gap-4 bg-card p-2 rounded-lg border">
                    <Button onClick={previousPage} disabled={pageNumber <= 1} variant="outline" size="icon">
                        <ChevronLeft />
                    </Button>
                    <p className="text-sm font-medium">Page {pageNumber} of {numPages}</p>
                    <Button onClick={nextPage} disabled={pageNumber >= numPages} variant="outline" size="icon">
                        <ChevronRight />
                    </Button>
                </div>
            )}
        </div>
    )
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
                </div>
            </div>
        </div>
    </div>
  );
}
