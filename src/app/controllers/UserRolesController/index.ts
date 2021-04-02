import { Request, Response } from 'express';

class UserRolesController {
  create(req: Request, res: Response) {
    const { id } = req.params;
  }
}

export default new UserRolesController();
