import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import {Course} from '@courses/models/course.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent implements OnInit, OnChanges {
  @Input() item: Course;

  @Output() edited: EventEmitter<string> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(): void {
    console.log('Ng on changes, Input was changes', this.item);
  }

  public editCourse(): void {
    console.log('Edit', this.item.id);
    this.edited.emit(this.item.id);
  }

  public deleteCourse(): void {
    console.log('Delete', this.item.id);
    this.deleted.emit(this.item.id);
  }
}
