const { Router } = require('express');
const router = Router();
const MysqlConnection = require('../database');

// Obtener todas las horas activas
router.get('/', (req, res) => {
    MysqlConnection.query('SELECT * FROM Horas WHERE status = 1;', (error, rows) => {
        if (error) {
            console.error('Error fetching active hours:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Obtener una hora por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('SELECT * FROM Horas WHERE id = ? AND status = 1;', [id], (error, rows) => {
        if (error) {
            console.error(`Error fetching hour with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Hora not found' });
        }
        res.json(rows[0]);
    });
});

// Crear una nueva hora
router.post('/', (req, res) => {
    const { nombre, hora_entrada, hora_salida, dia_turno, turno } = req.body;

    if (!nombre || !hora_entrada || !hora_salida || !dia_turno) {
        return res.status(400).json({ error: 'Nombre, hora_entrada, hora_salida y dia_turno son requeridos' });
    }

    MysqlConnection.query(
        'INSERT INTO Horas (nombre, hora_entrada, hora_salida, dia_turno, turno, status) VALUES (?, ?, ?, ?, ?, 1);',
        [nombre, hora_entrada, hora_salida, dia_turno, turno || 0],
        (error, result) => {
            if (error) {
                console.error('Error creating hour:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ Status: 'Hora saved', id: result.insertId });
        });
});

// Actualizar una hora por ID
router.put('/:id', (req, res) => {
    const { nombre, hora_entrada, hora_salida, dia_turno, turno } = req.body;
    const { id } = req.params;

    if (!nombre || !hora_entrada || !hora_salida || !dia_turno) {
        return res.status(400).json({ error: 'Nombre, hora_entrada, hora_salida y dia_turno son requeridos' });
    }

    MysqlConnection.query(
        'UPDATE Horas SET nombre = ?, hora_entrada = ?, hora_salida = ?, dia_turno = ?, turno = ?, last_update = CURRENT_TIMESTAMP WHERE id = ? AND status = 1;',
        [nombre, hora_entrada, hora_salida, dia_turno, turno || 0, id],
        (error, result) => {
            if (error) {
                console.error(`Error updating hour with ID ${id}:`, error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Hora not found' });
            }
            res.json({ Status: 'Hora updated' });
        });
});

// Eliminar una hora por ID (marcar como inactiva)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    MysqlConnection.query('UPDATE Horas SET status = 0 WHERE id = ?;', [id], (error, result) => {
        if (error) {
            console.error(`Error deleting hour with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hora not found' });
        }
        res.json({ Status: 'Hora deleted' });
    });
});
router.post('/guardarTurnos', (req, res) => {
    const { farmacias, mesActual, anioActual } = req.body;

    if (!Array.isArray(farmacias) || farmacias.length === 0) {
        return res.status(400).json({ error: 'Se requiere un arreglo de farmacias válido' });
    }

    const totalDiasMes = new Date(anioActual, mesActual, 0).getDate(); // Días del mes actual
    let turnosGenerados = [];
    let indiceFarmaciaInicio = 0; // Empieza desde la primera farmacia
    const totalFarmacias = farmacias.length;

    // Asignar turnos para los días del mes actual
    for (let dia = 1; dia <= totalDiasMes; dia++) {
        const farmaciaAsignada = farmacias[indiceFarmaciaInicio % totalFarmacias];

        // Verificar que la farmacia tenga un ID y un nombre válidos
        if (!farmaciaAsignada.id || !farmaciaAsignada.farmacia_nombre) {
            return res.status(400).json({ error: 'Cada farmacia debe tener un id y un nombre válidos' });
        }

        turnosGenerados.push({
            farmacia_id: farmaciaAsignada.id,
            nombre: farmaciaAsignada.farmacia_nombre,
            fecha_turno: new Date(anioActual, mesActual - 1, dia).toISOString().split('T')[0],
            hora_entrada: '08:00:00',
            hora_salida: '20:00:00',
            turno: true
        });

        indiceFarmaciaInicio++;
    }

    // Guardar en la base de datos los turnos generados para el mes actual
    const insertQuery = 'INSERT INTO Horas (nombre, hora_entrada, hora_salida, dia_turno, turno, status) VALUES ?';
    const turnosValues = turnosGenerados.map(turno => [
        turno.nombre,
        turno.hora_entrada,
        turno.hora_salida,
        turno.fecha_turno,
        turno.turno ? 1 : 0,
        1 // Status
    ]);

    MysqlConnection.query(insertQuery, [turnosValues], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error interno al guardar turnos', details: error.message });
        }
        res.json({ message: 'Turnos guardados exitosamente' });
    });
});


// Ruta para obtener turnos por código y mes
router.get('/turnosZonaMes/:codigoId/:mes/:anio', (req, res) => {
    const { codigoId, mes, anio } = req.params;

    const query = `
        SELECT h.dia_turno, h.hora_entrada, h.hora_salida, f.nombre AS farmacia_nombre, f.direccion, c.nombre AS codigo_nombre, c.id AS codigo_zona
        FROM Horas h
        JOIN farmacia f ON h.nombre = f.nombre
        JOIN codigo c ON f.codigo_id = c.id
        WHERE c.id = ? AND MONTH(h.dia_turno) = ? AND YEAR(h.dia_turno) = ? AND h.status = 1;
    `;

    MysqlConnection.query(query, [codigoId, mes, anio], (error, rows) => {
        if (error) {
            console.error('Error fetching turns by code and month:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

module.exports = router;
