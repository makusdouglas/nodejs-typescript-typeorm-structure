import { Router } from 'express';
import userRouter from './userRouter';
import roleRouter from './roleRouter';
import sessionRouter from './sessionRouter';
const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', userRouter);
routes.use('/roles', roleRouter);

export default routes;
