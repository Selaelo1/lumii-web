import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow duration-200',
      hover && 'hover:shadow-md',
      className
    )}>
      {children}
    </div>
  );
};

export default Card;