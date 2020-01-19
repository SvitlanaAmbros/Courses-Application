import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from '@store/reducers/app.reducers';
import * as coursesActions from '@store/actions/courses.actions';
import { selectCurrentCourse } from '@store/selectors/courses.selector';
import { Course } from '@courses/models/course.model';

export type FORM_TYPE = 'edit' | 'add';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public pageType: FORM_TYPE;
  public course: Course;

  public saveAction;
  public cancelAction;

  constructor(private router: Router, 
    private  activatedRoute: ActivatedRoute,
    private store: Store<AppState>, 
    private translate: TranslateService) { }

  ngOnInit() {
    this.initTranslateConfig();
    this.translate.onLangChange.subscribe((e) => this.initTranslateConfig());

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

  public initTranslateConfig(): void {
    this.saveAction = this.translate.instant('POPUP.SAVE');
    this.cancelAction = this.translate.instant('POPUP.CANCEL');
    this.cancelAction = this.translate.instant('POPUP.CANCEL');
  }
}
