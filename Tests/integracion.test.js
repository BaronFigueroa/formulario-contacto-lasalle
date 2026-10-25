// CP-03 y CP-04 — Pruebas de integración del endpoint POST /api/contactos

process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/database');

afterAll(async () => {
    await pool.end();
});

// CP-03: POST con datos válidos guarda en BD y retorna 201
describe('CP-03 — POST con datos válidos guarda en BD y retorna 201', () => {
    test('responde con 201 y mensaje de confirmación', async () => {
        const respuesta = await request(app)
            .post('/api/contactos')
            .send({
                nombre: 'Juan Pérez',
                correo: 'juan@correo.com',
                asunto: 'Prueba de integración',
                mensaje: 'Este es un mensaje de prueba automatizada.'
            });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.mensaje).toBe('Mensaje enviado correctamente.');
        expect(respuesta.body.contacto).toHaveProperty('id');
        expect(respuesta.body.contacto).toHaveProperty('fecha');
    });
});

// CP-04: POST con campos vacíos retorna 400 sin tocar la BD
describe('CP-04 — POST con campos vacíos retorna 400', () => {
    test('responde con 400 cuando todos los campos están vacíos', async () => {
        const respuesta = await request(app)
            .post('/api/contactos')
            .send({
                nombre: '',
                correo: '',
                asunto: '',
                mensaje: ''
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body).toHaveProperty('error');
    });

    test('responde con 400 cuando el correo tiene formato inválido', async () => {
        const respuesta = await request(app)
            .post('/api/contactos')
            .send({
                nombre: 'Juan Pérez',
                correo: 'correo-invalido',
                asunto: 'Prueba',
                mensaje: 'Mensaje de prueba.'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.error).toBe('El correo electrónico no tiene un formato válido.');
    });
});