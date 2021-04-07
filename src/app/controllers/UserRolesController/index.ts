import AbstractController from '@controllers/AbstractController';
import Role from '@models/Role';
import User from '@models/User';
import { isNotEmptyObject } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

class UserRolesController extends AbstractController {
  async _index(req: Request, res: Response): Promise<Response | void> {}
  async _create(req: Request, res: Response) {
    const { id } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({
        error: true,
        message: 'roleId is missing in body request',
      });
    }
    const [role] = await getRepository(Role).findByIds([roleId]);
    if (!isNotEmptyObject(role)) {
      return res.status(404).json({
        error: true,
        message: 'Invalid role id',
        role,
      });
    }
    const user = await User.findOne(id);
    const roleExistForUser = user.roles.find((r) => r.id === role.id);
    if (isNotEmptyObject(roleExistForUser)) {
      return res.status(400).json({
        error: true,
        message: 'User already in this role',
      });
    }
    user.roles.push(role);
    const returns = await User.save(user);
    return res.json(returns);
  }
  async _show(req: Request, res: Response): Promise<Response | void> {}
  async _update(req: Request, res: Response): Promise<Response | void> {}
  async _destroy(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({
        error: true,
        message: 'roleId is missing in body request',
      });
    }
    const [role] = await getRepository(Role).findByIds([roleId]);
    if (!isNotEmptyObject(role)) {
      return res.status(404).json({
        error: true,
        message: 'Invalid role id',
        role,
      });
    }
    const user = await User.findOne(id);
    const roleExistForUser = user.roles.find((r) => r.id === role.id);
    if (roleExistForUser === null) {
      return res.status(400).json({
        error: true,
        message: 'User is not in this role',
      });
    }
    user.roles = user.roles.filter((r) => r.id != role.id);
    const returns = await User.save(user);
    return res.json(returns);
  }
}

export default new UserRolesController();
