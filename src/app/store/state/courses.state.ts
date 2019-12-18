import {Course} from '@courses/models/course.model';

export interface CoursesState {
  startInd: number;
  endInd: number;
  searchFragment: string;
  courses: Course[];
}

export const initialState: CoursesState = {
  startInd: 0,
  endInd: 2,
  searchFragment: '',
  courses: []
};
