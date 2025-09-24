'use client';

import fire from '@/assets/images/element/fire.png';
import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import { RankingCard } from '@/components/ui/ranking-card';
import { RankingPrizeTable } from '@/components/ui/ranking-prize-table';
import { RankingTable } from '@/components/ui/ranking-table';
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import Image from '@/lib/image';
import type { RankingItem } from '@/lib/types';
import { useEffect, useState } from 'react';
import { BounceOnScroll } from '../animation-container';

// 測試模式假資料
const mockRankingData: RankingItem[] = [
  {
    participantNumber: '12',
    participantNickname: 'trader123',
    voteCount: 1250,
    ranking: 1,
  },
  {
    participantNumber: '55',
    participantNickname: 'investor88',
    voteCount: 980,
    ranking: 2,
  },
  {
    participantNumber: '32',
    participantNickname: 'market99',
    voteCount: 756,
    ranking: 3,
  },
  {
    participantNumber: '103',
    participantNickname: 'future777',
    voteCount: 623,
    ranking: 4,
  },
  {
    participantNumber: '2',
    participantNickname: 'profit555',
    voteCount: 589,
    ranking: 5,
  },
  {
    participantNumber: '77',
    participantNickname: 'risk666',
    voteCount: 467,
    ranking: 6,
  },
  {
    participantNumber: '33',
    participantNickname: 'analysis333',
    voteCount: 398,
    ranking: 7,
  },
  {
    participantNumber: '111',
    participantNickname: 'strategy111',
    voteCount: 345,
    ranking: 8,
  },
];

export function PopularityRankingSection() {
  const [rankingTableData, setRankingTableData] = useState<RankingItem[]>([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      // 檢查是否為測試模式
      const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE';

      if (isTestMode) {
        // 測試模式使用假資料
        console.log('🧪 測試模式：使用假資料');
        setRankingTableData(mockRankingData);
        return;
      }

      // 正常模式從 API 取得資料
      try {
        const response = await apiClient.get<RankingItem[]>(
          API_ENDPOINTS.RANKING
        );

        if (response.success && response.data) {
          setRankingTableData(response.data);
        } else {
          setRankingTableData([]);
        }
      } catch (err) {
        console.error('取得排行榜資料失敗:', err);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <BounceOnScroll delay={0.2} repeat className="flex flex-col pt-2">
      <DecorationIcons variant="popularity" />
      <SectionCard title="期貨人氣王">
        <h2 className="nes-sm-corners mx-auto flex w-fit space-x-2 bg-blue-500 px-4 py-2 text-center font-cubic text-xl text-white">
          <Image src={fire} alt="fire" className="h-7 w-auto" />
          <span>即時排名</span>
          <Image src={fire} alt="fire" className="h-7 w-auto" />
        </h2>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-5 font-cubic md:grid-cols-3">
          <RankingCard
            rank={1}
            data={rankingTableData.length > 0 ? rankingTableData[0] : undefined}
          />
          <RankingCard
            rank={2}
            data={rankingTableData.length > 1 ? rankingTableData[1] : undefined}
          />
          <RankingCard
            rank={3}
            data={rankingTableData.length > 2 ? rankingTableData[2] : undefined}
          />
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <RankingPrizeTable />
          <RankingTable data={rankingTableData} />
        </div>

        <p className="mt-3 text-center text-sm text-gray-500">
          * 以活動結束為憑，排名僅供參考。
        </p>
      </SectionCard>
    </BounceOnScroll>
  );
}
