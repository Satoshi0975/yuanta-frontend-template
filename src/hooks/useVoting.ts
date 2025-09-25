import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  ApiResponse,
  Participant,
  RankingItem,
  VoteRequest,
} from '@/lib/types';
import { useCallback, useState } from 'react';

// 模擬參賽者資料
const getMockParticipants = (keyword?: string): Participant[] => {
  const allParticipants: Participant[] = [
    {
      id: 1,
      nickname: 'ABC124',
    },
    {
      id: 2,
      nickname: 'moneyMoreMore',
    },
    {
      id: 3,
      nickname: 'IamTheUser1234',
    },
    {
      id: 4,
      nickname: '111HowAreYou111',
    },
    {
      id: 5,
      nickname: 'TraderPro',
    },
    {
      id: 6,
      nickname: 'test123',
    },
    {
      id: 7,
      nickname: 'SuperTrader2024',
    },
  ];

  if (!keyword) return allParticipants;

  return allParticipants.filter((p) =>
    p.nickname.toLowerCase().includes(keyword.toLowerCase())
  );
};

interface UseVotingResult {
  isLoading: boolean;
  error: string | null;
  searchParticipants: (
    keyword?: string
  ) => Promise<ApiResponse<{ data: Participant[] }>>;
  vote: (data: VoteRequest) => Promise<ApiResponse<null>>;
  getRanking: () => Promise<ApiResponse<{ data: RankingItem[] }>>;
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
      // 測試模式使用模擬資料
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE') {
        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockParticipants = getMockParticipants(keyword);
        return {
          success: true,
          message: '搜尋成功',
          data: { data: mockParticipants },
        };
      } else {
        const url = keyword
          ? `${API_ENDPOINTS.SEARCH_PARTICIPANTS}?keyword=${encodeURIComponent(keyword)}`
          : API_ENDPOINTS.SEARCH_PARTICIPANTS;

        const response = await apiClient.get<{ data: Participant[] }>(url);

        if (!response.success) {
          setError(response.message);
        }

        return response;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '搜尋參賽者失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'SEARCH_ERROR',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const vote = useCallback(async (data: VoteRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      // 測試模式使用模擬資料
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'TRUE') {
        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 800));

        return {
          success: true,
          message: '投票成功',
          data: null,
        };
      } else {
        const response = await apiClient.post<null>(API_ENDPOINTS.VOTE, data);

        if (!response.success) {
          setError(response.message);
        }

        return response;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '投票失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'VOTE_ERROR',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRanking = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<{ data: RankingItem[] }>(
        API_ENDPOINTS.RANKING
      );

      if (!response.success) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '取得排行榜失敗';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        errorCode: 'RANKING_ERROR',
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
