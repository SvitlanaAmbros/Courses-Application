import {createSelector} from '@ngrx/store';
import {AppState} from '@store/reducers/app.reducers';
import {CoursesState} from '@store/state/courses.state';
import { Course } from '@app/courses/models/course.model';

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

export const selectCurrentCourseId = createSelector(
  coursesState,
  (state: CoursesState) => state.currentCourseId
);

export const selectSearchFragment = createSelector(
  coursesState,
  (state: CoursesState) => state.searchFragment
);

export const selectCourseById = createSelector(
  selectCourses,
  selectCurrentCourseId,
  (state: Course[], id: number) => state.filter((course: Course) => course.id == id)[0]
);


