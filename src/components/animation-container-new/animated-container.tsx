/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useInView } from 'framer-motion';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG } from './constants';
import { AnimatedContainerProps } from './types';

const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  (
    {
      children,
      animation,
      className,
      delay = DEFAULT_DELAY,
      everyTime = false,
      disabled = false,
      margin = DEFAULT_VIEWPORT_CONFIG.margin,
      threshold = 0,
      initialSize = 2,
      asChild = false,
    },
    forwardedRef
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
      once: !everyTime,
      margin,
      amount: threshold,
    });

    // 根據動畫類型設定初始狀態
    const getInitialState = () => {
      switch (animation) {
        case 'bounceIn':
          return { opacity: 0, scale: initialSize, y: 0, x: 0 };
        case 'bounceLeft':
          return { opacity: 0, scale: 1, y: 0, x: -70 };
        case 'bounceRight':
          return { opacity: 0, scale: 1, y: 0, x: 70 };
        case 'bounce':
        case 'fadeIn':
        default:
          return { opacity: 0, scale: 1, y: 70, x: 0 };
      }
    };

    const [animationState, setAnimationState] = useState(getInitialState());

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
        const duration =
          animation === 'bounceIn' ? 1000 : animation === 'fadeIn' ? 600 : 800;
        const progress = Math.min(elapsed / duration, 1);

        if (elapsed % frameInterval < 16) {
          const easeOut =
            animation === 'fadeIn'
              ? 1 - Math.pow(1 - progress, 2)
              : 1 - Math.pow(1 - progress, 3);

          const newState = { opacity: easeOut, scale: 1, y: 0, x: 0 };

          switch (animation) {
            case 'bounceIn':
              newState.scale = initialSize + (1 - initialSize) * easeOut;
              break;
            case 'bounceLeft':
              newState.x = Math.round(-70 * (1 - easeOut));
              break;
            case 'bounceRight':
              newState.x = Math.round(70 * (1 - easeOut));
              break;
            case 'bounce':
            case 'fadeIn':
            default:
              newState.y = Math.round(70 * (1 - easeOut));
              break;
          }

          setAnimationState(newState);
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
    }, [isInView, delay, disabled, animation, initialSize]);

    useEffect(() => {
      if (!isInView && !disabled) {
        setAnimationState(getInitialState());
      }
    }, [isInView, disabled, animation, initialSize]);

    // 如果禁用動畫，直接返回子元素
    if (disabled) {
      if (asChild && isValidElement(children)) {
        return cloneElement(children as React.ReactElement<any>, { className });
      }
      return <div className={className}>{children}</div>;
    }

    const style = {
      opacity: animationState.opacity,
      transform: `translateX(${animationState.x}px) translateY(${animationState.y}px) scale(${animationState.scale})`,
      transition: 'none',
    };

    // asChild 模式：將動畫 props 應用到子元素
    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, {
        ref: forwardedRef || ref,
        style: {
          ...(children as React.ReactElement<any>).props.style,
          ...style,
        },
        className:
          `${(children as React.ReactElement<any>).props.className || ''} ${className || ''}`.trim(),
      });
    }

    // 根據動畫類型選擇合適的 HTML 標籤
    const Component = ['fadeIn', 'bounce'].includes(animation)
      ? 'section'
      : 'div';

    return (
      <Component ref={forwardedRef || ref} style={style} className={className}>
        {children}
      </Component>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

export default AnimatedContainer;
