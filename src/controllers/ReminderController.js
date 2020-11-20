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
        const userId = request.headers['user-id'];
        if (!userId) {
            return response.status(422)
                .json({ missing_property_error: 'You have to provide a User-ID in headers' });
        }
        const reminders = await reminderRepository.find({
            where: { user: { id: userId } }
        });
        return response.json(reminders);
    },
    async show(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const { id } = request.params;
        const reminder = await reminderRepository.findOneOrFail(id, {
            relations: ['user'],
        });
        const parsedReminder = removeUserPassword(reminder);
        return response.json(parsedReminder);
    },
    async create(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { userId, title, deadline, body, } = request.body;
        const user = await userRepository.findOneOrFail(userId);
        const createdAt = Date.now();
        const reminder = reminderRepository.create({
            user, title, deadline, createdAt, body
        });
        await reminderRepository.save(reminder);
        const parsedReminder = removeUserPassword(reminder);
        return response.status(201).json(parsedReminder);
    },
    async delete(request, response) {
        const reminderRepository = typeorm_1.getRepository(Reminder_1.default);
        const { id } = request.params;
        const reminder = await reminderRepository.findOneOrFail(id, {
            relations: ['user'],
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
function removeUserPassword(reminder) {
    var _a, _b;
    return Object.assign(Object.assign({}, reminder), { user: { name: (_a = reminder.user) === null || _a === void 0 ? void 0 : _a.name, email: (_b = reminder.user) === null || _b === void 0 ? void 0 : _b.email } });
}
