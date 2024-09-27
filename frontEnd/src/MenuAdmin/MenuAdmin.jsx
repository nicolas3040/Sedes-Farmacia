import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuAdmin.css'; // Importa el archivo CSS

export default function MenuAdmin() {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleMenu = () => {
    navigate('/Login'); // Redirige a la ruta de MenuAdmin
  };
  const handleRegistro = () => {
    navigate('/registro-farmacia'); // Redirige a la ruta de registro
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
        <button className="button2">
          <span className="buttonText2">Cambiar Horario</span>
        </button>
        <button className="button2">
          <span className="buttonText2">Editar Datos</span>
        </button>
      </div>

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
