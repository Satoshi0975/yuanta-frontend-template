'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type BounceRightOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
};

const BounceRightOnScroll = ({
  children,
  className,
  delay,
  repeat = false,
}: BounceRightOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: !repeat,
    margin: '0px 0px -100px 0px', // 當元素距離底部 50px 時觸發
  });

  const animationProps = {
    ref,
    initial: { opacity: 0, x: 70 },
    animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 },
    transition: {
      delay: delay || 0.2,
      type: 'spring',
      stiffness: 100,
      damping: 10,
      mass: 1,
      duration: 0.8,
    },
    className,
  };

  return <motion.div {...animationProps}>{children}</motion.div>;
};

export default BounceRightOnScroll;
