import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Cargando...', 
  centered = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  const containerClass = centered ? 'd-flex justify-content-center align-items-center' : '';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="text-center">
        <div 
          className={`spinner-border text-primary ${sizeClasses[size]}`} 
          role="status"
          style={{ color: 'var(--brand-accent)' }}
        >
          <span className="visually-hidden">{text}</span>
        </div>
        {text && (
          <div className="mt-2">
            <small className="text-muted">{text}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
