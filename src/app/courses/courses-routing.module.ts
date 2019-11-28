import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import {CoursesListComponent} from '@courses/components/courses-list/courses-list.component';
import { AddCourseComponent } from '@courses/components/add-course/add-course.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesPageComponent,
        children: [
          {
            path: '',
            component: CoursesListComponent
          },
          {
            path: 'add',
            component: AddCourseComponent
          },
          {
            path: 'edit/:id',
            component: AddCourseComponent
          }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }
