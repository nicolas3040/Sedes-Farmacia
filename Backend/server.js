const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173' // Ajusta el puerto según el frontend
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar las rutas
const farmaciaRoutes = require('./routes/farmacia.js');
const horasRoutes = require('./routes/horas.js');
const sectorRoutes = require('./routes/sector');
const obsRoutes = require('./routes/obs');

app.use('/sector', sectorRoutes);
app.use('/obs', obsRoutes);
app.use('/farmacia', farmaciaRoutes);
app.use('/horas', horasRoutes);

// Ruta base para verificar el servidor
app.get('/', (req, res) => {
  res.status(200).json('Server on port 8081 and database is connected');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
