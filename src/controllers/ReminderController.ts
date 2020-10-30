import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Reminder from '../models/Reminder';
import User from '../models/User';

export default {

  async index(request: Request, response: Response){
    const reminderRepository = getRepository(Reminder);
    const reminders = await reminderRepository.find({
      relations: ['user']
    })
    return response.json(reminders);
  },

  async show(request: Request, response: Response){
    const reminderRepository = getRepository(Reminder);
    const { id } = request.params;

    const reminder = await reminderRepository.findOneOrFail(id, {
      relations: ['user']
    });

    return response.json(reminder);
  },

  async create (request: Request, response: Response){
    const reminderRepository = getRepository(Reminder);
    const userRepository = getRepository(User);
    const {
      user_id,
      title,
      deadline,
      createdAt,
      body,
    } = request.body;

    const user: User = await userRepository.findOneOrFail(user_id);

    const reminder = await reminderRepository.create({
      user, title, deadline, createdAt, body
    });

    await reminderRepository.save(reminder);

    return response.status(201).json(reminder);
  },

  async delete(request: Request, response: Response){
    const reminderRepository = getRepository(Reminder);
    const { id } = request.params;

    const reminder = await reminderRepository.findOneOrFail(id, {
      relations: ['user']
    });

    await reminderRepository.delete(reminder);

    return response.json({message: 'Reminder deleted successfully'});
  },

  async update (request: Request, response: Response){
    const reminderRepository = getRepository(Reminder);
    const userRepository = getRepository(User);
    const {
      reminder_id: id,
      user_id,
      title,
      deadline,
      createdAt,
      body,
    } = request.body;

    const user: User = await userRepository.findOneOrFail(user_id);

    const updatedReminder: Reminder = {
      id, title, deadline, createdAt, body, user
    };

    await reminderRepository.save(updatedReminder);

    return response.json(updatedReminder);
  }

}