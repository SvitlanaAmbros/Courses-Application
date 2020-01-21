import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

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
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

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
    NotFoundComponent,
    LoadingComponent
  ],
  providers: [
    SortByDatePipe,
    PopupService,
    LocalStorageService
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild()
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
    NotFoundComponent,
    LoadingComponent,
    TranslateModule
  ]
})
export class SharedModule { }
