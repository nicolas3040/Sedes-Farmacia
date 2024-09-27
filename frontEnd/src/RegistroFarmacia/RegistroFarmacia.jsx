import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistroFarmacia.css'; // Importamos el archivo de estilos

const RegistroFarmacia = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleMenu = () => {
    navigate('/menu-admin'); // Redirige a la ruta de MenuAdmin
  };
  // Datos del formulario
  const [nombreFarmacia, setNombreFarmacia] = useState('');
  const [categoriaEstablecimiento, setCategoriaEstablecimiento] = useState('Clínica Tipo 1');
  const [nroResolucion, setNroResolucion] = useState('');
  const [fechaResolucion, setFechaResolucion] = useState('');
  const [departamento, setDepartamento] = useState('Cochabamba');
  const [municipio, setMunicipio] = useState('Sacaba');
  const [zona, setZona] = useState('Lacma');
  const [red, setRed] = useState('Cercado');
  const [sector, setSector] = useState('Público');
  const [direccion, setDireccion] = useState('');

  const [nombre, setNombre] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [ci, setCi] = useState('');
  const [nit, setNit] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');

  const [horasFarmacia, setHorasFarmacia] = useState('8h');
  const [tipoFarmacia, setTipoFarmacia] = useState('Farmacia Privada');
  const [obs, setObs] = useState('');
  const [sustancias, setSustancias] = useState({
    ninguna: false,
    psicotropicos: false,
    estupefacientes: false,
    ambos: false
  });
  const [oncologicos, setOncologicos] = useState(false);

  return (
    <div className="container1">
      {/* Título Registro Farmacia */}
      <h1 className="title1">Registro Farmacia</h1>

      {/* Datos Farmacia */}
      <h2 className="subtitle1">Datos Farmacia:</h2>
      
      <label className="label1">Nombre Farmacia:</label>
      <input
        placeholder="Nombre Farmacia"
        value={nombreFarmacia}
        onChange={(e) => setNombreFarmacia(e.target.value)}
        className="input1"
      />
      
      <label className="label1">Categoría de Establecimiento:</label>
      <select
        value={categoriaEstablecimiento}
        onChange={(e) => setCategoriaEstablecimiento(e.target.value)}
        className="picker1"
      >
        <option value="Clínica Tipo 1">Clínica Tipo 1</option>
        <option value="Clínica Tipo 2">Clínica Tipo 2</option>
      </select>
      
      <label className="label1">Nro Resolución:</label>
      <input
        placeholder="Nro Resolución"
        value={nroResolucion}
        onChange={(e) => setNroResolucion(e.target.value)}
        className="input1"
      />
      
      <label className="label1">Fecha Resolución:</label>
      <input
        placeholder="Fecha Resolución"
        value={fechaResolucion}
        onChange={(e) => setFechaResolucion(e.target.value)}
        className="input1"
      />
      
      {/* Dirección Farmacia */}
      <h2 className="subtitle1">Dirección Farmacia:</h2>
      
      <label className="label1">Departamento:</label>
      <select
        value={departamento}
        onChange={(e) => setDepartamento(e.target.value)}
        className="picker1"
      >
        <option value="Cochabamba">Cochabamba</option>
        <option value="La Paz">La Paz</option>
      </select>
      
      <label className="label1">Municipio:</label>
      <select
        value={municipio}
        onChange={(e) => setMunicipio(e.target.value)}
        className="picker1"
      >
        <option value="Sacaba">Sacaba</option>
        <option value="Cercado">Cercado</option>
      </select>
      
      <label className="label1">Zona:</label>
      <select
        value={zona}
        onChange={(e) => setZona(e.target.value)}
        className="picker1"
      >
        <option value="Lacma">Lacma</option>
        <option value="Centro">Centro</option>
      </select>
      
      <label className="label1">Red:</label>
      <select
        value={red}
        onChange={(e) => setRed(e.target.value)}
        className="picker1"
      >
        <option value="Cercado1">Cercado</option>
        <option value="Valle Alto">Valle Alto</option>
      </select>
      
      <label className="label1">Sector:</label>
      <select
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        className="picker1"
      >
        <option value="Público">Público</option>
        <option value="Privado">Privado</option>
      </select>
      
      <label className="label1">Dirección:</label>
      <input
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="input"
      />

      {/* Imagen del mapa */}
      <button className="bottomButton2">
      <span className="buttonText2">Confirmar Ubicacion</span>
      </button>
      
      {/* Datos Propietario */}
      <h2 className="subtitle1">Datos Propietario:</h2>
      
      <label className="label1">Nombre:</label>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="input1"
      />
      
      <label className="label1">Apellido Materno:</label>
      <input
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChange={(e) => setApellidoMaterno(e.target.value)}
        className="input1"
      />
      
      <label className="label1">Apellido Paterno:</label>
      <input
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChange={(e) => setApellidoPaterno(e.target.value)}
        className="input1"
      />
      
      <label className="label1">CI:</label>
      <input
        placeholder="CI"
        value={ci}
        onChange={(e) => setCi(e.target.value)}
        className="input1"
      />
      
      <label className="label1">NIT:</label>
      <input
        placeholder="NIT"
        value={nit}
        onChange={(e) => setNit(e.target.value)}
        className="input1"
      />
      
      <label className="label1">Celular:</label>
      <input
        placeholder="Celular"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        className="input1"
      />
      
      <label className="label1">Correo Electrónico:</label>
      <input
        placeholder="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="input1"
      />

      {/* Horarios y Tipo de Farmacia */}
      <label className="label1">Horas de Farmacia:</label>
      <select
        value={horasFarmacia}
        onChange={(e) => setHorasFarmacia(e.target.value)}
        className="picker1"
      >
        <option value="8h">8h</option>
        <option value="12h">12h</option>
        <option value="24h">24h</option>
      </select>
      
      <label className="label1">Tipo de Farmacia:</label>
      <select
        value={tipoFarmacia}
        onChange={(e) => setTipoFarmacia(e.target.value)}
        className="picker1"
      >
        <option value="Farmacia Privada">Farmacia Privada</option>
        <option value="Farmacia Pública">Farmacia Pública</option>
      </select>
      
      <label className="label1">Observaciones:</label>
      <input
        placeholder="OBS"
        value={obs}
        onChange={(e) => setObs(e.target.value)}
        className="input1"
      />

      {/* Sustancias Controladas */}
      <div className="checkboxContainer11">
        <div className="checkboxContainer1">
          <label className="label1">Sustancias Controladas</label>
          <div className="checkboxWrapper1">
            <input
              type="checkbox"
              checked={sustancias.ninguna}
              onChange={() => setSustancias({ ...sustancias, ninguna: !sustancias.ninguna })}
              className="checkbox1"
            />
            <span className="checkboxLabel1">Ninguna</span>
          </div>
          <div className="checkboxWrapper1">
            <input
              type="checkbox"
              checked={sustancias.psicotropicos}
              onChange={() => setSustancias({ ...sustancias, psicotropicos: !sustancias.psicotropicos })}
              className="checkbox1"
            />
            <span className="checkboxLabel1">Psicotropicos</span>
          </div>
          <div className="checkboxWrapper1">
            <input
              type="checkbox"
              checked={sustancias.estupefacientes}
              onChange={() => setSustancias({ ...sustancias, estupefacientes: !sustancias.estupefacientes })}
              className="checkbox1"
            />
            <span className="checkboxLabel1">Estupefacientes</span>
          </div>
          <div className="checkboxWrapper1">
            <input
              type="checkbox"
              checked={sustancias.ambos}
              onChange={() => setSustancias({ ...sustancias, ambos: !sustancias.ambos })}
              className="checkbox1"
            />
            <span className="checkboxLabel1">Ambos</span>
          </div>
        </div>
        
        {/* Oncológicos */}
        <div className="checkboxContainer1">
          <label className="label1">Oncológicos</label>
          <div className="checkboxWrapper1">
          <input
            type="checkbox"
            checked={oncologicos}
            onChange={() => setOncologicos(!oncologicos)}
            className="checkbox1"
          />
          <span className="checkboxLabel1">Ambos</span>
          </div>
        </div>
      </div>
      
      {/* Botones para navegar */}
      <div className="buttonContainer1">
        <button className="homeButton" onClick={handleMenu}>
          <span className="homeButtonText">Cancelar</span>
        </button>
        <button className="loginButton">
          <span className="loginButtonText">Siguiente</span>
        </button>
      </div>
    </div>
  );
};

export default RegistroFarmacia;
