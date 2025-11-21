import React from 'react';

interface CyberDateProps {
  date: string;
  className?: string;
}

const CyberDate: React.FC<CyberDateProps> = ({ date, className = '' }) => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return <span className={className}>{date}</span>;
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return (
    <div className={`inline-flex items-center font-mono tracking-wider ${className}`} aria-label={`Date: ${date}`}>
      <span className="text-cyber-cyan">{year}</span>
      <span className="mx-1 text-gray-600">::</span>
      <span className="text-cyber-yellow">{month}</span>
      <span className="mx-1 text-gray-600">::</span>
      <span className="text-white">{day}</span>
    </div>
  );
};

export default CyberDate;
