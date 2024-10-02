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

  const handleToggleTurno = (index) => {
    const updatedFarmacias = [...farmacias];
    updatedFarmacias[index].turno = !updatedFarmacias[index].turno;
    setFarmacias(updatedFarmacias);
  };

  const handleGenerarTurnos = () => {
    if (!filtroZona) {
      alert('Por favor selecciona una zona'); // Validación si no seleccionan zona
      return;
    }
  
    fetch(`http://localhost:8082/farmacia/generar-turnos?zona=${filtroZona}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error); // Mostrar error si no se encontraron farmacias
        } else {
          setFarmacias(data); // Actualiza las farmacias con los turnos generados
        }
      })
      .catch((error) => {
        console.error('Error generando turnos:', error);
      });
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
            <th>Fecha Turno</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {farmacias.map((farmacia, index) => (
            <tr key={index}>
              <td>{farmacia.nombre}</td>
              <td>{farmacia.codigoZona}</td>
              <td>{farmacia.fechaTurno}</td>
              <td>
                <input
                  type="checkbox"
                  checked={farmacia.turno}
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
