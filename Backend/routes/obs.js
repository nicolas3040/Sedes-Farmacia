// routes/obs.js
const { Router } = require('express');
const router = Router();
const db = require('../database');

// Obtener todas las OBS activas
router.get('/', (req, res) => {
    db.query('SELECT * FROM OBS WHERE status = 1;', (error, rows) => {
        if (error) {
            console.error('Error fetching OBS:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Obtener una OBS por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM OBS WHERE id = ? AND status = 1;', [id], (error, rows) => {
        if (error) {
            console.error(`Error fetching OBS with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'OBS not found' });
        }
        res.json(rows[0]);
    });
});

// Crear una nueva OBS
router.post('/', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO OBS (nombre, status) VALUES (?, ?);',
        [nombre, 1], (error, result) => {
            if (error) {
                console.error('Error creating OBS:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ Status: 'OBS saved', id: result.insertId });
        });
});

// Actualizar una OBS por ID
router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    db.query('UPDATE OBS SET nombre = ?, last_update = CURRENT_TIMESTAMP WHERE id = ? AND status = 1;',
        [nombre, id], (error, result) => {
            if (error) {
                console.error(`Error updating OBS with ID ${id}:`, error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'OBS not found' });
            }
            res.json({ Status: 'OBS updated' });
        });
});

// Eliminar una OBS por ID (marcar como inactiva)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE OBS SET status = 0 WHERE id = ?;', [id], (error, result) => {
        if (error) {
            console.error(`Error deleting OBS with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'OBS not found' });
        }
        res.json({ Status: 'OBS deleted' });
    });
});

module.exports = router;
