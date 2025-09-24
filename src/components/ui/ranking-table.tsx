import { RankingItem } from '@/lib/types';

interface RankingTableProps {
  data: RankingItem[];
  className?: string;
}

export function RankingTable({ data, className = '' }: RankingTableProps) {
  return (
    <div className={`space-y-3 rounded-lg bg-white p-3 text-center text-xl shadow-lg nes-corners ${className}`}>
      {[3,4,5,6].map((item) => (
        <div key={item} className="nes-sm-corners flex h-12 flex-nowrap bg-white text-xl">
          <div className="flex h-full w-[60%] flex-shrink-0 items-center bg-sts-gray px-3 text-sts-text font-bold">
            <p className="truncate">
              {data.length > item ? `#${data[item].participantNumber} ${data[item].participantNickname}` : '-'}
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-end bg-white font-sans font-bold px-3">
            {data.length > item ? data[item].voteCount.toLocaleString() : '-'} 票
          </div>
        </div>
      ))}
    </div>
  );
}