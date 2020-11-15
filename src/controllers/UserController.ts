import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default {

  async index(request: Request, response: Response){
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'name', 'email'],
      relations: ['reminders']
    })
    return response.json(users);
  },

  async show(request: Request, response: Response){
    const userRepository = getRepository(User);
    const { id } = request.params;

    const user = await userRepository.findOneOrFail(id, {
      select: ['id', 'name', 'email'],
      relations: ['reminders']
    });

    return response.json(user);
  },

  async login(request: Request, response: Response){
    const userRepository = getRepository(User);
    const { email, password } = request.params;

    const user = await userRepository.findOneOrFail({ where: { email, password } });

    return response.json(user);
  },

  async create (request: Request, response: Response){
    const userRepository = getRepository(User);
    const {
      name,
      email,
      password
    } = request.body;

    const user = await userRepository.create({
      name, email, password
    });

    await userRepository.save(user);

    return response.status(201).json({ name,email });
  },

  async update (request: Request, response: Response){
    const userRepository = getRepository(User);
    const {
      id,
      name,
      email,
      password
    } = request.body;

    const updatedUser: User = {
      id, name, email, password
    };

    await userRepository.save( updatedUser );

    return response.json({ id, name, email });
  }

}