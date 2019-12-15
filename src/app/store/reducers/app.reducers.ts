import { ActionReducerMap } from '@ngrx/store';
import { State } from '@store/state/user.state';
import { reducer } from '@store/reducers/user.reducer';

export interface AppState {
    user: State
}

export const AppReducers: ActionReducerMap<AppState, any> = {
    user: reducer
}