import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [farmacias, setFarmacias] = useState([]);
  const [horas, setHoras] = useState([]);
  const [selectedFarmacia, setSelectedFarmacia] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8082/farmacia/all')
      .then((response) => response.json())
      .then((data) => {
        console.log('Farmacias:', data); // Verifica los datos obtenidos
        setFarmacias(data);
      })
      .catch((error) => console.error('Error fetching farmacias:', error));
  }, []);

  // Función para obtener horas de entrada y salida para una farmacia específica
  const fetchHoras = (id) => {
    console.log('Fetching horas for farmacia ID:', id); // Log para verificar ID
    fetch(`http://localhost:8082/farmacia/${id}/horas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Horas obtenidas:', data); // Verificar datos de horas
        setHoras(data);
      })
      .catch((error) => console.error('Error fetching horas:', error));
  };

  const handleFarmaciaClick = (id) => {
    setSelectedFarmacia(id);
    fetchHoras(id);
  };

  return (
    <>
      
      <h1>Farmacias</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {farmacias.map((farmacia) => (
            <tr key={farmacia.id}>
              <td>{farmacia.id}</td>
              <td>{farmacia.nombre}</td>
              <td>
                <button onClick={() => handleFarmaciaClick(farmacia.id)}>
                  Ver Horas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFarmacia && (
        <>
          <h2>Horas de Farmacia ID: {selectedFarmacia}</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Hora Entrada</th>
                <th>Hora Salida</th>
              </tr>
            </thead>
            <tbody>
              {horas.length > 0 ? (
                horas.map((hora) => (
                  <tr key={hora.id}>
                    <td>{hora.id}</td>
                    <td>{hora.hora_entrada}</td>
                    <td>{hora.hora_salida}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No se encontraron horas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default App;
