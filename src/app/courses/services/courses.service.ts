import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Course} from '@courses/models/course.model';
import {CourseDB} from '@courses/models/course-db.model';
import {CourseInfo} from '@courses/models/course-info.model';

export const COURSES_URL = 'courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courseList: Course[] = [];

  constructor(private http: HttpClient) {
  }

  public getCourses(startFrom: number, count: number, textFragment?: string): Observable<Course[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('start', startFrom.toString());
    httpParams = httpParams.append('count', count.toString());

    if (!!textFragment || textFragment.trim().length > 0) {
      httpParams = httpParams.set('textFragment', textFragment);
    }

    return this.http.get<CourseDB[]>(COURSES_URL, {params: httpParams})
      .pipe(
        map((res: CourseDB[]) => {
          return res.map((courseDb: CourseDB) => new CourseInfo(courseDb));
        })
      );
  }

  public createCourse(course: Course): Observable<CourseDB> {
    return this.http.post<CourseDB>(COURSES_URL, course.getDbObj());
  }

  public getCourseById(id: number): Course {
    return this.courseList.find((item: Course) => item.id === id);
  }

  public updateCourse(course: Course): void {
    let updatedElement = this.courseList.find((item: Course) => item.id === course.id);
    updatedElement = course;
  }

  public deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${COURSES_URL}/${id}`);
  }
}
