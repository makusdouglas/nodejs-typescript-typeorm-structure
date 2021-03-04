import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Permission from '@models/Permission';
import { validate } from 'class-validator';

class PermissionsController {
  async store(req: Request, res: Response) {
    const { description } = req.body;
    const repo = getRepository(Permission);
    const perm = repo.create({
      description,
    });
    const errors = await validate(perm);

    if (errors.length === 0) {
    } else {
    }
  }
}
export default new PermissionsController();
