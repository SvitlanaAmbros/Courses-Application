import {Course} from '@courses/models/course.model';
import { Author } from '@courses/models/author.model';

export interface CoursesState {
  courses: Course[];
  currentCourse: Course;
  searchFragment: string;
  currentCourseId: number;
  authorsList: Author[]
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
  currentCourseId: 0,
  authorsList: []
};

