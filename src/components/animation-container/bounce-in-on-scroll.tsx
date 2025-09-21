'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ANIMATION_TRANSITIONS,
  DEFAULT_DELAY,
  DEFAULT_VIEWPORT_CONFIG,
} from './constants';
import { BounceInAnimationProps } from './types';

const BounceInOnScroll = ({
  children,
  className,
  delay = DEFAULT_DELAY,
  everyTime = false,
  disabled = false,
  margin = DEFAULT_VIEWPORT_CONFIG.margin,
  initialSize = 2,
}: BounceInAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: !everyTime,
    margin,
  });

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const animationProps = {
    ref,
    initial: { opacity: 0, scale: initialSize },
    animate: isInView
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: initialSize },
    transition: {
      delay,
      ...ANIMATION_TRANSITIONS.spring,
      duration: 1,
    },
    className,
  };

  return <motion.div {...animationProps}>{children}</motion.div>;
};

export default BounceInOnScroll;
