import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Permission from '@models/Permission';
import { isEmpty, validate } from 'class-validator';
import AbstractController from '@controllers/AbstractController';

class PermissionsController extends AbstractController {
  constructor() {
    super();
  }

  async _index(req: Request, res: Response): Promise<Response | void> {}
  async _show(req: Request, res: Response): Promise<Response | void> {
    const repo = getRepository(Permission);
    const response = await repo.find();
    return response.length > 0
      ? res.status(200).json(response)
      : res.status(404).json({
          error: true,
          message: 'permissions not found',
        });
  }
  async _create(req: Request, res: Response) {
    const { module, description, type } = req.body;

    const repo = getRepository(Permission);

    const permission = repo.create({
      module,
      description,
      type,
    });
    const errors = await validate(permission);

    if (errors.length === 0) {
      const response = await repo.save(permission);
      return res.status(201).json(response);
    } else {
      return res.status(401).json(errors);
    }
  }
  async _update(req: Request, res: Response): Promise<Response | void> {
    // Valida parametro id
    let {
      isValid: isInvalidParams,
      invalidFields: invalidParams,
    } = super.validateUrlParams(['id'], req);
    if (!isInvalidParams) {
      return res.status(400).json({
        error: true,
        message: 'id is missing in url params',
        isMissing: invalidParams,
      });
    }
    // valida body
    let {
      isValid: isValidBody,
      invalidFields: invalidBody,
    } = super.validateBody(['module', 'description', 'type'], req);
    if (!isValidBody) {
      return res.status(400).json({
        error: true,
        message: 'required filds are empty in request body',
        isMissing: invalidBody,
      });
    }
    // atualiza no banco

    const { id } = req.params;
    const { module, description, type } = req.body;
    const response = await getRepository(Permission).update(
      { id: Number(id) },
      { module, description, type }
    );
    if (response.affected === 0) {
      return res
        .status(404)
        .json({ error: true, message: 'invalid permission id' });
    }
    return res.json({ affected: response.affected });
  }
  async _destroy(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    if (isEmpty(id)) {
      return res.status(400).json({
        error: true,
        message: 'Requires a valdid Id',
      });
    }
    const response = await getRepository(Permission).delete({ id: Number(id) });

    if (response.affected === 0) {
      return res.status(404).json({
        error: true,
        message: 'invalid permission id',
      });
    }
    return res.json({ affected: response.affected });
  }
}
export default new PermissionsController();
