import dinosaur from '@/assets/images/element/dinosaur.png';
import fire from '@/assets/images/element/fire.png';
import gold from '@/assets/images/element/gold.png';
import hard from '@/assets/images/element/hard.png';
import start from '@/assets/images/element/start.png';
import ticket from '@/assets/images/element/ticket.png';
import towHard from '@/assets/images/element/tow-hard.png';
import Image from '@/lib/image';
import Wolf from '@/assets/character/wolf.svg';
import { Button } from '../nes/button';
import RankingDialog from '../dialogs/ranking-dialog';

interface DecorationIconsProps {
  variant: 'newbie' | 'daily' | 'main' | 'popularity';
  className?: string;
}

export function DecorationIcons({ variant, className = '' }: DecorationIconsProps) {
  switch (variant) {
    case 'newbie':
      return (
        <div className={`mx-3 mb-4 flex h-12 flex-row-reverse items-center gap-3 md:flex-row ${className}`}>
          <Image src={ticket} alt="ticket" className="h-12 w-auto" />
          <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
          <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
          <div className="relative mr-auto flex h-12 w-24 md:hidden">
            <Image
              src={dinosaur}
              alt="dinosaur"
              className="absolute -bottom-6 right-0 h-20 w-auto scale-x-[-1] items-baseline"
            />
          </div>
        </div>
      );

    case 'daily':
      return (
        <div className={`mx-3 mb-4 flex h-12 items-center justify-end gap-3 ${className}`}>
          <div className="relative mr-6 hidden h-12 w-24 md:flex">
            <Image
              src={dinosaur}
              alt="dinosaur"
              className="absolute -bottom-4 right-0 h-20 w-auto items-baseline"
            />
          </div>
          <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
          <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
          <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
        </div>
      );

    case 'main':
      return (
        <div className={`mx-3 mb-4 flex h-12 items-center justify-between gap-3 ${className}`}>
          <div className="flex gap-3">
            <Image src={start} alt="start" className="h-8 w-auto" />
            <Image src={hard} alt="hard" className="h-8 w-auto" />
            <Image src={hard} alt="hard" className="hidden h-8 w-auto sm:block" />
          </div>
          <div className="flex gap-3">
            <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
            <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
            <Image src={gold} alt="gold" className="h-8 w-auto gold-rotate-3d" />
          </div>
        </div>
      );

    case 'popularity':
      return (
        <div className={`mx-3 mb-4 flex h-12 items-center justify-between gap-3 ${className}`}>
          <div className="flex gap-3">
            <Image src={fire} alt="fire" className="h-8 w-auto " />
            <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
            <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
            <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
          </div>
          <div className="relative ml-6 mr-6 flex h-12 w-24">
            <Wolf className="absolute -bottom-4 right-0 h-20 w-auto items-baseline" />
          </div>
          <div className="flex gap-3">
            {/* <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
            <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
            <Image src={gold} alt="gold" className="hidden h-8 w-auto sm:block gold-rotate-3d" />
            <Image src={towHard} alt="towHard" className="h-8 w-auto" /> */}
              <RankingDialog>
                <Button variant="secondary" className="ml-auto mt-3 pb-2 pt-1 text-xl md:mr-3">主任務即時排名</Button>
              </RankingDialog>
          </div>
        </div>
      );

    default:
      return null;
  }
}