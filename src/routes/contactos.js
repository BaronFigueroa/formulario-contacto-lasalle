const express = require('express');
const pool = require('../db/database');

const router = express.Router();

router.post('/', async (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (
        !nombre?.trim() ||
        !correo?.trim() ||
        !asunto?.trim() ||
        !mensaje?.trim()
    ) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios.'
        });
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
        return res.status(400).json({
            error: 'El correo electrónico no tiene un formato válido.'
        });
    }

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

        res.status(201).json({
            mensaje: 'Mensaje enviado correctamente.',
            contacto: resultado.rows[0]
        });

    } catch (error) {
        console.error('Error al guardar el contacto:', error);

        res.status(500).json({
            error: 'Ocurrió un error al procesar el formulario.'
        });
    }
});

module.exports = router;