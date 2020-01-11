import {Course} from '@courses/models/course.model';

export interface CoursesState {
  courses: Course[];
  currentCourse: Course;
  searchFragment: string;
  currentCourseId: number;
}

export const initialState: CoursesState = {
  courses: [],
  currentCourse: {
    title: '',
    creationDate: new Date(),
    description: '',
    duration: 10,
    authors: []
  },
  searchFragment: '',
  currentCourseId: 0
};

