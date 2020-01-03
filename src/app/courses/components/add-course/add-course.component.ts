import {Component, forwardRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store, select} from '@ngrx/store';

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

  public addCourseForm: FormGroup;

  constructor(private router: Router,
              private  activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private fb: FormBuilder) {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      date: ['', Validators.required, Validators.pattern],
      authors: ['', Validators.required]
    });
  }

  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.params.id;
    this.store.pipe(select(selectCurrentCourse)).subscribe(res => {
      this.course = res;
      // this.addCourseForm = this.fb.group({
      //   title: [this.course.title, [Validators.required, Validators.maxLength(2)]],
      //   description: [this.course.description, [Validators.required, Validators.maxLength(500)]],
      //   duration: [this.course.duration, Validators.required],
      // });
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
    console.log(this.addCourseForm.value)
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

  public isFormInvalid(form: FormGroup, field): boolean {
    return form.controls[field].invalid && form.controls[field].touched;
  }
}

// export function ValidateContainingNumbers(control: AbstractControl) {
//   // console.log('Matching', control.value);
//   new RegExp('^[0-9]*$').test(control.value)
//   if (!!control.value && !control.value.match('^[0-9]*$')) {
//     // !Validators.pattern()
//     return { notOnlyNumbers: true };
//   }
//   return null;
// }
