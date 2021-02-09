import UsersController from '@controllers/UsersController';
import { Request, Response, Router } from 'express';
import userRouter from './userRouter';
const routes = Router();

routes.use('/users', userRouter);

export default routes;
