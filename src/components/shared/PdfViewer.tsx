'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Loading PDF...</p>
        </Skeleton>
      )}
      <iframe
        src={url}
        className={cn('w-full h-full border-0', isLoading && 'opacity-0')}
        onLoad={() => setIsLoading(false)}
        title="PDF Viewer"
      />
    </div>
  );
}
