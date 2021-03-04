import RolesController from '@controllers/RolesController';
import { Router } from 'express';
const roleRouter = Router();

roleRouter.post('/', RolesController.store);
roleRouter.get('/', RolesController.index);
// roleRouter.get('/:id', RolesController.indexOne);
// roleRouter.patch('/:id', RolesController.update);
// roleRouter.delete('/:id', RolesController.remove);

export default roleRouter;
