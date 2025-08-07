import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  onClick,
  hover = false,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200 p-6';
  const hoverClasses = hover || onClick ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card; 