import {Action} from '@ngrx/store';
import {LoginUser, AuthResponse} from '@app/models/user.model';

export const LOGIN = '[Login] set user to store';
export const LOGOFF = '[Logoff] clear user from store';
export const LOGIN_SUCCESS = '[Login sucess] call server';
export const REQUEST_FAILED = '[Login failed] show failed message';
export const LOAD_USER_INFO = '[Set user info] call server';
export const GET_USER_INFO = '[Get user info] call server';
export const GET_USER_SUCCESSFUL = '[User info] loaded';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginUser) {
  }
}

export class Logoff implements Action {
  readonly type = LOGOFF;
}

export class LoginSuccessful implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: LoginUser) {
  }
}

export class RequestFailed implements Action {
  readonly type = REQUEST_FAILED;

  constructor(public payload: string) {
  }
}

// export class LoadUserInfo implements Action {
//     readonly type = LOAD_USER_INFO;
//     constructor(public payload: string) { }
// }

export class GetUserInfo implements Action {
  readonly type = GET_USER_INFO;
//   constructor(public payload: string) { }
}

export class GetUserSuccessful implements Action {
  readonly type = GET_USER_SUCCESSFUL;

  constructor(public payload: LoginUser) {
  }
}

export type UserAction = Login
  | Logoff
  | LoginSuccessful
  | RequestFailed
  | GetUserInfo
  | GetUserSuccessful;
