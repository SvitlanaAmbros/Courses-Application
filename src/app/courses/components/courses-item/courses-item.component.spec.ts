import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesItemComponent } from '@courses/components/courses-item/courses-item.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {COURSES} from '@courses/mock/courses.mock';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;
  let editButton: DebugElement;
  // let deleteButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesItemComponent);
    editButton = fixture.debugElement.query(By.css('#edit'));
    // deleteButton = fixture.debugElement.query(By.css('button[textContent=delete]'));
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit with id', () => {
    fixture.whenStable().then(() => {
      component.item = COURSES[0];
      let res;
      const id = COURSES[0].id;
      component.edited.subscribe(result => res = result);

      editButton.triggerEventHandler('click', null);
      // expect(res).toBe(id);
    });
  });
});
