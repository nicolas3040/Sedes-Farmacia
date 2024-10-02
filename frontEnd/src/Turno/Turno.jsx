import React, { useState, useEffect } from 'react';
import './Turno.css';

const Turno = () => {
  const [farmacias, setFarmacias] = useState([]);
  const [filtroZona, setFiltroZona] = useState('');
  const [zonas, setZonas] = useState([]); // Estado para las zonas

  // Obtener los códigos de zona desde el backend
  useEffect(() => {
    fetch('http://localhost:8082/codigo/all') // Cambia la URL si es necesario
      .then((response) => response.json())
      .then((data) => {
        setZonas(data); // Guardar las zonas en el estado
      })
      .catch((error) => {
        console.error('Error fetching zonas:', error);
      });
  }, []);

  const handleFiltroChange = (e) => {
    setFiltroZona(e.target.value); // Cambiar el valor del filtro
  };

  // Función para generar los turnos
  const handleGenerarTurnos = () => {
    if (!filtroZona) {
      alert('Por favor selecciona una zona');
      return;
    }

    // Hacer la solicitud al backend para obtener las farmacias por zona
    fetch(`http://localhost:8082/farmacia/por-zona?zona=${filtroZona}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setFarmacias(data); // Actualiza el estado con las farmacias obtenidas
        }
      })
      .catch((error) => {
        console.error('Error fetching farmacias:', error);
      });
  };

  const handleToggleTurno = (index) => {
    // Lógica para manejar cambios en los turnos (checkbox)
    const updatedFarmacias = [...farmacias];
    updatedFarmacias[index].turno = !updatedFarmacias[index].turno;
    setFarmacias(updatedFarmacias);
  };

  return (
    <div className="turno-container">
      <h1>Gestion Turnos</h1>
      <div className="usuario">Usuario: <span>Ejemplo Nombre</span></div>

      <button className="generar-turnos-btn" onClick={handleGenerarTurnos}>Generar Turnos</button>
      <h2>Lista Farmacias de Turno</h2>

      <div className="filtro-zona">
        <label htmlFor="filtroZona">Filtrar por Zona:</label>
        <select id="filtroZona" value={filtroZona} onChange={handleFiltroChange}>
          <option value="">Selecciona una zona</option>
          {zonas.map((zona) => (
            <option key={zona.id} value={zona.id}>{zona.nombre}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Codigo Zona</th>
            <th>Dirección</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {farmacias.map((farmacia, index) => (
            <tr key={index}>
              <td>{farmacia.farmacia_nombre}</td>
              <td>{farmacia.codigo_nombre}</td>
              <td>{farmacia.direccion}</td>
              <td>
                <input
                  type="checkbox"
                  checked={farmacia.turno || false}
                  onChange={() => handleToggleTurno(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="volver-btn">Volver</button>
    </div>
  );
};

export default Turno;
