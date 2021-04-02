import RolesController from '@controllers/RolesController';
import { Router } from 'express';
import AuthenticationStore from 'src/app/middlewares/Authentication';
const roleRouter = Router();

roleRouter.use(AuthenticationStore.authenticate);
roleRouter.post('/', RolesController.store);
roleRouter.get('/', RolesController.index);
// roleRouter.get('/:id', RolesController.indexOne);
// roleRouter.patch('/:id', RolesController.update);
// roleRouter.delete('/:id', RolesController.remove);

export default roleRouter;
