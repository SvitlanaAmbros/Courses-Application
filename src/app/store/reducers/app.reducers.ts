import { ActionReducerMap } from '@ngrx/store';
import { LoginPageState } from '@store/state/user.state';
import { CoursesState } from '@store/state/courses.state';
import { reducer } from '@store/reducers/user.reducer';
import { coursesReducer } from '@store/reducers/courses.reducer';

export interface AppState {
    login: LoginPageState;
    courses: CoursesState;
}

export const AppReducers: ActionReducerMap<AppState, any> = {
    login: reducer,
    courses: coursesReducer
}
