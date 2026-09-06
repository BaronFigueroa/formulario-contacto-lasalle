const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
    // Usar DATABASE_URL en producción (Render)
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    // Usar variables separadas en desarrollo local
    pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
}

module.exports = pool;