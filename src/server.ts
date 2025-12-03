import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

// COnectar db
async function conectarDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.bgGreen.white('Base de datos conectada'));
    } catch (error) {
        console.log(error);

        console.log(colors.red('Hubo un error al conectar la base de datos'));

    }
}
conectarDB();
const server = express();

//leer datos de formularios
server.use(express.json());

server.use('/productos', router);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default server;