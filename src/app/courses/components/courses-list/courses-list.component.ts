import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CoursesService } from '@courses/services/courses.service';
import { Course } from '@courses/models/course.model';

import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';
import { PopupService, PopupControls } from '@shared/services/popup.service';
import {COURSES_MORE} from '@courses/mock/courses.test-mock';

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

  public popupControls: PopupControls;
  public deletedItemId: string;

  constructor(private sortByDatePipe: SortByDatePipe,
              private coursesService: CoursesService,
              private popupService: PopupService) { }

  public testDate = 'blue';

  ngOnInit() {
    this.initPopup();

    this.allCourses = this.coursesService.getCourses();
    this.courses = this.sortByDatePipe.transform(this.coursesService.getCourses());
  }

  private initPopup(): void {
    this.popupControls = this.popupService.create();
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

  public deleteClicked(id: string): void {
    this.deletedItemId = id;
    this.openPopup();
  }

  public deleteCourse(): void {
    this.coursesService.deleteCourse(this.deletedItemId);
    this.allCourses = this.coursesService.getCourses();
    this.courses = this.coursesService.getCourses();
    this.closePopup();
  }

  public openPopup(): void {
    this.popupControls.open();
  }

  public closePopup(): void {
    this.popupControls.close();
  }
}
