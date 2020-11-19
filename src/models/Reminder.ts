import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('reminder')
export default class Reminder {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 25 })
  title: string;

  @Column()
  deadline: number;

  @Column()
  createdAt: number;

  @Column()
  body: string;

  @ManyToOne(() => User, user => user.reminders)
  @JoinColumn({ name: 'user_id' })
  user?: User;

}