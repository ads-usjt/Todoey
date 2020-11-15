import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Reminder } from '../../models/reminder.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public reminderService: ReminderService,
    public route: ActivatedRoute
  ){}

  private modo: string = "criar";
  showForm = false;
  id: string;
  reminder: Reminder;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.modo = 'editar';
        this.id = paramMap.get('id');
        this.reminderService.getReminder(this.id).subscribe(reminder => {
          const { id, title, deadline, insertedDate, body } = reminder;
          this.reminder = { id, title, deadline, insertedDate, body };
        });
      } else {
        this.modo = 'criar';
        this.id = null;
      }
    });
  }

  showDivFunction(show = false): void {
    this.showForm = show;
  }

  onAddReminder(form: NgForm): void {
    if (form.invalid) return;

    if (this.modo === 'criar') {
      this.reminderService.addReminder(
        form.value.title,
        new Date(form.value.deadline).getTime(),
        form.value.body,
      );
      this.showDivFunction();
    } else {
      // TODO: editar
    }
  }
}
