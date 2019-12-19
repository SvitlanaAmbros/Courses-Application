import {Action} from '@ngrx/store';
import {SearchCourseModel} from '@store/model/search-course.model';
import {Course} from "@courses/models/course.model";

export const CHANGE_SEARCH_PARAMS = '[Change search params] update search value in store';
export const SEARCH_PARAMS_UPDATED = '[Search params updated]updated params';
export const LOAD_COURSES = '[Load courses] load courses from server';
export const LOAD_COURSES_SUCCESSFUL = '[Load courses successful] load courses from server successful';
export const CLEAR_COURSES = '[Clear courses] clear courses from storage';
export const DELETE_COURSE = '[Delete course] delete course from storage';
export const CLEAR_CURRENT_COURSE = '[Clear current courses] clear curent courses from storage';
export const SET_CURRENT_COURSE_ID = '[Set current course id] set id';

export const GET_COURSE_DETAIL = '[Get current course] get course';
export const GET_COURSE_BY_ID = '[Get course] get course by id';
export const GET_COURSE_BY_ID_SUCCESS = '[Get course by id success] sucess';

export const CREATE_COURSE = '[Create course] create new course';
export const UPDATE_COURSE = '[Update course] create new course';
export const CHANGED_COURSE_SUCCESSFUL = '[Changed course] changed course successfull';

export class ChangeSearchParams implements Action {
  readonly type = CHANGE_SEARCH_PARAMS;
  constructor(public payload: SearchCourseModel) { }
}

export class SearchParamsUpdated implements Action {
  readonly type = SEARCH_PARAMS_UPDATED;
}

export class LoadCourses implements Action {
  readonly type = LOAD_COURSES;
  constructor(public payload: SearchCourseModel) { }
}

export class LoadCoursesSuccessful implements Action {
  readonly type = LOAD_COURSES_SUCCESSFUL;
  constructor(public payload: Course[]) { }
}

export class ClearCourses implements Action {
  readonly type = CLEAR_COURSES;
}

export class ClearCurrentCourse implements Action {
  readonly type = CLEAR_CURRENT_COURSE;
}

export class SetCurrentCourseId implements Action {
  readonly type = SET_CURRENT_COURSE_ID;
  constructor(public payload: number) { }
}

export class DeleteCourse implements Action {
  readonly type = DELETE_COURSE;
  constructor(public payload: SearchCourseModel) { }
}

export class GetCourseById implements Action {
  readonly type = GET_COURSE_BY_ID;
  constructor(public payload: string) { }
}

export class GetCourseByIdSuccess implements Action {
  readonly type = GET_COURSE_BY_ID_SUCCESS;
  constructor(public payload: Course) { }
}

export class CreateCourse implements Action {
  readonly type = CREATE_COURSE;
  constructor(public payload: Course) { }
}

export class UpdateCourse implements Action {
  readonly type = UPDATE_COURSE;
  constructor(public payload: Course) { }
}

export class ChangedCourseSuccessful implements Action {
  readonly type = CHANGED_COURSE_SUCCESSFUL;
  constructor(public payload: number) { }
}

export type CoursesAction = ChangeSearchParams
  | SearchParamsUpdated
  | LoadCourses
  | LoadCoursesSuccessful
  | ClearCourses
  | DeleteCourse
  | GetCourseById
  | GetCourseByIdSuccess
  | CreateCourse
  | ClearCurrentCourse
  | UpdateCourse
  | ChangedCourseSuccessful
  | SetCurrentCourseId;
