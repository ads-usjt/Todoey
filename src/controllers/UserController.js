"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async index(request, response) {
        const userRepository = typeorm_1.getRepository(User_1.default);
        const users = await userRepository.find({
            select: ['id', 'name', 'email'],
            relations: ['reminders']
        });
        return response.json(users);
    },
    async show(request, response) {
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { id } = request.params;
        const user = await userRepository.findOneOrFail(id, {
            select: ['id', 'name', 'email'],
            relations: ['reminders']
        });
        return response.json(user);
    },
    async create(request, response) {
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { name, email, password } = request.body;
        const user = await userRepository.create({
            name, email, password
        });
        await userRepository.save(user);
        return response.status(201).json({ name, email });
    },
    async update(request, response) {
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { id, name, email, password } = request.body;
        const updatedUser = {
            id, name, email, password
        };
        await userRepository.save(updatedUser);
        return response.json({ id, name, email });
    },
};
