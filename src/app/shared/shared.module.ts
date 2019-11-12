import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBtnComponent } from '@shared/components/action-btn/action-btn.component';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { BorderColorDirective } from '@shared/directives/border-color.directive';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';
import { PopupService } from '@shared/services/popup.service';

@NgModule({
  declarations: [
    ActionBtnComponent,
    BorderColorDirective,
    DurationPipe,
    SortByDatePipe,
    PopupComponent
  ],
  providers: [
    SortByDatePipe,
    PopupService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActionBtnComponent,
    BorderColorDirective,
    DurationPipe,
    SortByDatePipe,
    PopupComponent
  ]
})
export class SharedModule { }
