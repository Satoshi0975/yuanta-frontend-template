/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useInView } from 'framer-motion';
import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG } from './constants';
import { BaseAnimationProps } from './types';

const BounceOnScroll = ({
  children,
  className,
  delay = DEFAULT_DELAY,
  everyTime = false,
  disabled = false,
  margin = DEFAULT_VIEWPORT_CONFIG.margin,
  asChild = false,
}: BaseAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState({ opacity: 0, y: 70 });
  const isInView = useInView(ref, {
    once: !everyTime,
    margin,
  });

  useEffect(() => {
    if (!isInView || disabled) return;

    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS; // 約 33.33ms
    let startTime: number | null = null;
    let animationId: number;
    let delayStartTime: number | null = null;

    const animate = (currentTime: number) => {
      // 設定延遲開始時間
      if (!delayStartTime) {
        delayStartTime = currentTime;
      }

      // 檢查是否已過延遲時間
      if (currentTime - delayStartTime < delay * 1000) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // 設定動畫開始時間
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 800, 1); // 800ms 動畫總時長

      // 每 frameInterval 更新一次
      if (elapsed % frameInterval < 16) {
        // 16ms 是大約一個 60fps 幀的時間
        // 簡單的 easeOut 曲線
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const newY = Math.round(70 * (1 - easeOut)); // 確保整數像素
        const newOpacity = easeOut;

        setAnimationState({ opacity: newOpacity, y: newY });
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, delay, disabled]);

  // 重置動畫狀態當不在視窗內時
  useEffect(() => {
    if (!isInView && !disabled) {
      setAnimationState({ opacity: 0, y: 70 });
    }
  }, [isInView, disabled]);

  if (disabled) {
    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, { className });
    }
    return <div className={className}>{children}</div>;
  }

  const style = {
    opacity: animationState.opacity,
    transform: `translateY(${animationState.y}px)`,
    transition: 'none',
  };

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return cloneElement(child, {
      ref,
      style: { ...child.props.style, ...style },
      className: `${child.props.className || ''} ${className || ''}`.trim(),
    });
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default BounceOnScroll;
