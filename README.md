# Formulario de Contacto La Salle

Aplicación web desarrollada para gestionar el envío y almacenamiento de mensajes de contacto.

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* HTML
* CSS
* JavaScript
* Git
* GitHub

## Estructura del proyecto

```text
formulario-contacto-lasalle/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── src/
│   ├── app.js
│   ├── db/
│   │   └── database.js
│   └── routes/
│       └── contactos.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Endpoint principal

La aplicación utiliza el siguiente endpoint para registrar los contactos:

### Crear contacto

```text
POST /api/contactos
```

El endpoint recibe los siguientes datos:

* Nombre
* Correo electrónico
* Asunto
* Mensaje

El servidor valida la información recibida y, cuando los datos son correctos, almacena el contacto en PostgreSQL.

## Requisitos

Para ejecutar el proyecto localmente se requiere:

* Node.js
* npm
* PostgreSQL

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/BaronFigueroa/formulario-contacto-lasalle.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd formulario-contacto-lasalle
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear el archivo de configuración local a partir de `.env.example`.

5. Configurar las variables de conexión a PostgreSQL según el ambiente de ejecución.

## Ejecución

Iniciar la aplicación con:

```bash
npm start
```

Después abrir en el navegador:

```text
http://localhost:3000
```

## Configuración por ambientes

El proyecto utiliza variables de entorno para separar la configuración de la aplicación de los valores sensibles.

Los archivos locales `.env`, `.env.test` y `.env.production` no se publican en GitHub.

El archivo `.env.example` funciona como plantilla de configuración y contiene únicamente valores de ejemplo.

### Variables principales

```text
NODE_ENV
PORT
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

Los valores reales deben configurarse de forma local y no deben incluirse directamente en el repositorio.

## Pruebas

### Prueba 1: página principal

Abrir:

```text
http://localhost:3000
```

Resultado esperado: se muestra correctamente el formulario de contacto.

### Prueba 2: campos obligatorios

Intentar enviar el formulario dejando uno o más campos vacíos.

Resultado esperado: la aplicación informa que todos los campos son obligatorios.

### Prueba 3: correo inválido

Ingresar un correo con formato incorrecto.

Ejemplo:

```text
correo-invalido
```

Resultado esperado: la aplicación informa que el correo electrónico no tiene un formato válido.

### Prueba 4: envío correcto

Ingresar:

* Nombre válido
* Correo válido
* Asunto
* Mensaje

Resultado esperado:

* La información es enviada al servidor.
* El contacto es almacenado en la base de datos.
* Se muestra un mensaje de confirmación.
* El formulario queda disponible para un nuevo envío.

### Prueba 5: error de conexión

Intentar realizar un envío cuando el servidor no está disponible.

Resultado esperado: se muestra un mensaje indicando que no fue posible conectar con el servidor.

## Seguridad

La aplicación utiliza archivos de configuración local para almacenar valores que pueden variar según el ambiente.

### Archivos que NO deben publicarse

Los siguientes archivos contienen configuración local y deben permanecer fuera del repositorio:

```text
.env
.env.test
.env.production
## Git y GitHub

El proyecto se gestiona mediante Git y GitHub utilizando:

* Repositorio remoto.
* Ramas de trabajo.
* Commits descriptivos.
* Issues.
* Pull Requests.
* Integración de cambios.
* Resolución controlada de conflictos.

## Autor

Proyecto individual desarrollado para demostrar el uso de Git y GitHub en la Actividad 5 de Ingeniería de Software.

**2026-2_INGENIERIA DE SOFTWARE IS G_01**
