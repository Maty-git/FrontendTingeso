import React from 'react'
import { useNavigate } from 'react-router-dom';
import ToolRent from '../assets/ToolRent.png';

const HeaderComponent = () => {

    const navigate = useNavigate();
    function navigateToCreateTool() {
        navigate('/create-tool');
    }
    function navigatetoListTools() {
        navigate('/tools');
    }


    function navigateToCreateClient() {
        navigate('/create-client');
    }


    function navigateToCreateUser() {
        navigate('/create-user');
    }
    function navigateToCreateLoan() {
        navigate('/create-loan');
    }
    function navigateToHome() {
        navigate('/');
    }
    function navigateToReturnLoan() {
        navigate('/return-loan');
    }
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
                  <li className="nav-item"><a className="nav-link active" onClick={navigateToHome} href="">Inicio</a></li>
                  <li className="nav-item"><a className="nav-link" onClick={navigatetoListTools} href="">Catálogo</a></li>
                  
                  <li className="nav-item"><a className="nav-link" href="#">Iniciar Sesión</a></li>
                </ul>
                <button className="btn btn-accent" onClick={navigateToCreateLoan}>Reservar</button>
                <button className="btn btn-accent" onClick={navigateToReturnLoan} style={{ marginLeft:'10px'}}>Devolver</button>
              </div>
            </div>
          </nav>
        </div>
      )
}

export default HeaderComponent