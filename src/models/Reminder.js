"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
let Reminder = class Reminder {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Reminder.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reminder.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Reminder.prototype, "deadline", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Reminder.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reminder.prototype, "body", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, user => user.reminders),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User_1.default)
], Reminder.prototype, "user", void 0);
Reminder = __decorate([
    typeorm_1.Entity('reminder')
], Reminder);
exports.default = Reminder;
