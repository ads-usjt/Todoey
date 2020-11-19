"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReminder1604004280960 = void 0;
const typeorm_1 = require("typeorm");
class createReminder1604004280960 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'reminder',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'body',
                    type: 'text',
                },
                {
                    name: 'deadline',
                    type: 'bigint',
                },
                {
                    name: 'createdAt',
                    type: 'bigint',
                },
                {
                    name: 'user_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'ReminderUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('reminder');
    }
}
exports.createReminder1604004280960 = createReminder1604004280960;
