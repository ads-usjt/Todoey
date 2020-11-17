import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.entity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  async login(user: User): Promise<void> {
    const { auth, token, user_id } = await this.http.post<Token>(`${baseUrl}/login`, user).toPromise();

    if (auth && token) {
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('user_id', String(user_id));
      this.router.navigate(['/home']);
    }
  }

  logout(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  async createAccount(account: User): Promise<void> {
    await this.http.post<User>(`${baseUrl}/users`, account).toPromise();
    this.router.navigate(['/login']);
  }

  getAuthorizationToken(): string {
    return window.localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}

interface Token {
  auth: true;
  token: string;
  user_id: number;
}
