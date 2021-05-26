import AbstractController from '@controllers/AbstractController';
import Permission from '@models/Permission';
import Role from '@models/Role';
import { isNotEmptyObject } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

class RolesPermissionController extends AbstractController {
  constructor() {
    super();
  }
  async _index(req: Request, res: Response) {}
  async _show(req: Request, res: Response) {}
  async _create(req: Request, res: Response) {
    const { id, perm_id } = req.params;

    const permission = await getRepository(Permission).findOne(perm_id);
    console.log(permission);
    if (!isNotEmptyObject(permission)) {
      return res.status(404).json({
        error: true,
        message: 'Invalid permission id',
      });
    }

    const role = await Role.findOne(id);
    if (!isNotEmptyObject(role)) {
      return res.status(404).json({
        error: true,
        message: 'Invalid role id',
        role,
      });
    }

    role.permissions.push(permission);

    const {
      id: role_id,
      description,
      name,
      createdAt,
      updatedAt,
      permissions,
    } = await Role.save(role);

    return res.json({
      id: role_id,
      description,
      name,
      createdAt,
      updatedAt,
      permissions,
    });
  }
  async _update(req: Request, res: Response) {}
  async _destroy(req: Request, res: Response) {}
}

export default new RolesPermissionController();
