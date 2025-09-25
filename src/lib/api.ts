import type { ApiResponse } from './types';

// API 客戶端類別
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${process.env.NEXT_PUBLIC_BASE_PATH || ''}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // 重要：確保 cookie 被包含在請求中
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      // 處理非 JSON 回應（例如驗證碼圖片）
      if (!response.headers.get('content-type')?.includes('application/json')) {
        if (response.ok) {
          return {
            success: true,
            message: 'Success',
          };
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();

      // 如果 HTTP 狀態碼不是 2xx，但後端返回了 JSON，使用後端的錯誤訊息
      if (!response.ok && data.success === false) {
        return data;
      }

      // 如果 HTTP 狀態碼不是 2xx，且沒有後端錯誤格式，拋出錯誤
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      // 網路錯誤或其他異常
      console.error('API request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '網路錯誤',
        errorCode: 'NETWORK_ERROR',
      };
    }
  }

  // GET 請求
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  // POST 請求
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT 請求
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE 請求
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// 創建全局 API 客戶端實例
export const apiClient = new ApiClient();

// 導出 API 客戶端類別供需要時使用
export { ApiClient };
