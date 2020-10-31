import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Reminder from './Reminder';

@Entity('user')
export default class User{

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Reminder, reminder => reminder.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name: 'user_id'})
  reminders?: Array<Reminder>;
}