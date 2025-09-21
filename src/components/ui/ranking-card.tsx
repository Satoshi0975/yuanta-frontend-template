import first from '@/assets/images/element/first.png';
import second from '@/assets/images/element/second.png';
import third from '@/assets/images/element/third.png';
import Image from '@/lib/image';
import { cn } from '@/lib/utils';

interface RankingCardProps {
  rank: 1 | 2 | 3;
  nickname: string;
  votes: string | number;
}

export function RankingCard({ rank, nickname, votes }: RankingCardProps) {
  const getRankImage = () => {
    switch (rank) {
      case 1:
        return first;
      case 2:
        return second;
      case 3:
        return third;
      default:
        return first;
    }
  };

  const getColorClasses = () => {
    switch (rank) {
      case 1:
        return {
          text: 'text-sts-rank-1',
          border: 'nes-sts-rank-1',
          bg: 'bg-sts-rank-1'
        };
      case 2:
        return {
          text: 'text-sts-rank-2',
          border: 'nes-sts-rank-2',
          bg: 'bg-sts-rank-2'
        };
      case 3:
        return {
          text: 'text-sts-rank-3',
          border: 'nes-sts-rank-3',
          bg: 'bg-sts-rank-3'
        };
      default:
        return {
          text: 'text-sts-rank-1',
          border: 'nes-sts-rank-1',
          bg: 'bg-sts-rank-1'
        };
    }
  };

  const { text, border, bg } = getColorClasses();
  

  return (
    <div className="space-y-3 ">
      <div className={cn("nes-sm-corners bg-white px-3 text-center", border)}>
        <h3 className="truncate py-5 text-xl font-bold text-center">
          #{rank}&nbsp;&nbsp;{nickname}
        </h3>
        <Image
          src={getRankImage()}
          alt={`第${rank}名`}
          className="mx-auto h-36 w-auto md:h-24 lg:h-36"
        />
      </div>
      <div className={cn("nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl", border)}>
        <div className={cn("flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white", bg)}>
          票數
        </div>
        <div className={cn("flex h-full w-full items-center justify-center bg-white font-sans font-bold", text)}>
          {votes.toLocaleString()}
        </div>
      </div>
    </div>
  );
}