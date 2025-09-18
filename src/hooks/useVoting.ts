import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  VoteRequest,
  Participant,
  RankingItem,
  ApiResponse
} from '@/lib/types';

interface UseVotingResult {
  isLoading: boolean;
  error: string | null;
  searchParticipants: (keyword?: string) => Promise<ApiResponse<Participant[]>>;
  vote: (data: VoteRequest) => Promise<ApiResponse<null>>;
  getRanking: () => Promise<ApiResponse<RankingItem[]>>;
  clearError: () => void;
}

export function useVoting(): UseVotingResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const searchParticipants = useCallback(async (keyword?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = keyword
        ? `${API_ENDPOINTS.SEARCH_PARTICIPANTS}?keyword=${encodeURIComponent(keyword)}`
        : API_ENDPOINTS.SEARCH_PARTICIPANTS;

      const response = await apiClient.get<Participant[]>(url);

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '搜尋參賽者失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'SEARCH_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const vote = useCallback(async (data: VoteRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<null>(
        API_ENDPOINTS.VOTE,
        data
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '投票失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'VOTE_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRanking = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<RankingItem[]>(
        API_ENDPOINTS.RANKING
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '取得排行榜失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'RANKING_ERROR'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    searchParticipants,
    vote,
    getRanking,
    clearError,
  };
}