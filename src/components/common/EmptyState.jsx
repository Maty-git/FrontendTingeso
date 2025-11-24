import React from 'react';

const EmptyState = ({ 
  icon = 'fas fa-inbox',
  title = 'No hay datos',
  description = 'No se encontraron elementos para mostrar',
  action,
  actionText = 'Agregar nuevo',
  className = ''
}) => {
  return (
    <div className={`text-center py-5 ${className}`}>
      <div className="mb-4">
        <i className={`${icon} text-muted`} style={{ fontSize: '4rem' }}></i>
      </div>
      <h4 className="text-muted mb-3">{title}</h4>
      <p className="text-muted mb-4">{description}</p>
      {action && (
        <button 
          className="btn btn-accent"
          onClick={action}
        >
          <i className="fas fa-plus me-2"></i>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
