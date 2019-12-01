import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import {Course} from '@courses/models/course.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
  // adding onPush strategy. 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent implements OnInit, OnChanges {
  // Dump component
  @Input() item: Course;

  @Output() edited: EventEmitter<string> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Ng on changes, Input was changed', this.item);
  }

  // Dump component
  public editCourse(): void {
    this.edited.emit(this.item.id);
  }

  // Dump component
  public deleteCourse(): void {
    this.deleted.emit(this.item.id);
  }
}
