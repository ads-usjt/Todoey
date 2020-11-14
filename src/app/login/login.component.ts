import { Component, OnInit } from '@angular/core';


import { AuthService } from '../login-model/auth.service';
import { User } from '../login-model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  Login() {
    // console.log("ok feito");

    this.authService.Login(this.user);

  }

}
