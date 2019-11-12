import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBtnComponent } from '@shared/components/action-btn/action-btn.component';
import { BorderColorDirective } from '@shared/directives/border-color.directive';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';

@NgModule({
  declarations: [
    ActionBtnComponent,
    BorderColorDirective,
    DurationPipe,
    SortByDatePipe
  ],
  providers: [
    SortByDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActionBtnComponent,
    BorderColorDirective,
    DurationPipe,
    SortByDatePipe
  ]
})
export class SharedModule { }
