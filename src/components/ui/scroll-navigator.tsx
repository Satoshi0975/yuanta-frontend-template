'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEventListener } from 'usehooks-ts';
import { useCallback, useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'registration', name: '報名', order: 1 },
  { id: 'competition', name: '競賽', order: 2 },
  { id: 'vote', name: '投票', order: 3 },
  { id: 'hot-to', name: '下單賺積分', order: 4 }
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export function ScrollNavigator() {
  const [currentSection, setCurrentSection] = useState<SectionId>();
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const hasUserScrolledUp = useRef(false);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.log('❌ 找不到元素:', sectionId);
      return;
    }

    setIsScrolling(true);

    // 使用 scrollIntoView 作為備選方案
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
      
    });

    // 設置滾動完成的延遲
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, []);

  const handleScroll = useCallback(() => {
    // 如果正在自動滾動中，忽略滾動事件
    if (isScrolling) return;

    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';

    // 偵測使用者向上滾動
    if (scrollDirection === 'up' && Math.abs(currentScrollY - lastScrollY.current) > 10) {
      hasUserScrolledUp.current = true;
      console.log('🔄 偵測到向上滾動，重置狀態');
    }

    lastScrollY.current = currentScrollY;
  }, [isScrolling]);

  // 監聽滾動事件
  useEventListener('scroll', handleScroll);

  // 檢測當前可見區塊並觸發滾動
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return; // 如果正在滾動中，忽略所有觸發

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as SectionId;
            const rect = entry.target.getBoundingClientRect();

            
            // 如果是同一個區塊，跳過
            if (sectionId === currentSection) return;

            // 如果區塊已經在視窗頂部 50px 以內，表示已經滾動過了，跳過
            if (rect.top <= 50) {
              return;
            }

            if (SECTIONS.some(section => section.id === sectionId)) {
              const sectionOrder = SECTIONS.find(section => section.id === sectionId)?.order;

              // 如果使用者曾經向上滾動，重置 currentSection 讓後續滾動能重新觸發
              if (hasUserScrolledUp.current) {
                console.log('🔄 重置 currentSection 因為使用者向上滾動過');

                // 找到目前真實在視窗中的區塊（排除當前觸發的區塊）
                const visibleSection = SECTIONS.find(section => {
                  if (section.id === sectionId) return false; // 排除當前觸發的區塊
                  const el = document.getElementById(section.id);
                  if (el) {
                    const r = el.getBoundingClientRect();
                    // 檢查區塊是否在視窗中
                    return r.top <= window.innerHeight && r.bottom >= 0;
                  }
                  return false;
                });

                if (visibleSection) {
                  setCurrentSection(visibleSection.id);
                  console.log('🎯 重設 currentSection 為:', visibleSection.id);
                } else {
                  // 如果找不到可見區塊，重置為 undefined
                  setCurrentSection(undefined);
                  console.log('🎯 重設 currentSection 為: undefined');
                }

                hasUserScrolledUp.current = false;
              }

              // 重新計算 currentSectionOrder（重置後的值）
              const currentSectionOrder = currentSection
                ? SECTIONS.find(section => section.id === currentSection)?.order
                : 0;

              // 只處理順序比當前區塊大的區塊（向後滾動）
              if (sectionOrder && currentSectionOrder && sectionOrder > currentSectionOrder) {
                console.log('🎯 觸發滾動:', sectionId, `(${currentSectionOrder} -> ${sectionOrder})`);

                // 先更新 currentSection，防止重複觸發
                setCurrentSection(sectionId);

                // 然後滾動
                scrollToSection(sectionId);
              } else if (!currentSection && sectionOrder === 1) {
                // 初始情況，沒有 currentSection 且是第一個區塊
                console.log('🎯 初始滾動:', sectionId);
                setCurrentSection(sectionId);
                scrollToSection(sectionId);
              } else {
                console.log('⏪ 跳過:', sectionId, `currentOrder: ${currentSectionOrder}, sectionOrder: ${sectionOrder}`);
              }
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    SECTIONS.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [currentSection, isScrolling, scrollToSection]);

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-black/80 px-4 py-2 text-white backdrop-blur-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
            <span className="text-sm font-medium">
              滾動到: {SECTIONS.find(s => s.id === currentSection)?.name}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}