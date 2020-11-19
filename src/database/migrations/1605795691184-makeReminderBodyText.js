"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReminderBodyText1605795691184 = void 0;
const typeorm_1 = require("typeorm");
class makeReminderBodyText1605795691184 {
    async up(queryRunner) {
        queryRunner.changeColumn('reminder', 'body', new typeorm_1.TableColumn({
            name: 'body',
            type: 'text'
        }));
    }
    async down(queryRunner) {
        queryRunner.changeColumn('reminder', 'body', new typeorm_1.TableColumn({
            name: 'body',
            type: 'varchar'
        }));
    }
}
exports.makeReminderBodyText1605795691184 = makeReminderBodyText1605795691184;
