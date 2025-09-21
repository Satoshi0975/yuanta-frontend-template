'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BaseAnimationProps } from './types';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG, ANIMATION_TRANSITIONS } from './constants';

const BounceLeftOnScroll = ({
  children,
  className,
  delay = DEFAULT_DELAY,
  everyTime = false,
  disabled = false,
  margin = DEFAULT_VIEWPORT_CONFIG.margin,
}: BaseAnimationProps) => {
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
    initial: { opacity: 0, x: -70 },
    animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 },
    transition: {
      delay,
      ...ANIMATION_TRANSITIONS.spring,
    },
    className,
  };

  return <motion.div {...animationProps}>{children}</motion.div>;
};

export default BounceLeftOnScroll;
