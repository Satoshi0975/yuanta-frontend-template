import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  RegistrationRequest,
  RegistrationResponse,
  NicknameCheckResponse,
  ApiResponse
} from '@/lib/types';

interface UseRegistrationResult {
  isLoading: boolean;
  error: string | null;
  checkNickname: (nickname: string) => Promise<ApiResponse<NicknameCheckResponse>>;
  register: (data: RegistrationRequest) => Promise<ApiResponse<RegistrationResponse>>;
  clearError: () => void;
}

export function useRegistration(): UseRegistrationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkNickname = useCallback(async (nickname: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<NicknameCheckResponse>(
        `${API_ENDPOINTS.CHECK_NICKNAME}/${encodeURIComponent(nickname)}`
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '檢查暱稱失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'NICKNAME_CHECK_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegistrationRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<RegistrationResponse>(
        API_ENDPOINTS.REGISTER,
        data
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '報名失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'REGISTRATION_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    checkNickname,
    register,
    clearError,
  };
}