import { Router } from '@angular/router';
import { Injectable, EventEmitter, NgModule } from '@angular/core';

import { User } from 'src/app/models/user.entity';

@Injectable() @NgModule()
export class AuthService {

  private userAuth = false;

  // mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  Login(user: User): void {

    if (user.email === 'usuario@email.com' &&
      user.password === '123456') {

      this.userAuth = true;

      //  this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['home']);

    } else {
      this.userAuth = false;

      //  this.mostrarMenuEmitter.emit(false);
    }
  }

  userTrue(): boolean {
    return this.userAuth;
  }

}
