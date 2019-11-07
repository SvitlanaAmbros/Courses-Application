import { Directive, ElementRef, Input, AfterViewInit, OnChanges } from '@angular/core';

export const FRESH_DAYS_COUNT = 14;
export const MILLISECONDS_IN_DAY = 86400000; // number of milliseconds in a day

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective implements OnChanges {
  @Input('appBorderColor') public creationDate;

  constructor(private element: ElementRef) {
    // this.element.nativeElement.style.border = '2px solid blue';
  }

  ngOnChanges(): void {
    const currentDate = new Date();
    const daysAgoDate = new Date(+currentDate - (FRESH_DAYS_COUNT * MILLISECONDS_IN_DAY));

    if (this.creationDate.getTime() < currentDate.getTime()
      && this.creationDate.getTime() >= daysAgoDate.getTime()) {
      this.element.nativeElement.style.border = '2px solid green';
    }
    if (this.creationDate.getTime() > currentDate.getTime()) {
      this.element.nativeElement.style.border = '2px solid blue';
    }
  }
}
