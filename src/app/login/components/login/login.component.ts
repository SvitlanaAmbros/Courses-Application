import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '@core/services/auth.service';
import { LoginUser } from '@app/models/user.model';
import { LoadingService } from '@shared/services/loading.service';

import * as userReducers from '@store/reducers/user.reducer';
import * as userActions from '@store/actions/user.actions';
import * as userState from '@store/state/user.state';
import { AppState } from '@app/store/reducers/app.reducers';

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
