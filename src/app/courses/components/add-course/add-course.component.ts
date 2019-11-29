import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { Course } from '@courses/models/course.model';
import {CoursesService} from "@courses/services/courses.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public course: Course
  //   = {
  //   title: 'Title',
  //   creationDate: new Date(),
  //   duration: 70,
  //   description: 'description',
  //   authors: ['Author 1', 'Author 2']
  // };
  constructor(private router: Router, private  activatedRoute: ActivatedRoute, private courseService: CoursesService) { }

  ngOnInit() {
    console.log();
    const courseId = this.activatedRoute.snapshot.params.id;
    if (courseId) {
      this.course = this.courseService.getCourseById(courseId);
      console.log(this.course);
    } else {
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
    console.log('Save Course', this.course);
    this.courseService.updateCourse(this.course);
    this.navigateToBaseCoursesPage();
  }

  public cancel(): void {
    console.log('Cancel');
    this.navigateToBaseCoursesPage();
  }

  public navigateToBaseCoursesPage(): void {
    this.router.navigateByUrl('courses');
  }
}
