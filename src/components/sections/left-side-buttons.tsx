'use client';

import React, { useEffect, useState } from 'react';

export const LeftSideButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 檢查是否為手機版
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px 是 sm 斷點
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isMobile) {
        // 手機版：根據滑動方向顯示/隱藏
        if (currentScrollY > lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // 桌機版：根據滾動距離顯示/隱藏
        setIsVisible(currentScrollY > 300);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  return (
    <div
      className={`fixed z-50 w-full bg-white/70 px-2 py-3 transition-all duration-300 hover:opacity-100 sm:-right-6 sm:top-1/2 sm:w-20 sm:-translate-y-1/2 sm:bg-transparent sm:px-0 sm:py-0 sm:opacity-70 ${
        isVisible
          ? isMobile
            ? 'shadow-yt bottom-0 translate-y-0'
            : 'translate-x-0'
          : isMobile
            ? 'bottom-0 translate-y-full'
            : 'translate-x-[200%]'
      }`}
    >
      <div className="flex w-full space-y-1 font-cubic text-xl text-white shadow-xl [line-height:1.50rem] sm:flex-col sm:rounded-xl">
        <a
          href="https://ltm.yuantafutures.com.tw/member/openaccount"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="transition-all duration-300 hover:translate-x-[-15px] hover:shadow-xl"
            // onClick={button.onClick}
          >
            <div className="nes-sm-corners bg-sts-red-100 cursor-pointer p-1">
              <span className="bg-sts-red-200 block h-full w-full py-3 pl-1 pr-6">
                期貨開戶
              </span>
            </div>
          </button>
        </a>

        <button
          className="transition-all duration-300 hover:translate-x-[-15px] hover:shadow-xl"
          // onClick={button.onClick}
        >
          <div className="nes-sm-corners cursor-pointer bg-sts-blue-300 p-1">
            <span className="block h-full w-full bg-sts-blue-400 py-3 pl-1 pr-6">
              成績查詢
            </span>
          </div>
        </button>
        <button
          className="transition-all duration-300 hover:translate-x-[-15px] hover:shadow-xl"
          // onClick={button.onClick}
        >
          <div className="nes-sm-corners cursor-pointer bg-sts-blue-500 p-1">
            <span className="block h-full w-full bg-sts-blue-600 py-1 pl-1 pr-6">
              人氣王投票
            </span>
          </div>
        </button>
        <button
          className="transition-all duration-300 hover:translate-x-[-15px] hover:shadow-xl"
          // onClick={button.onClick}
        >
          <div className="nes-sm-corners cursor-pointer bg-sts-orange-300 p-1">
            <span className="block h-full w-full bg-sts-orange-400 py-3 pl-1 pr-6">
              競賽報名
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
