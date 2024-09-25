const { Router } = require('express');
const router = Router();
const db = require('../database');

// Ruta base para verificar el servidor
router.get('/', (req, res) => {
  res.status(200).json('Usuario routes working');
});

// Obtener todos los usuarios activos
router.get('/all', (req, res) => {
  db.query('SELECT * FROM Usuario WHERE status = 1;', (error, rows) => {
    if (error) {
      console.error('Error fetching usuarios:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Usuario WHERE id = ? AND status = 1;', [id], (error, rows) => {
    if (error) {
      console.error(`Error fetching usuario with ID ${id}:`, error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }
    res.json(rows[0]);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { user, password, gmail } = req.body;
  db.query('INSERT INTO Usuario (user, password, gmail, status) VALUES (?, ?, ?, 1);',
    [user, password, gmail], (error, result) => {
      if (error) {
        console.error('Error creating usuario:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ Status: 'Usuario created', id: result.insertId });
    });
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
  const { user, password, gmail } = req.body;
  const { id } = req.params;
  db.query('UPDATE Usuario SET user = ?, password = ?, gmail = ?, last_update = CURRENT_TIMESTAMP WHERE id = ? AND status = 1;',
    [user, password, gmail, id], (error, result) => {
      if (error) {
        console.error(`Error updating usuario with ID ${id}:`, error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario not found' });
      }
      res.json({ Status: 'Usuario updated' });
    });
});

// Eliminar un usuario por ID (marcar como inactivo)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE Usuario SET status = 0 WHERE id = ?;', [id], (error, result) => {
    if (error) {
      console.error(`Error deleting usuario with ID ${id}:`, error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }
    res.json({ Status: 'Usuario deleted' });
  });
});

module.exports = router;
