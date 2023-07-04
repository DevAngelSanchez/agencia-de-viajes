const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales,
    });
};

exports.añadirTestimonial = async (req, res) => {
    // validamos los datos del formulario
    let { nombre, correo, mensaje } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ mensaje: 'Agrega tu nombre' });
    }

    if (!correo) {
        errores.push({ mensaje: 'Agrega tu correo' });
    }

    if (!mensaje) {
        errores.push({ mensaje: 'Agrega tu mensaje' });
    }

    // revisamos que haya o no errores

    if (errores.length > 0) {
        // Muestra la vista con errores
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales,
        });
    } else {
        // Almacena en la database
        Testimonial.create({
            nombre,
            correo,
            mensaje,
        })
            .then((testimonial) => {
                res.redirect('/testimoniales');
            })
            .catch((e) => console.log(e));
    }
};
