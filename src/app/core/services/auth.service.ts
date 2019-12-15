import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, finalize, catchError} from 'rxjs/operators';

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
    console.log('auth servce', user);
    return this.http.post(LOGIN_URL, user)
      .pipe(
        map((res: AuthResponse) => {
          user.token = res.token;
          this.localStorageService.setUserToStorage(user);
          this.updateAuthentication(true);

          return res;
        })
      );
  }

  public getFullUserInfo(token: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(USER_INFO_URL, {token});
  }

  public logout(): void {
    // alredy implemented clearing user
    this.localStorageService.deleteUserFromStorage();
    this.updateAuthentication(false);
  }

  public getUserInfoFromStorage(): LoginUser {
    return this.localStorageService.getUserFromStorage();
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
