import { Router } from '@angular/router'
import { Injectable, EventEmitter, NgModule } from '@angular/core'

import { User } from './user';

@Injectable() @NgModule()
export class AuthService {

  private userAuth: boolean = false;

  //mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  Login(user: User) {

    if (user.name === 'usuario@email.com' &&
      user.password === '123456') {

      this.userAuth = true;

      //  this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);

    } else {
      this.userAuth = false;

      //  this.mostrarMenuEmitter.emit(false);
    }
  }

  userTrue() {
    return this.userAuth;
  }

}