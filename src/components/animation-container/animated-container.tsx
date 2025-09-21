'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, forwardRef, cloneElement, isValidElement } from 'react';
import { AnimatedContainerProps } from './types';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG, ANIMATION_VARIANTS } from './constants';

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

    // 如果禁用動畫，直接返回子元素
    if (disabled) {
      if (asChild && isValidElement(children)) {
        return cloneElement(children, { className });
      }
      return <div className={className}>{children}</div>;
    }

    // 獲取動畫配置
    const animationConfig = ANIMATION_VARIANTS[animation];

    // 為 bounceIn 動畫自定義初始大小
    const variants = animation === 'bounceIn'
      ? {
          ...animationConfig,
          initial: { opacity: 0, scale: initialSize },
        }
      : animationConfig;

    const animationProps = {
      ref: forwardedRef || ref,
      initial: variants.initial,
      animate: isInView ? variants.animate : variants.initial,
      transition: {
        delay,
        ...variants.transition,
      },
      className,
    };

    // asChild 模式：將動畫 props 應用到子元素
    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ...animationProps,
        className: `${children.props.className || ''} ${className || ''}`.trim(),
      });
    }

    // 根據動畫類型選擇合適的 HTML 標籤
    const MotionComponent = ['fadeIn', 'bounce'].includes(animation)
      ? motion.section
      : motion.div;

    return <MotionComponent {...animationProps}>{children}</MotionComponent>;
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

export default AnimatedContainer;