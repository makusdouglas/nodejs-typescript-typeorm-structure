import PermissionsController from '@controllers/PermissionsController';
import AuthenticationStore from '@middlewares/Authentication';
import { Router } from 'express';

const permissionRouter = Router();
permissionRouter.use(AuthenticationStore.authenticate);
permissionRouter.get('/', PermissionsController._show);
permissionRouter.post('/', PermissionsController._create);
permissionRouter.patch('/:id', PermissionsController._update);
permissionRouter.delete('/:id', PermissionsController._destroy);

export default permissionRouter;
