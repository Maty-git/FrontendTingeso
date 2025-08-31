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

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />


          <Route path="/tools" element={<ListToolsComponent />} />
          <Route path="/create-tool" element={<CreateToolComponent />} />
          <Route path="/delete-tool" element={<DeleteToolComponent/>}/>

          <Route path="/create-client" element={<CreateClientComponent />} />

          <Route path="/create-user" element={<CreateUserComponent />} />

          <Route path="/create-loan" element={<CreateLoanComponent />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
