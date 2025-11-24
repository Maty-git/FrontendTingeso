import './App.css'
import ListToolsComponent from './components/Tool/ListToolsComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateToolComponent from './components/Tool/CreateToolComponent';
import CreateClientComponent from './components/Client/CreateClientComponent';
import CreateLoanComponent from './components/Loan/CreateLoanComponent';
import HomeComponent from './components/Pages/HomeComponent';
import DeleteToolComponent from './components/Tool/ManageToolsComponent';
import ReturnLoanComponent from './components/Loan/ReturnLoanComponent';
import ReturnLoanComponent2 from './components/Loan/ReturnLoanComponent2';
import ReviewToolComponent from './components/Tool/ReviewToolComponent';
import DebtListComponent from './components/Debt/DebtListComponent';
import { useKeycloak } from '@react-keycloak/web';
import ManageToolsComponent from './components/Tool/ManageToolsComponent';
import UpdateToolComponent from './components/Tool/UpdateToolComponent';
import KardexListComponent from './components/Tool/KardexListComponent';
import ToolListWithHistoryComponent from "./components/Tool/ToolListWithHistoryComponent";
import ClientsWithLateDebtsComponent from "./components/Debt/ClientsWithLateDebtsComponent";
import ActiveLoansComponent from './components/Loan/ActiveLoansComponent';
import ToolRankingComponent from './components/Tool/ToolRankingComponent';

function App() {
  const {keycloak, initialized} = useKeycloak();
  if(!initialized){
    return <div>Cargando...</div>
  }
  const isLoggedIn = keycloak.authenticated;
  const roles = keycloak.realmAccess?.roles || [];
  const PrivateRoute =({element,rolesAllowed})=> {
    if (!isLoggedIn) {
      keycloak.login();
      return null;
    }
    if (rolesAllowed && !rolesAllowed.some(role => roles.includes(role))) {
      return (
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card card-custom text-center">
                <div className="card-body p-5">
                  <i className="fas fa-lock fa-4x text-danger mb-4"></i>
                  <h2 className="h3 mb-3" style={{ color: 'var(--bs-primary)' }}>Acceso Denegado</h2>
                  <p className="text-muted mb-4">
                    No tienes permisos suficientes para acceder a esta sección.
                  </p>
                  <p className="text-muted">
                    <strong>Roles requeridos:</strong> {rolesAllowed.join(', ')}
                  </p>
                  <button 
                    className="btn btn-accent mt-3" 
                    onClick={() => window.history.back()}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return element;
  }


  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* Página principal - Acceso: ADMIN y EMPLOYEE */}
          <Route path="/" element={<PrivateRoute element={<HomeComponent />} rolesAllowed={["ADMIN","EMPLOYEE"]} />}/>
          
          {/* Gestión de Herramientas - Solo ADMIN puede modificar tarifas y valores */}
          <Route path="/tools" element={<PrivateRoute element={<ListToolsComponent />} rolesAllowed={["ADMIN"]} />}/>
          <Route path="/create-tool" element={<PrivateRoute element={<CreateToolComponent />} rolesAllowed={["ADMIN"]} />} />
          <Route path="/manage-tool" element={<PrivateRoute element={<ManageToolsComponent />} rolesAllowed={["ADMIN"]} />}/>
          <Route path="/update-tool/:name/:category" element={<PrivateRoute element={<UpdateToolComponent />} rolesAllowed={["ADMIN"]} />} />
          <Route path="/review-tools" element={<PrivateRoute element={<ReviewToolComponent />} rolesAllowed={["ADMIN"]} />} />
          
          {/* Historial de herramientas - Acceso: ADMIN y EMPLOYEE */}
          <Route path="/tools-history" element={<PrivateRoute element={<ToolListWithHistoryComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          <Route path="/kardex/:toolId" element={<PrivateRoute element={<KardexListComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          
          {/* Gestión de Clientes - Acceso: ADMIN y EMPLOYEE */}
          <Route path="/create-client" element={<PrivateRoute element={<CreateClientComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          
          {/* Gestión de Préstamos - Acceso: ADMIN y EMPLOYEE */}
          <Route path="/create-loan" element={<PrivateRoute element={<CreateLoanComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          <Route path="/return-loan" element={<PrivateRoute element={<ReturnLoanComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          <Route path="/return-loan/:id" element={<PrivateRoute element={<ReturnLoanComponent2 />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          <Route path="/active-loans" element={<PrivateRoute element={<ActiveLoansComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          
          {/* Gestión de Deudas - Acceso: ADMIN y EMPLOYEE */}
          <Route path="/debts" element={<PrivateRoute element={<DebtListComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          <Route path="/clients-late-debts" element={<PrivateRoute element={<ClientsWithLateDebtsComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
          
          {/* Reportes - Acceso: ADMIN y EMPLOYEE */}
          <Route path="/tool-ranking" element={<PrivateRoute element={<ToolRankingComponent />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
