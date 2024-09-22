import { useState, useEffect } from 'react';

function Filtros() {
  const [farmaciasActivas, setFarmaciasActivas] = useState([]);
  const [horas, setHoras] = useState([]);
  const [selectedFarmacia, setSelectedFarmacia] = useState(null);
  const [farmaciasConSustancias, setFarmaciasConSustancias] = useState([]);

  // Función para obtener farmacias activas
  const fetchFarmaciasActivas = () => {
    fetch('http://localhost:3000/farmacia/all')
      .then((response) => response.json())
      .then((data) => {
        console.log('Farmacias activas:', data);
        setFarmaciasActivas(data);
      })
      .catch((error) => console.error('Error fetching farmacias activas:', error));
  };

  // Función para obtener horas de entrada y salida para una farmacia específica
  const fetchHoras = (id) => {
    fetch(`http://localhost:3000/farmacia/${id}/horas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Horas obtenidas:', data);
        setHoras(data);
      })
      .catch((error) => console.error('Error fetching horas:', error));
  };

  // Función para obtener farmacias con sustancias controladas
const fetchFarmaciasConSustancias = () => {
    fetch(`http://localhost:3000/farmacia/farmacias-con-sustancias`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Farmacias con sustancias controladas:', data);
        setFarmaciasConSustancias(data);
      })
      .catch((error) => console.error('Error fetching farmacias con sustancias:', error));
  };

  const handleFarmaciaClick = (id) => {
    setSelectedFarmacia(id);
    fetchHoras(id);
  };

  useEffect(() => {
    fetchFarmaciasActivas();
  }, []);

  return (
    <div>
      <h2>Farmacias Activas</h2>
      <button onClick={fetchFarmaciasActivas}>Cargar Farmacias Activas</button>
      <ul>
        {farmaciasActivas.map((farmacia) => (
          <li key={farmacia.id}>
            {farmacia.nombre} - Latitud: {farmacia.latitud}, Longitud: {farmacia.longitud}
          </li>
        ))}
      </ul>

      {selectedFarmacia && (
        <>
          <h3>Horas de Farmacia ID: {selectedFarmacia}</h3>
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

      <h2>Farmacias con Sustancias Controladas</h2>
      
<button onClick={fetchFarmaciasConSustancias}>Cargar Farmacias con Sustancias Controladas</button>
      <ul>
        {farmaciasConSustancias.map((farmacia) => (
          <li key={farmacia.id}>
            {farmacia.nombre} - Latitud: {farmacia.latitud}, Longitud: {farmacia.longitud}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filtros;
