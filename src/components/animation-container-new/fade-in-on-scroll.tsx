'use client';

import { useInView } from 'framer-motion';
import { useEffect, useRef, useState, cloneElement, isValidElement } from 'react';
import { BaseAnimationProps } from './types';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG } from './constants';

const FadeInOnScroll = ({
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
      const progress = Math.min(elapsed / 600, 1); // 600ms 較快的淡入效果

      if (elapsed % frameInterval < 16) {
        const easeOut = 1 - Math.pow(1 - progress, 2); // 較平滑的淡入曲線

        const newY = Math.round(70 * (1 - easeOut));
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
    <section
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </section>
  );
};

export default FadeInOnScroll;
