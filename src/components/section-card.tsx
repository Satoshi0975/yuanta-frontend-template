import { Titlebar } from '@/components/nes/titlebar';
import { ReactNode } from 'react';
import groundImage from '@/assets/images/element/ground.png';

interface SectionCardProps {
  title: string;
  children?: ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative -mb-[1px] h-10 md:h-16">
        {/* 標題 */}
        <Titlebar asChild className="z-20 mx-auto w-fit text-center">
          <h1>{title}</h1>
        </Titlebar>
        {/* 左側裝飾條 */}
        <div
          className="absolute left-4 top-2 z-10 h-8 w-1/2 bg-[length:auto_40px] bg-repeat-x md:h-14 md:bg-[length:auto_64px]"
          style={{
            backgroundImage: `url(${groundImage.src})`,
            backgroundPosition: 'left top',
          }}
        ></div>

        {/* 右側裝飾條 */}
        <div
          className="absolute right-4 top-2 z-10 h-8 w-1/2 bg-[length:auto_40px] bg-repeat-x md:h-14 md:bg-[length:auto_64px]"
          style={{
            backgroundImage: `url(${groundImage.src})`,
            backgroundPosition: 'right top',
          }}
        ></div>
      </div>

      <div className="relative flex-1 bg-linen p-6 pt-12 nes-corners">
        {children}
      </div>
    </div>
  );
}
