import express from 'express';
import router from './router.ts';

const server = express();

server.use('/productos', router);

export default server;