'use client';

import gold from '@/assets/images/element/gold.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from '@/lib/image';
import type { AccountInfo, RecordResponse } from '@/lib/types';
import { useState } from 'react';
import Titlebar from '../nes/titlebar';

interface RecordDisplayProps {
  accounts: AccountInfo[];
  resultsData?: RecordResponse;
  selectedAccount?: string;
  isLoading: boolean;
  onAccountSelect: (fullAccount: string) => void;
}

const RecordDisplay = ({
  accounts,
  resultsData,
  selectedAccount,
  isLoading,
  onAccountSelect,
}: RecordDisplayProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    selectedAccount || ''
  );

  const handleAccountChange = (value: string) => {
    setSelectedValue(value);
    onAccountSelect(value);
  };

  // const formatReturn = (totalReturn: number) => {
  //   const sign = totalReturn >= 0 ? '+' : '';
  //   return `${sign}${totalReturn.toFixed(2)}%`;
  // };

  // const getReturnColor = (totalReturn: number) => {
  //   if (totalReturn > 0) return 'text-green-600';
  //   if (totalReturn < 0) return 'text-red-600';
  //   return 'text-gray-600';
  // };

  return (
    <div className="text-sts-text">
      {/* 帳號選擇區塊 */}
      <div className="mb-6 flex items-baseline gap-3">
        <label className="mb-2 block text-nowrap font-medium">選擇帳號</label>
        <Select value={selectedValue} onValueChange={handleAccountChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="請選擇要查詢的帳號" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 載入狀態 */}
      {isLoading && (
        <div className="py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-sts-blue-500"></div>
          <p className="mt-2 text-gray-600">查詢成績中...</p>
        </div>
      )}

      {/* 成績顯示區塊 */}
      {!isLoading && resultsData && (
        <div className="w-full text-base">
          <div className="pb-4 text-center">
            <p className="text-lg font-medium">
              親愛的{' '}
              <span className="break-all text-sts-blue-500">
                #{resultsData.participantId} {resultsData.nickname}{' '}
              </span>
              客戶您好，您的戰績：
            </p>
          </div>

          <div className="relative !mt-6 rounded-md border-4 border-sts-text bg-white p-4 pt-10 text-sts-text">
            <Titlebar className="nes-title-sm absolute -top-6 left-1/2 w-fit -translate-x-1/2 px-0 py-0 text-lg [&>.section-middle]:w-28 [&>.section-middle]:!min-w-fit">
              新手村
            </Titlebar>
            <p>活動期間，新戶或靜止戶交易可獲得【100元享樂券】</p>
            <p>
              您目前累積交易
              <span className="font-bold text-sts-blue-500">
                {resultsData.totalTradeCount}
              </span>
              口，
              {resultsData.isNewCustomer && resultsData.totalTradeCount > 0 ? (
                <span className="font-bold text-sts-green-200">符合</span>
              ) : (
                <span className="font-bold text-sts-red-200">不符合</span>
              )}
              本次資格
            </p>
          </div>
          <p className="mt-1 px-2 text-left text-sm text-gray-600">
            新戶定義：2025/01/01-12/31期間於元大期貨或所屬券商合作夥伴完成新開立期貨帳戶，並交易即符合資格戶。
          </p>
          <p className="!mt-1 px-2 text-left text-sm text-gray-600">
            靜止定義：已於元大期貨或所屬券商合作夥伴開戶者，最後交易日2024/12/31以前，從未交易本次活動商品者。
          </p>

          <div className="relative !mt-10 rounded-md border-4 border-sts-text bg-white p-4 pt-10 text-sts-text">
            <Titlebar className="nes-title-sm absolute -top-6 left-1/2 w-fit -translate-x-1/2 px-0 py-0 text-lg [&>.section-middle]:w-28 [&>.section-middle]:!min-w-fit">
              每日交易
            </Titlebar>
            <p>
              本月累積交易
              <span className="font-bold text-sts-blue-500">
                {resultsData.thisMonthTradeDays}
              </span>
              天
            </p>
            <p>
              本月交易15天抽獎次數x2計算
              {resultsData.thisMonthTradeDays >= 15 ? (
                <span className="font-bold text-sts-green-200">符合</span>
              ) : (
                <span className="font-bold text-sts-red-200">不符合</span>
              )}
              資格
            </p>
            <p>
              本月可共抽{' '}
              <span className="font-bold text-sts-blue-500">
                {resultsData.thisMonthTradeDays *
                  (resultsData.thisMonthTradeDays >= 15 ? 2 : 1)}
                次
              </span>{' '}
              機會
            </p>
          </div>

          <div className="relative !mt-10 rounded-md border-4 border-sts-text bg-white p-4 pt-10 text-sts-text">
            <Titlebar className="nes-title-sm absolute -top-6 left-1/2 w-fit -translate-x-1/2 px-0 py-0 text-lg [&>.section-middle]:w-28 [&>.section-middle]:!min-w-fit">
              主要競賽
            </Titlebar>

            <div className="mx-auto mb-4 grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
              <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-xl">
                <div className="flex h-full w-[40%] min-w-[100px] flex-shrink-0 items-center bg-[#D88600] px-3 font-bold text-white">
                  <p className="truncate">總積分</p>
                </div>
                <div className="flex h-full w-full items-center justify-end bg-white px-3 font-sans font-bold text-[#D88600]">
                  {resultsData.totalScore}
                </div>
              </div>
              <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-xl">
                <div className="flex h-full w-[40%] min-w-[100px] flex-shrink-0 items-center bg-[#D88600] px-3 font-bold text-white">
                  <p className="truncate">排名</p>
                </div>
                <div className="flex h-full w-full items-center justify-end bg-white px-3 font-sans font-bold text-[#D88600]">
                  {resultsData.totalRanking}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-2 gap-y-2 text-lg font-medium md:grid-cols-3 md:text-base">
              <p>
                報酬率積分：
                <span className="font-bold text-sts-blue-500">
                  {resultsData.profitRateScore}
                </span>
              </p>
              <p>
                交易口數積分：
                <span className="font-bold text-sts-blue-500">
                  {resultsData.tradeCountScore}
                </span>
              </p>
              <p>
                絕對獲利積分：
                <span className="font-bold text-sts-blue-500">
                  {resultsData.absoluteProfitScore}
                </span>
              </p>
            </div>
          </div>

          <div className="relative !mt-10 rounded-md border-4 border-sts-text bg-white p-4 pt-10 text-sts-text">
            <Titlebar className="nes-title-sm absolute -top-6 left-1/2 w-fit -translate-x-1/2 px-0 py-0 text-lg [&>.section-middle]:w-28 [&>.section-middle]:!min-w-fit">
              特別獎
            </Titlebar>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2 text-left text-lg">
                <Image
                  src={gold}
                  alt="gold"
                  className="gold-rotate-3d h-4 w-auto"
                />
                <p className="break-keep">
                  報酬率：您的排名是第
                  <span className="font-bold text-sts-blue-500">
                    {resultsData.profitRateRanking}
                  </span>
                  名，報酬率：
                  <span className="font-bold text-sts-blue-500">
                    {resultsData.profitRate}
                  </span>
                  ％
                </p>
              </div>
              <div className="flex items-baseline gap-2 text-left text-lg">
                <Image
                  src={gold}
                  alt="gold"
                  className="gold-rotate-3d h-4 w-auto"
                />
                <p className="break-keep">
                  口數王：您的排名是第
                  <span className="font-bold text-sts-blue-500">
                    {resultsData.tradeCountRanking}
                  </span>
                  名，總交易口數：
                  <span className="font-bold text-sts-blue-500">
                    {resultsData.totalTradeCount}
                  </span>
                </p>
              </div>
              <div className="flex items-baseline gap-2 text-left text-lg">
                <Image
                  src={gold}
                  alt="gold"
                  className="gold-rotate-3d h-4 w-auto"
                />
                <p className="break-keep">
                  人氣王：您的排名是第
                  <span className="font-bold text-sts-blue-500">
                    {resultsData.popularityRanking}
                  </span>
                  名，總票數：
                  <span className="font-bold text-sts-blue-500">
                    {resultsData.totalVoteCount}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 無選擇帳號時的提示 */}
      {!isLoading && !resultsData && accounts.length > 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-600">請選擇帳號以查詢成績</p>
        </div>
      )}

      {/* 無帳號時的提示 */}
      {!isLoading && accounts.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-red-600">您尚未報名本次活動</p>
        </div>
      )}
    </div>
  );
};

export default RecordDisplay;
