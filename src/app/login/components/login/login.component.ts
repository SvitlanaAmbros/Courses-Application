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
    private store: Store<userState.UserState>,
    private authService: AuthService, 
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit() {
  }

  public logIn(): void {
    console.log('Login comp');
    this.store.dispatch(new userActions.Login(this.user));
    // set user data to local storage and navigate to courses page
    // this.authService.login(this.user)
    //   .subscribe(
    //     res => this.router.navigateByUrl('/courses'),
    //     err =>  alert('Not right credentials. Please, try again')
    //   );
  }
}
