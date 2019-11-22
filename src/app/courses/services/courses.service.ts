import { Injectable } from '@angular/core';

import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';

@Injectable()
export class CoursesService {
  private courseList: Course[] = COURSES;
  constructor() { }

  public getCourses(): Course[] {
    return this.courseList;
  }

  public createCourse(course: Course): void {
    this.courseList.push(course);
  }

  public getCourseById(id: string): Course {
    return this.courseList.filter((course: Course) => course.id === id)[0];
  }

  public updateCourse(course: Course): void {
    let updatedElement = this.courseList.find((item: Course) => item.id === course.id);
    updatedElement = course;
  }

  public deleteCourse(id: string): Course[] {
    this.courseList = this.courseList.filter((item: Course) => item.id !== id);

    return this.courseList;
  }
}
