import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from '@courses/components/courses-page/courses-page.component';
import {CoursesListComponent} from '@courses/components/courses-list/courses-list.component';
import {CoursesItemComponent} from '@courses/components/courses-item/courses-item.component';

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
            component: CoursesItemComponent
          }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }
