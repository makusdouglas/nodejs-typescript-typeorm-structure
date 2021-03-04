import UsersController from '@controllers/UsersController';
import { Request, Response, Router } from 'express';
import userRouter from './userRouter';
import roleRouter from './roleRouter';
const routes = Router();

routes.use('/users', userRouter);
routes.use('/roles', roleRouter);

export default routes;
