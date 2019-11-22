import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '@courses/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public course: Course = {
    title: 'Title',
    creationDate: new Date(),
    duration: 70,
    description: 'description',
    authors: ['Author 1', 'Author 2']
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public saveCourse(): void {
    console.log('Save Course', this.course);
  }

  public cancel(): void {
    console.log('Cancel');
    this.router.navigateByUrl('courses');
  }
}
