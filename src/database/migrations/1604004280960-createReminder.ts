import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createReminder1604004280960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
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
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'integer',
          },
          {
            name: 'createdAt',
            type: 'integer',
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

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('reminder');
    }

}