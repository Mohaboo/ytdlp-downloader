import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightElement, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-surface-light border border-border rounded-lg',
              'px-4 py-3 text-text-primary placeholder:text-text-muted',
              'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30',
              'transition-all duration-200',
              leftIcon && 'pl-12',
              rightElement && 'pr-24',
              error && 'border-error focus:border-error focus:ring-error/30',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
