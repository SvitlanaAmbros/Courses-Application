import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

export const FRESH_DAYS_COUNT = 14;

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective implements AfterViewInit{
  @Input('appBorderColor') public creationDate;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit(): void {
    let currentDate = new Date();
    let milliseconds = 86400000 //number of milliseconds in a day
    let daysAgoDate = new Date(currentDate - (FRESH_DAYS_COUNT * milliseconds));

    if (this.creationDate.getTime() < currentDate.getTime()
      && this.creationDate.getTime() >= daysAgoDate.getTime()) {
      this.element.nativeElement.style.border = '2px solid green';
    } else {
      this.element.nativeElement.style.border = '2px solid blue';
    }
  }

}
