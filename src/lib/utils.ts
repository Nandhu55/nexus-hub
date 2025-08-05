import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveLink(url: string, forDownload = false): string {
    const regex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view\?usp=sharing/;
    const match = url.match(regex);
    if (match && match[1]) {
        const fileId = match[1];
        if (forDownload) {
             return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
}
