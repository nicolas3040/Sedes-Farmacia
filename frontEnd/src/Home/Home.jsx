import React, { useState, useEffect } from 'react';
import MapView from './MapView';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';  
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para almacenar los detalles de la farmacia
  const [farmacia, setFarmacia] = useState(null);
  const [fileBase64, setFileBase64] = useState('');
  const [selectedFarmaciaId, setSelectedFarmaciaId] = useState(20); // ID por defecto

  const handleHome = () => {
    navigate('/login');
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Efecto para cargar los detalles de la farmacia seleccionada
useEffect(() => {
  const fetchFarmacia = async () => {
    try {
        const response = await fetch(`http://localhost:8082/farmacia/cargarfarmacia/${selectedFarmaciaId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFarmacia(data);
    } catch (error) {
        console.error('Error al cargar los detalles de la farmacia:', error);
        alert('Error al cargar la farmacia. Verifica si la farmacia existe.');
    }
 };
 


  fetchFarmacia();
}, [selectedFarmaciaId]); // Se ejecuta cuando selectedFarmaciaId cambia


  return (
    <Container fluid className="p-4">
      <header className="text-center mb-4 header-custom">
        <h1>Sedes - Cochabamba</h1>
        <p>Farmacias Cercanas a Usted</p>
        <p>Estamos a tu disposición para ayudarte.</p>
      </header>

      {/* Campo de búsqueda */}
      <Form className="mb-3">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Form.Control 
              type="text" 
              placeholder="Buscar Farmacia por nombre" 
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ marginBottom: '10px', padding: '5px' }}
            />
          </Col>
        </Row>
      </Form>

      <Row className="mb-3 justify-content-center">
        <Col xs="auto">
          <Button className="custom-btn" onClick={() => setFilter('abiertas')}>Farmacias Abiertas</Button>
        </Col>
        <Col xs="auto">
          <Button className="custom-btn" onClick={() => setFilter('sustancias')}>Sustancias Controladas</Button>
        </Col>
        <Col xs="auto">
          <Button className="custom-btn">Farmacias de Turno</Button>
        </Col>
      </Row>

      <Row className="mb-3 justify-content-center">
        <Col>
          <div className="map-container">
            {/* Pasar searchTerm y filter a MapView, y la función para seleccionar una farmacia */}
            <MapView 
              filter={filter} 
              searchTerm={searchTerm} 
              onSelectFarmacia={setSelectedFarmaciaId} // Pasar la función
            />
          </div>
        </Col>
      </Row>

      <div className="text-center">
        <Button className="custom-btn">Actualizar Ubicación</Button>
      </div>

      {farmacia && (
    <div className="farmacia-details mt-4">
        <h3>
            {farmacia.nombre} -{' '}
            <span className="text-success">Legal</span>{' '}
        </h3>
        {fileBase64 ? ( // Renderiza el <img> solo si hay una imagen
            <img src={fileBase64} alt="Farmacia" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : ( // Si no hay imagen, no renderiza nada
            <p>No hay imagen disponible para esta farmacia.</p>
        )}
        <p>Horarios de Atención:</p>
        <ul className="centered-list">
            <li>Lunes: 9-12 am & 2-5 pm</li>
            <li>Martes: 9-12 am & 2-5 pm</li>
            <li>Miércoles: 9-12 am & 2-5 pm</li>
            <li>Jueves: 9-12 am & 2-5 pm</li>
            <li>Viernes: 9-12 am & 2-5 pm</li>
            <li>Sábado: 9-12 am & 2-5 pm</li>
            <li>Domingo: Cerrado</li>
        </ul>
        <a
            href={`https://www.google.com/maps?q=${farmacia.latitud},${farmacia.longitud}`} // Modificado para usar latitud y longitud
            target="_blank" // Abre en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad al abrir una nueva pestaña
        >
            Abrir Ubicación en Maps
        </a>

    </div>
)}


      <footer className="text-center mt-4 footer-custom">
        <p>¿Tienes una Farmacia?</p>
        <Button className="custom-btn-outline">
          <Link to="/notificaciones" style={{ color: 'inherit', textDecoration: 'none' }}>Notificaciones</Link>
        </Button>
        <Button className="custom-btn-outline" onClick={handleHome}>
          <Link to="/bienvenido" style={{ color: 'inherit', textDecoration: 'none' }}>Bienvenido</Link>
        </Button>
      </footer>
    </Container>
  );
}

export default Home;
