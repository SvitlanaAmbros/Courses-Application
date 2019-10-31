import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { CoursesListComponent } from '@courses/components/courses-list/courses-list.component';

import {COURSES} from '@courses/mock/courses.mock';
import {arraysAreEqual} from 'tslint/lib/utils';
import {COURSES_CHANGED, COURSES_MORE} from '@courses/mock/courses.test-mock';

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

  it('should be load more button', () => {
    expect(loadButton.nativeElement.textContent).toContain('Load more');
  });

  it('should load more courses', () => {
    component.courses = COURSES;
    fixture.detectChanges();
    component.loadMore();
    fixture.detectChanges();

    expect(component.courses).toEqual(COURSES_MORE);
  });

  it('should edit popup', () => {
    // const openPopupSpy = spyOn(component, 'openPopup').and.returnValue(null);
    const courseId = '2';
    component.courses = COURSES;
    fixture.detectChanges();
    component.editCourse(courseId);
    fixture.detectChanges();

    // expect(component.editedCourse).toBe(COURSES[courseId]);
    // expect(openPopupSpy()).toHaveBeenCalled();
  });

  it('should delete item from list by id', () => {
    const courseId = '4';
    component.courses = COURSES_MORE;
    fixture.detectChanges();
    component.deleteCourse(courseId);
    fixture.detectChanges();

    // expect(component.courses).toEqual(COURSES);
  });
});
