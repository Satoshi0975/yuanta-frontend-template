// 通用動畫組件
export { default as AnimatedContainer } from './animated-container';

// 個別動畫組件（向後兼容）
export { default as BounceInOnScroll } from './bounce-in-on-scroll';
export { default as BounceLeftOnScroll } from './bounce-left-on-scroll';
export { default as BounceOnScroll } from './bounce-on-scroll';
export { default as BounceRightOnScroll } from './bounce-right-on-scroll';
export { default as FadeInOnScroll } from './fade-in-on-scroll';

// 型別導出
export type {
  AnimatedContainerProps,
  AnimationConfig,
  AnimationType,
  BaseAnimationProps,
  BounceInAnimationProps,
  ViewportConfig,
} from './types';

// 常數導出
export {
  ANIMATION_TRANSITIONS,
  ANIMATION_VARIANTS,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_DELAY,
  DEFAULT_VIEWPORT_CONFIG,
} from './constants';
