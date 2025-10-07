const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
    user: 'postgres',          // Usuario de la base de datos
    host: 'localhost',           // Dirección del servidor (cambiar si es remoto)
    database: 'UERB', // Nombre de la base de datos
    password: 'Admin123',   // Contraseña del usuario
    port: 5432,                  // Puerto de conexión (por defecto es 5432)
});

// Verificar la conexión
pool.connect()
    .then(client => {
        console.log("Conexión exitosa a la base de datos");
        client.release(); // Liberar el cliente
    })
    .catch(err => console.error('Error de conexión a la base de datos', err.stack));

module.exports = pool;
