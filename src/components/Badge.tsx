'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'accent':
        return { backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent-dark)' };
      case 'success':
        return { backgroundColor: '#dcfce7', color: '#15803d' };
      case 'warning':
        return { backgroundColor: '#fef3c7', color: '#b45309' };
      default:
        return { backgroundColor: '#f1f5f9', color: '#334155' };
    }
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]}`}
      style={getVariantStyle()}
    >
      {children}
    </span>
  );
}
