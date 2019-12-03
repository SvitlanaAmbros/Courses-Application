import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorderColorDirective } from '@shared/directives/border-color.directive';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { SortByDatePipe } from '@shared/pipes/sort-by-date.pipe';
import { PopupService } from '@shared/services/popup.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ActionBtnComponent } from '@shared/components/action-btn/action-btn.component';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { DateComponent } from '@shared/components/date/date.component';
import { DurationComponent } from '@shared/components/duration/duration.component';
import { TagBoxComponent } from '@shared/components/tag-box/tag-box.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    ActionBtnComponent,
    BorderColorDirective,
    DurationPipe,
    SortByDatePipe,
    PopupComponent,
    DateComponent,
    DurationComponent,
    TagBoxComponent,
    NotFoundComponent
  ],
  providers: [
    SortByDatePipe,
    PopupService,
    LocalStorageService
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ActionBtnComponent,
    BorderColorDirective,
    DurationPipe,
    SortByDatePipe,
    PopupComponent,
    DateComponent,
    DurationComponent,
    TagBoxComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
