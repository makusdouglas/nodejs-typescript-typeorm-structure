import 'reflect-metadata';
import './bootstrap';
import express from 'express';
import cors from 'cors';
import '@controllers/UsersController';
import './database';
import routes from './routes';

const server = express();
server.use(cors());
server.disable('x-powered-by'); // desabilita header por motivo de segurança, recomendado pelo expressjs.com
server.use(express.json());
server.use(routes);

export default server;
