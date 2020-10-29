import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reminder } from './reminder.entity';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminders: Array<Reminder> = [];

  constructor() { }

  private remindersUpdatedList = new Subject<Reminder[]>();

  getReminders(): Array<Reminder> {
    return [...this.reminders];
  }

  addReminder(title: string, deadline: number, body: string): void{
    const reminder: Reminder = {
      title,
      deadline,
      insertedDate: Date.now(),
      body,
    }
    this.reminders.push(reminder);
    this.remindersUpdatedList.next([...this.reminders]);
  }

  getReminderListObservable(){
    return this.remindersUpdatedList.asObservable();
  }
}
