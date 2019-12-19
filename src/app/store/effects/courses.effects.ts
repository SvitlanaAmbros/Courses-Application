import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from "rxjs";

import * as coursesActions from '@store/actions/courses.actions';
import { AppState } from '@store/reducers/app.reducers';
import { selectCoursesLength, selectSearchFragment } from '@store/selectors/courses.selector';
import { CoursesService } from '@courses/services/courses.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private coursesService: CoursesService) {
  }

  @Effect()
  loadCourses$ = this.actions$
    .pipe(
      ofType(coursesActions.LOAD_COURSES),
      switchMap((action: any) => {
        return this.coursesService.getCourses(action.payload.startInd, action.payload.endInd, action.payload.searchFragment)
          .pipe(
            map((res) => {
              return new coursesActions.LoadCoursesSuccessful(res);
            }),
            catchError(err => {
              return of();
            })
          );
      })
    );

  @Effect()
  changeSearchParams$ = this.actions$
    .pipe(
      ofType(coursesActions.CHANGE_SEARCH_PARAMS),
      switchMap((action: any) => {
        return of(new coursesActions.LoadCourses(action.payload))
      })
    );

  @Effect()
  deleteCourse$ = this.actions$
    .pipe(
      ofType(coursesActions.DELETE_COURSE),
      switchMap((action: any) => {
        return this.coursesService.deleteCourse(action.payload.deleteId)
          .pipe(
            map((res) => {
              return new coursesActions.LoadCourses(action.payload);
            })
          );
      })
    );

  @Effect()
  getCourseById$ = this.actions$
    .pipe(
      ofType(coursesActions.GET_COURSE_BY_ID),
      switchMap((action: any) => {
        return this.coursesService.getCourseById(action.payload)
          .pipe(
            map((res) => {
              return new coursesActions.GetCourseByIdSuccess(res)
            })
          );
      })
    );

  @Effect()
  createCourse$ = this.actions$
    .pipe(
      ofType(coursesActions.CREATE_COURSE),
      withLatestFrom(this.store.pipe(select(selectCoursesLength))),
      switchMap(([action, length]) => {
        return this.coursesService.createCourse((action as any).payload)
          .pipe(
            map((res) => {
              return new coursesActions.ChangedCourseSuccessful(length);
            })
          );
      })
    );

  @Effect()
  updateCourse$ = this.actions$
    .pipe(
      ofType(coursesActions.UPDATE_COURSE),
      withLatestFrom(this.store.pipe(select(selectCoursesLength))),
      switchMap(([action, length]) => {
        return this.coursesService.updateCourse((action as any).payload)
          .pipe(
            map((res) => {
              return new coursesActions.ChangedCourseSuccessful(length);
            }),
            catchError(err => {
              return of();
            })
          );
      })
    );

  @Effect()
  changedCourseSuccessful$ = this.actions$
    .pipe(
      ofType(coursesActions.CHANGED_COURSE_SUCCESSFUL),
      withLatestFrom(this.store.pipe(select(selectSearchFragment))),
      switchMap(([action, searchFragment]) => {
        return of(new coursesActions.LoadCourses({ startInd: 0, endInd: (action as any).payload, searchFragment: searchFragment }));
      })
    );
}
