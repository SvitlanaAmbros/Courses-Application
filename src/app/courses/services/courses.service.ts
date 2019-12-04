import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';

export const COURSES_URL = 'courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseList: Course[] = COURSES;
  constructor(private http: HttpClient) {}

  public getCourses(startFrom: number, count: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${COURSES_URL}?start=${startFrom}&count=${count}`);
    // return this.courseList;
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
