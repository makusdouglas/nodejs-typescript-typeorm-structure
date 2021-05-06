import RolesController from '@controllers/RolesController';
import AuthenticationStore from '@middlewares/Authentication';
import { Router } from 'express';
const roleRouter = Router();

roleRouter.use(AuthenticationStore.authenticate);
roleRouter.post('/', RolesController._create);
roleRouter.get('/', RolesController._show);
// roleRouter.get('/:id', RolesController.indexOne);
roleRouter.patch('/:id', RolesController._update);
roleRouter.delete('/:id', RolesController._destroy);

// ROLE > PERMISSION

roleRouter.post('/:id/permission/:perm_id');
roleRouter.delete('/:id/permission/:perm_id');

export default roleRouter;
