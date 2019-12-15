import { Action } from '@ngrx/store';
import { LoginUser, AuthResponse } from '@app/models/user.model';

export const LOGIN = '[Login] set user to store';
export const LOGOFF = '[Logoff] clear user from store';
export const LOGIN_SUCCESS = '[Login sucess] call server';
export const LOGIN_FAILED = '[Login failed] show failed message';
export const SET_USER_INFO = '[Set user info] call server';
export const GET_USER_INFO = '[Get user info] call server';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: LoginUser) { }
}

export class Logoff implements Action {
    readonly type = LOGOFF;
}

export class LoginSuccessfull implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: AuthResponse) { }
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public payload: string) { }
}

export class SetUserInfo implements Action {
    readonly type = SET_USER_INFO;
    constructor(public payload: LoginUser) { }
}

export type UserAction = Login | Logoff | LoginSuccessfull | LoginFailed | SetUserInfo;