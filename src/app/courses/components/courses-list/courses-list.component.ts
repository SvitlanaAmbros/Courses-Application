import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CoursesService } from '@courses/services/courses.service';
import { Course } from '@courses/models/course.model';
import { COURSES } from '@courses/mock/courses.mock';
import {COURSES_MORE} from '@courses/mock/courses.test-mock';
import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  public courses: Course[] = [];
  public allCourses: Course[];
  public search = '';

  constructor(private sortByDatePipe: SortByDatePipe, 
    private coursesService: CoursesService) { }

  public testDate = 'blue';
  ngOnInit() {
    this.courses = this.sortByDatePipe.transform(this.coursesService.getCourses());
    this.allCourses = this.coursesService.getCourses();
  }

  public searchCourses(): void {
    console.log('Search value = ', this.search);

    this.courses = this.sortByDatePipe
      .transform(this.allCourses
      .filter((item: Course) => item.title.toLowerCase().includes(this.search)));
  }

  public loadMore(): void {
    console.log('Load more');
    this.courses = this.sortByDatePipe.transform(COURSES_MORE);
  }

  public editCourse(id: string): void {
    console.log('edit, id in parent component = ', id);
  }

  public deleteCourse(id: string): void {
    console.log('delete, id in parent component = ', id);
  }
}
