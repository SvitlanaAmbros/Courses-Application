import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, mergeMap, concatMap, mapTo } from 'rxjs/operators';

import * as userActions from '@store/actions/user.actions';
import { AuthService } from '@core/services/auth.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthResponse, LoginUser } from '@app/models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect() 
  login$ = this.actions$
    .pipe(
      ofType(userActions.LOGIN),
      concatMap((action: any) => this.authService.login(action.payload)),
      // concatMap((auth: AuthResponse) => this.authService.getFullUserInfo(auth.token)), 
      map((res: AuthResponse) => new userActions.LoginSuccessfull(res)),
      catchError(err => of(new userActions.LoginFailed(err)))
    );

  @Effect({dispatch: false}) 
  loginSuccess$ = this.actions$
  .pipe(
    ofType(userActions.LOGIN_SUCCESS),
    concatMap((action: any) => this.authService.getFullUserInfo(action.payload.token)), 
    map((res: LoginUser) => new userActions.GetUserInfo(res)),
    // GET_USER_INFO_SUCCESS
    tap(() => this.router.navigateByUrl('/courses'))
  );

  @Effect({dispatch: false}) 
  loginFailed$ = this.actions$
  .pipe(
    ofType(userActions.LOGIN_FAILED),
    tap(() => alert('Not right credentials. Please, try again'))
  );

}