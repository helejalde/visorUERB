const express = require('express');
const cors = require('cors');
const aplicacion = express();
const session = require('express-session');
const path = require('path');
const CategoriaControlador = require('./controladores/CategoriaControlador');
const PORT = process.env.PORT || 3000;


//aplicacion.use(cors());
aplicacion.use(express.json());

aplicacion.use(cors({
    origin:'http://localhost:8080',  // Siempre coincidir con el frontend
    credentials: true
}))

// Configura el parseo de JSON
aplicacion.use(express.json());

aplicacion.use(session({
    secret: 'tu_clave_secreta', // Tengo que cambiar esta clave pilaaass
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, // Cambiar a true si usas HTTPS
        maxAge: 30 * 60 * 1000 // 🔥 Expira en 30 minutos (30 * 60 * 1000 ms)
    } 
}));

aplicacion.get('/api/ahhc', (peticiones, respuestas)=>{
    return CategoriaControlador.consultaTodo(peticiones, respuestas);
});

aplicacion.get('/ahhc/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.consultaUno(peticiones, respuestas);
});

aplicacion.post('/ahhc', (peticiones, respuestas)=>{
    return CategoriaControlador.insertarAHHC(peticiones, respuestas);
});

aplicacion.put('/ahhcEdit/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.editarAHHC(peticiones, respuestas);
});

aplicacion.delete('/ahhc/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.eliminarAHHC(peticiones, respuestas);
});

//Mapa 
aplicacion.get('/poligonos', (peticiones, respuestas) =>{
    return CategoriaControlador.obtenerPoligonos(peticiones, respuestas);
})

//Mapa Titulos 2025
aplicacion.get('/poligon_2025', (peticiones, respuestas) =>{
    return CategoriaControlador.obtenerPoligonos_titulos(peticiones, respuestas);
})

//Resolucion Incio

aplicacion.get('/r_inicio', (peticiones, respuestas)=>{
    return CategoriaControlador.consultaTodoRI(peticiones, respuestas);
});

aplicacion.get('/r_inicio/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.consultaUnoRI(peticiones, respuestas);
});

aplicacion.put('/r_inicioEdit/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.editarRI(peticiones, respuestas);
});

//Resolucion Final

aplicacion.get('/r_final', (peticiones, respuestas)=>{
    return CategoriaControlador.consultaTodoRF(peticiones, respuestas);
});

aplicacion.get('/r_final/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.consultaUnoRF(peticiones, respuestas);
});

aplicacion.put('/r_finalEdit/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.editarRF(peticiones, respuestas);
});

//Rezagados
aplicacion.get('/rezagados',(peticiones, respuestas)=>{
    return CategoriaControlador.listRezagados(peticiones, respuestas);
});
aplicacion.get('/rezagados/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.obtenerUnoRezagados(peticiones, respuestas);
});
aplicacion.put('/editRezagados/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.EditarRezagados(peticiones,respuestas);
});

//Escrituras individuales
aplicacion.get('/escritura_individual',(peticiones, respuestas)=>{
    return CategoriaControlador.listEscritura_individual(peticiones, respuestas);
});
aplicacion.get('/escritura_individual/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.obtenerUnoEscritura_individual(peticiones, respuestas);
});
aplicacion.put('/editescritura_individual/:codigo', (peticiones, respuestas)=>{
    return CategoriaControlador.EditarEscritura_individual(peticiones,respuestas);
});


//Llamar a LogIn
aplicacion.post('/login', (peticiones, respuestas) => {
    return CategoriaControlador.LogIn(peticiones, respuestas)});

aplicacion.get('/revisa-sesion', (peticiones, respuestas) => {
    if (peticiones.session.user){
        respuestas.json({autenticated: true, user: peticiones.session.user})
    } else{
        respuestas.json({autenticated: false})
}});


/*aplicacion.listen(3000, error => {
    if (error) {
        console.log(error);
    }
    console.log('Servidor Iniciado')
})*/
// 🚀 Servir frontend de Vue en producción
aplicacion.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Cualquier ruta que no sea API, devolverá index.html
aplicacion.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Iniciar servidor
aplicacion.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
