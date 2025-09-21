/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, useInView, useMotionValue } from 'framer-motion';
import { cloneElement, isValidElement, useEffect, useRef } from 'react';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG } from './constants';
import { BaseAnimationProps } from './types';

const BounceLeftOnScroll = ({
  children,
  className,
  delay = DEFAULT_DELAY,
  everyTime = false,
  disabled = false,
  margin = DEFAULT_VIEWPORT_CONFIG.margin,
  asChild = false,
}: BaseAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-70);
  const opacity = useMotionValue(0);
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

    // Elastic bounce easing function
    const elasticOut = (t: number): number => {
      const c4 = (2 * Math.PI) / 3;
      return t === 0
        ? 0
        : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    };

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
      const progress = Math.min(elapsed / 800, 1);

      if (elapsed % frameInterval < 16) {
        const easedProgress = elasticOut(progress);

        const newX = Math.round(-70 * (1 - easedProgress));
        const newOpacity = progress; // opacity 保持線性變化

        x.set(newX);
        opacity.set(newOpacity);
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
  }, [isInView, delay, disabled, x, opacity]);

  useEffect(() => {
    if (!isInView && !disabled) {
      x.set(-70);
      opacity.set(0);
    }
  }, [isInView, disabled, x, opacity]);

  if (disabled) {
    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, { className });
    }
    return <div className={className}>{children}</div>;
  }

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return (
      <motion.div
        ref={ref}
        style={{
          x,
          opacity,
          ...child.props.style,
        }}
        className={`${child.props.className || ''} ${className || ''}`.trim()}
      >
        {child}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} style={{ x, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

export default BounceLeftOnScroll;
