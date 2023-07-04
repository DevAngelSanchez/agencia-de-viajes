// Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config({
    path: 'variables.env',
});

const configs = require('./config');
const db = require('./config/database');

// Probar la conexion a la base de datos
db.authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch((e) => console.log(e));
// configurar express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Importar vistas
app.set('views', path.join(__dirname, './views'));

// Archivos estaticos
app.use(express.static('public'));

// validar si estamos o no en desarrollo
const config = configs[app.get('env')];

// creamos la variable para el sitio web
app.locals.titulo = config.nombreSitio;

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // crear la nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

// Ejecutamos el body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Importando rutas
app.use('/', routes());

// Puerto y host para el deployment
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () =>
    console.log(`Escuchando servidor en el puerto: ${port}`)
);
