import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import { LocalStorageService } from '@shared/services/local-storage.service';
import { LoginUser, AuthResponse } from '@app/models/user.model';

export const LOGIN_URL = 'auth/login';
export const USER_INFO_URL = 'auth/userinfo';

@Injectable()
export class AuthService {
  public isUserAuthenticated: BehaviorSubject<boolean>;
  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient) { }

  public login(user: LoginUser): Observable<AuthResponse> {
    return this.http.post(LOGIN_URL, user)
      .pipe(
        map((res: AuthResponse) => {
          this.updateAuthentication(true);

          return res;
        })
      );
  }

  public getFullUserInfo(token: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(USER_INFO_URL, {token});
  }

  public logout(): void {
    this.updateAuthentication(false);
  }

  public isAuthenticated(): Observable<boolean> {
    if (!this.isUserAuthenticated) {
      const currentAuthStatus = !!this.localStorageService.getFromLocalStorage('login')
          && !!this.localStorageService.getFromLocalStorage('password') ? true : false;
      this.isUserAuthenticated = new BehaviorSubject(currentAuthStatus);
    }

    return this.isUserAuthenticated.asObservable();
  }

  private updateAuthentication(value: boolean): void {
    this.isUserAuthenticated.next(value);
  }
}
