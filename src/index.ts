import server from './server';
import { connectDB } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`Base de datos: SQLite (archivo: database.sqlite)`);
    });
});