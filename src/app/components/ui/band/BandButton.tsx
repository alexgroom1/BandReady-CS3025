import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const bandButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-[Nunito] font-bold cursor-pointer border-none transition-opacity hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        cta:     'bg-band-cta     text-white shadow-[0_4px_12px_rgba(245,166,35,0.4)]',
        active:  'bg-band-active  text-white',
        success: 'bg-band-success text-white',
        danger:  'bg-band-error   text-white',
        ghost:   'bg-transparent  text-band-body',
      },
      size: {
        sm: 'h-10 px-5 text-base',
        md: 'h-14 px-8 text-lg',
        lg: 'h-16 px-10 text-xl',
      },
    },
    defaultVariants: {
      variant: 'cta',
      size: 'md',
    },
  },
);

interface BandButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof bandButtonVariants> {
  asChild?: boolean;
}

/**
 * Pill-shaped button with Band Ready colour variants.
 * Pure presentational — no business logic.
 *
 * @example
 * <BandButton variant="cta" size="lg" onClick={handleNext}>Next →</BandButton>
 * <BandButton variant="danger" onClick={handleLogout}><LogOut /> Switch Learner</BandButton>
 * <BandButton style={{ backgroundColor: module.accentColor }}>Start Module</BandButton>
 */
export function BandButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BandButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(bandButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { bandButtonVariants };
