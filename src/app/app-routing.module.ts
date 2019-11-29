import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from '@core/guards/auth.guard';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import {LoginComponent} from '@login/components/login/login.component';
import {AppComponent} from '@app/app.component';
import { CoursesListComponent } from './courses/components/courses-list/courses-list.component';
import { AddCourseComponent } from './courses/components/add-course/add-course.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      breadcrumb: 'Courses'
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
          breadcrumb: 'null'
        },
      }
    ]
    

    // canActivateChild: [AuthGuard],
    // loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

