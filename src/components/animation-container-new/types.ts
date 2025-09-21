type MarginValue = `${number}${'px' | '%'}`;
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

export interface BaseAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  everyTime?: boolean;
  disabled?: boolean;
  margin?: MarginType;
  asChild?: boolean;
}

export interface BounceInAnimationProps extends BaseAnimationProps {
  initialSize?: number;
}

export interface AnimationConfig {
  stiffness: number;
  damping: number;
  mass: number;
  duration: number;
}

export interface ViewportConfig {
  once: boolean;
  margin: MarginType;
}

export type AnimationType =
  | 'fadeIn'
  | 'bounceLeft'
  | 'bounceRight'
  | 'bounceIn'
  | 'bounce';

export interface AnimatedContainerProps {
  children: React.ReactNode;
  animation: AnimationType;
  className?: string;
  delay?: number;
  everyTime?: boolean;
  disabled?: boolean;
  margin?: MarginType;
  threshold?: number;
  initialSize?: number; // for bounceIn animation
  asChild?: boolean;
}
