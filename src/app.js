const express = require('express');
const cors = require('cors');

// Importar rutas
const genreRoutes = require('./routes/genre-routes');
const directorRoutes = require('./routes/director-routes');
const producerRoutes = require('./routes/producer-routes');
const typeRoutes = require('./routes/type-routes');
const mediaRoutes = require('./routes/media-routes');

const app = express();

// Configuración del puerto por variable de entorno
app.set('port', process.env.PORT || 4000);

// Middlewares globales
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Conexión de rutas maestras
app.use('/api/generos', genreRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/productoras', producerRoutes);
app.use('/api/tipos', typeRoutes);
app.use('/api/media', mediaRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestión de Películas y Series en funcionamiento' });
});

module.exports = app;
