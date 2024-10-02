import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Home from './Home/Home.jsx';
import MenuAdmin from './MenuAdmin/MenuAdmin.jsx';
import RegistroFarmacia from './RegistroFarmacia/RegistroFarmacia.jsx';

function Navegacion() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu-admin" element={<MenuAdmin />} />
        <Route path="/registro-farmacia" element={<RegistroFarmacia />} />
      </Routes>
    </Router>
  );
}

export default Navegacion;
