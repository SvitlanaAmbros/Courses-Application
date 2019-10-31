import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActionBtnComponent } from '@shared/components/action-btn/action-btn.component';

describe('ActionBtnComponent', () => {
  let component: ActionBtnComponent;
  let fixture: ComponentFixture<ActionBtnComponent>;
  let button: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBtnComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionBtnComponent);
    button = fixture.debugElement.query(By.css('button'));
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty button title', () => {
    expect(button.nativeElement.textContent).toContain('');
  });

  it('should change button title', () => {
    const btnTitle = 'Btn';
    component.title = btnTitle;
    fixture.detectChanges();

    expect(button.nativeElement.textContent).toContain(btnTitle);
  });

  it('should emit click event with empty data', () => {
    let res;
    component.clicked.subscribe(result => res = result);

    button.triggerEventHandler('click', null);
    expect(res).toBeUndefined();
  });
});
