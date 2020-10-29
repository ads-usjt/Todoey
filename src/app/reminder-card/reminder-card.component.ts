import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Reminder } from '../reminder-model/reminder.entity';
import { ReminderService } from '../reminder-model/reminder.service';

@Component({
  selector: 'app-reminder-card',
  templateUrl: './reminder-card.component.html',
  styleUrls: ['./reminder-card.component.scss']
})
export class ReminderCardComponent implements OnInit, OnDestroy {
  constructor(public reminderService: ReminderService) { }

  reminders: Array<Reminder> = [];
  private reminderSubscription: Subscription;

  ngOnInit(): void {
    this.reminders = this.reminderService.getReminders();

    let clientesObservable: Observable<Reminder[]> = this.reminderService.getReminderListObservable();

    this.reminderSubscription = clientesObservable.subscribe((reminders:Reminder[]) => {
      this.reminders = reminders;
    });
  }

  ngOnDestroy(): void {
    this.reminderSubscription.unsubscribe();
  }
}