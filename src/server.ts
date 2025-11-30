import express from 'express';
import router from './router';
import db from './config/db';

// COnectar db
async function conectarDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        console.log('Hubo un error al conectar la base de datos');

    }
}
conectarDB();
const server = express();

server.use('/productos', router);

export default server;