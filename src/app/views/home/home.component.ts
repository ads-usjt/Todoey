import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Reminder } from '../../models/reminder.entity';

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
  id: number;
  reminder;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.modo = 'edit';
        this.id = Number(paramMap.get('id'));

        this.reminderService.getReminder(this.id).subscribe(reminder => {
          const { id, title, deadline, createdAt, body } = reminder;
          this.reminder = { id, title, deadline: new Date(Number(deadline)).toISOString().split("T")[0], createdAt: new Date(Number(createdAt)).toISOString().split("T")[0], body };
        });

        this.showDivFunction(true);
      } else {
        this.modo = 'create';
        this.id = null;
      }
    });
  }

  showDivFunction(show = false): void {
    this.showForm = show;
  }

  onAddReminder(form: NgForm): void {
    if (form.invalid) { return; }

    if (this.modo === 'create') {
      this.reminderService.addReminder(
        form.value.title,
        new Date(form.value.deadline).getTime(),
        form.value.body,
      );
      this.showDivFunction();
    } else {
      this.reminderService.updateReminder(
        this.id,
        form.value.title,
        new Date(form.value.deadline).getTime(),
        form.value.body,
      )
      this.router.navigate(["/home"])
    }
  }
}
