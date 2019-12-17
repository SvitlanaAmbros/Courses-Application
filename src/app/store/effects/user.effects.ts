import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, mergeMap, concatMap, mapTo, withLatestFrom, finalize } from 'rxjs/operators';

import * as userActions from '@store/actions/user.actions';
import { AuthService } from '@core/services/auth.service';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthResponse, LoginUser } from '@app/models/user.model';
import { Router } from '@angular/router';
import { LoginPageState } from '@store/state/user.state';
import { selectUser } from '../selectors/user.selector';
import { AppState } from '../reducers/app.reducers';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

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
      let token = !user.token ? this.localStorageService.getUserFromStorage().token : user.token;

      return this.authService.getFullUserInfo(token)
        .pipe(
          map((res: LoginUser) => new userActions.GetUserSuccessful(res)),
          catchError(err => of(new userActions.RequestFailed(err)))
        );
    })
  );
}
