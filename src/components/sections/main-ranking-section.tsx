'use client';

import fire from '@/assets/images/element/fire.png';
import first from '@/assets/images/element/first.png';
import second from '@/assets/images/element/second.png';
import third from '@/assets/images/element/third.png';
import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import { apiClient } from '@/lib/api';
import Image from '@/lib/image';
import { RankingData, RankingResponse } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { BounceOnScroll } from '../animation-container';
import { Button } from '../nes/button';

type TitleColor = 'blue' | 'green' | 'orange';

interface ColorClasses {
  border: string;
  bg: string;
  text: string;
  rankBg?: string;
}

// 常數定義
const TOP_THREE_COUNT = 3;

const RANK_IMAGES = {
  1: first,
  2: second,
  3: third,
} as const;

const RANK_COLORS: Record<1 | 2 | 3, Omit<ColorClasses, 'rankBg'>> = {
  1: {
    border: 'nes-sts-rank-1',
    bg: 'bg-sts-rank-1',
    text: 'text-sts-rank-1',
  },
  2: {
    border: 'nes-sts-rank-2',
    bg: 'bg-sts-rank-2',
    text: 'text-sts-rank-2',
  },
  3: {
    border: 'nes-sts-rank-3',
    bg: 'bg-sts-rank-3',
    text: 'text-sts-rank-3',
  },
};

const THEME_COLORS: Record<TitleColor, ColorClasses> = {
  green: {
    border: 'nes-sts-green-300',
    bg: 'bg-sts-green-200',
    text: 'text-sts-green-500',
    rankBg: 'bg-sts-green-200',
  },
  orange: {
    border: 'nes-sts-gray-400',
    bg: 'bg-sts-orange-400',
    text: 'text-sts-orange-500',
    rankBg: 'bg-sts-orange-400',
  },
  blue: {
    border: 'nes-sts-gray-200',
    bg: 'bg-sts-blue-500',
    text: 'text-sts-blue-500',
    rankBg: 'bg-sts-blue-500',
  },
};

// 測試模式的假資料
const mockRankingData: RankingResponse = {
  mainRankingList: [
    {
      id: 847,
      ranking: 1,
      participantNickname: 'TradeMasterProMaxUltraSuper2024',
      score: 1250.5,
    },
    {
      id: 235,
      ranking: 2,
      participantNickname: 'InvestorPro88',
      score: 1180.2528,
    },
    {
      id: 672,
      ranking: 3,
      participantNickname: 'FuturesKing99',
      score: 1150.75008,
    },
    {
      id: 491,
      ranking: 4,
      participantNickname: 'ProfitExpert2024',
      score: 1120.0,
    },
    {
      id: 128,
      ranking: 5,
      participantNickname: 'StableInvestorProMaxEliteTrader',
      score: 1095.5,
    },
    {
      id: 903,
      ranking: 6,
      participantNickname: 'MarketPioneer',
      score: 1070.25,
    },
    {
      id: 567,
      ranking: 7,
      participantNickname: 'TradeWarrior77',
      score: 1045.0283,
    },
    {
      id: 342,
      ranking: 8,
      participantNickname: 'FuturesMaster',
      score: 1020.75,
    },
    { id: 789, ranking: 9, participantNickname: 'InvestWinner', score: 995.5 },
    {
      id: 156,
      ranking: 10,
      participantNickname: 'TradingPro123',
      score: 970.25,
    },
    { id: 621, ranking: 11, participantNickname: 'ProfitGuru88', score: 945.0 },
    {
      id: 438,
      ranking: 12,
      participantNickname: 'TradeElite99',
      score: 920.75,
    },
    { id: 874, ranking: 13, participantNickname: 'MarketWinner', score: 895.5 },
    {
      id: 293,
      ranking: 14,
      participantNickname: 'FuturesExpert',
      score: 870.25,
    },
    { id: 715, ranking: 15, participantNickname: 'InvestMaster', score: 845.0 },
    { id: 526, ranking: 16, participantNickname: 'TradingGuru', score: 820.75 },
    { id: 981, ranking: 17, participantNickname: 'ProfitHunter', score: 795.5 },
    {
      id: 364,
      ranking: 18,
      participantNickname: 'StableProfit',
      score: 770.25,
    },
    { id: 207, ranking: 19, participantNickname: 'MarketExpert', score: 745.0 },
    { id: 658, ranking: 20, participantNickname: 'FuturesWin', score: -720.5 },
  ],
  profitRateRankingList: [
    {
      id: 412,
      ranking: 1,
      participantNickname: 'ReturnKing2024',
      score: 85.67,
    },
    {
      id: 736,
      ranking: 2,
      participantNickname: 'ProfitMaster88',
      score: 72.45,
    },
    { id: 289, ranking: 3, participantNickname: 'InvestPro99', score: -68.233 },
  ],
  tradeCountRankingList: [
    { id: 594, ranking: 1, participantNickname: 'ActiveTrader99', score: 9876 },
    { id: 821, ranking: 2, participantNickname: 'FrequentTrade', score: 8543 },
    {
      id: 167,
      ranking: 3,
      participantNickname: 'BusyInvestor',
      score: -7892.55666,
    },
  ],
};

