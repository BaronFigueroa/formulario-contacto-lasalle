// Validaciones compartidas del formulario de contacto.

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarContacto(contacto = {}) {
    const errores = [];

    if (!contacto || typeof contacto !== 'object') {
        return ['Los datos de contacto no son válidos.'];
    }

    const nombreOriginal =
        typeof contacto.nombre === 'string' ? contacto.nombre : '';
    const correoOriginal =
        typeof contacto.correo === 'string' ? contacto.correo : '';
    const asuntoOriginal =
        typeof contacto.asunto === 'string' ? contacto.asunto : '';
    const mensajeOriginal =
        typeof contacto.mensaje === 'string' ? contacto.mensaje : '';

    const nombre = nombreOriginal.trim();
    const correo = correoOriginal.trim();
    const asunto = asuntoOriginal.trim();
    const mensaje = mensajeOriginal.trim();

    // Nombre: obligatorio, entre 2 y 100 caracteres.
    if (!nombre) {
        errores.push('El nombre es obligatorio.');
    } else if (nombre.length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres.');
    } else if (nombre.length > 100) {
        errores.push('El nombre no puede superar 100 caracteres.');
    }

    // Correo: obligatorio, formato válido y máximo 150 caracteres.
    if (!correo) {
        errores.push('El correo es obligatorio.');
    } else if (correo.length > 150) {
        errores.push('El correo no puede superar 150 caracteres.');
    } else if (!FORMATO_CORREO.test(correo)) {
        errores.push('El correo electrónico no tiene un formato válido.');
    }

    // Asunto: obligatorio, entre 3 y 150 caracteres.
    if (!asunto) {
        errores.push('El asunto es obligatorio.');
    } else if (asunto.length < 3) {
        errores.push('El asunto debe tener al menos 3 caracteres.');
    } else if (asunto.length > 150) {
        errores.push('El asunto no puede superar 150 caracteres.');
    }

    // Mensaje: obligatorio, entre 10 y 500 caracteres.
    if (!mensaje) {
        errores.push('El mensaje es obligatorio.');
    } else if (mensaje.length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres.');
    } else if (mensaje.length > 500) {
        errores.push('El mensaje no puede superar 500 caracteres.');
    }

    return errores;
}

module.exports = validarContacto;