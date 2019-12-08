import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, SimpleChange} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { CoursesItemComponent } from '@courses/components/courses-item/courses-item.component';
import { COURSES } from '@courses/mock/courses.mock';

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<CoursesItemComponent>;
  let editButton: DebugElement;
  let deleteButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        CoursesItemComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesItemComponent);
    component = fixture.componentInstance;

    editButton = fixture.debugElement.query(By.css('#edit'));
    deleteButton = fixture.debugElement.query(By.css('#delete'));

  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be edit button title', () => {
    component.item = COURSES[0];
    fixture.detectChanges();

    expect(editButton.nativeElement.textContent).toContain('Edit');
  });

  it('should emit edit with id', () => {
    component.item = COURSES[0];
    let res;
    const id = COURSES[0].id;

    fixture.detectChanges();
    component.edited.subscribe(result => res = result);

    editButton.triggerEventHandler('click', null);
    expect(res).toEqual(id);
  });

  it('should be delete button title', () => {
    component.item = COURSES[0];
    fixture.detectChanges();

    expect(deleteButton.nativeElement.textContent).toContain('Delete');
  });

  it('should emit delete with id', () => {
    component.item = COURSES[0];
    let res;
    const id = COURSES[0].id;

    fixture.detectChanges();
    component.deleted.subscribe(result => res = result);

    deleteButton.triggerEventHandler('click', null);
    expect(res).toBe(id);
  });

  it('should call on change', () => {
    component.item = COURSES[1];

    component.ngOnChanges({
      item: new SimpleChange(null,
        component.item, false)
    });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.item).toEqual(COURSES[1]);
    });
  });
});
