require('dotenv').config();
const { getConnection } = require('../config/dbConfig');
const Genre = require('../models/Genre');

const seedGenres = async () => {
    try {
        await getConnection();
        console.log('Iniciando poblamiento de Géneros iniciales...');

        const genres = [
            { nombre: 'Acción', estado: 'Activo', descripcion: 'Películas de alta energía y adrenalina.' },
            { nombre: 'Aventura', estado: 'Activo', descripcion: 'Exploración y viajes épicos.' },
            { nombre: 'Ciencia Ficción', estado: 'Activo', descripcion: 'Ficción especulativa, tecnología y el espacio exterior.' },
            { nombre: 'Drama', estado: 'Activo', descripcion: 'Desarrollo profundo de personajes y emociones.' },
            { nombre: 'Terror', estado: 'Activo', descripcion: 'Diseñado para asustar y causar pánico.' }
        ];

        let count = 0;
        for (const g of genres) {
            const exists = await Genre.findOne({ nombre: g.nombre });
            if (!exists) {
                await Genre.create(g);
                console.log(`[+] Género insertado: ${g.nombre}`);
                count++;
            } else {
                console.log(`[i] El género ${g.nombre} ya existía en la BD.`);
            }
        }
        
        console.log(`Proceso de Seeder finalizado. ${count} géneros nuevos.`);
        process.exit(0);
    } catch (error) {
        console.error('Error poblando géneros:', error);
        process.exit(1);
    }
};

seedGenres();
