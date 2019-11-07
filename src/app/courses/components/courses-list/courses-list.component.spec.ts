import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { CoursesListComponent } from '@courses/components/courses-list/courses-list.component';
import { COURSES } from '@courses/mock/courses.mock';
import { COURSES_MORE } from '@courses/mock/courses.test-mock';
import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let loadButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SortByDatePipe
      ],
      declarations: [
        CoursesListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
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
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.search = COURSES[0].id;
      component.searchCourses();

      expect(component.courses).toEqual([COURSES[0]]);
    });
  });

  it('should be load more button', () => {
    loadButton = fixture.debugElement.query(By.css('#load'));
    fixture.detectChanges();
    expect(loadButton.nativeElement.textContent).toContain('Load more');
  });

  it('should load more courses', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.loadMore();

      expect(component.courses).toEqual(COURSES_MORE);
    });
  });

  it('should edit popup', () => {
    // example if edit button open popup and set current course to editedCourse
    // const openPopupSpy = spyOn(component, 'openPopup').and.returnValue(null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const courseId = '2';
      component.editCourse(courseId);

      // expect(component.editedCourse).toBe(COURSES[courseId]);
      // expect(openPopupSpy()).toHaveBeenCalled();
    });
  });

  it('should delete item from list by id', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const courseId = '4';
      component.deleteCourse(courseId);

      // expect(component.courses).toEqual(COURSES);
    });
  });
});
