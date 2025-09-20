import first from '@/assets/images/element/first.png';
import second from '@/assets/images/element/second.png';
import third from '@/assets/images/element/third.png';
import Image from '@/lib/image';

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

  return (
    <div className="space-y-3">
      <div className="nes-sm-corners bg-white px-3 text-center nes-purple-500">
        <h3 className="truncate py-5 text-xl font-bold">
          #{rank} {nickname}
        </h3>
        <Image
          src={getRankImage()}
          alt={`第${rank}名`}
          className="mx-auto h-36 w-auto md:h-24 lg:h-36"
        />
      </div>
      <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
        <div className="flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white">
          票數
        </div>
        <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
          {votes.toLocaleString()}
        </div>
      </div>
    </div>
  );
}