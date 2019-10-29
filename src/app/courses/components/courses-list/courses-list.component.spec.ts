import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from '@courses/components/courses-list/courses-list.component';
import {CoursesItemComponent} from '@courses/components/courses-item/courses-item.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
