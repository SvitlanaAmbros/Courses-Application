import { State } from '@store/state/user.state';
import { createSelector } from '@ngrx/store';
import { LoginUser } from '@app/models/user.model';
import { AppState } from '../reducers/app.reducers';

export const user = (state: AppState) => state.user;

export const selectUser = createSelector(
    user,
    (state: State) => state.user
);
  