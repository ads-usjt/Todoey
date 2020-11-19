import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Reminder from '../models/Reminder';
import User from '../models/User';

export default {

  async index(request: Request, response: Response) {
    const reminderRepository = getRepository(Reminder);

    const { user_id } = request.headers;

    if (!user_id) {
      return response.status(422)
        .json({ missing_property_error: 'You have to provide a user_id in headers' });
    }

    const reminders = await reminderRepository.find({
      where: { user: { id: user_id } }
    })

    return response.json(reminders);
  },

  async show(request: Request, response: Response) {
    const reminderRepository = getRepository(Reminder);
    const { id } = request.params;

    const reminder: Reminder = await reminderRepository.findOneOrFail(id, {
      relations: ['user'],
    });

    const parsedReminder = removeUserPassword(reminder);

    return response.json(parsedReminder);
  },

  async create(request: Request, response: Response) {
    const reminderRepository = getRepository(Reminder);
    const userRepository = getRepository(User);
    const {
      user_id,
      title,
      deadline,
      body,
    } = request.body;

    const user = await userRepository.findOneOrFail(user_id);

    const createdAt: number = Date.now();

    const reminder = reminderRepository.create({
      user, title, deadline, createdAt, body
    });

    await reminderRepository.save(reminder);

    const parsedReminder = removeUserPassword(reminder);

    return response.status(201).json(parsedReminder);
  },

  async delete(request: Request, response: Response) {
    const reminderRepository = getRepository(Reminder);
    const { id } = request.params;

    const reminder: Reminder = await reminderRepository.findOneOrFail(id, {
      relations: ['user'],
    });

    await reminderRepository.delete(reminder);

    return response.json({ message: 'Reminder deleted successfully' });
  },

  async update(request: Request, response: Response) {
    const reminderRepository = getRepository(Reminder);
    const {
      title,
      deadline,
      body,
    } = request.body;

    const id = Number(request.params.id);
    const createdAt: number = Date.now();

    const updatedReminder: Reminder = {
      id, title, deadline, createdAt, body,
    };

    await reminderRepository.save(updatedReminder);

    return response.json(updatedReminder);
  }

};

function removeUserPassword(reminder: Reminder) {
  return { ...reminder, user: { name: reminder.user?.name, email: reminder.user?.email } };
}