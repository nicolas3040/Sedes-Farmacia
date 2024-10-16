import React, { useState } from 'react';
import './Contrasenia.css'; // Importar el archivo CSS
 
const Contrasenia = () => {
  const [gmail, setGmail] = useState('');
  const [message, setMessage] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch('http://localhost:8082/usuario/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gmail }),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setMessage('Email enviado, revisa tu correo.');
      } else {
        setMessage(data.error || 'Error en la recuperación de la contraseña.');
      }
    } catch (error) {
      setMessage('Hubo un error, intenta más tarde.');
    }
  };
 
  return (
    <div className="contrasenia-container">
      <h1 className="contrasenia-title">Recuperar contraseña</h1>
      <form onSubmit={handleSubmit} className="contrasenia-form">
        <label className="contrasenia-label">
          Ingresa tu correo:
        </label>
        <input
          type="email"
          className="contrasenia-input"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
        />
        <button type="submit" className="contrasenia-button">
          Enviar
        </button>
      </form>
      {message && <p className="contrasenia-message">{message}</p>}
    </div>
  );
};
 
export default Contrasenia;