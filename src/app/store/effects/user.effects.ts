import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { LocalStorageService } from '@shared/services/local-storage.service';
import * as userActions from '@store/actions/user.actions';
import { selectUser } from '@store/selectors/user.selector';
import { AppState } from '@store/reducers/app.reducers';
import { AuthResponse, LoginUser } from '@app/models/user.model';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType(userActions.LOGIN),
      withLatestFrom(this.store.pipe(select(selectUser))),
      switchMap(([action, user]) => {
        return this.authService.login(user)
          .pipe(
            map((res: AuthResponse) => {
              user.token = res.token;
              this.localStorageService.setUserToStorage(user);

              return new userActions.LoginSuccessful(user);
            }),
            catchError(err => of(new userActions.RequestFailed(err)))
          );
      }),
    );

  @Effect()
  loginSuccess$ = this.actions$
    .pipe(
      ofType(userActions.LOGIN_SUCCESS),
      tap(() =>  {
        this.router.navigateByUrl('/courses')
      }),
      withLatestFrom(this.store.pipe(select(selectUser))),
      switchMap(([action, user]) => {
        return of(new userActions.GetUserInfo());
      })
    );

  @Effect({dispatch: false})
  requestFailed$ = this.actions$
    .pipe(
      ofType(userActions.REQUEST_FAILED),
      tap(() => alert('Something went wrong! Please, try again'))
    );

  @Effect({dispatch: false})
  logoff$ = this.actions$
    .pipe(
      ofType(userActions.LOGOFF),
      tap(() => {
        this.localStorageService.deleteUserFromStorage();
      })
    );

  @Effect()
  getUserInfo$ = this.actions$
    .pipe(
      ofType(userActions.GET_USER_INFO),
      withLatestFrom(this.store.pipe(select(selectUser))),
      switchMap(([action, user]) => {
        const token = !user.token ? this.localStorageService.getUserFromStorage().token : user.token;

        return this.authService.getFullUserInfo(token)
          .pipe(
            map((res: LoginUser) => new userActions.GetUserSuccessful(res)),
            catchError(err => of(new userActions.RequestFailed(err)))
          );
      })
    );
}
