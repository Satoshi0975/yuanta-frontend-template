import { cn } from '@/lib/utils';
import React from 'react';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

type BoxTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div
      className={cn(
        'border-yt-blue-500 rounded-24 border-4 bg-white p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BoxTitle = ({ children, className }: BoxTitleProps) => {
  return (
    <div
      className={cn(
        'font-title bg-yt-blue-500 -mx-[25px] -mt-[25px] mb-5 rounded-24 rounded-b-none p-5 text-center text-3xl font-semibold text-white sm:text-4xl lg:py-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export { Box, BoxTitle };
