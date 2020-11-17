import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/auth/account/account.service';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(
    private reminderService: ReminderService,
    private accountService: AccountService,
  ){}

  onAddReminder(form: NgForm): void {
    if (form.invalid) { return; }
    this.reminderService.addReminder(
      form.value.title,
      form.value.deadline,
      form.value.body,
    );
    form.resetForm();
  }

  logout(): void {
    this.accountService.logout();
  }
}
