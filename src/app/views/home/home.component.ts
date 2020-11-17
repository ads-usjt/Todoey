import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Reminder } from '../../models/reminder.entity';

import DateUtil from 'src/app/services/dateutil.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    public reminderService: ReminderService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  private modo = 'create';
  showForm = false;
  private id: number;
  reminder: Reminder;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.modo = 'edit';
        this.id = Number(paramMap.get('id'));

        this.reminderService.getReminder(this.id).subscribe((reminder: Reminder) => {
          const { id, title, deadline, createdAt, body } = reminder;
          this.reminder = {
            id,
            title,
            deadline: DateUtil.toDateISOString(deadline),
            createdAt: DateUtil.toDateISOString(createdAt),
            body,
          };
        });

        this.showSaveReminderForm();
      } else {
        this.modo = 'create';
        this.id = null;
      }
    });
  }

  showSaveReminderForm(show = true): void {
    this.showForm = show;
  }

  onAddReminder(form: NgForm): void {
    if (form.invalid) { return; }

    if (this.modo === 'create') {
      this.reminderService.addReminder(
        form.value.title,
        DateUtil.toMilliseconds(form.value.deadline),
        form.value.body,
      );
      this.showSaveReminderForm(false);
    } else {
      this.reminderService.updateReminder(
        this.id,
        form.value.title,
        DateUtil.toMilliseconds(form.value.deadline),
        form.value.body,
      );
      this.router.navigate(['/home']);
    }
  }
}
