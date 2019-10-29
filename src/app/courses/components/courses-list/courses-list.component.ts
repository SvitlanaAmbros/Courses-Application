import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
  AfterContentChecked,
  AfterViewChecked
} from '@angular/core';

import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';

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

    // testing ngOnChanges in child component
    this.courses = this.allCourses
      .filter((item: Course) => item.title.includes(this.search))
      .map((item: Course) => { return {...item }});
  }

  public loadMore(): void {
    console.log('Load more');
  }

  public editCourse(id: string): void {
    console.log('edit, id in parent component = ', id);
  }

  public deleteCourse(id: string): void {
    console.log('delete, id in parent component = ', id);
  }
}
