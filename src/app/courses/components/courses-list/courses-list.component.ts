import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';
import {COURSES_MORE} from '@courses/mock/courses.test-mock';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  public courses: Course[] = [];
  public allCourses: Course[] = COURSES;
  public search = '';

  constructor() { }

  ngOnInit() {
    this.courses = COURSES;
  }

  public searchCourses(): void {
    console.log('Search value = ', this.search);

    this.courses = this.allCourses
      .filter((item: Course) => item.title.includes(this.search));
  }

  public loadMore(): void {
    console.log('Load more');
    this.courses = COURSES_MORE;
  }

  public editCourse(id: string): void {
    console.log('edit, id in parent component = ', id);
  }

  public deleteCourse(id: string): void {
    console.log('delete, id in parent component = ', id);
  }
}
