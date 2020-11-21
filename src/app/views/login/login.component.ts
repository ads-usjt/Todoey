import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AccountService } from 'src/app/services/auth/account/account.service';

import { User } from 'src/app/models/user.entity';

import { baseUrl } from 'src/environments/environment';
import { AlertUtilService } from 'src/app/services/alertutil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  login = new User();

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private alertUtil: AlertUtilService
  ) { }

  ngOnInit(): void {
    // ping heroku to start up the server before login
    const elapsedTime = Date.now();
    this.http.get(baseUrl).toPromise()
      .then(
        ({ welcome_message }: any ) => {
          return console.table({
            heroku_awaked: welcome_message ? true : false,
            server_at: welcome_message ? baseUrl : undefined ,
            elapsed_time: `~${Math.round((Date.now() - elapsedTime)/1000)}sec`,
          });
        }
      ).catch(e => console.error(`Error trying to ping heroku: ${e}`));
  }

  async onSubmit(form: NgForm): Promise<void> {
    try {
      const { email, password } = form.value;
      this.login = { email, password };

      await this.accountService.login(this.login);

    } catch (error) {
      this.alertUtil.showErrorAlert('Invalid login, try again');
      console.error(`Login Error: ${error}`);
    }
  }
}
