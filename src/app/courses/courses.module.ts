import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from '@courses/courses-routing.module';
import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import { CoursesItemComponent } from '@courses/components/courses-item/courses-item.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesItemComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
