'use client';

import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';
import { useCaptcha } from '@/hooks/useCaptcha';

type CaptchaProps = {
  className?: string;
  onRefresh?: () => void; // 可選的刷新回調
};

const Captcha = ({ className, onRefresh }: CaptchaProps) => {
  const { captchaUrl, refreshCaptcha } = useCaptcha();

  // 處理刷新動作
  const handleRefresh = () => {
    refreshCaptcha();
    onRefresh?.(); // 如果有提供回調則執行
  };

  return (
    <div className={cn('flex shrink-0 items-center space-x-3', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="reloadImg shrink-0"
        src={captchaUrl}
        alt="驗證碼"
        onClick={handleRefresh}
        style={{ cursor: 'pointer' }}
        loading="eager"
        decoding="sync"
      />
      <RefreshCcw
        className="shrink-0 animate-none hover:animate-spin"
        onClick={handleRefresh}
      />
    </div>
  );
};

export default Captcha;