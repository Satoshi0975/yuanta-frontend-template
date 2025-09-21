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
import { BounceInAnimationProps } from './types';

const BounceInOnScroll = ({
  children,
  className,
  delay = DEFAULT_DELAY,
  everyTime = false,
  disabled = false,
  margin = DEFAULT_VIEWPORT_CONFIG.margin,
  initialSize = 2,
  asChild = false,
}: BounceInAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState({
    opacity: 0,
    scale: initialSize,
  });
  const isInView = useInView(ref, {
    once: !everyTime,
    margin,
  });

  useEffect(() => {
    if (!isInView || disabled) return;

    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    let startTime: number | null = null;
    let animationId: number;
    let delayStartTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!delayStartTime) {
        delayStartTime = currentTime;
      }

      if (currentTime - delayStartTime < delay * 1000) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 1000, 1); // 1000ms 動畫總時長

      if (elapsed % frameInterval < 16) {
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const newScale = initialSize + (1 - initialSize) * easeOut;
        const newOpacity = easeOut;

        setAnimationState({ opacity: newOpacity, scale: newScale });
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
  }, [isInView, delay, disabled, initialSize]);

  useEffect(() => {
    if (!isInView && !disabled) {
      setAnimationState({ opacity: 0, scale: initialSize });
    }
  }, [isInView, disabled, initialSize]);

  if (disabled) {
    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, { className });
    }
    return <div className={className}>{children}</div>;
  }

  const style = {
    opacity: animationState.opacity,
    transform: `scale(${animationState.scale})`,
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

export default BounceInOnScroll;
