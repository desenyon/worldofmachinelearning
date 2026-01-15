'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'interactive' | 'panel';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const baseClasses = 'card-base';
  const variantClasses = {
    default: '',
    interactive: 'card-interactive cursor-pointer',
    panel: '',
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  label?: string;
  action?: ReactNode;
}

export function CardHeader({ children, label, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        {label && <span className="mono-label block mb-1">{label}</span>}
        <h3 className="font-semibold text-slate-900">{children}</h3>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="content-dense">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-lab-border-light)' }}>{children}</div>
  );
}
