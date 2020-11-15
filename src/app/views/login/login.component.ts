import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { AccountService } from '../../services/auth/account/account.service';

import { User } from '../../models/user.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new User();

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    try {
      const { name, password } = form.value;
      this.login = { name, password };

      const result = await this.accountService.login(this.login);
      console.info(`Login done: ${result}`);

      this.router.navigate(['/home']);
    } catch (error) {
      console.error(`Login Error: ${error}`);
    }
  }
}