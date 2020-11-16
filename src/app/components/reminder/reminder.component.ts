import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Reminder } from '../../models/reminder.entity';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit, OnDestroy {
  constructor(public reminderService: ReminderService) { }

  reminders: Array<Reminder> = [];
  private reminderSubscription: Subscription;

  ngOnInit(): void {
    this.reminderService.getReminders();

    const remindersObservable: Observable<Reminder[]> = this.reminderService.getReminderListObservable();

    this.reminderSubscription = remindersObservable.subscribe((reminders: Array<Reminder>) => {
      this.reminders = reminders;
    });
  }

  ngOnDestroy(): void {
    this.reminderSubscription.unsubscribe();
  }

  onDelete(id: number): void {
    this.reminderService.removeReminder(id);
  }
}
