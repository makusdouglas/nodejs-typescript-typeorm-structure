import UsersController from '@controllers/UsersController';
import { Router } from 'express';
import AuthenticationStore from 'src/app/middlewares/Authentication';
const userRouter = Router();

userRouter.post('/register', UsersController.store);
// Aply Authentication Middleware
userRouter.use(AuthenticationStore.authenticate);
userRouter.get('/', UsersController.index);
userRouter.get('/:id', UsersController.indexOne);
userRouter.patch('/:id', UsersController.update);
userRouter.delete('/:id', UsersController.remove);

export default userRouter;
