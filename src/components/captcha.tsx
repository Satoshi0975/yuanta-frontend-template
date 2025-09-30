'use client';

import { useCaptcha } from '@/hooks/useCaptcha';
import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type CaptchaProps = {
  className?: string;
  onRefresh?: () => void; // 可選的刷新回調
};

export type CaptchaRef = {
  handleRefresh: () => void;
};

const Captcha = forwardRef<CaptchaRef, CaptchaProps>(
  ({ className, onRefresh }, ref) => {
    const { captchaUrl, refreshCaptcha } = useCaptcha();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // 處理刷新動作
    const handleRefresh = () => {
      console.log('handleRefresh');
      refreshCaptcha();
      onRefresh?.(); // 如果有提供回調則執行
    };

    useImperativeHandle(ref, () => ({
      handleRefresh,
    }));

    // 在 hydration 完成前顯示 placeholder
    if (!isMounted) {
      return (
        <div className={cn('flex shrink-0 items-center space-x-3', className)}>
          <div
            className="reloadImg shrink-0 animate-pulse bg-gray-200"
            style={{ width: '120px', height: '40px' }}
          />
          <RefreshCcw className="shrink-0 text-gray-400" />
        </div>
      );
    }

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
  }
);

Captcha.displayName = 'Captcha';

export default Captcha;
