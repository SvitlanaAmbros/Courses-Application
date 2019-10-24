import {Component, Input, OnInit} from '@angular/core';
import {Course} from "@courses/models/course.model";

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent implements OnInit {
  @Input() item: Course =
    {
      id: '1',
      title: 'Video Course 1. Name tag',
      creationDate: new Date(),
      duration: '1hr',
      description: 'Learn about where you can find course descriptions,' +
        ' what information they include, how they work, and details ' +
        'about various components of a course description. Course descriptions ' +
        'report information about a university or college\'s classes. They\'re ' +
        'published both in course catalogs that outline degree requirements and ' +
        'in course schedules that contain descriptions for all courses offered ' +
        'during a particular semester.'
    };

  constructor() { }

  ngOnInit() {
  }

}