// 工具函數
const getRankImage = (rank: number) => {
  return RANK_IMAGES[rank as keyof typeof RANK_IMAGES] || first;
};

const getColorClasses = (
  rank: number,
  titleColor: TitleColor,
  showTopThreeAsCards: boolean
): ColorClasses => {
  // 如果是大卡片模式（主競賽），前三名使用特殊顏色
  if (showTopThreeAsCards && rank <= 3) {
    return RANK_COLORS[rank as 1 | 2 | 3];
  }

  // 其他名次使用主題顏色（報酬率和交易口數的前三名也用這個）
  return THEME_COLORS[titleColor];
};

// 子元件：小排名卡片
interface SmallRankingCardProps {
  ranking?: number;
  item?: RankingData;
  colors: ColorClasses;
  scoreLabel: string;
  titleKey: string;
}

const SmallRankingCard = ({
  ranking,
  item,
  colors,
  scoreLabel,
  titleKey,
}: SmallRankingCardProps) => (
  <div
    key={`${titleKey}-${item ? item.ranking : ranking}`}
    className="nes-sm-corners flex items-center gap-3 bg-white p-3"
  >
    <div
      className={`flex h-10 w-10 flex-shrink-0 flex-nowrap items-center justify-center rounded-full font-cubic text-xl font-bold text-white nes-corners ${colors.rankBg || colors.bg}`}
    >
      {item ? item.ranking : ranking}
    </div>
    <div className="min-w-0 flex-1 truncate text-left font-medium">
      {item ? '#' + item.id + ' ' + item.participantNickname : '--'}
    </div>
    <div className="flex-shrink-0 font-sans text-lg font-bold text-sts-text">
      {item
        ? item.score.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : '--'}{' '}
      {scoreLabel}
    </div>
  </div>
);

// 子元件：大排名卡片
interface LargeRankingCardProps {
  item?: RankingData;
  ranking?: number;
  colors: ColorClasses;
  scoreLabel: string;
  titleKey: string;
}

const LargeRankingCard = ({
  ranking,
  item,
  colors,
  scoreLabel,
}: LargeRankingCardProps) => (
  <div
    className={cn(
      'nes-sm-corners space-y-3 bg-white px-3 pb-3 text-center',
      colors.border
    )}
  >
    <h3 className="truncate py-5 text-center text-xl font-bold">
      {item ? '#' + item.id + ' ' + item.participantNickname : '-'}
    </h3>
    <Image
      src={getRankImage(item ? item.ranking : (ranking as number))}
      alt={`第${item ? item.ranking : ranking}名`}
      className="mx-auto h-36 w-auto md:h-24 lg:h-36"
    />
    <div
      className={cn(
        'nes-sm-corners flex h-12 flex-nowrap bg-white text-xl',
        colors.border
      )}
    >
      <div
        className={cn(
          'flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white md:hidden lg:flex',
          colors.bg
        )}
      >
        積分
      </div>
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-white font-sans font-bold',
          colors.text
        )}
      >
        {item
          ? item.score.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          : '--'}{' '}
        {scoreLabel}
      </div>
    </div>
  </div>
);

// 子元件：副排名區塊標題
interface SubRankingHeaderProps {
  title: string;
  color: TitleColor;
}

const SubRankingHeader = ({ title, color }: SubRankingHeaderProps) => (
  <h2
    className={cn(
      'nes-sm-corners mx-auto flex w-fit space-x-2 px-4 py-2 text-center font-cubic text-xl text-white',
      THEME_COLORS[color].rankBg
    )}
  >
    <Image src={fire} alt="fire" className="h-7 w-auto" />
    <span>{title}</span>
    <Image src={fire} alt="fire" className="h-7 w-auto" />
  </h2>
);

// 子元件：副排名區塊
interface SubRankingSectionProps {
  title: string;
  data: RankingData[] | null;
  color: TitleColor;
  scoreLabel: string;
  titleKey: string;
}

