import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: User): Promise<boolean> {
    //TODO: tipar esse result mágico
    const result = await this.http.post<any>(`${baseUrl}/login`, user).toPromise();

    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      return true;
    }

    return false;
  }

  async createAccount(account: User): Promise<User> {
    //TODO verificar a criação de usuario
    return await this.http.post<User>(`${baseUrl}/users`, account).toPromise();
  }

  // async createAccount(account: any) {
  //   const result = await this.http.post<any>(`${environment.api}/users`, account).toPromise();
  //   return result;
  // }

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