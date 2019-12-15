import { Action } from '@ngrx/store';
import { LoginUser, AuthResponse } from '@app/models/user.model';

export const LOGIN = '[Login] set user to store';
export const LOGOFF = '[Logoff] clear user from store';
export const LOGIN_SUCCESS = '[Login sucess] call server';
export const LOGIN_FAILED = '[Login failed] show failed message';
export const GET_USER_INFO = '[Login sucess] call server';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: LoginUser) { }
}

export class Logoff implements Action {
    readonly type = LOGOFF;
    // constructor() { }
}

export class LoginSuccessfull implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: AuthResponse) { }
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public payload: string) { }
}

export class GetUserInfo implements Action {
    readonly type = GET_USER_INFO;
    constructor(public payload: LoginUser) { }
}

export type UserAction = Login | Logoff | LoginSuccessfull | LoginFailed | GetUserInfo;