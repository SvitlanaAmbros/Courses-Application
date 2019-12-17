import { LoginPageState } from '@store/state/user.state';
import { createSelector } from '@ngrx/store';
import { LoginUser } from '@app/models/user.model';
import { AppState } from '../reducers/app.reducers';

export const login = (state: AppState) => state.login;

export const selectUser = createSelector(
    login,
    (state: LoginPageState) => state.user
);
  