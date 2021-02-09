import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '@models/User';
import { validate } from 'class-validator';

class UsersController {
  async store(req: Request, res: Response) {
    const { email, password, firstname, lastname, birth: rawBirth } = req.body;

    if (!(!!email && !!password && !!firstname && !!lastname)) {
      console.log(req.body);

      return res.json({ error: 'required field are empty' });
    }
    const birth = new Date(rawBirth);

    const repo = getRepository(User);

    const userExists = await repo.findOne({
      where: { email },
      select: ['id', 'email'],
    });
    if (userExists) {
      return res.status(409).json({
        error: true,
        message: `User ${userExists.email} already exists`,
      });
    }
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.birth = birth;

    const errors = await validate(user);
    if (errors.length === 0) {
      const response = await repo.save(user);
      return res.status(201).json({
        error: false,
        message: 'user created successfully',
        email: response.email,
        firstname: response.firstname,
        lastname: response.lastname,
        birth: response.birth,
      });
    } else {
      return res.status(400).json(errors.map((e) => e.constraints));
    }
  }

  async index(req: Request, res: Response) {
    const repository = getRepository(User);

    const response = await repository.find({
      select: ['id', 'email', 'firstname', 'lastname', 'birth'],
    });

    return res.json(response);
  }

  async indexOne(req: Request, res: Response) {
    const { id } = req.params;
    if (id === null || id === '') {
      return res
        .status(401)
        .json({ error: true, message: 'provide a user id' });
    }
    try {
      const repo = await getRepository(User).findOneOrFail(id);
      return res.status(200).json(repo);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { birth: rawBirth } = req.body;
    const birth = rawBirth && new Date(rawBirth);

    const repository = getRepository(User);
    const user = repository.create({
      ...req.body,
      birth,
    });
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const { affected } = await repository.update(
      { id: id },
      {
        ...req.body,
        birth,
      }
    );

    if (affected > 0) {
      res.status(200).json({
        error: false,
        message: 'User updated successfuly',
      });
    } else {
      res.status(404).json({
        error: true,
        message: 'User not found',
      });
    }
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const repository = getRepository(User);
      const { affected } = await repository.delete({ id: id });

      if (affected > 0) {
        res.status(200).json({ id, affected: affected });
      } else {
        res.status(404).json({
          error: true,
          message: 'User not found',
          affected: affected,
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new UsersController();
