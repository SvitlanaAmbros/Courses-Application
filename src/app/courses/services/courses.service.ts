import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';
import { CourseDB } from '@courses/models/course-db.model';
import { CourseInfo } from '@courses/models/course-info.model';

export const COURSES_URL = 'courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseList: Course[] = COURSES;
  constructor(private http: HttpClient) {}

  public getCourses(startFrom: number, count: number, textFragment?: string): Observable<Course[]> {
    let getCoursesUrl = `${COURSES_URL}?start=${startFrom}&count=${count}`;
    if (!!textFragment && textFragment.trim().length > 0) {
      getCoursesUrl = getCoursesUrl + `&textFragment=${textFragment}`;
    }
    return this.http.get<CourseDB[]>(getCoursesUrl)
      .pipe(
        map((res: CourseDB[]) => {
          return res.map((courseDb: CourseDB) => new CourseInfo(courseDb));
        })
      );
    // return this.courseList;
  }

  // public searchCourseByParam(textFragment: string): Observable<Course[]> {
  //   return this.http.get<CourseDB[]>(`${COURSES_URL}?textFragment=${textFragment}`)
  //     .pipe(
  //       map((res: CourseDB[]) => {
  //         return res.map((courseDb: CourseDB) => new CourseInfo(courseDb));
  //       })
  //     );
  // }

  public createCourse(course: Course): void {
    const sortedArray = this.courseList.sort((a: Course, b: Course) => +a.id - +b.id);
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

  public deleteCourse(id: string): Observable<any>{
    return this.http.delete(`${COURSES_URL}/${id}`);
    // this.courseList = this.courseList.filter((item: Course) => item.id !== id);
  }
}
