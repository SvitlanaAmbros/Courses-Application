import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from '@core/guards/auth.guard';
import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import {CoursesListComponent} from '@courses/components/courses-list/courses-list.component';
import { AddCourseComponent } from '@courses/components/add-course/add-course.component';

const routes: Routes = [
    {
        path: 'courses',
        component: CoursesPageComponent,
        canActivateChild: [AuthGuard],
        data: {
          breadcrumb: 'Course'
        },
        children: [
            {
              path: '',
              component: CoursesListComponent,
              data: {
                breadcrumb: null
              }
            },
            {
              path: 'new',
              component: AddCourseComponent,
              data: {
                breadcrumb: 'New Course'
              },
            },
            {
              path: ':id',
              component: AddCourseComponent,
              data: {
                breadcrumb: null
              },
            }
          ]
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }
