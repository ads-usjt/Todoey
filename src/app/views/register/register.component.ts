import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account/account.service';
import { User } from '../../models/user.entity';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(private accountService: AccountService, private router: Router) { }

  @Output() registerAdd = new EventEmitter();

  user = new User();

  async onSubmit(): Promise<void> {
    try {
      await this.accountService.createAccount(this.user);

      alert('User created successfully');
    } catch (error) {
      console.error(error);
    }
  }

}
