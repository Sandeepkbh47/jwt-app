import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, shareReplay, tap } from 'rxjs';
import { User } from './user';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(
        'http://localhost:4000/api/login',
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at')!;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
