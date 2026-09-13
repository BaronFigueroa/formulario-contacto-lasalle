const formulario = document.getElementById('contactoForm');
const mensajeResultado = document.getElementById('mensajeResultado');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    mensajeResultado.textContent = '';

    // Validar campos obligatorios
    if (!nombre || !correo || !asunto || !mensaje) {
        mensajeResultado.textContent = 'Todos los campos son obligatorios.';
        return;
    }

    // Validar formato del correo
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        mensajeResultado.textContent =
            'Ingresa un correo electrónico con un formato válido.';
        return;
    }

    const datos = {
        nombre,
        correo,
        asunto,
        mensaje
    };

    try {
        const respuesta = await fetch('/api/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

if (respuesta.ok) {
    mensajeResultado.textContent =
        resultado.mensaje || 'Formulario enviado correctamente.';
    formulario.reset();
} else {
    mensajeResultado.textContent =
        resultado.error ||
        'No fue posible procesar el formulario. Inténtalo nuevamente.';
}


    } catch (error) {
        console.error('Error:', error);
mensajeResultado.textContent =
    'No fue posible conectar con el servidor. Inténtalo nuevamente.';
    }
});