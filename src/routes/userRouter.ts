import UsersController from '@controllers/UsersController';
import { Router } from 'express';
const userRouter = Router();

userRouter.post('/', UsersController.store);
userRouter.get('/', UsersController.index);
userRouter.get('/:id', UsersController.indexOne);
userRouter.patch('/:id', UsersController.update);
userRouter.delete('/:id', UsersController.remove);

export default userRouter;
