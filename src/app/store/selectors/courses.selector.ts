import {createSelector} from '@ngrx/store';
import {AppState} from '@store/reducers/app.reducers';
import {CoursesState} from '@store/state/courses.state';

export const coursesState = (state: AppState) => state.courses;

export const selectCourses = createSelector(
  coursesState,
  (state: CoursesState) => state.courses
);

export const selectCoursesLength = createSelector(
  coursesState,
  (state: CoursesState) => state.courses.length
);

export const selectCurrentCourse = createSelector(
  coursesState,
  (state: CoursesState) => state.currentCourse
);

