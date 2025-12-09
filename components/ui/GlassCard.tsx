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
        bg-white/70 backdrop-blur-xl 
        border border-white/40 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        rounded-2xl 
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer hover:bg-white/90 hover:shadow-lg hover:scale-[1.01]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};