const SubRankingSection = ({
  title,
  data,
  color,
  scoreLabel,
  titleKey,
}: SubRankingSectionProps) => (
  <div className="space-y-3">
    <SubRankingHeader title={title} color={color} />
    <div className="grid grid-cols-1 gap-2">
      {[0, 1, 2].map((index) => {
        const item = data?.[index];
        const rank = index + 1;
        const colors = getColorClasses(rank, color, false);
        return (
          <SmallRankingCard
            key={`${titleKey}-${rank}`}
            ranking={rank}
            item={item}
            colors={colors}
            scoreLabel={scoreLabel}
            titleKey={titleKey}
          />
        );
      })}
    </div>
  </div>
);

export function MainRankingSection() {
  const [rankingData, setRankingData] = useState<RankingResponse | null>(null);
  const [showRestRankings, setShowRestRankings] = useState(false);
  const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE';

  const fetchRankingData = useCallback(async () => {
    try {
      // 測試模式：使用假資料
      if (isTestMode) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRankingData(mockRankingData);
        return;
      }

      // 正式模式：呼叫 API
      const response = await apiClient.get<RankingResponse>('/api/ranking');
      console.log(response);
      if (response.success && response.data) {
        setRankingData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch ranking data:', err);
    }
  }, [isTestMode]);

  useEffect(() => {
    fetchRankingData();
  }, [fetchRankingData]);

  const mainRankingTop3 = rankingData?.mainRankingList.slice(
    0,
    TOP_THREE_COUNT
  );
  const mainRanking4to5 = rankingData?.mainRankingList.slice(3, 5);
  const mainRankingRest = rankingData?.mainRankingList.slice(5);

  return (
    <BounceOnScroll delay={0.2} repeat className="flex flex-col pt-2">
      <DecorationIcons variant="main-ranking" />
      <SectionCard title="主要任務排名">
        <h2 className="nes-sm-corners mx-auto flex w-fit space-x-2 bg-blue-500 px-4 py-2 text-center font-cubic text-xl text-white">
          <Image src={fire} alt="fire" className="h-7 w-auto" />
          <span className="hidden sm:inline">主要任務 | </span>
          <span>TOP20排名</span>
          <Image src={fire} alt="fire" className="h-7 w-auto" />
        </h2>

        <div className="pt-3">
          {/* 前三名大卡片 */}
          <div className="mb-8">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-5 font-cubic md:grid-cols-3">
              {[1, 2, 3].map((rank) => {
                const item = mainRankingTop3?.find((d) => d.ranking === rank);
                const colors = getColorClasses(rank, 'blue', true);
                return (
                  <LargeRankingCard
                    key={`main-${rank}`}
                    ranking={rank}
                    item={item}
                    colors={colors}
                    scoreLabel="分"
                    titleKey="main"
                  />
                );
              })}
            </div>

            {/* 第4-5名小卡片 - 固定顯示 */}
            {mainRanking4to5 && mainRanking4to5.length > 0 && (
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {mainRanking4to5.map((item) => {
                  const colors = getColorClasses(item.ranking, 'blue', true);
                  return (
                    <SmallRankingCard
                      key={`main-${item.ranking}`}
                      item={item}
                      colors={colors}
                      scoreLabel="分"
                      titleKey="main"
                    />
                  );
                })}
              </div>
            )}

            {/* 第6-20名小卡片 - 收合控制 */}
            {mainRankingRest && mainRankingRest.length > 0 && (
              <>
                {showRestRankings && (
                  <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                    {mainRankingRest.map((item) => {
                      const colors = getColorClasses(
                        item.ranking,
                        'blue',
                        true
                      );
                      return (
                        <SmallRankingCard
                          key={`main-${item.ranking}`}
                          item={item}
                          colors={colors}
                          scoreLabel="分"
                          titleKey="main"
                        />
                      );
                    })}
                  </div>
                )}
                <div className="flex justify-center pb-4">
                  <Button
                    onClick={() => setShowRestRankings(!showRestRankings)}
                    variant="secondary"
                    className="mt-3 pb-2 pt-1 text-lg"
                  >
                    {showRestRankings ? '▲ 收起排名 ▲' : '▼ 查看第6-20名 ▼'}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* 報酬率排名 & 交易口數排名 - 左右並排 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SubRankingSection
              title="報酬率王排名"
              data={rankingData?.profitRateRankingList ?? null}
              color="green"
              scoreLabel="%"
              titleKey="profit"
            />
            <SubRankingSection
              title="口數王排名"
              data={rankingData?.tradeCountRankingList ?? null}
              color="orange"
              scoreLabel="口"
              titleKey="trade"
            />
          </div>
        </div>

        <p className="mt-3 text-center text-sm text-gray-500">
          * 以活動結束為憑，排名僅供參考。
        </p>
      </SectionCard>
    </BounceOnScroll>
  );
}
