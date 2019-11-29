import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Course } from '@courses/models/course.model';
import {CoursesService} from "@courses/services/courses.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public pageType: 'edit' | 'add';
  public course: Course
  constructor(private router: Router, private  activatedRoute: ActivatedRoute, 
    private courseService: CoursesService) { }

  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.params.id;
    if (courseId) {
      this.pageType = 'edit';
      this.course = this.courseService.getCourseById(courseId) || {
        title: '',
        creationDate: new Date(),
        duration: 0,
        description: '',
        authors: []
      };
    } else {
      this.pageType = 'add';
      this.course = {
          title: '',
          creationDate: new Date(),
          duration: 0,
          description: '',
          authors: []
        };
    }
  }

  public saveCourse(): void {
    if (this.pageType === 'edit') {
      this.courseService.updateCourse(this.course);
    } else {
      this.courseService.createCourse(this.course);
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
