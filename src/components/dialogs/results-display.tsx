import { Button } from '@/components/ui/button';
import type { RecordResponse } from '@/lib/types';
import { Trophy, TrendingUp, Calendar, Users } from 'lucide-react';

interface ResultsDisplayProps {
  data: RecordResponse;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const ResultsDisplay = ({ data, onRefresh, isLoading = false }: ResultsDisplayProps) => {
  const formatReturn = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getReturnColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRankingBadge = (ranking: number, total: number) => {
    const percentage = (ranking / total) * 100;
    if (percentage <= 10) return { color: 'bg-yellow-500', text: '頂尖' };
    if (percentage <= 25) return { color: 'bg-gray-400', text: '優秀' };
    if (percentage <= 50) return { color: 'bg-orange-500', text: '良好' };
    return { color: 'bg-blue-500', text: '加油' };
  };

  const badge = getRankingBadge(data.ranking, data.participantCount);

  return (
    <div className="space-y-6 p-4">
      {/* 用戶資訊標題 */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {data.nickname}
        </h3>
        <p className="text-sm text-gray-600">
          帳號：{data.fullAccount}
        </p>
      </div>

      {/* 主要成績卡片 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">總報酬率</h4>
          <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${badge.color}`}>
            {badge.text}
          </div>
        </div>

        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getReturnColor(data.totalReturn)}`}>
            {formatReturn(data.totalReturn)}
          </div>
          <p className="text-gray-600">累計報酬率</p>
        </div>
      </div>

      {/* 詳細資訊 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">排名</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            #{data.ranking}
          </div>
          <p className="text-xs text-gray-500">
            共 {data.participantCount.toLocaleString()} 人
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">參賽者</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {data.participantCount.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500">總參與人數</p>
        </div>
      </div>

      {/* 更新時間 */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>最後更新：{new Date(data.lastUpdateTime).toLocaleString('zh-TW')}</span>
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="flex space-x-3 pt-4">
        {onRefresh && (
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            刷新資料
          </Button>
        )}

        <Button
          className="flex-1"
          onClick={() => window.open('https://www.yuantafutures.com.tw/', '_blank')}
        >
          前往交易
        </Button>
      </div>

      {/* 提示文字 */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t">
        <p>
          * 資料僅供參考，實際成績以官方公告為準
          <br />
          * 投資有風險，交易請謹慎評估
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;