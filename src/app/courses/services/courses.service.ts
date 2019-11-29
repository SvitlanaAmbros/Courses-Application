import { Injectable } from '@angular/core';

import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseList: Course[] = COURSES;
  constructor() {}

  public getCourses(): Course[] {
    return this.courseList;
  }

  public createCourse(course: Course): void {
    const sortedArray = this.courseList.sort((a:Course, b: Course) => +a.id - +b.id);
    course.id = (+sortedArray[sortedArray.length - 1].id + 1).toString();
    
    this.courseList.push(course);
  }

  public getCourseById(id: string): Course {
    return this.courseList.find((item: Course) => item.id === id);
  }

  public updateCourse(course: Course): void {
    let updatedElement = this.courseList.find((item: Course) => item.id === course.id);
    updatedElement = course;
  }

  public deleteCourse(id: string): void{
    this.courseList = this.courseList.filter((item: Course) => item.id !== id);
  }
}
