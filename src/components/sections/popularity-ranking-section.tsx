import fire from '@/assets/images/element/fire.png';
import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import { RankingCard } from '@/components/ui/ranking-card';
import { RankingPrizeTable } from '@/components/ui/ranking-prize-table';
import { RankingTable } from '@/components/ui/ranking-table';
import Image from '@/lib/image';

export function PopularityRankingSection() {
  const rankingTableData = [
    { rank: '#3', name: 'CME之王CME之王CME之王', votes: 1100 },
    { rank: '#3', name: 'CME之王', votes: 5000 },
    { rank: '#3', name: 'CME之王', votes: 300 },
    { rank: '#3', name: 'CME之王', votes: 20 },
  ];

  return (
    <div className="flex flex-col pt-2">
      <DecorationIcons variant="popularity" />
      <SectionCard title="期貨人氣王">
        <h2 className="nes-sm-corners mx-auto flex w-fit space-x-2 bg-blue-500 px-4 py-2 text-center font-cubic text-xl text-white">
          <Image src={fire} alt="fire" className="h-7 w-auto" />
          <span>即時排名</span>
          <Image src={fire} alt="fire" className="h-7 w-auto" />
        </h2>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-5 font-cubic md:grid-cols-3">
          <RankingCard rank={1} nickname="網友暱稱網友暱稱" votes={100000} />
          <RankingCard rank={2} nickname="網友暱稱網友暱稱" votes={100000} />
          <RankingCard rank={3} nickname="網友暱稱網友暱稱" votes={100000} />
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <RankingPrizeTable />
          <RankingTable data={rankingTableData} />
        </div>
      </SectionCard>
    </div>
  );
}
