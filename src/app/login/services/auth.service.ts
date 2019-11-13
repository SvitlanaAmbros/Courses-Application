import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthentificated = false;
  
  constructor() { }

  public login(): void {

  }

  public logout(): void {

  }

  public isAuthentificated(): boolean {
    return this.isUserAuthentificated;
  }

}
