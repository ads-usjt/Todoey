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
    this.reminderService.getReminders();

    let remindersObservable: Observable<Reminder[]> = this.reminderService.getReminderListObservable();

    this.reminderSubscription = remindersObservable.subscribe((reminders: Array<Reminder>) => {
      this.reminders = reminders;
    });
  }

  ngOnDestroy(): void {
    this.reminderSubscription.unsubscribe();
  }

  onDelete(id: number) {
    this.reminderService.removeReminder(id);
  }
}