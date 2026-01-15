'use client';

import { ReactNode } from 'react';

interface CheckpointProps {
  title: string;
  children: ReactNode;
  status?: 'pending' | 'active' | 'complete';
}

export default function Checkpoint({
  title,
  children,
  status = 'pending',
}: CheckpointProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return {
          borderColor: 'var(--color-accent)',
          backgroundColor: 'var(--color-accent-subtle)',
          icon: '◉',
          iconColor: 'var(--color-accent)',
        };
      case 'complete':
        return {
          borderColor: '#10b981',
          backgroundColor: '#dcfce7',
          icon: '✓',
          iconColor: '#059669',
        };
      default:
        return {
          borderColor: '#cbd5e1',
          backgroundColor: '#f8fafc',
          icon: '○',
          iconColor: '#94a3b8',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div
      className="rounded-md p-4 my-6"
      style={{
        border: `2px solid ${styles.borderColor}`,
        backgroundColor: styles.backgroundColor,
      }}
      role="note"
      aria-label={`Checkpoint: ${title}`}
    >
      <div className="flex items-start gap-3">
        <span
          className="text-lg font-bold"
          style={{ color: styles.iconColor }}
          aria-hidden="true"
        >
          {styles.icon}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-label">Checkpoint</span>
            <h4 className="font-semibold text-slate-900">{title}</h4>
          </div>
          <div className="text-sm text-slate-700 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
