import * as React from 'react';
import { cn } from '../utils';

interface BandCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * White card with Band Ready shadow — replaces the repeated:
 *   <div className="rounded-[24px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
 * across stats, module cards, profile rows, and content containers.
 */
export function BandCard({ children, className, style }: BandCardProps) {
  return (
    <div
      className={cn(
        'rounded-[24px] bg-band-card shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
