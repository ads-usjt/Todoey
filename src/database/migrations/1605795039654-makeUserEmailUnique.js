"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserEmailUnique1605795039654 = void 0;
const typeorm_1 = require("typeorm");
class makeUserEmailUnique1605795039654 {
    async up(queryRunner) {
        queryRunner.changeColumn('user', 'email', new typeorm_1.TableColumn({
            name: 'email',
            type: 'varchar',
            isUnique: true
        }));
    }
    async down(queryRunner) {
        queryRunner.changeColumn('user', 'email', new typeorm_1.TableColumn({
            name: 'email',
            type: 'varchar',
            isUnique: false
        }));
    }
}
exports.makeUserEmailUnique1605795039654 = makeUserEmailUnique1605795039654;
