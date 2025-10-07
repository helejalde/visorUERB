const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

// Opcional: escuchar errores de cliente inactivo
pool.on('error', err => {
  console.error('Postgres idle client error', err);
});

module.exports = pool;