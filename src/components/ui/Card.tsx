// components/ui/Card.tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hover' | 'interactive';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  variant = 'default'
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantStyles = {
    default: 'bg-white border border-gray-100 shadow-sm',
    hover: 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all',
    interactive: 'bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-300 hover:-translate-y-1 transition-all cursor-pointer'
  };

  return (
    <div className={cn(
      'rounded-xl',
      paddingStyles[padding],
      variantStyles[variant],
      className
    )}>
      {children}
    </div>
  );
};

export default Card;