import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md';
  showGlow?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  size = 'md',
  showGlow = true,
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
  };
  
  return (
    <div
      className={cn(
        'w-full bg-border rounded-full overflow-hidden',
        heights[size],
        className
      )}
    >
      <div
        className={cn(
          'h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out',
          showGlow && 'shadow-[0_0_10px_rgba(124,58,237,0.5)]'
        )}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
