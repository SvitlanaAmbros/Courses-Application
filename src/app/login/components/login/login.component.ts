import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@store/reducers/app.reducers';
import * as userActions from '@store/actions/user.actions';
import { LoginUser } from '@app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: LoginUser = {
    login: 'user',
    password: 'user'
  };

  public test;
  constructor(
    private store: Store<AppState>) { }

  ngOnInit() {
  }

  public logIn(): void {
    this.store.dispatch(new userActions.Login(this.user));
  }
}
