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

    // Validación de entrada
    if (!nombre || !hora_entrada || !hora_salida || !dia_turno) {
        return res.status(400).json({ error: 'Nombre, hora_entrada, hora_salida y dia_turno son requeridos' });
    }

    MysqlConnection.query(
        'INSERT INTO Horas (nombre, hora_entrada, hora_salida, dia_turno, turno, status) VALUES (?, ?, ?, ?, ?, 1);',
        [nombre, hora_entrada, hora_salida, dia_turno, turno || 0],  // El campo turno puede ser opcional (0 por defecto)
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

    // Validación de entrada
    if (!nombre || !hora_entrada || !hora_salida || !dia_turno) {
        return res.status(400).json({ error: 'Nombre, hora_entrada, hora_salida y dia_turno son requeridos' });
    }

    MysqlConnection.query(
        'UPDATE Horas SET nombre = ?, hora_entrada = ?, hora_salida = ?, dia_turno = ?, turno = ?, last_update = CURRENT_TIMESTAMP WHERE id = ? AND status = 1;',
        [nombre, hora_entrada, hora_salida, dia_turno, turno || 0, id],  // El campo turno puede ser opcional
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

// Nueva ruta para guardar turnos generados
router.post('/guardarTurnos', (req, res) => {
    const turnos = req.body;

    if (!turnos || !turnos.length) {
        return res.status(400).json({ error: 'No se recibieron turnos para guardar' });
    }

    let query = 'INSERT INTO Horas (nombre, hora_entrada, hora_salida, status, dia_turno, turno) VALUES ?';
    const values = turnos.map(turno => [
        turno.farmacia_nombre,
        turno.hora_entrada || '08:00:00', // hora de entrada predeterminada, ajusta según tu lógica
        turno.hora_salida || '20:00:00', // hora de salida predeterminada, ajusta según tu lógica
        1, // status activo por defecto
        turno.fecha_turno, // fecha del turno generada
        turno.turno ? 1 : 0 // 1 si tiene turno, 0 si no
    ]);

    MysqlConnection.query(query, [values], (error, result) => {
        if (error) {
            console.error('Error guardando los turnos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Turnos guardados exitosamente', insertedRows: result.affectedRows });
    });
});

module.exports = router;
