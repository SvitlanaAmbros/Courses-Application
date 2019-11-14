import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from '@shared/services/local-storage.service';
import { LoginUser } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) { }

  public login(user: LoginUser): void {
    this.localStorageService.setUserToStorage(user);
  }

  public logout(): void {
    this.localStorageService.deleteUserFromStorage();
  }

  public isAuthenticated(): boolean {
    return !!this.localStorageService.getFromLocalStorage('login')
        && !!this.localStorageService.getFromLocalStorage('password') ? true : false;
  }

  public getUserInfo(): LoginUser {
    return this.localStorageService.getUserFromStorage();
  }
}
