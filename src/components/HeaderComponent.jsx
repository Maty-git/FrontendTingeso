import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ToolRent from '../assets/ToolRent.png';
import { useKeycloak } from '@react-keycloak/web';

const HeaderComponent = () => {
  const { keycloak, initialized } = useKeycloak(); // Hook de Keycloak
  const navigate = useNavigate();
  const location = useLocation();

  // Funciones de navegación
  function navigateToHome() { navigate('/'); }
  function navigateToTools() { navigate('/tools'); }
  function navigateToCreateTool() { navigate('/create-tool'); }
  function navigateToManageTools() { navigate('/manage-tool'); }
  function navigateToToolsHistory() { navigate('/tools-history'); }
  function navigateToReviewTools() { navigate('/review-tools'); }
  function navigateToCreateLoan() { navigate('/create-loan'); }
  function navigateToReturnLoan() { navigate('/return-loan'); }
  function navigateToActiveLoans() { navigate('/active-loans'); }
  function navigateToCreateClient() { navigate('/create-client'); }
  function navigateToDebts() { navigate('/debts'); }
  function navigateToClientsWithLateDebts() { navigate('/clients-late-debts'); }
  function navigateToToolRanking() { navigate('/tool-ranking'); }

  // Función para determinar si un dropdown debe estar activo
  const isDropdownActive = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#" onClick={navigateToHome}>
            <img
              src={ToolRent}
              alt="ToolRent"
              width="28"
              height="28"
              className="me-2 p-1 bg-white rounded-circle"
            />
            <span className="fw-bold" onClick={navigateToHome}>ToolRent</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav1"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav1">
            <ul className="navbar-nav me-auto">
              {/* Gestión de Herramientas */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${isDropdownActive(['/tools', '/create-tool', '/manage-tool', '/tools-history', '/review-tools']) ? 'active' : ''}`}
                  href="#"
                  id="toolsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-tools me-1"></i>Herramientas
                </a>
                <ul className="dropdown-menu" aria-labelledby="toolsDropdown">
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToTools(); }}>
                      <i className="fas fa-list me-2"></i>Ver Inventario
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToCreateTool(); }}>
                      <i className="fas fa-plus me-2"></i>Agregar Herramienta
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToManageTools(); }}>
                      <i className="fas fa-cogs me-2"></i>Administrar Herramientas
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToToolsHistory(); }}>
                      <i className="fas fa-history me-2"></i>Historial de Movimientos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToReviewTools(); }}>
                      <i className="fas fa-wrench me-2"></i>Revisar Herramientas
                    </a>
                  </li>
                </ul>
              </li>

              {/* Gestión de Préstamos */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${isDropdownActive(['/create-loan', '/return-loan', '/active-loans']) ? 'active' : ''}`}
                  href="#"
                  id="loansDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-handshake me-1"></i>Préstamos
                </a>
                <ul className="dropdown-menu" aria-labelledby="loansDropdown">
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToCreateLoan(); }}>
                      <i className="fas fa-plus-circle me-2"></i>Nuevo Préstamo
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToReturnLoan(); }}>
                      <i className="fas fa-undo me-2"></i>Devolver Herramienta
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToActiveLoans(); }}>
                      <i className="fas fa-clipboard-list me-2"></i>Préstamos Activos
                    </a>
                  </li>
                </ul>
              </li>

              {/* Clientes y Deudas */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${isDropdownActive(['/create-client', '/debts', '/clients-late-debts']) ? 'active' : ''}`}
                  href="#"
                  id="clientsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-users me-1"></i>Clientes
                </a>
                <ul className="dropdown-menu" aria-labelledby="clientsDropdown">
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToCreateClient(); }}>
                      <i className="fas fa-user-plus me-2"></i>Nuevo Cliente
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigate('/all-clients'); }}>
                      <i className="fas fa-users me-2"></i>Clientes Registrados
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToDebts(); }}>
                      <i className="fas fa-exclamation-triangle me-2"></i>Deudas Pendientes
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToClientsWithLateDebts(); }}>
                      <i className="fas fa-user-times me-2"></i>Clientes con Atrasos
                    </a>
                  </li>
                </ul>
              </li>

              {/* Reportes */}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${isDropdownActive(['/tool-ranking']) ? 'active' : ''}`}
                  href="#"
                  id="reportsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-chart-bar me-1"></i>Reportes
                </a>
                <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                  <li>
                    <a className="dropdown-item" href='#' onClick={(e) => { e.preventDefault(); navigateToToolRanking(); }}>
                      <i className="fas fa-trophy me-2"></i>Ranking de Herramientas
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Zona de autenticación con Keycloak */}
            {initialized && (
              <>
                {keycloak.authenticated ? (
                  <div className="d-flex align-items-center">
                    {/* Mostrar nombre de usuario o email */}
                    <span className="text-white me-3">
                      {keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
                    </span>
                    {/* Botón de logout */}
                    <button className="btn btn-danger me-2" onClick={() => keycloak.logout()}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-success me-2" onClick={() => keycloak.login()}>
                    Login
                  </button>
                )}
              </>
            )}

            {/* Botones de acciones generales */}
            <button className="btn btn-accent" onClick={navigateToCreateLoan}>Reservar</button>
            <button className="btn btn-accent" onClick={navigateToReturnLoan} style={{ marginLeft: '10px' }}>Devolver</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderComponent;
