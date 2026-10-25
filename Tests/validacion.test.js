// CP-01 y CP-02 — Pruebas unitarias de validación del backend

function validarContacto({ nombre, correo, asunto, mensaje }) {
    const errores = [];

    if (!nombre || nombre.trim() === '')
        errores.push('El nombre es obligatorio.');
    if (!correo || correo.trim() === '')
        errores.push('El correo es obligatorio.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
        errores.push('El correo no tiene un formato válido.');
    if (!asunto || asunto.trim() === '')
        errores.push('El asunto es obligatorio.');
    if (!mensaje || mensaje.trim() === '')
        errores.push('El mensaje es obligatorio.');

    return errores;
}

// CP-01: campos vacíos
describe('CP-01 — Validación rechaza campos vacíos', () => {
    test('retorna errores cuando todos los campos están vacíos', () => {
        const errores = validarContacto({ nombre: '', correo: '', asunto: '', mensaje: '' });
        expect(errores.length).toBeGreaterThan(0);
    });

    test('retorna error específico de nombre cuando está vacío', () => {
        const errores = validarContacto({ nombre: '', correo: 'a@b.com', asunto: 'Test', mensaje: 'Hola' });
        expect(errores).toContain('El nombre es obligatorio.');
    });
});

// CP-02: correo con formato inválido
describe('CP-02 — Validación rechaza correo con formato inválido', () => {
    test('retorna error cuando el correo no tiene @', () => {
        const errores = validarContacto({ nombre: 'Juan', correo: 'correosinArroba', asunto: 'Test', mensaje: 'Hola' });
        expect(errores).toContain('El correo no tiene un formato válido.');
    });

    test('no retorna error cuando el correo es válido', () => {
        const errores = validarContacto({ nombre: 'Juan', correo: 'juan@correo.com', asunto: 'Test', mensaje: 'Hola' });
        expect(errores).not.toContain('El correo no tiene un formato válido.');
    });
});