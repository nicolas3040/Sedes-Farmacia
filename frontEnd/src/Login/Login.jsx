import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import './Login.css';

export default function Login() {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = () => {
    navigate('/menu-admin'); // Redirige a la ruta de MenuAdmin
  };
  const handleBack = () => {
    navigate('/'); // Redirige a la ruta de MenuAdmin
  };

  return (
    <div className="container">
      <h1 className="title">Inicio de Sesión</h1>

      <label className="label">Usuario</label>
      <input className="input" placeholder="nombre ejemplo" />

      <label className="label">Contraseña</label>
      <input
        className="input"
        placeholder="****"
        type="password"
      />

      <button className="forgotPassword">¿Olvidaste tu contraseña?</button>
      
      <button className="loginButton" onClick={handleLogin}>
        <span className="loginButtonText">Iniciar sesión</span>
      </button>
      <button className="homeButton" onClick={handleBack}>
        <span className="homeButtonText">Volver</span>
      </button>
    </div>
    
  );
}
