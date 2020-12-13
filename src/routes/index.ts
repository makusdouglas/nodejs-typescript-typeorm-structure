import UsersController from '@controllers/UsersController'
import { Request, Response, Router } from 'express'
const routes = Router()

routes.get('/', (req:Request, res:Response) => {
  return res.json({ message: 'Hello World' })
})
routes.post('/users/register', UsersController.store)

routes.get('/users', UsersController.index)

export default routes
