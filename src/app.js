const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

console.log('Valor de NODE_ENV antes de cargar:', process.env.NODE_ENV);

// Elegir archivo según NODE_ENV
const envFile = process.env.NODE_ENV === 'test' 
    ? '.env.test' 
    : (process.env.NODE_ENV === 'production' ? '.env.production' : '.env');
const envPath = path.resolve(__dirname, '..', envFile);
console.log('Cargando archivo de entorno:', envPath);

dotenv.config({ path: envPath });

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT desde .env:', process.env.PORT);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = require('./db/database');
const contactosRouter = require('./routes/contactos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/contactos', contactosRouter);

app.get('/', (req, res) => {
    res.send('Formulario de contacto La Salle funcionando');
});

app.listen(PORT, async () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);

    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Conexión a PostgreSQL exitosa:', result.rows[0]);
    } catch (error) {
        console.error('Error al conectar con PostgreSQL:', error.message);
    }
});