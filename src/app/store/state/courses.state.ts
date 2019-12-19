import {Course} from '@courses/models/course.model';

export interface CoursesState {
  // startInd: number;
  // endInd: number;
  // searchFragment: string;
  courses: Course[];
  currentCourse: Course;
  searchFragment: string;
}

export const initialState: CoursesState = {
  // startInd: 0,
  // endInd: 2,
  // searchFragment: '',
  courses: [],
  currentCourse: {
    title: '',
    creationDate: new Date(),
    description: '',
    duration: 0
  },
  searchFragment: ''
};

// entity
