import UserRolesController from '@controllers/UserRolesController';
import UsersController from '@controllers/UsersController';
import AuthenticationStore from '@middlewares/Authentication';
import { Router } from 'express';
const userRouter = Router();

userRouter.post('/register', UsersController.store);
// Aply Authentication Middleware
userRouter.use(AuthenticationStore.authenticate);
userRouter.get('/', UsersController.index);
userRouter.get('/me', UsersController.indexOne);
userRouter.get('/:id', UsersController.indexOne);
userRouter.patch('/:id', UsersController.update);
userRouter.delete('/:id', UsersController.remove);

// User -> Role

userRouter.post('/:id/role/:role_id', UserRolesController._create);
userRouter.delete('/:id/role/:role_id', UserRolesController._destroy);

export default userRouter;
