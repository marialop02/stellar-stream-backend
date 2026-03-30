require('dotenv').config();
const { getConnection } = require('./src/config/dbConfig');
const app = require('./src/app');

// Si no está el PORT en environment, usamos el del app (o 4000 como fallback)
const PORT = process.env.PORT || app.get('port') || 4000;

const startServer = async () => {
    try {
        // Ejecutamos la conexión a la BD
        await getConnection();

        // Iniciamos el servidor de Express
        app.listen(PORT, () => {
            console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error crítico al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();
