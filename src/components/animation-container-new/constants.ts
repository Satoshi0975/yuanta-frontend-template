import { AnimationConfig, ViewportConfig, AnimationType } from './types';

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  duration: 0.8,
};

export const DEFAULT_VIEWPORT_CONFIG: ViewportConfig = {
  once: true,
  margin: '0px 0px -50px 0px',
};

export const DEFAULT_DELAY = 0.2;

export const ANIMATION_TRANSITIONS = {
  spring: {
    type: 'spring',
    ...DEFAULT_ANIMATION_CONFIG,
  },
  easeOut: {
    duration: 0.8,
    ease: 'easeOut' as const,
  },
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 70 },
    animate: { opacity: 1, y: 0 },
    transition: ANIMATION_TRANSITIONS.easeOut,
  },
  bounceLeft: {
    initial: { opacity: 0, x: -70 },
    animate: { opacity: 1, x: 0 },
    transition: ANIMATION_TRANSITIONS.spring,
  },
  bounceRight: {
    initial: { opacity: 0, x: 70 },
    animate: { opacity: 1, x: 0 },
    transition: ANIMATION_TRANSITIONS.spring,
  },
  bounceIn: {
    initial: { opacity: 0, scale: 2 },
    animate: { opacity: 1, scale: 1 },
    transition: { ...ANIMATION_TRANSITIONS.spring, duration: 1 },
  },
  bounce: {
    initial: { opacity: 0, y: 70 },
    animate: { opacity: 1, y: 0 },
    transition: ANIMATION_TRANSITIONS.spring,
  },
} as const satisfies Record<AnimationType, {
  initial: Record<string, number>;
  animate: Record<string, number>;
  transition: Record<string, string | number>;
}>;