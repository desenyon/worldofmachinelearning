interface StatusIndicatorProps {
  status: 'active' | 'complete' | 'pending' | 'warning';
  label?: string;
  showLabel?: boolean;
}

export default function StatusIndicator({
  status,
  label,
  showLabel = true,
}: StatusIndicatorProps) {
  const statusConfig: Record<string, { className: string; style?: React.CSSProperties; text: string }> = {
    active: {
      className: 'status-dot-active',
      text: 'Active',
    },
    complete: {
      className: 'bg-emerald-500',
      text: 'Complete',
    },
    pending: {
      className: 'bg-slate-300',
      text: 'Pending',
    },
    warning: {
      className: 'bg-amber-500',
      text: 'Warning',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`status-dot ${config.className}`}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-xs text-slate-600">{label || config.text}</span>
      )}
    </div>
  );
}
