import { useState, useCallback, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/constants';

interface UseCaptchaResult {
  captchaUrl: string;
  refreshCaptcha: () => void;
}

export function useCaptcha(): UseCaptchaResult {
  // 使用固定的初始值避免 hydration 錯誤
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // 確保在 client 端才設置實際的時間戳
  useEffect(() => {
    setIsClient(true);
    setCaptchaKey(Date.now());
  }, []);

  // 生成帶有時間戳的驗證碼 URL 以避免快取
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || ''}${process.env.NEXT_PUBLIC_BASE_PATH || ''}`;
  const captchaUrl = isClient
    ? `${baseUrl}${API_ENDPOINTS.CAPTCHA}?t=${captchaKey}`
    : `${baseUrl}${API_ENDPOINTS.CAPTCHA}?t=0`;

  const refreshCaptcha = useCallback(() => {
    setCaptchaKey(Date.now());
  }, []);

  return {
    captchaUrl,
    refreshCaptcha,
  };
}