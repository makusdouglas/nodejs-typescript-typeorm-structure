import { Router } from 'express';
import userRouter from './userRouter';
import roleRouter from './roleRouter';
import sessionRouter from './sessionRouter';
import permissionRouter from './permissionRouter';
const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', userRouter);
routes.use('/roles', roleRouter);
routes.use('/permissions', permissionRouter);

export default routes;
