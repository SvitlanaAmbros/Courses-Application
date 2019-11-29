import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LocalStorageService } from '@shared/services/local-storage.service';
import { LoginUser } from '@shared/models/user.model';

@Injectable()
export class AuthService {
  public isUserAuthenticated: BehaviorSubject<boolean>;
  constructor(private localStorageService: LocalStorageService) { }

  public login(user: LoginUser): void {
    this.localStorageService.setUserToStorage(user);
    this.updateAuthentication(true);
  }

  public logout(): void {
    // alredy implemented clearing user
    this.localStorageService.deleteUserFromStorage();
    this.updateAuthentication(false);
  }

  public getUserInfo(): LoginUser {
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
