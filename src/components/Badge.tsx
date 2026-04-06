import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-surface-light text-text-secondary border border-border/30',
    outline: 'bg-transparent border border-border text-text-secondary',
    success: 'bg-secondary/20 text-secondary border border-secondary/30',
  };
  
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
