import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';
import { PopupService, PopupControls } from '@shared/services/popup.service';
import { CoursesService } from '@courses/services/courses.service';
import { Course } from '@courses/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
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
    this.loadCoursesFromServer(this.startLoadingFromIndex, this.countLoadingCourses);
  }

  // courses list with sort logic
  public searchCourses(): void {
    this.courses = [];
    this.loadCoursesFromServer(0, 2, this.search);
  }

  public loadMore(): void {
    this.loadCoursesFromServer(this.startLoadingFromIndex, this.countLoadingCourses, this.search);
  }

  public loadCoursesFromServer(startInd: number, count: number, textFragment: string = ''): void {
    this.coursesService.getCourses(startInd, count, textFragment)
    .subscribe(res => {
      this.courses = this.courses.concat(res);
      this.startLoadingFromIndex = this.courses.length;
      });
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
    this.coursesService.deleteCourse(this.deletedItemId).subscribe(res => {
      const ind = this.courses.length;
      this.courses = [];
      this.loadCoursesFromServer(0, ind, this.search);
    });

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
