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
          <Route path="/manage-tool" element={<ManageToolsComponent/>}/>
          <Route path="/create-client" element={<CreateClientComponent />} />
          <Route path="/create-loan" element={<CreateLoanComponent />} />
          <Route path="/return-loan" element={<ReturnLoanComponent />} />
          <Route path="/return-loan/:id" element={<ReturnLoanComponent2 />} />
          <Route path="/review-tools" element={<ReviewToolComponent />} />
          <Route path="/debts" element={<DebtListComponent />} />
          <Route path="/update-tool/:name/:category" element={<UpdateToolComponent />} />
          <Route path="/tools-history" element={<ToolListWithHistoryComponent />} />
          <Route path="/kardex/:toolId" element={<KardexListComponent />} />
          <Route path="/clients-late-debts" element={<ClientsWithLateDebtsComponent />} />
          <Route path="/active-loans" element={<ActiveLoansComponent />} />
          <Route path="/tool-ranking" element={<ToolRankingComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
