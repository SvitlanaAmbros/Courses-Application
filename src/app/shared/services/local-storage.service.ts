import { Injectable } from '@angular/core';

import { LoginUser } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveInLocalStorage(key, value): void {
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key): any {
    return localStorage.getItem(key);
  }

  public setUserToStorage(user: LoginUser): void {
    Object.keys(user).forEach(key => localStorage.setItem(key, user[key]));
  }

  public getUserFromStorage(): LoginUser {
    const user: LoginUser = {
      login: undefined,
      password: undefined
    };

    Object.keys(user).forEach(key => user[key] = localStorage.getItem(key));
    return user;
  }

  public deleteUserFromStorage(): void {
    const user: LoginUser = {
      login: undefined,
      password: undefined
    };

    Object.keys(user).forEach(key => user[key] = localStorage.removeItem(key));
  }

}
