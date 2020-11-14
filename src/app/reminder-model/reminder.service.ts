import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Reminder } from './reminder.entity';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminders: Array<Reminder> = [];

  constructor(
    public httpClient: HttpClient,
    private router: Router
  ) { }

  private remindersUpdatedList = new Subject<Reminder[]>();

  private BASEURL = 'http://todoey-rest.herokuapp.com';

  getReminders(): void {

    this.httpClient.get<Reminder[]>(
      `${this.BASEURL}/reminders`
    )
      .pipe(map(reminders => reminders.map(reminder => {
        return {
          id: reminder.id, ...reminder
        }
      })
      ))
      .subscribe(reminders => {
        this.reminders = reminders;
        this.remindersUpdatedList.next([...this.reminders]);
      });

  }

  getReminder(id: string) {
    return this.httpClient.get<Reminder>(`${this.BASEURL}/reminders/${id}`);
  }

  addReminder(title: string, deadline: number, body: string): void {

    //TODO: use real user id
    const reminder: Reminder = { user_id: 1, title, deadline, body };

    this.httpClient.post<Reminder>(
      `${this.BASEURL}/reminders`,
      reminder
    )
      .subscribe(reminder => {
        console.info(reminder);
        this.reminders.push(reminder);
        this.remindersUpdatedList.next([...this.reminders]);
      });

  }

  removeReminder(id: number): void {
    this.httpClient.delete(`${this.BASEURL}/reminders/${id}`)
      .subscribe(() => {
        this.reminders = this.reminders.filter((rem) => {
          return rem.id !== id
        })
        this.remindersUpdatedList.next([...this.reminders]);
        alert("ToDo Removed successfully")
      });
  }

  atualizarCliente(id: number, title: string, deadline: number, body: string): void {

    //TODO: use real user id
    const reminder: Reminder = { user_id: 1, title, deadline, body, id };

    this.httpClient.put<Reminder>(
      `${this.BASEURL}/reminders/${id}`,
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
