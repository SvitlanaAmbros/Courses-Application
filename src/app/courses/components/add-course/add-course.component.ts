import {Component, forwardRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import {AppState} from '@store/reducers/app.reducers';
import * as coursesActions from '@store/actions/courses.actions';
import {selectCurrentCourse} from '@store/selectors/courses.selector';
import {Course} from '@courses/models/course.model';

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
  
public addCourseForm: FormGroup;

  constructor(private router: Router,
              private  activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private fb: FormBuilder,
              private translate: TranslateService) {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: [10, [Validators.required, this.shouldMoreThanZero]],
      date: ['', [Validators.required]],
      authors: [[], [Validators.required, this.hasAtLeastOneElement]]
    });
  }

  ngOnInit() {
    this.initTranslateConfig();
    this.translate.onLangChange.subscribe((e) => this.initTranslateConfig());

    const courseId = this.activatedRoute.snapshot.params.id;
    this.store.pipe(select(selectCurrentCourse)).subscribe(res => {
      this.course = res;
      this.updateFormControlValue('title', this.course.title);
      this.updateFormControlValue('description', this.course.description);
      this.updateFormControlValue('duration', this.course.duration);
      this.updateFormControlValue('date', this.course.creationDate);
      this.updateFormControlValue('authors', this.course.authors);
    });

    if (courseId) {
      this.pageType = 'edit';
      this.store.dispatch(new coursesActions.GetCourseById(courseId));
    } else {
      this.pageType = 'add';
      this.store.dispatch(new coursesActions.ClearCurrentCourse());
    }
  }

  public saveCourse(): void {
    this.course.title = this.addCourseForm.get('title').value;
    this.course.description = this.addCourseForm.get('description').value;
    this.course.duration = this.addCourseForm.get('duration').value;
    this.course.creationDate = this.addCourseForm.get('date').value;
    this.course.authors = this.addCourseForm.get('authors').value;

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

  public isFormInvalid(form: FormGroup, field): boolean {
    return form.controls[field].invalid && form.controls[field].touched;
  }

  public hasAtLeastOneElement(control: AbstractControl ) {
    if (!!control.value && control.value.length === 0) {
      return { invalidSize: true };
    }

    return null;
  }

  public shouldMoreThanZero(control: AbstractControl ) {
    if (!control.value || control.value === 0) {  
      return { invalidFormat: true };
    }

    return null;
  }

  public updateFormControlValue(control: string, value: any):void {
    this.addCourseForm.controls[control].setValue(value);
  }
}
