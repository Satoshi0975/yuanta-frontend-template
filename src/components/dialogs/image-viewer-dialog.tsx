'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from '@/lib/image';
import { cn } from '@/lib/utils';
import type { StaticImageData } from 'next/image';

interface ImageViewerDialogProps {
  src: string | StaticImageData;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
}

const ImageViewerDialog = ({
  src,
  alt,
  children,
  className,
  width,
  height,
}: ImageViewerDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            'cursor-pointer transition-opacity hover:opacity-80',
            className
          )}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="z-[9999] mx-auto h-[90vh] max-w-full rounded-lg border-none bg-white p-4 pt-10 ring-0 md:max-w-7xl">
        <div className="h-full w-full overflow-auto">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block max-w-none"
            unoptimized
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerDialog;
