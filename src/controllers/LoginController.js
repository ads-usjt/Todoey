"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async login(request, response) {
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { email, password } = request.params;
        const user = await userRepository.findOneOrFail({ where: { email, password } });
        if (user) {
            const { id } = user;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET, {
                expiresIn: 3000
            });
            return response.json({ auth: true, token: token });
        }
        return response.status(500).json({ message: 'Invalid Login!' });
    },
};
