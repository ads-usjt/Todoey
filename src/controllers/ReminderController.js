"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Reminder_1 = __importDefault(require("../models/Reminder"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async index(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const { user_id } = request.headers;
        if (!user_id) {
            return response.status(422)
                .json({ missing_property_error: 'You have to provide a user_id in headers' });
        }
        const reminders = await reminderRepository.find({
            where: { user: { id: user_id } }
        });
        return response.json(reminders);
    },
    async show(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const { id } = request.params;
        const reminder = await reminderRepository.findOneOrFail(id, {
            relations: ['user']
        });
        return response.json(reminder);
    },
    async create(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { user_id, title, deadline, body, } = request.body;
        const user = await userRepository.findOneOrFail(user_id);
        const createdAt = Date.now();
        const reminder = await reminderRepository.create({
            user, title, deadline, createdAt, body
        });
        await reminderRepository.save(reminder);
        return response.status(201).json(reminder);
    },
    async delete(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const { id } = request.params;
        const reminder = await reminderRepository.findOneOrFail(id, {
            relations: ['user']
        });
        await reminderRepository.delete(reminder);
        return response.json({ message: 'Reminder deleted successfully' });
    },
    async update(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const { title, deadline, body, } = request.body;
        const id = Number(request.params.id);
        const createdAt = Date.now();
        const updatedReminder = {
            id, title, deadline, createdAt, body,
        };
        await reminderRepository.save(updatedReminder);
        return response.json(updatedReminder);
    }
};
