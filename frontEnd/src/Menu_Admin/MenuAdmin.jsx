import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuAdmin.css';


export default function MenuAdmin() {
  const navigate = useNavigate();
  const [farmacias, setFarmacias] = useState([]); // Estado para guardar las farmacias
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredFarmacias, setFilteredFarmacias] = useState([]); // Estado para las farmacias filtradas

  // Solicitud para obtener todas las farmacias
  useEffect(() => {
    fetch('http://localhost:8082/farmacias-con-duenos') // Cambia la URL si es necesario
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las farmacias');
        }
        return response.json();
      })
      .then((data) => {
        setFarmacias(data); // Guarda los datos en el estado
        setFilteredFarmacias(data); // Inicializa las farmacias filtradas
      })
      .catch((error) => {
        console.error('Error fetching farmacias:', error);
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para actualizar el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda
  };

  // Filtrar farmacias cada vez que cambia el término de búsqueda
  useEffect(() => {
    const filtered = farmacias.filter((farmacia) =>
      farmacia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por nombre
    );
    setFilteredFarmacias(filtered); // Actualiza las farmacias filtradas
  }, [searchTerm, farmacias]); // Se vuelve a ejecutar cada vez que cambia searchTerm o farmacias

  const handleRegistro = () => {
    navigate('/registro-farmacia');
  };

  return (
    <div className="container">
      <h1 className="title">Menu</h1>

      <div className="user-info">
        <span className="user-label">Usuario:</span>
        <span className="user-name">Ejemplo Nombre</span>
      </div>

      <div className="buttons">
        <button className="button">Editar Farmacia</button>
        <button className="button">Eliminar Farmacia</button>
      </div>

      <h2 className="section-title">Lista Farmacias</h2>
      
      {/* Buscador */}
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Nombre Farmacia"
          value={searchTerm} // Valor del input controlado
          onChange={handleSearchChange} // Evento para manejar el cambio de input
        />
        <button className="clear-search" onClick={() => setSearchTerm('')}>X</button> {/* Clear search button */}
      </div>

      {/* Tabla con scroll */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Propietario</th>
            </tr>
          </thead>
          <tbody>
  {filteredFarmacias.length > 0 ? (
    filteredFarmacias.map((farmacia) => (
      <tr key={farmacia.farmacia_id}>
        <td>{farmacia.farmacia_nombre}</td>
        <td>{`${farmacia.dueno_nombre} ${farmacia.dueno_primer_apellido} ${farmacia.dueno_segundo_apellido}`}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2">No se encontraron farmacias</td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      <div className="actions">
        <button className="action-button">Gestion de Turnos</button>
        <button className="action-button" onClick={handleRegistro}>Registrar Nueva Farmacia</button>
      </div>

      <button className="logout">Cerrar Sesión</button>
    </div>
  );
}
