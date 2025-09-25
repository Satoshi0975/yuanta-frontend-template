import { apiClient } from '@/lib/api';
import type {
  ApiResponse,
  DialogState,
  LoginRequest,
  LoginResponse,
  RecordDialogStep,
  RecordResponse,
  RegisterDialogStep,
  RegistrationRequest,
  RegistrationResponse,
} from '@/lib/types';
import { useState } from 'react';

// 模擬資料生成函數
const getMockRecordData = (fullAccount: string): RecordResponse => {
  const mockDataList: RecordResponse[] = [
    {
      participantId: 1,
      nickname: 'ABC124',
      isNewCustomer: true,
      totalTradeCount: 70,
      thisMonthTradeDays: 5,
      totalRanking: 5,
      totalScore: 70,
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
      nickname: 'moneyMoreMore',
      isNewCustomer: false,
      totalTradeCount: 45,
      thisMonthTradeDays: 18,
      totalRanking: 2,
      totalScore: 85,
      profitRateScore: 30,
      tradeCountScore: 25,
      absoluteProfitScore: 30,
      profitRateRanking: 2,
      profitRate: 15.8,
      tradeCountRanking: 3,
      tradeCount: 150,
      popularityRanking: 1,
      totalVoteCount: 89,
    },
  ];

  const accountNumber = fullAccount.slice(-3);
  const index = parseInt(accountNumber) % mockDataList.length;
  return mockDataList[index];
};

const getMockLoginData = (): LoginResponse => ({
  user: {
    username: 'testuser',
    name: '測試使用者',
    userId: 'A123456789',
  },
  accounts: ['F021000-1234567', 'F021000-1234568', 'F021000-1234569'],
});

const getMockRegistrationData = (): ApiResponse<RegistrationResponse> => ({
  success: true,
  message: '報名成功',
  data: {
    id: 1,
    nickname: 'testuser123',
    fullAccount: 'F021000-1234567',
    registrationTime: new Date().toISOString(),
  },
});

// 註冊流程
// 1. 登入 -> 取得帳號清單
// 2. 報名 -> 使用帳號清單作為完整帳號的下拉選單 -> 取得報名成功的內容
// 3. 顯示狀態 -> 成功 -> 顯示報名成功的內容

// 查詢流程
// 1. 登入 -> 取得帳號清單
// 2. 顯示狀態 -> 查詢 -> 使用帳號清單作為完整帳號的下拉選單 -> 取得查詢成功的內容並顯示

export const useDialogFlow = (
  initialStep: RegisterDialogStep | RecordDialogStep = 'login'
) => {
  const [dialogState, setDialogState] = useState<DialogState>({
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

        const mockData = getMockLoginData();
        setDialogState({
          step: 'registration',
          data: {
            user: mockData.user,
            accounts: mockData.accounts,
          },
        });
      } else {
        const response = await apiClient.post<LoginResponse>(
          '/api/login/futures',
          values as LoginRequest
        );

        if (response.success && response.data) {
          console.log(response.fieldErrors);
          setDialogState({
            step: 'registration',
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
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '登入失敗');
    } finally {
      setIsLoading(false);
    }
  };

  // 處理報名
  const handleRegistration = async (values: RegistrationRequest) => {
    setIsLoading(true);
    try {
      // 測試模式使用模擬資料
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE') {
        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockData = getMockRegistrationData();
        setDialogState((prev) => ({
          step: 'success',
          data: {
            ...prev.data,
            registrationData: mockData.data,
          },
        }));
      } else {
        const response = await apiClient.post<RegistrationResponse>(
          '/api/registration',
          values
        );

        if (response.success && response.data) {
          setDialogState((prev) => ({
            step: 'success',
            data: {
              ...prev.data,
              registrationData: response.data,
            },
          }));
        } else {
          // 如果有欄位錯誤，拋出包含 fieldErrors 的錯誤
          if (response.fieldErrors) {
            const error = new Error(response.message || '報名失敗');
            (
              error as unknown as { fieldErrors: Record<string, string> }
            ).fieldErrors = response.fieldErrors;
            throw error;
          } else {
            throw new Error(response.message || '報名失敗');
          }
        }
      }
    } catch (error) {
      // 如果錯誤包含 fieldErrors，直接拋出讓表單處理
      if (
        (error as unknown as { fieldErrors: Record<string, string> })
          .fieldErrors
      ) {
        throw error;
      }
      setError(
        error instanceof Error ? error.message : '報名失敗，請稍後再試。'
      );
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

        const mockData = getMockRecordData(fullAccount);
        setDialogState((prev) => ({
          step: 'record',
          data: {
            ...prev.data,
            resultsData: mockData,
          },
        }));
      } else {
        const response = await apiClient.get(`/api/record/${fullAccount}`);

        if (response.success && response.data) {
          setDialogState((prev) => ({
            step: 'record',
            data: {
              ...prev.data,
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

  // 從帳號選擇進入報名流程
  const handleAccountRegistration = (accountId: string) => {
    setDialogState((prev) => ({
      step: 'registration',
      data: {
        ...prev.data,
        selectedAccountId: accountId,
      },
    }));
  };

  // 從帳號選擇進入查詢流程
  const handleAccountResults = async (fullAccount: string) => {
    setDialogState((prev) => ({
      step: 'record',
      data: {
        ...prev.data,
        selectedAccountId: fullAccount,
      },
    }));
    // 自動查詢成績
    await handleGetResults(fullAccount);
  };

  // 返回上一步
  const goBack = () => {
    switch (dialogState.step) {
      case 'registration':
      case 'record':
        setDialogState((prev) => ({ ...prev, step: 'login' }));
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

  // 跳轉到特定步驟
  const goToStep = (
    step: RegisterDialogStep | RecordDialogStep,
    data?: DialogState['data']
  ) => {
    setDialogState({
      step,
      data: data || dialogState.data,
    });
  };

  return {
    dialogState,
    isLoading,
    handleLogin,
    handleRegistration,
    handleGetResults,
    handleAccountRegistration,
    handleAccountResults,
    resetDialog,
    setError,
    goBack,
    goToStep,
  };
};
