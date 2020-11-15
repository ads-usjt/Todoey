import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public reminderService: ReminderService) { }

  onAddReminder(form: NgForm){
    if (form.invalid) return;
    this.reminderService.addReminder(
      form.value.title,
      form.value.deadline,
      form.value.body
    )
    form.resetForm();
  }
}
