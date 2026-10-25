// CP-03 y CP-04 — Pruebas de integración con PostgreSQL.

process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/database');

async function contarContactos() {
    const resultado = await pool.query(
        'SELECT COUNT(*)::int AS total FROM contactos'
    );

    return resultado.rows[0].total;
}

afterAll(async () => {
    await pool.end();
});

// CP-03: comprobar respuesta HTTP y persistencia real.
describe('CP-03 — POST válido guarda el contacto en PostgreSQL', () => {
    test('retorna 201 y permite consultar el registro guardado', async () => {
        const correoPrueba =
            `cp03-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;

        try {
            const contacto = {
                nombre: 'Juan Pérez',
                correo: correoPrueba,
                asunto: 'Prueba de integración',
                mensaje: 'Este es un mensaje de prueba automatizada.'
            };

            const respuesta = await request(app)
                .post('/api/contactos')
                .send(contacto);

            expect(respuesta.status).toBe(201);
            expect(respuesta.body.mensaje)
                .toBe('Mensaje enviado correctamente.');
            expect(respuesta.body.contacto).toHaveProperty('id');
            expect(respuesta.body.contacto).toHaveProperty('fecha');

            // Consultar directamente PostgreSQL.
            const consulta = await pool.query(
                `SELECT id, nombre, correo, asunto, mensaje, fecha
                 FROM contactos
                 WHERE correo = $1`,
                [correoPrueba]
            );

            expect(consulta.rowCount).toBe(1);
            expect(consulta.rows[0].nombre).toBe(contacto.nombre);
            expect(consulta.rows[0].correo).toBe(contacto.correo);
            expect(consulta.rows[0].asunto).toBe(contacto.asunto);
            expect(consulta.rows[0].mensaje).toBe(contacto.mensaje);
            expect(consulta.rows[0].fecha).not.toBeNull();

            expect(Number(consulta.rows[0].id))
                .toBe(Number(respuesta.body.contacto.id));

        } finally {
            // Limpiar el registro de prueba, si llegó a insertarse.
            await pool.query(
                'DELETE FROM contactos WHERE correo = $1',
                [correoPrueba]
            );
        }
    });
});

// CP-04: comprobar que los datos inválidos no generan inserciones.
describe('CP-04 — Las solicitudes inválidas no insertan contactos', () => {
    test('rechaza los campos vacíos con HTTP 400 y sin insertar', async () => {
        const cantidadAntes = await contarContactos();

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

        const cantidadDespues = await contarContactos();

        expect(cantidadDespues).toBe(cantidadAntes);
    });

    test('rechaza un correo inválido sin insertar un contacto', async () => {
        const cantidadAntes = await contarContactos();

        const respuesta = await request(app)
            .post('/api/contactos')
            .send({
                nombre: 'Juan Pérez',
                correo: 'correo-invalido',
                asunto: 'Prueba de integración',
                mensaje: 'Este es un mensaje de prueba.'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.error).toBe(
            'El correo electrónico no tiene un formato válido.'
        );

        const cantidadDespues = await contarContactos();

        expect(cantidadDespues).toBe(cantidadAntes);
    });
});