import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home/Home'; 
import Login from './Login'; // Asegúrate de que la ruta a tu componente de Login es correcta
import MenuAdmin from './Menu_Admin/MenuAdmin'; // Importa tu componente MenuAdmin
import Turno from './Turno/Turno'; 

import './App.css';

function App() {
  const [farmacias, setFarmacias] = useState([]);
  const [horas, setHoras] = useState([]);
  const [selectedFarmacia, setSelectedFarmacia] = useState(null);

  // Efecto para cargar farmacias al iniciar
  useEffect(() => {
    fetch('http://localhost:8082/farmacia/all')
      .then((response) => response.json())
      .then((data) => {
        console.log('Farmacias:', data);
        setFarmacias(data);
      })
      .catch((error) => console.error('Error fetching farmacias:', error));
  }, []);

  // Función para obtener horas de entrada y salida para una farmacia específica
  const fetchHoras = (id) => {
    console.log('Fetching horas for farmacia ID:', id);
    fetch(`http://localhost:8082/farmacia/${id}/horas`) // Usando backticks correctamente
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Usando backticks en el mensaje de error
        }
        return response.json();
      })
      .then((data) => {
        console.log('Horas obtenidas:', data);
        setHoras(data);
      })
      .catch((error) => console.error('Error fetching horas:', error));
  };

  const handleFarmaciaClick = (id) => {
    setSelectedFarmacia(id);
    fetchHoras(id);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link> 
          </li>
          <li>
            <Link to="/turno">Turno</Link> 
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<MenuAdmin />} /> 
        <Route path="/turno" element={<Turno />} /> 


        {/* Aquí puedes añadir más rutas para otras vistas si lo necesitas */}
      </Routes>
    </Router>
  );
}

export default App;
