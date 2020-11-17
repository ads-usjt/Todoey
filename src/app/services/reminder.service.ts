import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Reminder } from '../models/reminder.entity';

import { map } from 'rxjs/operators';

import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: Array<Reminder> = [];

  constructor(
    public httpClient: HttpClient,
  ) { }

  private remindersUpdatedList = new Subject<Reminder[]>();

  getReminders(): void {
    this.httpClient.post<Reminder[]>(
      `${baseUrl}/reminders`,
      { user_id: Number(window.localStorage.getItem('user_id')) },
    )
      .pipe(map(reminders => reminders.map(reminder => {
        return {
          id: reminder.id, ...reminder,
        };
      })
      ))
      .subscribe(reminders => {
        this.reminders = reminders;
        this.remindersUpdatedList.next([...this.reminders]);
      });

  }

  getReminder(id: number): Observable<Reminder> {
    return this.httpClient.get<Reminder>(`${baseUrl}/reminders/${id}`);
  }

  addReminder(title: string, deadline: number, body: string): void {

    const reminder: Reminder = { user_id: Number(window.localStorage.getItem('user_id')), title, deadline, body };

    this.httpClient.post<Reminder>(
      `${baseUrl}/reminders/add`,
      reminder
    )
      .subscribe(reminder => {
        this.reminders.push(reminder);
        this.remindersUpdatedList.next([...this.reminders]);
      });

  }

  removeReminder(id: number): void {
    this.httpClient.delete(`${baseUrl}/reminders/${id}`)
      .subscribe(() => {
        this.reminders = this.reminders.filter((rem) => {
          return rem.id !== id;
        });
        this.remindersUpdatedList.next([...this.reminders]);
        alert('ToDo Removed successfully');
      });
  }

  updateReminder(id: number, title: string, deadline: number, body: string): void {

    const reminder: Reminder = { user_id: Number(window.localStorage.getItem('user_id')), title, deadline, body, id };

    this.httpClient.put<Reminder>(
      `${baseUrl}/reminders/${id}`,
      reminder
    ).subscribe(reminder => {
      const copy = [...this.reminders];
      const indice = copy.findIndex(rmdr => rmdr.id === reminder.id);

      copy[indice] = reminder;

      this.reminders = copy;
      this.remindersUpdatedList.next([...this.reminders]);
    });

  }

  getReminderListObservable(): Observable<Reminder[]> {
    return this.remindersUpdatedList.asObservable();
  }
}
