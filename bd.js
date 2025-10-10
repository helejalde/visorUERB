require('dotenv').config();

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(client => {
    console.log('Conexión exitosa a la base de datos');
    client.release();
  })
  .catch(err => console.error('Error de conexión a la base de datos', err.stack));

module.exports = pool;