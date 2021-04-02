import SessionController from '@controllers/SessionController';
import { Router } from 'express';
const sessionRouter = Router();

sessionRouter.post('/', SessionController.store);
// sessionRouter.get('/', SessionController.index);
// sessionRouter.get('/:id', RolesController.indexOne);
// sessionRouter.patch('/:id', RolesController.update);
// sessionRouter.delete('/:id', RolesController.remove);

export default sessionRouter;
