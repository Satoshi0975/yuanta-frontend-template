'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BaseAnimationProps } from './types';
import { DEFAULT_DELAY, DEFAULT_VIEWPORT_CONFIG, ANIMATION_TRANSITIONS } from './constants';

const FadeInOnScroll = ({
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

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
      transition={{
        delay,
        ...ANIMATION_TRANSITIONS.easeOut,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default FadeInOnScroll;
