import User from '@models/User';
import { arrayNotEmpty, isNotEmptyObject } from 'class-validator';
import { Request, Response } from 'express';
import AuthenticationStore from 'src/app/middlewares/Authentication';
import { getRepository } from 'typeorm';

class SessionController {
  async store(req: Request, res: Response) {
    const { email: e_mail, password } = req.body;

    const user = await User.findByEmail(e_mail);
    console.log(user);

    if (!isNotEmptyObject(user)) {
      return res.status(401).json({
        error: true,
        message: 'You dont have a acount, try to make one now.',
      });
    }
    if (!user.isPasswordCorrect(password)) {
      return res
        .status(401)
        .json({ error: true, message: 'Email or password do not match.' });
    } else if (user.isPasswordCorrect(password)) {
      const token = AuthenticationStore.signJwt(user);
      const {
        email,
        id,
        firstname,
        lastname,
        birth,
        createdAt,
        updatedAt,
        roles,
      } = user;
      return res.json({
        access_token: token,
        email,
        id,
        firstname,
        lastname,
        birth,
        createdAt,
        updatedAt,
        roles,
      });
    }
  }
}
export default new SessionController();
