import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AccountService } from 'src/app/services/auth/account/account.service';

import { User } from 'src/app/models/user.entity';
import { Router } from '@angular/router';

import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  login = new User();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(baseUrl).toPromise()
      .then(
        ({ welcome_message } : any ) => {
          return console.table({
            heroku_awaked: true,
            message: welcome_message ,
          });
        }
      ).catch(e => console.error(e));
  }

  async onSubmit(form: NgForm): Promise<void> {
    try {
      const { email, password } = form.value;
      this.login = { email, password };

      await this.accountService.login(this.login);

    } catch (error) {
      alert('Invalid login, try again');
      console.error(`Login Error: ${error}`);
    }
  }
}
