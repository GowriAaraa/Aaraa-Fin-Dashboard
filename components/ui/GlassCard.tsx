import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl 
        border border-white/40 dark:border-white/10
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
        rounded-2xl 
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer hover:bg-white/90 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-[1.01]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};