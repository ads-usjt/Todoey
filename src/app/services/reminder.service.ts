import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Reminder } from '../models/reminder.entity';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: Array<Reminder> = [];

  constructor(
    public httpClient: HttpClient,
  ){}

  private remindersUpdatedList = new Subject<Reminder[]>();

  getReminders(): void {

    this.httpClient.get<Reminder[]>(
      `${baseUrl}/reminders`
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

  getReminder(id: string): Observable<Reminder> {
    return this.httpClient.get<Reminder>(`${baseUrl}/reminders/${id}`);
  }

  addReminder(title: string, deadline: number, body: string): void {

    // TODO: use real user id
    const reminder: Reminder = { user_id: 1, title, deadline, body };

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

  atualizarCliente(id: number, title: string, deadline: number, body: string): void {

    // TODO: use real user id
    const reminder: Reminder = { user_id: 1, title, deadline, body, id };

    this.httpClient.put<Reminder>(
      `${baseUrl}/reminders/${id}`,
      reminder
    ).subscribe(reminder => {
      const copia = [...this.reminders];
      const indice = copia.findIndex(rmdr => rmdr.id === reminder.id);

      copia[indice] = reminder;

      this.reminders = copia;
      this.remindersUpdatedList.next([...this.reminders]);
    });

  }

  getReminderListObservable(): Observable<Reminder[]> {
    return this.remindersUpdatedList.asObservable();
  }
}
