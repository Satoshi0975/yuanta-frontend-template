import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const titlebarVariants = cva('nes-title', {
  variants: {
    variant: {
      default: '',
    },
  },
});

export interface TitlebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titlebarVariants> {
  asChild?: boolean;
}

const Titlebar = React.forwardRef<HTMLDivElement, TitlebarProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <div
        className={cn(titlebarVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <div className="section-left"></div>
        <Comp className="section-middle animate-pixel-glitch">{children}</Comp>
        <div className="section-right"></div>
      </div>
    );
  }
);
Titlebar.displayName = 'Titlebar';

export { Titlebar, titlebarVariants };

export default Titlebar;
