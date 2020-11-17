import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../services/auth/account/account.service';

import { User } from '../../models/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  login = new User();

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  async onSubmit(form: NgForm): Promise<void> {
    try {
      const { email, password } = form.value;
      this.login = { email, password };

      const result = await this.accountService.login(this.login);
      console.log(`Login done: ${result}`);

      this.router.navigate(['/home']);
    } catch (error) {
      alert('Invalid login, try again');
      console.error(`Login Error: ${error}`);
    }
  }
}
