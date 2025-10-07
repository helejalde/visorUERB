const pool = require('pg');

class Conexion{
    constructor(){
        this.pgConexion = pool.createConnection({
            user: 'postgres',          // Usuario de la base de datos
            host: 'localhost',           // Dirección del servidor (cambiar si es remoto)
            database: 'UERB', // Nombre de la base de datos
            password: 'Admin123',   // Contraseña del usuario
            port: 5432,                  // Puerto de conexión (por defecto es 5432)
        });
    }

    conectar(){
        this.pgConexion.connect(error => {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Conexion establecida');
        });
    }

    getConexion(){
        return this.pgConexion;
    }
}

module.exports = new Conexion();