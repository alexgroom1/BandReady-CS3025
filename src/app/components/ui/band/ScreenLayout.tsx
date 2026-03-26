import * as React from 'react';
import { cn } from '../utils';

interface ScreenLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-screen page wrapper — replaces the repeated:
 *   <div style={{ background: '#F0F4F8', padding: '40px 48px' }} className="min-h-screen">
 * across every screen component.
 */
export function ScreenLayout({ children, className }: ScreenLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-band-page px-12 py-10', className)}>
      {children}
    </div>
  );
}
