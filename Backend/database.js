const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
<<<<<<< HEAD
  password: '1234',
  database: 'sedes-farmacia'
=======
  password: '1860',
  database: 'sedesfarmacias'
>>>>>>> origin/Victor
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;
