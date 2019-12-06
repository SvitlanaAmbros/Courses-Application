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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent implements OnInit, OnChanges {
  // Dump component
  @Input() item: Course;

  @Output() edited: EventEmitter<string | number> = new EventEmitter();
  @Output() deleted: EventEmitter<string | number> = new EventEmitter();

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
    console.log('delete with id', this.item.id)
    this.deleted.emit(this.item.id);
  }
}
