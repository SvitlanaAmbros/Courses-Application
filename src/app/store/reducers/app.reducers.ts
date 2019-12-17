import { ActionReducerMap } from '@ngrx/store';
import { LoginPageState } from '@store/state/user.state';
import { reducer } from '@store/reducers/user.reducer';

export interface AppState {
    login: LoginPageState
}

export const AppReducers: ActionReducerMap<AppState, any> = {
    login: reducer
}