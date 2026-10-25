const formulario = document.getElementById('contactoForm');
const mensajeResultado = document.getElementById('mensajeResultado');
const btnEnviar = document.getElementById('btnEnviar');
const contadorMensaje = document.getElementById('contadorMensaje');
const MAX_MENSAJE = 500;

// ── Contador de caracteres del mensaje ──────────────────────────
const textareaMensaje = document.getElementById('mensaje');
textareaMensaje.addEventListener('input', () => {
    const longitud = textareaMensaje.value.length;
    contadorMensaje.textContent = `${longitud} / ${MAX_MENSAJE}`;
    contadorMensaje.classList.remove('cerca', 'limite');
    if (longitud >= MAX_MENSAJE) {
        contadorMensaje.classList.add('limite');
    } else if (longitud >= MAX_MENSAJE * 0.8) {
        contadorMensaje.classList.add('cerca');
    }
});

// ── Validación individual de campo ──────────────────────────────
function validarCampo(input, errorSpanId) {
    const errorSpan = document.getElementById(errorSpanId);
    const valor = input.value.trim();
    let mensaje = '';

    if (!valor) {
        mensaje = 'Este campo es obligatorio.';
    } else if (input.type === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) {
            mensaje = 'Ingresa un correo con formato válido (ej: usuario@dominio.com).';
        }
    } else if (input.id === 'nombre' && valor.length < 2) {
        mensaje = 'El nombre debe tener al menos 2 caracteres.';
    } else if (input.id === 'asunto' && valor.length < 3) {
        mensaje = 'El asunto debe tener al menos 3 caracteres.';
    } else if (input.id === 'mensaje' && valor.length < 10) {
        mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    errorSpan.textContent = mensaje;

    if (mensaje) {
        input.classList.add('invalido');
        input.classList.remove('valido');
    } else {
        input.classList.add('valido');
        input.classList.remove('invalido');
    }

    return mensaje === '';
}

// ── Validación en tiempo real (al salir del campo) ───────────────
const campos = [
    { id: 'nombre',  errorId: 'error-nombre'  },
    { id: 'correo',  errorId: 'error-correo'  },
    { id: 'asunto',  errorId: 'error-asunto'  },
    { id: 'mensaje', errorId: 'error-mensaje' },
];

campos.forEach(({ id, errorId }) => {
    const input = document.getElementById(id);
    // Al perder el foco: valida
    input.addEventListener('blur', () => validarCampo(input, errorId));
    // Al escribir de nuevo: limpia el error si ya es válido
    input.addEventListener('input', () => {
        if (input.classList.contains('invalido')) {
            validarCampo(input, errorId);
        }
    });
});

// ── Estado del botón ─────────────────────────────────────────────
function setBotoCargando(cargando) {
    const texto = btnEnviar.querySelector('.btn-texto');
    btnEnviar.disabled = cargando;
    if (cargando) {
        btnEnviar.classList.add('cargando');
        texto.textContent = 'Enviando...';
    } else {
        btnEnviar.classList.remove('cargando');
        texto.textContent = 'Enviar mensaje';
    }
}

// ── Envío del formulario ─────────────────────────────────────────
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar
    const resultados = campos.map(({ id, errorId }) =>
        validarCampo(document.getElementById(id), errorId)
    );
    if (resultados.includes(false)) return;

    setBotoCargando(true);
    mensajeResultado.textContent = '';
    mensajeResultado.className = '';

    const datos = {
        nombre:  document.getElementById('nombre').value.trim(),
        correo:  document.getElementById('correo').value.trim(),
        asunto:  document.getElementById('asunto').value.trim(),
        mensaje: document.getElementById('mensaje').value.trim(),
    };

    try {
        const respuesta = await fetch('/api/contactos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            mensajeResultado.textContent = resultado.mensaje || 'Mensaje enviado correctamente.';
            mensajeResultado.classList.add('exito');
            formulario.reset();
            // Limpiar estados visuales
            campos.forEach(({ id }) => {
                const input = document.getElementById(id);
                input.classList.remove('valido', 'invalido');
            });
            contadorMensaje.textContent = `0 / ${MAX_MENSAJE}`;
            contadorMensaje.classList.remove('cerca', 'limite');
        } else {
            mensajeResultado.textContent = resultado.error || 'No fue posible procesar el formulario.';
            mensajeResultado.classList.add('error');
        }
    } catch (error) {
        console.error('Error:', error);
        mensajeResultado.textContent = 'No fue posible conectar con el servidor. Inténtalo nuevamente.';
        mensajeResultado.classList.add('error');
    } finally {
        setBotoCargando(false);
    }
});