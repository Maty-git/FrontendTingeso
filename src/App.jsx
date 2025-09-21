import './App.css'
import ListToolsComponent from './components/Tool/ListToolsComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateToolComponent from './components/Tool/CreateToolComponent';
import CreateClientComponent from './components/Client/CreateClientComponent';
import CreateUserComponent from './components/User/CreateUserComponent';
import CreateLoanComponent from './components/Loan/CreateLoanComponent';
import HomeComponent from './components/Pages/HomeComponent';
import DeleteToolComponent from './components/Tool/DeleteToolComponent';
import ReturnLoanComponent from './components/Loan/ReturnLoanComponent';
import { useKeycloak } from '@react-keycloak/web';

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
      return <div>Acceso no autorizado</div>;
    }
    return element;
  }


  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<PrivateRoute element={<HomeComponent />} rolesAllowed={["ADMIN","EMPLOYEE"]} />}/>
          <Route path="/tools" element={<PrivateRoute element={<ListToolsComponent />} rolesAllowed={["ADMIN"]} />}/>
          <Route path="/create-tool" element={<CreateToolComponent />} />
          <Route path="/delete-tool" element={<DeleteToolComponent/>}/>
          <Route path="/create-client" element={<CreateClientComponent />} />
          <Route path="/create-user" element={<CreateUserComponent />} />
          <Route path="/create-loan" element={<CreateLoanComponent />} />
          <Route path="/return-loan" element={<ReturnLoanComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
