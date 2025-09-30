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
      nickname: 'ABC124',
      isNewCustomer: true,
      totalTradeCount: 23.45 * 3,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45 * 3,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
    {
      participantId: 2,
      nickname: 'moneyMoreMore',
      isNewCustomer: true,
      totalTradeCount: 23.45 * 3,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45 * 3,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
    {
      participantId: 3,
      nickname: 'IamTheUser1234',
      isNewCustomer: true,
      totalTradeCount: 23.45 * 3,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45 * 3,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
      popularityRanking: 5,
      totalVoteCount: 23.45,
    },
    {
      participantId: 4,
      nickname: '111HowAreYou111',
      isNewCustomer: true,
      totalTradeCount: 23.45 * 3,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 23.45 * 3,
      profitRateScore: 23.45,
      tradeCountScore: 23.45,
      absoluteProfitScore: 23.45,
      profitRateRanking: 5,
      profitRate: 23.45,
      tradeCountRanking: 5,
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
    noDataMessage?: string;
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
      // 測試模式使用模擬資料
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE') {
        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const accounts = [
          'F021000-1234567',
          'F021000-1234568',
          'F021000-1234569',
        ];

        setDialogState({
          step: 'record',
          data: {
            user: {
              username: 'testuser',
              name: '測試使用者',
              userId: 'A123456789',
            },
            accounts: accounts,
          },
        });

        // 如果帳號列表不為空，自動選擇第一個帳號並載入成績
        if (accounts.length > 0) {
          await handleGetResults(accounts[0]);
        }
      } else {
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

          // 如果帳號列表不為空，自動選擇第一個帳號並載入成績
          if (response.data.accounts && response.data.accounts.length > 0) {
            await handleGetResults(response.data.accounts[0]);
          }
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
      }
    } catch {
      setError('系統錯誤，請稍後再試。');
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
            noDataMessage: undefined,
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
              noDataMessage: undefined,
            },
          }));
        } else if (
          !response.success &&
          (response.errorCode === 'NO_REGISTER' ||
            response.errorCode === 'NO_RECORD')
        ) {
          // 查無成績時，保持在 record 頁面，清除結果資料並設置提示訊息
          setDialogState((prev) => ({
            step: 'record',
            data: {
              ...prev.data,
              selectedAccountId: fullAccount,
              resultsData: undefined,
              noDataMessage: response.message || '尚無成績資料或尚未報名',
            },
          }));
        } else {
          throw new Error(response.message || '查詢失敗');
        }
      }
    } catch {
      // 真正的錯誤（如網路錯誤）才跳到 error 頁面
      setError('查詢失敗，請稍後再試。');
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
