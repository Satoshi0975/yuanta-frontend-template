interface RankingItem {
  rank: string;
  name: string;
  votes: string | number;
}

interface RankingTableProps {
  data: RankingItem[];
  className?: string;
}

export function RankingTable({ data, className = '' }: RankingTableProps) {
  return (
    <div className={`space-y-3 rounded-lg bg-white p-3 text-center text-xl shadow-lg nes-corners ${className}`}>
      {data.map((item, index) => (
        <div key={index} className="nes-sm-corners flex h-12 flex-nowrap bg-white text-xl">
          <div className="flex h-full w-[60%] flex-shrink-0 items-center bg-sts-gray px-3 text-sts-text font-bold">
            <p className="truncate">
              {item.rank} {item.name} 
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-end bg-white font-sans font-bold px-3">
            {typeof item.votes === 'number' ? item.votes.toLocaleString() : item.votes} 票
          </div>
        </div>
      ))}
    </div>
  );
}