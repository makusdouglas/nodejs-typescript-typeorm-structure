import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Role from '@models/Role';
import { validate } from 'class-validator';

class RolesController {
  async index(req: Request, res: Response) {
    const repo = getRepository(Role);
    const response = await repo.find();
    return response.length > 0
      ? res.status(200).json({
          error: false,
          message: 'success',
          ...response,
        })
      : res.status(404).json({
          error: true,
          message: 'roles not found',
        });
  }

  async store(req: Request, res: Response) {
    const { name, description } = req.body;

    const repo = getRepository(Role);

    const role = repo.create({
      name,
      description,
    });
    const errors = await validate(role);

    if (errors.length === 0) {
      const response = await repo.save(role);
      return res.status(201).json({
        error: false,
        message: 'Role successfuly created',
        ...response,
      });
    } else {
      return res.status(401).json(errors);
    }
  }
}
export default new RolesController();
