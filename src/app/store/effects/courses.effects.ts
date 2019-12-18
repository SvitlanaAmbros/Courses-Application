import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from "@store/actions/user.actions";
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectUser } from "@store/selectors/user.selector";
import { AuthResponse, LoginUser } from "@app/models/user.model";
import { of } from "rxjs";
import { CoursesService } from '@courses/services/courses.service';
import * as coursesActions from '@store/actions/courses.actions';
import { AppState } from '@store/reducers/app.reducers';
import { coursesState, selectCoursesLength } from '@store/selectors/courses.selector';
import { Course } from '@courses/models/course.model';
import { CourseDB } from "@courses/models/course-db.model";
import { CourseInfo } from "@courses/models/course-info.model";

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
      }));

  @Effect()
  changeSearchParams$ = this.actions$
    .pipe(
      ofType(coursesActions.CHANGE_SEARCH_PARAMS),
      switchMap((action: any) => {
        return of(new coursesActions.LoadCourses(action.payload))
      }));

  @Effect()
  deleteCourse$ = this.actions$
    .pipe(
      ofType(coursesActions.DELETE_COURSE),
      // withLatestFrom(this.store.pipe(select(coursesState))),
      switchMap((action: any) => {
        console.log('delete course', action.payload.deleteId);
        return this.coursesService.deleteCourse(action.payload.deleteId)
          .pipe(
            map((res) => {
              console.log('success', res);
              return new coursesActions.LoadCourses(action.payload);
            }),
            // catchError(err => {
            //   console.log('error', err);
            //   return of();
            // })
          );
      }));

      @Effect()
      getCourseById$ = this.actions$
      .pipe(
      ofType(coursesActions.GET_COURSE_BY_ID),
      switchMap((action: any) => {
      return this.coursesService.getCourseById(action.payload)
      .pipe(
      map((res) => {
        return new coursesActions.GetCourseByIdSuccess(res)
      }),
      // catchError(err => {
      //   return of();
      // })
      );
      }));
      @Effect()
      createCourse$ = this.actions$
      .pipe(
      ofType(coursesActions.CREATE_COURSE),
      withLatestFrom(this.store.pipe(select(selectCoursesLength))),
      switchMap(([action, length]) => {
      return this.coursesService.createCourse((action as any).payload)
        .pipe(
          map((res) => {
            console.log('Sucess create');
            return new coursesActions.ChangedCourseSuccessful(length);
          }),
          catchError(err => {
            return of();
          })
        );
      }));

      @Effect()
      updateCourse$ = this.actions$
      .pipe(
      ofType(coursesActions.UPDATE_COURSE),
      withLatestFrom(this.store.pipe(select(selectCoursesLength))),
      switchMap(([action, length]) => {
        console.log('Length', length);
      return this.coursesService.updateCourse((action as any).payload)
        .pipe(
          map((res) => {
            console.log('Sucess update');
            return new coursesActions.ChangedCourseSuccessful(length);
            // return new coursesActions.LoadCourses({startInd: 0, endInd: length, searchFragment: ''});
          }),
          catchError(err => {
            return of();
          })
        );
      }));

      @Effect()
      changedCourseSuccessful$ = this.actions$
        .pipe(
          ofType(coursesActions.CHANGED_COURSE_SUCCESSFUL),
          switchMap((action: any) => {
            return of(new coursesActions.LoadCourses({startInd: 0, endInd: action.payload, searchFragment: ''}));
          }));
}
