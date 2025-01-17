import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '@core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { CoursesRoutingModule } from '@courses/courses-routing.module';
import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import { CoursesItemComponent } from '@courses/components/courses-item/courses-item.component';
import { CoursesListComponent } from '@courses/components/courses-list/courses-list.component';
import { AddCourseComponent } from '@courses/components/add-course/add-course.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesItemComponent,
    CoursesListComponent,
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    CoursesRoutingModule
  ],
  // providers: [
  //   CoursesService
  // ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
