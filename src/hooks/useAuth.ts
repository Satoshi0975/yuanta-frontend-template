import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  LoginRequest,
  LoginResponse,
  ApiResponse
} from '@/lib/types';

interface UseAuthResult {
  isLoading: boolean;
  error: string | null;
  loginFutures: (credentials: LoginRequest) => Promise<ApiResponse<LoginResponse>>;
  loginLeverage: (credentials: LoginRequest) => Promise<ApiResponse<LoginResponse>>;
  clearError: () => void;
}

export function useAuth(): UseAuthResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loginFutures = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.FUTURES_LOGIN,
        credentials
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登入失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'LOGIN_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginLeverage = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.LEVERAGE_LOGIN,
        credentials
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登入失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'LOGIN_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    loginFutures,
    loginLeverage,
    clearError,
  };
}