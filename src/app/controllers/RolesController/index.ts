import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Role from '@models/Role';
import { isEmpty, validate } from 'class-validator';
import AbstractController from '@controllers/AbstractController';

class RolesController extends AbstractController {
  constructor() {
    super();
  }

  async _index() {}
  async _show(req: Request, res: Response) {
    const repo = getRepository(Role);
    const response = await repo.find();
    return response.length > 0
      ? res.status(200).json({
          error: false,
          message: 'success',
          roles: response,
        })
      : res.status(404).json({
          error: true,
          message: 'roles not found',
        });
  }

  async _create(req: Request, res: Response) {
    const { name, description } = req.body;

    const repo = getRepository(Role);

    const role = repo.create({
      name,
      description,
    });
    const errors = await validate(role);

    if (errors.length === 0) {
      const response = await repo.save(role);
      return res.status(201).json(response);
    } else {
      return res.status(401).json(errors);
    }
  }
  async _destroy(req: Request, res: Response) {
    const { id } = req.params;
    if (isEmpty(id)) {
      return res.status(400).json({
        error: true,
        message: 'Requires a valdid Id',
      });
    }
    const response = await getRepository(Role).delete({ id: Number(id) });

    if (response.affected === 0) {
      return res.status(404).json({
        error: true,
        message: 'invalid role id',
      });
    }
    return res.json({ affected: response.affected });
  }

  async _update(req: Request, res: Response) {
    // valida id nos params
    let {
      isValid: isvalidParams,
      invalidFields: invalidParams,
    } = super.validateUrlParams(['id'], req);
    if (!isvalidParams) {
      return res.status(400).json({
        error: true,
        message: 'id is invalid in params',
        isMissing: invalidParams,
      });
    }

    // valida body

    let {
      isValid: isValidBody,
      invalidFields: invalidBody,
    } = super.validateBody(['name', 'description'], req);
    if (!isValidBody) {
      return res.status(400).json({
        error: true,
        message: 'required filds are empty in request body',
        isMissing: invalidBody,
      });
    }

    const { id } = req.params;
    const { name, description } = req.body;
    const response = await getRepository(Role).update(
      { id: Number(id) },
      { name, description }
    );
    if (response.affected === 0) {
      return res.status(404).json({ error: true, message: 'invalid role id' });
    }
    return res.json({ affected: response.affected });
  }
}
export default new RolesController();
