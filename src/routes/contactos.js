const express = require('express');
const pool = require('../db/database');
const validarContacto = require('../validacion');

const router = express.Router();

router.post('/', async (req, res) => {
    // Utilizar la función de validación compartida.
    const errores = validarContacto(req.body);

    if (errores.length > 0) {
        return res.status(400).json({
            error: errores.join(' ')
        });
    }

    const { nombre, correo, asunto, mensaje } = req.body;

    try {
        const consulta = `
            INSERT INTO contactos (nombre, correo, asunto, mensaje)
            VALUES ($1, $2, $3, $4)
            RETURNING id, fecha;
        `;

        const valores = [
            nombre.trim(),
            correo.trim(),
            asunto.trim(),
            mensaje.trim()
        ];

        const resultado = await pool.query(consulta, valores);

        return res.status(201).json({
            mensaje: 'Mensaje enviado correctamente.',
            contacto: resultado.rows[0]
        });

    } catch (error) {
        console.error('Error al guardar el contacto:', error);

        return res.status(500).json({
            error: 'Ocurrió un error al procesar el formulario.'
        });
    }
});

module.exports = router;