import React from 'react';

interface RevMaxLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light-bg' | 'dark-bg';
}

export const RevMaxLogo: React.FC<RevMaxLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light-bg'
}) => {
  const sizeConfig = {
    sm: { mainText: 'text-lg', subText: 'text-[8px]', arrowWidth: 20, arrowHeight: 14, spacing: 'tracking-[0.16em]' },
    md: { mainText: 'text-2xl', subText: 'text-[10px]', arrowWidth: 28, arrowHeight: 20, spacing: 'tracking-[0.2em]' },
    lg: { mainText: 'text-3xl sm:text-4xl', subText: 'text-xs sm:text-sm', arrowWidth: 38, arrowHeight: 26, spacing: 'tracking-[0.22em]' },
    xl: { mainText: 'text-4xl sm:text-5xl', subText: 'text-sm sm:text-base', arrowWidth: 46, arrowHeight: 32, spacing: 'tracking-[0.24em]' },
  };

  const currentSize = sizeConfig[size];
  const textColor = variant === 'dark-bg' ? 'text-white' : 'text-[#0052FF]';
  const subtextColor = '#00D4FF';

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Top Line: RevMax + Growth Arrow */}
      <div className="relative inline-flex items-center leading-none">
        <span className={`font-extrabold ${currentSize.mainText} tracking-tight font-sans text-[#0052FF]`}>
          RevMax
        </span>
        {/* Dynamic Growth Arrow Graphic (Electric Cyan) */}
        <span className="relative -ml-1 -top-1.5 inline-block">
          <svg 
            width={currentSize.arrowWidth} 
            height={currentSize.arrowHeight} 
            viewBox="0 0 32 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            {/* Trend sparkline path */}
            <path 
              d="M3 17L11 9L17 14L28 3" 
              stroke="#00D4FF" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Arrowhead */}
            <path 
              d="M20 3H28V11" 
              stroke="#00D4FF" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </span>
      </div>

      {/* Subtitle: DIGITAL HOSPITALITY */}
      <span 
        className={`font-bold ${currentSize.subText} uppercase ${currentSize.spacing} text-[#00D4FF] leading-tight mt-0.5`}
        style={{ letterSpacing: '0.22em' }}
      >
        DIGITAL HOSPITALITY
      </span>
    </div>
  );
};
