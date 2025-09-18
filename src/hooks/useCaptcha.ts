import { useState, useCallback } from 'react';
import { API_ENDPOINTS } from '@/lib/constants';

interface UseCaptchaResult {
  captchaUrl: string;
  refreshCaptcha: () => void;
}

export function useCaptcha(): UseCaptchaResult {
  const [captchaKey, setCaptchaKey] = useState(Date.now());

  // 生成帶有時間戳的驗證碼 URL 以避免快取
  const captchaUrl = `${API_ENDPOINTS.CAPTCHA}?t=${captchaKey}`;

  const refreshCaptcha = useCallback(() => {
    setCaptchaKey(Date.now());
  }, []);

  return {
    captchaUrl,
    refreshCaptcha,
  };
}