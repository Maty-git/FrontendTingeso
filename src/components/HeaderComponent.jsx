import React from 'react'
import { useNavigate } from 'react-router-dom';
import ToolRent from '../assets/ToolRent.png';
import { useKeycloak } from '@react-keycloak/web'; 

const HeaderComponent = () => {
  const { keycloak, initialized } = useKeycloak(); // Hook de Keycloak
  const navigate = useNavigate();

  function navigatetoListTools() { navigate('/tools'); }
  function navigateToCreateLoan() { navigate('/create-loan'); }
  function navigateToHome() { navigate('/'); }
  function navigateToReturnLoan() { navigate('/return-loan'); }
  function navigateToCreateClient() { navigate('/create-client'); }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#1E5AA6" }}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img 
              src={ToolRent} 
              alt="ToolRent" 
              width="28" 
              height="28" 
              className="me-2 p-1 bg-white rounded-circle"
            />
            <span className="fw-bold">ToolRent</span>
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
              <li className="nav-item">
                <a className="nav-link active" onClick={navigateToHome} href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={navigatetoListTools} href="#">Catálogo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={navigateToCreateClient} href="#">Crear Cliente</a>
              </li>
            </ul>

            {/* 🔹 Zona de autenticación con Keycloak */}
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
            <button className="btn btn-accent" onClick={navigateToReturnLoan} style={{ marginLeft:'10px'}}>Devolver</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderComponent;
