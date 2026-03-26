import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const bandBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-[Nunito] font-[800] whitespace-nowrap',
  {
    variants: {
      variant: {
        complete:   'bg-band-success  text-white',
        active:     'bg-band-active   text-white',
        ready:      'bg-band-cta      text-white',
        locked:     'bg-band-locked   text-white',
        practice:   'bg-band-hint     text-band-active',
        assessment: 'bg-purple-100    text-purple-700',
      },
    },
    defaultVariants: {
      variant: 'ready',
    },
  },
);

interface BandBadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof bandBadgeVariants> {}

/**
 * Coloured status pill for module states and mode labels.
 * Pure presentational — no business logic.
 *
 * @example
 * <BandBadge variant="complete">COMPLETE</BandBadge>
 * <BandBadge variant="active">ACTIVE</BandBadge>
 * <BandBadge variant="practice">↺ Practice Mode</BandBadge>
 */
export function BandBadge({ className, variant, ...props }: BandBadgeProps) {
  return (
    <span
      className={cn(bandBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { bandBadgeVariants };
