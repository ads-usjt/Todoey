import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AccountService, SessionHandler } from 'src/app/services/auth/account/account.service';
import { ReminderService } from '../../services/reminder.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

  constructor(
    private reminderService: ReminderService,
    private accountService: AccountService,
    private router: Router,
  ){}

  isUserLogged: boolean;

  ngOnInit(): void {
    // Call a function on every route navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.isUserLogged = SessionHandler.getTokenFromStorage().auth;
      }
    });
  }

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
