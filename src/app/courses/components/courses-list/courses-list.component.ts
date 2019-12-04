import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';
import { PopupService, PopupControls } from '@shared/services/popup.service';
import { CoursesService } from '@courses/services/courses.service';
import { Course } from '@courses/models/course.model';
import { COURSES_MORE } from '@courses/mock/courses.test-mock';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  public courses: Course[] = [];
  public allCourses: Course[];
  public search = '';

  public startLoadingFromIndex = 0;
  public countLoadingCourses = 2;

  public popupControls: PopupControls;
  public deletedItemId: string;

  constructor(private sortByDatePipe: SortByDatePipe,
              private coursesService: CoursesService,
              private popupService: PopupService,
              private router: Router) {
               }

  public testDate = 'blue';

  ngOnInit() {
    this.initPopup();
    this.coursesService.getCourses(this.startLoadingFromIndex, this.countLoadingCourses).subscribe(res => {
      this.courses = res;
      console.log(this.courses);
    });
    // this.allCourses = this.coursesService.getCourses();
    // this.courses = this.sortByDatePipe.transform(this.coursesService.getCourses());
  }

  // courses list with sort logic
  public searchCourses(): void {
    this.courses = this.sortByDatePipe
      .transform(this.allCourses
      .filter((item: Course) => item.title.toLowerCase().includes(this.search)));
  }

  public loadMore(): void {
    this.startLoadingFromIndex = this.startLoadingFromIndex + this.countLoadingCourses;
    this.coursesService.getCourses(this.startLoadingFromIndex, this.countLoadingCourses)
      .subscribe(res => {
        this.courses = this.courses.concat(res);
        console.log(this.courses);
      });
    // this.courses = this.sortByDatePipe.transform(COURSES_MORE);
  }

  public addNewCourse(): void {
    this.router.navigate(['courses', 'new']);
  }

  // courses list with editing logic from child component
  public editCourse(id: string): void {
    this.router.navigate(['courses', id]);
  }

  // courses list with editing logic from child component
  public deleteClicked(id: string): void {
    this.deletedItemId = id;
    this.openPopup();
  }

  // courses list with editing logic from child component
  public deleteCourse(): void {
    this.coursesService.deleteCourse(this.deletedItemId);
    // this.allCourses = this.coursesService.getCourses();
    // this.courses = this.coursesService.getCourses();

    this.closePopup();
  }

  public openPopup(): void {
    this.popupControls.open();
  }

  public closePopup(): void {
    this.popupControls.close();
  }

  private initPopup(): void {
    this.popupControls = this.popupService.create();
  }
}
