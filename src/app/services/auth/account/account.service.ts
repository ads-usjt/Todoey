import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user.entity';
import { Router } from '@angular/router';

import { SessionAuth } from 'src/app/models/sessionauth';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  async login(user: User): Promise<void> {
    const session = await this.http.post<SessionAuth>(`${baseUrl}/login`, user).toPromise();

    if (session.auth && session.token) {
      SessionHandler.storageToken(session);
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

  getAuthorizationToken = (): string => SessionHandler.getTokenFromStorage().token;

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
    if (!token || this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
}

/**
 * Storage and retrieve session auth data on localStorage
 * @author Lucas Souza <lucasouliveira@gmail.com>
 */
export const SessionHandler = {
  /**
   * @param session get session auth data and put on localStorage
   */
  storageToken(session: SessionAuth): void {
    window.localStorage.setItem('session', JSON.stringify(session));
  },
  /**
   * @return get session auth data from localStorage
   */
  getTokenFromStorage(): SessionAuth {
    const session = JSON.parse(window.localStorage.getItem('session'));
    if (!session) {
      return { auth: false, token: undefined, userId: undefined } as SessionAuth;
    } else {
      return session;
    }
  },
};
