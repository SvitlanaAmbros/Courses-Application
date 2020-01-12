import {createSelector} from '@ngrx/store';

import {LoginPageState} from '@store/state/user.state';
import {AppState} from '@store/reducers/app.reducers';

export const login = (state: AppState) => state.login;

export const selectUser = createSelector(
  login,
  (state: LoginPageState) => state.user
);

export const selectUserToken = createSelector(
  login,
  (state: LoginPageState) => state.user.token
);
