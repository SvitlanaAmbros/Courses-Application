import { Action } from '@ngrx/store';
import { LoginUser } from '@app/models/user.model';

// export enum ActionTypes {
export const LOGIN = '[Login] set user to store';
export const LOGOFF = '[Logoff] clear user from store';
// }

class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: LoginUser) { }
}

class Logoff implements Action {
    readonly type = LOGOFF;
    // constructor() { }
}

export type UserAction = Login | Logoff;