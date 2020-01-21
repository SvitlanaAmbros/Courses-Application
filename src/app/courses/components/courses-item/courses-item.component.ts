import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import {Course} from '@courses/models/course.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent implements OnInit {
  @Input() item: Course;

  @Output() edited: EventEmitter<number> = new EventEmitter();
  @Output() deleted: EventEmitter<Course> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public editCourse(): void {
    this.edited.emit(this.item.id);
  }

  public deleteCourse(): void {
    this.deleted.emit(this.item);
  }
}
