import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listTools } from '../../services/ToolService';
import { listActiveLoans } from '../../services/LoanService';
import { listUnpaidDebts } from '../../services/DebtService';

const HomeComponent = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTools: 0,
    activeLoans: 0,
    unpaidDebts: 0,
    availableTools: 0
  });

  useEffect(() => {
    // Cargar estadísticas del dashboard
    const loadStats = async () => {
      try {
        const [toolsRes, loansRes, debtsRes] = await Promise.all([
          listTools(),
          listActiveLoans(),
          listUnpaidDebts()
        ]);

        const tools = toolsRes.data || [];
        const loans = loansRes.data || [];
        const debts = debtsRes.data || [];

        setStats({
          totalTools: tools.length,
          activeLoans: loans.length,
          unpaidDebts: debts.length,
          availableTools: tools.filter(tool => tool.state === 'AVAILABLE').length
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };

    loadStats();
  }, []);

  const quickActions = [
    {
      title: 'Nuevo Préstamo',
      description: 'Registrar un nuevo préstamo de herramienta',
      icon: '📋',
      path: '/create-loan',
      color: 'success'
    },
    {
      title: 'Devolver Herramienta',
      description: 'Procesar devolución de herramienta',
      icon: '↩️',
      path: '/return-loan',
      color: 'warning'
    },
    {
      title: 'Agregar Herramienta',
      description: 'Registrar nueva herramienta en inventario',
      icon: '🔧',
      path: '/create-tool',
      color: 'primary'
    },
    {
      title: 'Nuevo Cliente',
      description: 'Registrar nuevo cliente en el sistema',
      icon: '👥',
      path: '/create-client',
      color: 'info'
    }
  ];

  const statCards = [
    {
      title: 'Total Herramientas',
      value: stats.totalTools,
      icon: '🔧',
      color: 'primary',
      path: '/tools'
    },
    {
      title: 'Herramientas Disponibles',
      value: stats.availableTools,
      icon: '✅',
      color: 'success',
      path: '/tools'
    },
    {
      title: 'Préstamos Activos',
      value: stats.activeLoans,
      icon: '📋',
      color: 'warning',
      path: '/active-loans'
    },
    {
      title: 'Deudas Pendientes',
      value: stats.unpaidDebts,
      icon: '💰',
      color: 'danger',
      path: '/debts'
    }
  ];

  return (
    <div className="container-fluid py-4">
      {/* Header del Dashboard */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-1" style={{ color: 'var(--bs-primary)' }}>
                Dashboard ToolRent
              </h1>
              <p className="text-muted mb-0">
                Bienvenido al sistema de gestión de herramientas para construcción
              </p>
            </div>
            <div className="text-end">
              <small className="text-muted">
                {new Date().toLocaleDateString('es-CL', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="row mb-4">
        {statCards.map((card, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-3">
            <div 
              className="dashboard-card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(card.path)}
            >
              <div className="d-flex align-items-center">
                <div className="dashboard-card-icon me-3">
                  {card.icon}
                </div>
                <div>
                  <h3 className="h4 mb-1" style={{ color: 'var(--bs-primary)' }}>
                    {card.value}
                  </h3>
                  <p className="text-muted mb-0 small">
                    {card.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="row mb-4">
        <div className="col-12">
          <h3 className="h4 mb-3" style={{ color: 'var(--bs-primary)' }}>
            Acciones Rápidas
          </h3>
        </div>
        {quickActions.map((action, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-3">
            <div 
              className="card card-custom h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(action.path)}
            >
              <div className="card-body text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '2.5rem' }}>{action.icon}</span>
                </div>
                <h5 className="card-title" style={{ color: 'var(--bs-primary)' }}>
                  {action.title}
                </h5>
                <p className="card-text text-muted small">
                  {action.description}
                </p>
                <button className={`btn btn-${action.color} btn-sm`}>
                  Ir a {action.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación por categorías */}
      <div className="row">
        <div className="col-12">
          <h3 className="h4 mb-3" style={{ color: 'var(--bs-primary)' }}>
            Gestión del Sistema
          </h3>
        </div>
        
        {/* Gestión de Herramientas */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="nav-group">
            <div className="nav-group-title">
              🔧 Gestión de Herramientas
            </div>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/tools'); }}>
              Ver Inventario
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/create-tool'); }}>
              Agregar Herramienta
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/manage-tool'); }}>
              Administrar Herramientas
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/tools-history'); }}>
              Historial de Movimientos
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/review-tools'); }}>
              Revisar Herramientas
            </a>
          </div>
        </div>

        {/* Gestión de Préstamos */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="nav-group">
            <div className="nav-group-title">
              📋 Gestión de Préstamos
            </div>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/create-loan'); }}>
              Nuevo Préstamo
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/return-loan'); }}>
              Devolver Herramienta
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/active-loans'); }}>
              Préstamos Activos
            </a>
          </div>
        </div>

        {/* Gestión de Clientes y Deudas */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="nav-group">
            <div className="nav-group-title">
              👥 Clientes y Deudas
            </div>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/create-client'); }}>
              Nuevo Cliente
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/debts'); }}>
              Deudas Pendientes
            </a>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/clients-late-debts'); }}>
              Clientes con Atrasos
            </a>
          </div>
        </div>

        {/* Reportes */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="nav-group">
            <div className="nav-group-title">
              📊 Reportes
            </div>
            <a href="#" className="nav-group-item" onClick={(e) => { e.preventDefault(); navigate('/tool-ranking'); }}>
              Ranking de Herramientas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;