import { apiClient } from '@/lib/api';
import type {
  DialogState,
  DialogStep,
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
  RegistrationResponse,
  RecordResponse,
} from '@/lib/types';
import { useState } from 'react';

// 註冊流程
// 1. 登入 -> 取得帳號清單
// 2. 報名 -> 使用帳號清單作為完整帳號的下拉選單 -> 取得報名成功的內容
// 3. 顯示狀態 -> 成功 -> 顯示報名成功的內容

// 查詢流程
// 1. 登入 -> 取得帳號清單
// 2. 查詢 -> 使用帳號清單作為完整帳號的下拉選單 -> 取得查詢成功的內容
// 3. 顯示狀態 -> 成功 -> 顯示查詢成功的內容

export const useDialogFlow = (initialStep: DialogStep = 'login') => {
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
  const setError = (message: string) => {
    setDialogState({
      step: 'error',
      data: { errorMessage: message },
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
        // 根據業務邏輯決定下一步
        // 這裡可以根據用戶狀態或其他條件來決定流程
        const nextStep = determineNextStep(response.data);

        setDialogState({
          step: nextStep,
          data: {
            user: response.data.user,
            accounts: response.data.accounts,
          },
        });
      } else {
        throw new Error(response.message || '登入失敗');
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
      const response = await apiClient.post<RegistrationResponse>(
        '/api/register',
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
        throw new Error(response.message || '報名失敗');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '報名失敗');
    } finally {
      setIsLoading(false);
    }
  };

  // 查詢成績
  const handleGetResults = async (accountId: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/api/records/${accountId}`);

      if (response.success && response.data) {
        setDialogState((prev) => ({
          step: 'results',
          data: {
            ...prev.data,
            resultsData: response.data as RecordResponse,
          },
        }));
      } else {
        throw new Error(response.message || '查詢失敗');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '查詢失敗');
    } finally {
      setIsLoading(false);
    }
  };

  // 決定登入後的下一步
  const determineNextStep = (data: LoginResponse): DialogStep => {
    // 登入成功後，讓用戶選擇要報名還是查詢
    // 如果只有一個帳號且有明確的業務邏輯，可以直接跳轉
    return 'account-selection';
  };

  // 從帳號選擇進入報名流程
  const handleAccountRegistration = (accountId: string) => {
    setDialogState(prev => ({
      step: 'registration',
      data: {
        ...prev.data,
        selectedAccountId: accountId,
      },
    }));
  };

  // 從帳號選擇進入查詢流程
  const handleAccountResults = async (accountId: string) => {
    setDialogState(prev => ({
      step: 'results',
      data: {
        ...prev.data,
        selectedAccountId: accountId,
      },
    }));
    // 自動查詢成績
    await handleGetResults(accountId);
  };

  // 返回上一步
  const goBack = () => {
    switch (dialogState.step) {
      case 'account-selection':
        setDialogState((prev) => ({ ...prev, step: 'login' }));
        break;
      case 'registration':
      case 'results':
        setDialogState((prev) => ({ ...prev, step: 'account-selection' }));
        break;
      case 'error':
        setDialogState((prev) => ({ ...prev, step: 'login' }));
        break;
      default:
        break;
    }
  };

  // 跳轉到特定步驟
  const goToStep = (step: DialogStep, data?: DialogState['data']) => {
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
