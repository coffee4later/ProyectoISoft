import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const server = express();

// Middlewares
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

// Rutas
server.use('/api/auth', authRoutes);
server.use('/api/products', productRoutes);
server.use('/api/admin', adminRoutes);

// Ruta de prueba
server.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a Tec-Cheap Market API' });
});

export default server;