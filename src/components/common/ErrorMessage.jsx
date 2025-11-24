import React from 'react';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = 'Error',
  className = '' 
}) => {
  if (!error) return null;

  return (
    <div className={`alert alert-danger ${className}`} role="alert">
      <div className="d-flex align-items-center">
        <i className="fas fa-exclamation-triangle me-3 fs-4"></i>
        <div className="flex-grow-1">
          <h5 className="alert-heading mb-1">{title}</h5>
          <p className="mb-0">{error}</p>
        </div>
        {onRetry && (
          <button 
            className="btn btn-outline-danger btn-sm ms-3"
            onClick={onRetry}
          >
            <i className="fas fa-redo me-1"></i>
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
