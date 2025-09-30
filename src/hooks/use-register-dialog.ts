import { apiClient } from '@/lib/api';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterDialogStep,
  RegistrationRequest,
  RegistrationResponse,
} from '@/lib/types';
import { useState } from 'react';

const getMockLoginData = (): LoginResponse => ({
  user: {
    username: 'testuser',
    name: '測試使用者',
    userId: 'A123456789',
  },
  accounts: ['F021000-1234567', 'F021000-1234568', 'F021000-1234569'],
});

const getShareContext = (id: number, nickname: string): string => {
  const baseUrl = window.location.origin;
  const path = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `我參加元大期貨人氣王競賽🔥
我是 #${id} ${nickname} 快來幫我投票！
🗳️ ${baseUrl}${path}/vote?share=${id} 
🎁 每日投票還能抽獎唷～`;
};

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

interface RegisterDialogState {
  step: RegisterDialogStep;
  data?: {
    user?: LoginResponse['user'];
    accounts?: LoginResponse['accounts'];
    selectedAccountId?: string;
    registrationData?: RegistrationResponse;
    shareContext?: string;
    errorMessage?: string;
    fieldErrors?: Record<string, string>;
  };
}

export const useRegisterDialog = (
  initialStep: RegisterDialogStep = 'login'
) => {
  const [dialogState, setDialogState] = useState<RegisterDialogState>({
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
      setError(
        error instanceof Error ? error.message : '系統錯誤，請稍後再試。'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 處理報名
  const handleRegistration = async (
    values: RegistrationRequest
  ): Promise<ApiResponse<RegistrationResponse>> => {
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
            shareContext: getShareContext(
              mockData.data?.id || 0,
              mockData.data?.nickname || ''
            ),
          },
        }));
        return mockData;
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
              shareContext: getShareContext(
                response.data?.id || 0,
                response.data?.nickname || ''
              ),
            },
          }));
          return response;
        } else {
          // 如果有欄位錯誤，拋出包含 fieldErrors 的錯誤
          if (response.fieldErrors) {
            const error = new Error(response.message || '報名失敗');
            (
              error as unknown as { fieldErrors: Record<string, string> }
            ).fieldErrors = response.fieldErrors;
            throw error;
          } else {
            throw new Error(response.message || '系統錯誤，請稍後再試。');
          }
        }
      }
    } catch (error) {
      // 如果錯誤包含 fieldErrors，直接拋出讓表單處理
      if (error && typeof error === 'object' && 'fieldErrors' in error) {
        throw error;
      }
      setError(
        error instanceof Error ? error.message : '報名失敗，請稍後再試。'
      );
    } finally {
      setIsLoading(false);
    }

    // 這裡永遠不會到達，但為了滿足型別要求
    throw new Error('Unexpected error');
  };

  // 返回上一步
  const goBack = () => {
    switch (dialogState.step) {
      case 'registration':
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

  return {
    dialogState,
    isLoading,
    handleLogin,
    handleRegistration,
    resetDialog,
    setError,
    goBack,
  };
};
