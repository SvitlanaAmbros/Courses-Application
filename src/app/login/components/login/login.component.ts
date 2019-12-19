import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LoadingService } from '@shared/services/loading.service';
import { AuthService } from '@core/services/auth.service';
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

  constructor(
    private store: Store<AppState>,
    private authService: AuthService, 
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit() {
  }

  public logIn(): void {
    this.store.dispatch(new userActions.Login(this.user));
  }
}
