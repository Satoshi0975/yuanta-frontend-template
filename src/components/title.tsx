'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Stick from './stick';

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  noStick?: boolean;
};

const Title = ({ children, className, noStick = false }: TitleProps) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'relative mx-auto mb-8 flex min-h-20 max-w-screen-sm items-center justify-between rounded-24 bg-yt-blue-500 p-5 px-8 text-center font-title text-3xl font-semibold text-white md:text-4xl',
        className
      )}
    >
      {' '}
      <ArrowDown className="size-6 min-w-6 stroke-[4px] text-yt-orange-100 sm:size-7 sm:min-w-7" />
      <h1>{children}</h1>
      <ArrowDown className="size-6 min-w-6 stroke-[4px] text-yt-orange-100 sm:size-7 sm:min-w-7" />
      {noStick ? null : <Stick />}
    </motion.div>
  );
};

export default Title;
