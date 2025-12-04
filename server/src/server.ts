import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan';
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

//Permitir cors
const opcionesCors : CorsOptions = {
    origin: function(origin, callback){
        //if(origin===process.env.FRONTEND_URL){
            callback(null, true);
        //}else{
        //    callback(new Error('Error de CORS'));
        //}
    }

};
server.use(cors(opcionesCors));

//leer datos de formularios
server.use(express.json());

server.use(morgan('dev'));

server.use('/productos', router);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default server;