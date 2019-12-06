import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Course } from '@courses/models/course.model';
import {CoursesService} from "@courses/services/courses.service";
import {CourseInfo} from "@courses/models/course-info.model";

export type FORM_TYPE = 'edit' | 'add';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public pageType: FORM_TYPE;
  public course: Course;

  constructor(private router: Router, private  activatedRoute: ActivatedRoute,
    private courseService: CoursesService) { }

  ngOnInit() {
    const newCourse: Course = new CourseInfo();
    const courseId = this.activatedRoute.snapshot.params.id;

    if (courseId) {
      this.pageType = 'edit';
      this.course = this.courseService.getCourseById(courseId) || newCourse;
    } else {
      this.pageType = 'add';
      this.course = newCourse;
    }
  }

  public saveCourse(): void {
    // this.pageType === 'edit' ?
    //   this.courseService.updateCourse(this.course) :
    this.courseService.createCourse(this.course).subscribe(res => console.log('Create', res))
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
