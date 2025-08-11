'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PdfViewer } from '@/components/shared/PdfViewer';

function PdfView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('url');

  if (!pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-destructive">No PDF URL provided.</p>
        <Button onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-background fixed inset-0 z-50">
      <header className="flex-shrink-0 h-16 bg-card border-b flex items-center px-4 md:px-6 sticky top-0">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </header>
      <main className="flex-1 overflow-hidden">
        <PdfViewer url={pdfUrl} />
      </main>
    </div>
  );
}


export default function ViewPdfPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-screen items-center justify-center fixed inset-0 z-50 bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <PdfView />
        </Suspense>
    )
}
