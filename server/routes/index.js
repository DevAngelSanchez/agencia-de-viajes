const express = require('express');
const router = express.Router();

// controladores
const nosotros_controller = require('../controllers/nosotros_controller');
const home_controller = require('../controllers/home_controller');
const viajes_controller = require('../controllers/viajes_controller');
const testimoniales_controller = require('../controllers/testimoniales_controller');

module.exports = function () {
    router.get('/', home_controller.consultasHomePage);

    router.get('/nosotros', nosotros_controller.infoNosotros);

    router.get('/viajes', viajes_controller.mostrarViajes);

    router.get('/viajes/:id', viajes_controller.mostrarViaje);

    router.get('/testimoniales', testimoniales_controller.mostrarTestimoniales);

    // cuando se llena el formulario
    router.post('/testimoniales', testimoniales_controller.añadirTestimonial);

    return router;
};
