import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '@core/core.module';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { CoursesRoutingModule } from '@courses/courses-routing.module';
import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import { CoursesItemComponent } from '@courses/components/courses-item/courses-item.component';
import { CoursesListComponent } from '@courses/components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesItemComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
