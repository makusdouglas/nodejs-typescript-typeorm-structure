import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '@models/User'

class UsersController {
  async store(req:Request, res: Response) {
    const {email, password} = req.body
    
    if (!(email || password)) {
      return res.json({error: 'required field are empty'})
    }

    const repository = getRepository(User)

    const userExists = await repository.findOne({where: {email},
      select: ['id','email']
    })
    if(userExists) {
      return res.status(409).json({
        error: true,
        message: `User ${userExists.email} already exists`,
      })
    }
    const user = new User()
    user.email = email
    user.password = password
    const response = await repository.save(user) 
     

    return res.json({
      error: false, 
      message: "user created successfully",
      email: response.email

    })
  }

  async index(req:Request, res: Response) {
    const repository = getRepository(User)

    const response = await repository.find({select: ['id', 'email']})

    return res.json(response)
  }
}

export default new UsersController()
