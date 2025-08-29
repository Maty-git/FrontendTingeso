import './App.css'
import ListToolsComponent from './components/ListToolsComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateToolComponent from './components/CreateToolComponent';

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListToolsComponent />} />
          <Route path="/tools" element={<ListToolsComponent />} />
          <Route path="/create-tool" element={<CreateToolComponent />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
