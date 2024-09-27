import React, { useState } from 'react';
import MapView from './MapView';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';  
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleHome = () => {
    navigate('/login'); // Redirige a la ruta de MenuAdmin
  };

  const [filter, setFilter] = useState(null);

  return (
    <Container fluid className="p-4">
      <header className="text-center mb-4 header-custom">
        <h1>Sedes - Cochabamba</h1>
        <p>Farmacias Cercanas a Usted</p>
        <p>Estamos a tu disposición para ayudarte.</p>
      </header>

      <Form className="mb-3">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Form.Control type="text" placeholder="Busca una Farmacia" />
          </Col>
          <Col xs="auto">
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
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
        <Col xs="auto">
          <Button className="custom-btn">Farmacias Oncológicas</Button>
        </Col>
      </Row>

      <Row className="mb-3 justify-content-center">
        <Col >
          <div className="map-container">
            <MapView filter={filter} />
          </div>
        </Col>
      </Row>

      <div className="text-center">
        <Button className="custom-btn">Actualizar Ubicación</Button>
      </div>

      <div className="farmacia-details mt-4">
        <h3>
          Farmacia Boliviana -{' '}
          <span className="text-success">Abierto</span>{' '}
          <span className="text-danger">Sustancias Controladas</span>
        </h3>
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
        <a href="#maps">Abrir Ubicación en Maps</a>
      </div>

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
