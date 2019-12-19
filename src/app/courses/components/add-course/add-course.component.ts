import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '@shared/services/loading.service';
import { Course } from '@courses/models/course.model';
import {CoursesService} from "@courses/services/courses.service";
import {CourseInfo} from "@courses/models/course-info.model";
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/store/reducers/app.reducers';
import { selectCurrentCourse } from '@app/store/selectors/courses.selector';
import * as coursesActions from '@store/actions/courses.actions';

export type FORM_TYPE = 'edit' | 'add';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public pageType: FORM_TYPE;
  public course: Course;
  // public course$: Observable<Course>;

  constructor(private router: Router, 
    private  activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private store: Store<AppState>) { }

  ngOnInit() {
    // const newCourse: Course = new CourseInfo();
    const courseId = this.activatedRoute.snapshot.params.id;

    this.store.pipe(select(selectCurrentCourse)).subscribe(res => this.course = res);
    if (courseId) {
      this.pageType = 'edit';
      this.store.dispatch(new coursesActions.GetCourseById(courseId));
    } else {
      this.pageType = 'add';
      this.store.dispatch(new coursesActions.ClearCurrentCourse());
    }
  }

  public saveCourse(): void {
    if (this.pageType === 'add') {
      this.store.dispatch(new coursesActions.CreateCourse(this.course));
      } else {
        this.store.dispatch(new coursesActions.UpdateCourse(this.course));
      }
      this.navigateToBaseCoursesPage();
  }

  public cancel(): void {
    this.navigateToBaseCoursesPage();
  }

  public navigateToBaseCoursesPage(): void {
    this.router.navigateByUrl('courses');
  }

  public dateChanged(value): void {
    this.course.creationDate = new Date(value);
  }
}
