import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-purpleAccent hover:bg-violet text-white focus:ring-lavender',
    secondary: 'bg-white border-2 border-violet text-violet hover:bg-violet hover:text-white focus:ring-lavender',
    success: 'bg-success hover:bg-green-600 text-white focus:ring-green-200',
    warning: 'bg-warning hover:bg-yellow-500 text-charcoal focus:ring-yellow-200',
    danger: 'bg-error hover:bg-red-600 text-white focus:ring-red-200'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;