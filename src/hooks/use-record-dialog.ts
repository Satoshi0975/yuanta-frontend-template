import { apiClient } from '@/lib/api';
import type {
  LoginRequest,
  LoginResponse,
  RecordDialogStep,
  RecordResponse,
} from '@/lib/types';
import { useState } from 'react';

// 測試資料生成函數
const getMockRecordData = (fullAccount: string): RecordResponse => {
  // 根據帳號生成不同的測試資料
  const mockDataList: RecordResponse[] = [
    {
      participantId: 1,
      nickname:
        'fjdksla;fjkdls;ajfkdls;ajfkdls;jafkld;sjafkld;sajfklfjdksla;fjkdls;ajfkdls;ajfkdls;jafkld;sjafkld;sajfklfjdksla;fjkdls;ajfkdls;ajfkdls;jafkld;sjafkld;sajfkl',
      isNewCustomer: true,
      totalTradeCount: 23.45,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      tradeCount: 23.45,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
    {
      participantId: 2,
      nickname: '投資高手',
      isNewCustomer: true,
      totalTradeCount: 23.45,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      tradeCount: 23.45,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
    {
      participantId: 3,
      nickname: '穩健投資人',
      isNewCustomer: true,
      totalTradeCount: 23.45,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      tradeCount: 23.45,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
    {
      participantId: 4,
      nickname: '新手勇者',
      isNewCustomer: true,
      totalTradeCount: 23.45,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      tradeCount: 23.45,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
  ];

  // 根據帳號後幾位數字選擇不同的資料
  const accountNumber = fullAccount.slice(-3);
  const index = parseInt(accountNumber) % mockDataList.length;

  return {
    ...mockDataList[index],
  };
};

interface RecordDialogState {
  step: RecordDialogStep;
  data?: {
    user?: LoginResponse['user'];
    accounts?: LoginResponse['accounts'];
    selectedAccountId?: string;
    resultsData?: RecordResponse;
    errorMessage?: string;
    fieldErrors?: Record<string, string>;
  };
}

export const useRecordDialog = (initialStep: RecordDialogStep = 'login') => {
  const [dialogState, setDialogState] = useState<RecordDialogState>({
    step: initialStep,
    data: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  // 重置對話框狀態
  const resetDialog = () => {
    setDialogState({
      step: initialStep,
      data: {},
    });
    setIsLoading(false);
  };

  // 設置錯誤狀態
  const setError = (message: string, fieldErrors?: Record<string, string>) => {
    setDialogState({
      step: 'error',
      data: { errorMessage: message, fieldErrors },
    });
  };

  // 處理登入
  const handleLogin = async (values: {
    username: string;
    password: string;
    captcha: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<LoginResponse>(
        '/api/login/futures',
        values as LoginRequest
      );

      if (response.success && response.data) {
        console.log(response.fieldErrors);
        setDialogState({
          step: 'record',
          data: {
            user: response.data.user,
            accounts: response.data.accounts,
          },
        });
      } else {
        // 處理 fieldErrors - 如果有欄位錯誤，保持在登入頁面並顯示錯誤
        setDialogState((prev) => ({
          step: 'login',
          data: {
            ...prev.data,
            ...(response.fieldErrors
              ? { fieldErrors: response.fieldErrors }
              : { errorMessage: response.message }),
          },
        }));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '登入失敗');
    } finally {
      setIsLoading(false);
    }
  };

  // 查詢成績
  const handleGetResults = async (fullAccount: string) => {
    setIsLoading(true);

    try {
      // 測試模式使用模擬資料
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE') {
        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 根據不同帳號返回不同的測試資料
        const mockData = getMockRecordData(fullAccount);

        setDialogState((prev) => ({
          step: 'record',
          data: {
            ...prev.data,
            selectedAccountId: fullAccount,
            resultsData: mockData,
          },
        }));
      } else {
        // 生產模式使用真實 API
        const response = await apiClient.get(`/api/record/${fullAccount}`);

        if (response.success && response.data) {
          setDialogState((prev) => ({
            step: 'record',
            data: {
              ...prev.data,
              selectedAccountId: fullAccount,
              resultsData: response.data as RecordResponse,
            },
          }));
        } else {
          throw new Error(response.message || '查詢失敗');
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '查詢失敗');
    } finally {
      setIsLoading(false);
    }
  };

  // 從帳號選擇進入查詢流程
  const handleAccountResults = async (fullAccount: string) => {
    await handleGetResults(fullAccount);
  };

  // 返回上一步
  const goBack = () => {
    switch (dialogState.step) {
      case 'record':
        // 清除選中的帳號和結果，但保留登入資料
        setDialogState({
          step: 'login',
          data: {},
        });
        break;
      case 'error':
        setDialogState({
          step: 'login',
          data: {},
        });
        break;
      default:
        break;
    }
  };

  return {
    dialogState,
    isLoading,
    handleLogin,
    handleGetResults,
    handleAccountResults,
    resetDialog,
    setError,
    goBack,
  };
};
