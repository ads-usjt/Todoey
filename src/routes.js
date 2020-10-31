"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReminderController_1 = __importDefault(require("./controllers/ReminderController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const routes = express_1.Router();
routes.get('/', (request, response) => {
    return response.json({
        welcome_message: 'Todoey REST API: https://ads-usjt.github.io/Todoey'
    });
});
routes.get('/reminders', ReminderController_1.default.index);
routes.get('/reminders:id', ReminderController_1.default.show);
routes.post('/reminders', ReminderController_1.default.create);
routes.delete('/reminders:id', ReminderController_1.default.delete);
routes.put('/reminders:id', ReminderController_1.default.update);
routes.get('/users', UserController_1.default.index);
routes.get('/users:id', UserController_1.default.show);
routes.post('/users', UserController_1.default.create);
routes.put('/users:id', UserController_1.default.update);
exports.default = routes;
