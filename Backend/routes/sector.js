// routes/sector.js
const { Router } = require('express');
const router = Router();
const db = require('../database');

// Obtener todos los sectores activos
router.get('/', (req, res) => {
    db.query('SELECT * FROM Sector WHERE status = 1;', (error, rows) => {
        if (error) {
            console.error('Error fetching sectors:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Obtener un sector por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Sector WHERE id = ? AND status = 1;', [id], (error, rows) => {
        if (error) {
            console.error(`Error fetching sector with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Sector not found' });
        }
        res.json(rows[0]);
    });
});

// Crear un nuevo sector
router.post('/', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Sector (nombre, status) VALUES (?, ?);',
        [nombre, 1], (error, result) => {
            if (error) {
                console.error('Error creating sector:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ Status: 'Sector saved', id: result.insertId });
        });
});

// Actualizar un sector por ID
router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    db.query('UPDATE Sector SET nombre = ?, last_update = CURRENT_TIMESTAMP WHERE id = ? AND status = 1;',
        [nombre, id], (error, result) => {
            if (error) {
                console.error(`Error updating sector with ID ${id}:`, error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            res.json({ Status: 'Sector updated' });
        });
});

// Eliminar un sector por ID (marcar como inactivo)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE Sector SET status = 0 WHERE id = ?;', [id], (error, result) => {
        if (error) {
            console.error(`Error deleting sector with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sector not found' });
        }
        res.json({ Status: 'Sector deleted' });
    });
});

module.exports = router;
