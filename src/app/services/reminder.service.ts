import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Reminder } from '../models/reminder.entity';

import { map } from 'rxjs/operators';

import { baseUrl } from '../../environments/environment';
import { Router } from '@angular/router';

import DateUtil from 'src/app/services/dateutil.service';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: Array<Reminder> = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  private remindersUpdatedList = new Subject<Reminder[]>();

  getReminders(): void {
    this.httpClient.get<Reminder[]>(
      `${baseUrl}/reminders`,
      { headers: { 'user_id': window.localStorage.getItem('user_id') } }
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

  async getReminder(id: number): Promise<Reminder> {
    const reminder = await this.httpClient.get<Reminder>(`${baseUrl}/reminders/${id}`).toPromise();
    const parsedReminder: Reminder = {
      ...reminder,
      deadline: DateUtil.toDateISOString(reminder.deadline),
      createdAt: DateUtil.toDateISOString(reminder.createdAt),
    }
    return parsedReminder;
  }1

  addReminder(title: string, deadline: string, body: string): void {

    const reminder: Reminder = {
      user_id: Number(window.localStorage.getItem('user_id')),
      title,
      deadline: DateUtil.toMilliseconds(deadline),
      body,
     };

    this.httpClient.post<Reminder>(
      `${baseUrl}/reminders`,
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

  updateReminder(id: number, title: string, deadline: string, body: string): void {

    const reminder: Reminder = {
      id,
      user_id: Number(window.localStorage.getItem('user_id')),
      title,
      deadline: DateUtil.toMilliseconds(deadline),
      body,
     };

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
    this.router.navigate(['/home']);
  }

  getReminderListObservable(): Observable<Reminder[]> {
    return this.remindersUpdatedList.asObservable();
  }

}
