
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'; // tu CSS personalizado
import keycloak from './services/keycloak.js';
import ReactDOM from 'react-dom/client'
import { ReactKeycloakProvider } from "@react-keycloak/web";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>
)
