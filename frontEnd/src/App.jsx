import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home/Home'; 
import './App.css';



function App() {
  return (
    <Router>
     

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Aquí puedes añadir más rutas para otras vistas si lo necesitas */}
      </Routes>
    </Router>
  );
}

export default App;
