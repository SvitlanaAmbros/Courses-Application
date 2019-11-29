import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from '@core/guards/auth.guard';
import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import {CoursesListComponent} from '@courses/components/courses-list/courses-list.component';
import { AddCourseComponent } from '@courses/components/add-course/add-course.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesPageComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            // redirectTo: 'new',
            component: CoursesListComponent,
            // pathMatch: 'full',
          },
          {
            path: 'courses/new',
            component: AddCourseComponent
          },
          {
            path: 'courses/:id',
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
