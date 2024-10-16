import React, { useState, useEffect } from 'react';
import './Turno.css';

const Turno = () => {
  const [farmacias, setFarmacias] = useState([]);
  const [filtroZona, setFiltroZona] = useState('');
  const [zonas, setZonas] = useState([]);
  const [turnos, setTurnos] = useState([]); // Para guardar los turnos generados

  const handleMenu = () => {
    navigate('/MenuAdmin'); // Redirige a la ruta de Login
  };

  // Obtener los códigos de zona desde el backend
  useEffect(() => {
    fetch('http://localhost:8082/codigo/all')
      .then((response) => response.json())
      .then((data) => {
        setZonas(data);
      })
      .catch((error) => {
        console.error('Error fetching zonas:', error);
      });
  }, []);

  const handleFiltroChange = (e) => {
    setFiltroZona(e.target.value);
  };

  // Función para generar turnos aleatorios
  const handleGenerarTurnos = () => {
    if (!filtroZona) {
      alert('Por favor selecciona una zona');
      return;
    }

    fetch(`http://localhost:8082/codigo/codigofiltro/${filtroZona}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const farmaciasConTurno = data.map((farmacia) => ({
          ...farmacia,
          turno: true, // Ahora el turno se asigna inicialmente como "true" (checkbox marcado)
          fecha_turno: null, // Añadimos una fecha de turno inicializada en null
          hora_entrada: '00:00:00', // El turno empieza a medianoche
          hora_salida: '23:59:59', // El turno termina justo antes de la medianoche siguiente
        }));

        const totalDiasMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        const turnosGenerados = [];

        // Generamos los turnos aleatorios para cada día del mes
        for (let dia = 1; dia <= totalDiasMes; dia++) {
          const randomIndex = Math.floor(Math.random() * farmaciasConTurno.length);
          const farmaciaSeleccionada = farmaciasConTurno[randomIndex];
          turnosGenerados.push({
            ...farmaciaSeleccionada,
            fecha_turno: new Date(new Date().getFullYear(), new Date().getMonth(), dia).toISOString().split('T')[0],
          });
        }

        setTurnos(turnosGenerados);

        // Ahora enviamos los turnos generados al backend para guardarlos
        fetch('http://localhost:8082/horas/guardarTurnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(turnosGenerados),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((result) => {
            console.log('Turnos guardados:', result);
            alert('Turnos guardados exitosamente');
          })
          .catch((error) => {
            console.error('Error guardando turnos:', error);
            alert('Error al guardar turnos, verifica la conexión o la ruta');
          });
      })
      .catch((error) => {
        console.error('Error fetching farmacias:', error);
        setTurnos([]); // En caso de error, inicializa como array vacío
      });
  };

  const handleToggleTurno = (index) => {
    const updatedTurnos = [...turnos];
    updatedTurnos[index].turno = !updatedTurnos[index].turno; // Cambia el estado de "turno" al desmarcar el checkbox
    setTurnos(updatedTurnos);
  };

  return (
    <div className="turno-container">
      <h1>Gestión Turnos</h1>
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
            <th>Código Zona</th>
            <th>Dirección</th>
            <th>Fecha Turno</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length > 0 ? (
            turnos.map((turno, index) => (
              <tr key={index}>
                <td>{turno.farmacia_nombre}</td>
                <td>{turno.codigo}</td>
                <td>{turno.direccion}</td>
                <td>{turno.fecha_turno}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={turno.turno} // Checkbox marcado por defecto
                    onChange={() => handleToggleTurno(index)} // Permite desmarcar
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No se generaron turnos</td></tr>
          )}
        </tbody>
      </table>

      <button className="volver-btn" onClick={handleMenu}>
        <span className="homeButtonText">Volver</span>
      </button>
    </div>
  );
};

export default Turno;
