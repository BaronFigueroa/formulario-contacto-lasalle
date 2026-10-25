// CP-01 y CP-02 — Pruebas unitarias de validación.

const validarContacto = require('../src/validacion');

const contactoValido = {
    nombre: 'Juan Pérez',
    correo: 'juan@correo.com',
    asunto: 'Consulta académica',
    mensaje: 'Este es un mensaje de prueba válido.'
};

// CP-01: campos vacíos.
describe('CP-01 — Validación de campos obligatorios', () => {
    test('rechaza todos los campos vacíos', () => {
        const errores = validarContacto({
            nombre: '',
            correo: '',
            asunto: '',
            mensaje: ''
        });

        expect(errores).toContain('El nombre es obligatorio.');
        expect(errores).toContain('El correo es obligatorio.');
        expect(errores).toContain('El asunto es obligatorio.');
        expect(errores).toContain('El mensaje es obligatorio.');
    });

    test('rechaza un nombre vacío y acepta los demás campos válidos', () => {
        const errores = validarContacto({
            ...contactoValido,
            nombre: ''
        });

        expect(errores).toContain('El nombre es obligatorio.');
        expect(errores).not.toContain('El correo es obligatorio.');
        expect(errores).not.toContain('El asunto es obligatorio.');
        expect(errores).not.toContain('El mensaje es obligatorio.');
    });
});

// CP-02: formato del correo.
describe('CP-02 — Validación del correo electrónico', () => {
    test('rechaza un correo sin formato válido', () => {
        const errores = validarContacto({
            ...contactoValido,
            correo: 'correo-invalido'
        });

    expect(errores).toContain(
        'El correo electrónico no tiene un formato válido.'
    );
});

    test('acepta un contacto con correo válido', () => {
        const errores = validarContacto(contactoValido);

        expect(errores).toHaveLength(0);
    });
});