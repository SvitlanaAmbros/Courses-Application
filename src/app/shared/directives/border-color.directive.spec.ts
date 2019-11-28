import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BorderColorDirective } from '@shared/directives/border-color.directive';

@Component({
  template: `<div [appBorderColor]="date"></div>`
})
class TestComponent {
  date: Date;

  public changeDate(newDate): void {
    this.date = newDate;
  }
}

describe('BorderColorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        BorderColorDirective
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));
  });

  it('should add green border', () => {
    component.changeDate(new Date('2019-11-17'));
    fixture.detectChanges();

    expect(inputEl.nativeElement.style.border).toBe('2px solid green');
  });

  it('should add blue border', () => {
    component.changeDate(new Date('2020-09-10'));
    fixture.detectChanges();

    expect(inputEl.nativeElement.style.border).toBe('2px solid blue');
  });

  it('should not add border', () => {
    component.changeDate(new Date('2017-09-10'));
    fixture.detectChanges();

    expect(inputEl.nativeElement.style.border).toBe('');
  });
});
