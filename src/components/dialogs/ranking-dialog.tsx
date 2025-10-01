'use client';

import first from '@/assets/images/element/first.png';
import second from '@/assets/images/element/second.png';
import third from '@/assets/images/element/third.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { apiClient } from '@/lib/api';
import Image from '@/lib/image';
import type { RankingData, RankingResponse } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface RankingDialogProps {
  children?: React.ReactNode;
}

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
    border: 'border-sts-green-200',
    bg: 'bg-sts-green-200',
    text: 'text-sts-green-500',
    rankBg: 'bg-sts-green-200',
  },
  orange: {
    border: 'border-sts-orange-400',
    bg: 'bg-sts-orange-400',
    text: 'text-sts-orange-500',
    rankBg: 'bg-sts-orange-400',
  },
  blue: {
    border: 'border-sts-blue-500',
    bg: 'bg-sts-blue-500',
    text: 'text-sts-blue-500',
    rankBg: 'bg-sts-blue-500',
  },
};

// 測試模式的假資料
const mockRankingData: RankingResponse = {
  mainRankingList: [
    {
      ranking: 1,
      participantNickname: '交易達人交易達人交易達人交易達人交易達人交易達人',
      score: 1250.5,
    },
    { ranking: 2, participantNickname: '投資高手', score: 1180.25 },
    { ranking: 3, participantNickname: '期貨王者', score: 1150.75 },
    { ranking: 4, participantNickname: '獲利專家', score: 1120.0 },
    {
      ranking: 5,
      participantNickname:
        '穩健投資交易達人交易達人交易達人交易達人交易達人交易達人',
      score: 1095.5,
    },
    { ranking: 6, participantNickname: '市場先鋒', score: 1070.25 },
    { ranking: 7, participantNickname: '交易戰神', score: 1045.0 },
    { ranking: 8, participantNickname: '期貨達人', score: 1020.75 },
    { ranking: 9, participantNickname: '投資贏家', score: 995.5 },
    { ranking: 10, participantNickname: '操盤高手', score: 970.25 },
    { ranking: 11, participantNickname: '獲利大師', score: 945.0 },
    { ranking: 12, participantNickname: '交易精英', score: 920.75 },
    { ranking: 13, participantNickname: '市場贏家', score: 895.5 },
    { ranking: 14, participantNickname: '期貨專家', score: 870.25 },
    { ranking: 15, participantNickname: '投資達人', score: 845.0 },
    { ranking: 16, participantNickname: '交易大師', score: 820.75 },
    { ranking: 17, participantNickname: '獲利高手', score: 795.5 },
    { ranking: 18, participantNickname: '穩定獲利', score: 770.25 },
    { ranking: 19, participantNickname: '市場專家', score: 745.0 },
    { ranking: 20, participantNickname: '期貨贏家', score: 720.5 },
  ],
  profitRateRankingList: [
    { ranking: 1, participantNickname: '報酬之王', score: 85.67 },
    { ranking: 2, participantNickname: '獲利高手', score: 72.45 },
    { ranking: 3, participantNickname: '投資達人', score: 68.23 },
  ],
  tradeCountRankingList: [
    { ranking: 1, participantNickname: '交易狂人', score: 9876 },
    { ranking: 2, participantNickname: '頻繁交易', score: 8543 },
    { ranking: 3, participantNickname: '活躍投資', score: 7892 },
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
  item: RankingData;
  colors: ColorClasses;
  scoreLabel: string;
  titleKey: string;
}

const SmallRankingCard = ({
  item,
  colors,
  scoreLabel,
  titleKey,
}: SmallRankingCardProps) => (
  <div
    key={`${titleKey}-${item.ranking}`}
    className="nes-sm-corners flex items-center gap-3 bg-white p-3"
  >
    <div
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-cubic font-bold text-white ${colors.rankBg || colors.bg}`}
    >
      {item.ranking}
    </div>
    <div className="min-w-0 flex-1 truncate text-left font-medium">
      {item.participantNickname}
    </div>
    <div className="flex-shrink-0 font-sans text-lg font-bold text-sts-text">
      {item.score.toLocaleString()} {scoreLabel}
    </div>
  </div>
);

// 子元件：大排名卡片
interface LargeRankingCardProps {
  item: RankingData;
  colors: ColorClasses;
  scoreLabel: string;
  titleKey: string;
}

const LargeRankingCard = ({
  item,
  colors,
  scoreLabel,
  titleKey,
}: LargeRankingCardProps) => (
  <div
    key={`${titleKey}-${item.ranking}`}
    className={cn(
      'nes-sm-corners space-y-3 bg-white px-3 pb-3 text-center',
      colors.border
    )}
  >
    <h3 className="truncate py-5 text-center text-xl font-bold">
      {item.participantNickname}
    </h3>
    <Image
      src={getRankImage(item.ranking)}
      alt={`第${item.ranking}名`}
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
          'flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white sm:hidden md:flex',
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
        {item.score.toLocaleString()} {scoreLabel}
      </div>
    </div>
  </div>
);

const RankingDialog = ({ children }: RankingDialogProps) => {
  const [rankingData, setRankingData] = useState<RankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE';

  const fetchRankingData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 測試模式：使用假資料
      if (isTestMode) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRankingData(mockRankingData);
        return;
      }

      // 正式模式：呼叫 API
      const response = await apiClient.get<RankingResponse>('/api/ranking');
      if (response.success && response.data) {
        setRankingData(response.data);
      } else {
        setError(response.message || '無法載入排名資料');
      }
    } catch (err) {
      setError('載入排名資料時發生錯誤');
      console.error('Failed to fetch ranking data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isTestMode]);

  useEffect(() => {
    fetchRankingData();
  }, [fetchRankingData]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[9999] mx-auto max-h-[90vh] max-w-3xl rounded-lg border-none bg-sts-orange-100 ring-0">
        <DialogHeader className="hidden">
          <DialogTitle className="text-center font-cubic text-xl font-bold text-sts-text">
            前20名排名查詢
          </DialogTitle>
        </DialogHeader>
        <div className="mx-1 h-full">
          <ScrollArea className="h-full max-h-[calc(100vh-200px)] p-1">
            {isLoading && (
              <div className="py-8 text-center text-sts-text">載入中...</div>
            )}
            {error && (
              <div className="py-8 text-center text-red-500">{error}</div>
            )}
            {rankingData && !isLoading && !error && (
              <>
                {/* 主競賽排名 - 顯示前20名 */}
                <div className="mb-8">
                  <h3 className="mb-4 text-left font-cubic text-3xl font-bold text-sts-text">
                    主要任務 | TOP20排名
                  </h3>

                  {/* 前三名大卡片 */}
                  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {rankingData.mainRankingList
                      .slice(0, TOP_THREE_COUNT)
                      .map((item) => {
                        const colors = getColorClasses(
                          item.ranking,
                          'blue',
                          true
                        );
                        return (
                          <LargeRankingCard
                            key={`main-${item.ranking}`}
                            item={item}
                            colors={colors}
                            scoreLabel="分"
                            titleKey="main"
                          />
                        );
                      })}
                  </div>

                  {/* 第4-20名小卡片 */}
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {rankingData.mainRankingList
                      .slice(TOP_THREE_COUNT)
                      .map((item) => {
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
                </div>

                {/* 報酬率排名 & 交易口數排名 - 左右並排 */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* 報酬率排名 - 只顯示前三名 */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-left font-cubic text-3xl font-bold text-sts-text">
                      報酬率王排名
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {rankingData.profitRateRankingList
                        .slice(0, TOP_THREE_COUNT)
                        .map((item) => {
                          const colors = getColorClasses(
                            item.ranking,
                            'green',
                            false
                          );
                          return (
                            <SmallRankingCard
                              key={`profit-${item.ranking}`}
                              item={item}
                              colors={colors}
                              scoreLabel="%"
                              titleKey="profit"
                            />
                          );
                        })}
                    </div>
                  </div>

                  {/* 交易口數排名 - 只顯示前三名 */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-left font-cubic text-3xl font-bold text-sts-text">
                      口數王排名
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {rankingData.tradeCountRankingList
                        .slice(0, TOP_THREE_COUNT)
                        .map((item) => {
                          const colors = getColorClasses(
                            item.ranking,
                            'orange',
                            false
                          );
                          return (
                            <SmallRankingCard
                              key={`trade-${item.ranking}`}
                              item={item}
                              colors={colors}
                              scoreLabel="口"
                              titleKey="trade"
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </>
            )}
            <ScrollBar />
          </ScrollArea>
          <p className="mt-2 text-sm text-gray-500">
            * 以活動結束為憑，排名僅供參考。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RankingDialog;
