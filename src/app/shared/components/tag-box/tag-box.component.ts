import {ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Author} from '@courses/models/author.model';
import {CoursesService} from '@courses/services/courses.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { AppState } from '@app/store/reducers/app.reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthors } from '@app/store/selectors/courses.selector';
import * as coursesActions from '@store/actions/courses.actions';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagBoxComponent),
      multi: true
    }
  ]
})
export class TagBoxComponent implements OnInit, ControlValueAccessor {
  public searchParam: string = 'a';
  public allAuthors: Observable<Author[]>;
  public selectedAuthors: Author[] = [];

  constructor(private coursesService: CoursesService,
    private store: Store<AppState>, 
    private cdref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.allAuthors = this.store.pipe(select(selectAuthors));
    this.searchParamChanged(this.searchParam);
    // this.selectedAuthors = [];
  }

  public searchParamChanged(e): void {
    this.store.dispatch(new coursesActions.LoadAuthors(e));
    // this.searchAuthorsByParam(e);
  }

  public searchAuthorsByParam(searchParam: string): void {
    // this.allAuthors = this.coursesService.getAuthors(searchParam);
  }

  public authorSelected(author: Author): void {
    if (this.selectedAuthors.filter((item: Author) => item.id === author.id).length === 0) {
      const arr = [...this.selectedAuthors];
      arr.push(author);
      this.writeValue(arr);
    }
    else {
      alert(`Author ${author.name} already in list`);
    }
  }

  public deleteAuthor(author: Author): void {
    this.writeValue([...this.selectedAuthors].filter((item: Author) => item.id !== author.id));
  }

  set value(value: Author[]) {
    this.selectedAuthors = value;
  }

  get value(): Author[] {
    return this.selectedAuthors;
  }

  onChange: any = (value) => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: Author[]): void {
    if (!!obj) {
      this.value = obj;
      this.onChange(this.value);
    }
  }
}
