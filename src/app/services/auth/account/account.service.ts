import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: User): Promise<boolean> {
    const result = await this.http.post<{ auth: true, token: string, user_id: number }>(`${baseUrl}/login`, user).toPromise();

    if (result && result.token) {
      window.localStorage.setItem('token', result.token);
      window.localStorage.setItem('user_id', String(result.user_id));
      return true;
    }

    return false;
  }

  async createAccount(account: User): Promise<User> {
    return await this.http.post<User>(`${baseUrl}/users`, account).toPromise();
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
