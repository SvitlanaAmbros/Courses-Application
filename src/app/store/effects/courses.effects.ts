import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as userActions from "@store/actions/user.actions";
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectUser} from "@store/selectors/user.selector";
import {AuthResponse, LoginUser} from "@app/models/user.model";
import {of} from "rxjs";
import {CoursesService} from '@courses/services/courses.service';
import * as coursesActions from '@store/actions/courses.actions';
import {AppState} from '@store/reducers/app.reducers';
import {coursesState} from '@store/selectors/courses.selector';
import {Course} from '@courses/models/course.model';
import {CourseDB} from "@courses/models/course-db.model";
import {CourseInfo} from "@courses/models/course-info.model";

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
      withLatestFrom(this.store.pipe(select(coursesState))),
      switchMap(([action, state]) => {
        console.log('Searched value', state.startInd, state.endInd, state.searchFragment);
        return this.coursesService.getCourses(state.startInd, state.endInd, state.searchFragment)
          .pipe(
            map((res) => {
              // console.log('success', res.map((courseDb: CourseDB) => new CourseInfo(courseDb)));
              return new coursesActions.LoadCoursesSuccessful(res);
            }),
            // catchError(err => {
            //   console.log('error', err);
            //   return of();
            // })
          );
      }));

  @Effect()
  changeSearchParams$ = this.actions$
    .pipe(
      ofType(coursesActions.CHANGE_SEARCH_PARAMS),
      switchMap(() =>  of(new coursesActions.SearchParamsUpdated())));

  @Effect()
  searchParamsUpdated$ = this.actions$
    .pipe(
      ofType(coursesActions.SEARCH_PARAMS_UPDATED),
      switchMap(() =>  of(new coursesActions.LoadCourses())));
  // @Effect()
  // login$ = this.actions$
  //   .pipe(
  //     ofType(userActions.LOGIN),
  //     withLatestFrom(this.store.pipe(select(selectUser))),
  //     switchMap(([action, user]) => {
  //       return this.authService.login(user)
  //         .pipe(
  //           map((res: AuthResponse) => {
  //             user.token = res.token;
  //             this.localStorageService.setUserToStorage(user);
  //
  //             return new userActions.LoginSuccessful(user);
  //           }),
  //           catchError(err => of(new userActions.RequestFailed(err)))
  //         );
  //     }),
  //   );

}
