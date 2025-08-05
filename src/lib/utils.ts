
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveLink(url: string, forDownload = false): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }

  const patterns = [
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
  ];

  let fileId = null;
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      fileId = match[1];
      break;
    }
  }
  
  if (fileId) {
    if (forDownload) {
      // This link forces a download prompt.
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    // This link is for embedding and viewing in a browser/iframe.
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Return the original URL if it's not a recognized Google Drive file link
  return url;
}
