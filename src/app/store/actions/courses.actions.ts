import {Action} from '@ngrx/store';
import {SearchCourseModel} from '@store/model/search-course.model';
import {Course} from "@courses/models/course.model";

export const CHANGE_SEARCH_PARAMS = '[Change search params] update search value in store';
export const SEARCH_PARAMS_UPDATED = '[Search params updated]updated params';
export const LOAD_COURSES = '[Load courses] load courses from server';
export const LOAD_COURSES_SUCCESSFUL = '[Load courses successful] load courses from server successful';

export class ChangeSearchParams implements Action {
  readonly type = CHANGE_SEARCH_PARAMS;
  constructor(public payload: SearchCourseModel) { }
}

export class SearchParamsUpdated implements Action {
  readonly type = SEARCH_PARAMS_UPDATED;
}

export class LoadCourses implements Action {
  readonly type = LOAD_COURSES;
}

export class LoadCoursesSuccessful implements Action {
  readonly type = LOAD_COURSES_SUCCESSFUL;
  constructor(public payload: Course[]) { }
}

export type CoursesAction = ChangeSearchParams
  | SearchParamsUpdated
  | LoadCourses
  | LoadCoursesSuccessful;
