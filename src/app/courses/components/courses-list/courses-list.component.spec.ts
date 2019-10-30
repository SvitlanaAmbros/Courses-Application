import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { CoursesListComponent } from '@courses/components/courses-list/courses-list.component';

import {COURSES, COURSES_MORE} from '@courses/mock/courses.mock';
import {arraysAreEqual} from 'tslint/lib/utils';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let loadButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;

    loadButton = fixture.debugElement.query(By.css('#load'));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('check that courses was initialized', () => {
    const loadedCourses = COURSES;

    expect(component.courses).toBe(loadedCourses);
  });

  it('should filter courses by search params', () => {
    component.search = COURSES[0].id;
    component.searchCourses()

    expect(component.courses).toEqual([COURSES[0]]);
  });

  it('should be delete button title', () => {
    expect(loadButton.nativeElement.textContent).toContain('Load more');
  });

  it('should emit edit with id', () => {
    let loadMore = spyOn(component, 'loadMore');
    loadButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(loadMore).toHaveBeenCalled();
    // expect(component.courses).toEqual(COURSES_MORE);
  });

  // @ts-ignore
  it('should call edit method', () => {
    // loadButton.triggerEventHandler('click', null);


  });
});
