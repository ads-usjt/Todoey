import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../services/auth/account/account.service';

import { User } from '../../models/user.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  login = new User();

  constructor(
    private accountService: AccountService
  ) { }

  async onSubmit(form: NgForm): Promise<void> {
    try {
      const { email, password } = form.value;
      this.login = { email, password };

      const result = await this.accountService.login(this.login);
      console.log(`Login done: ${result}`);

    } catch (error) {
      console.error(`Login Error: ${error}`);
    }
  }
}
