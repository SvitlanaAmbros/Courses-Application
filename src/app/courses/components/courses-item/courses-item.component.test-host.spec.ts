import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement, SimpleChange, Component} from '@angular/core';

import { By } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { COURSES } from '@courses/mock/courses.mock';
import { Course } from '@courses/models/course.model';
import { CoursesItemComponent } from '@courses/components/courses-item/courses-item.component';

@Component({
    template: `
    <app-courses-item
        [item]="item"
        (edited)="edit($event)"
        (deleted)="delete($event)">
    </app-courses-item>`
})
export class TestComponent {
    public item: Course;

    public editId: string;
    public deleteId: string;

    public edit(id: string): void {
        this.editId = id;
    }

    public delete(id: string): void {
        this.deleteId = id;
    }
}

describe('TestCoursesItemComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
        SharedModule
        ],
        declarations: [
        TestComponent,
        CoursesItemComponent
        ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    }));

    beforeEach(() => {
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set item detail', () => {
        component.item = COURSES[0];
        fixture.detectChanges();

        const description = fixture.nativeElement.querySelector('.item__content');
        expect(description.textContent.trim()).toEqual(COURSES[0].description);
    });

    it('should call edit method', () => {
        component.item = COURSES[0];
        fixture.detectChanges();

        const editBtn = fixture.debugElement.query(By.css('#edit'));
        editBtn.triggerEventHandler('click', null);

        expect(component.editId).toBe(COURSES[0].id);
    });

    it('should call delete method', () => {
        component.item = COURSES[0];
        fixture.detectChanges();

        const editBtn = fixture.debugElement.query(By.css('#delete'));
        editBtn.triggerEventHandler('click', null);

        expect(component.deleteId).toBe(COURSES[0].id);
    });
});
