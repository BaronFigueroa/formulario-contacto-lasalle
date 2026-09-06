const formulario = document.getElementById('contactoForm');
const mensajeResultado = document.getElementById('mensajeResultado');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const datos = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        asunto: document.getElementById('asunto').value,
        mensaje: document.getElementById('mensaje').value
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
            mensajeResultado.textContent = resultado.mensaje;
            formulario.reset();
        } else {
            mensajeResultado.textContent = resultado.error;
        }

    } catch (error) {
        console.error('Error:', error);
        mensajeResultado.textContent = 'No fue posible procesar el formulario.';
    }
});