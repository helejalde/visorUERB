const pool = require('./bd');

(async () => {
    try {
        const result = await pool.query('SELECT NOW() AS fecha_actual');
        console.log('Fecha actual desde la base de datos:', result.rows[0].fecha_actual);
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
    } finally {
        pool.end(); // Cierra la conexión
    }
})();