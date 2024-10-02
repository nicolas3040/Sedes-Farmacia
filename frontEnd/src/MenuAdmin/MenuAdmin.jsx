import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuAdmin.css'; // Importa el archivo CSS

export default function MenuAdmin() {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [showConfirm, setShowConfirm] = useState(false); // Estado para mostrar la confirmación de eliminación
  const [deleted, setDeleted] = useState(false); // Estado para saber si se eliminó la farmacia
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleMenu = () => {
    navigate('/Login'); // Redirige a la ruta de Login
  };
  const handleRegistro = () => {
    navigate('/registro-farmacia'); // Redirige a la ruta de registro
  };
  const handleEditar = () => {
    navigate('/editar-farmacia'); // Redirige a la ruta de editar farmacia
  };

  // Función para mostrar la confirmación de eliminación
  const handleDeleteConfirmation = () => {
    setShowConfirm(true);
  };

  // Función para realizar la eliminación lógica de la farmacia
  const handleDeleteFarmacia = async () => {
    const farmaciaId = 50; // ID estático de la farmacia

    try {
      const response = await fetch(`http://localhost:8082/farmacia/farmacia/eliminar/${farmaciaId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setDeleted(true);
        setShowConfirm(false); // Ocultar confirmación después de eliminar
      } else {
        throw new Error('Error al eliminar la farmacia');
      }
    } catch (error) {
      console.error('Error al eliminar farmacia:', error);
      setError('Ocurrió un error al eliminar la farmacia.');
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const farmacias = [
    { id: '1', nombre: 'Farmacia Bolivia', encargado: 'Juan Perez' },
    { id: '2', nombre: 'Farmacia Chavez', encargado: 'Juan Perez' },
    { id: '3', nombre: 'Farmacia Tiqui', encargado: 'Juan Perez' },
    { id: '4', nombre: 'Farmacia Nacional', encargado: 'Juan Perez' },
  ];

  return (
    <div className="container2">
      <h1 className="title2">Menu</h1>

      <label className="nameLabel2">Nombre:</label>
      <div className="userName2">Ejemplo Nombre</div>

      <div className="buttonContainer2">
        <button className="button2" onClick={handleDeleteConfirmation}>
          <span className="buttonText2">Eliminar Farmacia</span>
        </button>
        <button className="button2" onClick={handleEditar}>
          <span className="buttonText2">Editar Datos</span>
        </button>
      </div>

      {/* Confirmación de eliminación lógica */}
      {showConfirm && (
        <div className="confirmationBox">
          <p>¿Estás seguro de que deseas eliminar esta farmacia?</p>
          <button className="confirmButton" onClick={handleDeleteFarmacia}>
            Sí
          </button>
          <button className="cancelButton" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      )}

      {/* Mostrar mensaje de éxito o error */}
      {deleted && <p className="successMessage">Farmacia eliminada correctamente.</p>}
      {error && <p className="errorMessage">{error}</p>}

      <div className="listContainer2">
        {/* Encabezado */}
        <div className="header2">
          <span className="headerText2">Nombre</span>
          <span className="headerText2">Encargado</span>
        </div>

        {/* Lista */}
        <div className="list">
          {farmacias.map(item => (
            <div className="listItem2" key={item.id}>
              <span className="listItemText2">{item.nombre}</span>
              <span className="listItemText2">{item.encargado}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="bottomButton2">
        <span className="buttonText2">Encargados</span>
      </button>

      <button className="bottomButton2" onClick={handleRegistro}>
        <span className="buttonText2">Registrar Nueva Farmacia</span>
      </button>

      <button className="homeButton" onClick={handleMenu}>
        <span className="homeButtonText">Cerrar Sesión</span>
      </button>
    </div>
  );
}
