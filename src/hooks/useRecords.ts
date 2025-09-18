import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiResponse, RecordResponse } from '@/lib/types';
import { useCallback, useState } from 'react';

interface UseRecordsResult {
  isLoading: boolean;
  error: string | null;
  getRecord: (accountId: string) => Promise<ApiResponse<RecordResponse>>;
  clearError: () => void;
}

export function useRecords(): UseRecordsResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getRecord = useCallback(async (accountId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<RecordResponse>(
        `${API_ENDPOINTS.RECORD}/${encodeURIComponent(accountId)}`
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '查詢成績失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'RECORD_ERROR',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getRecord,
    clearError,
  };
}
