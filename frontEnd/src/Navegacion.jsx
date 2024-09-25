import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import MenuAdmin from './MenuAdmin.jsx';
import RegistroFarmacia from './RegistroFarmacia.jsx';

function Navegacion() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu-admin" element={<MenuAdmin />} />
        <Route path="/registro-farmacia" element={<RegistroFarmacia />} />
      </Routes>
    </Router>
  );
}

export default Navegacion;
