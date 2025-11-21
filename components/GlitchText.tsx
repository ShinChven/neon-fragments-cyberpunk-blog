import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-red opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-75 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-cyan opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-75 select-none">
        {text}
      </span>
    </Component>
  );
};

export default GlitchText;
