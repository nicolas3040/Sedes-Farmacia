  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.jsx'
  import Navegacion  from './Navegacion.jsx'
  import './index.css'

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Navegacion /> {/* Usa Navegacion aquí */}
    </StrictMode>,
  );
  