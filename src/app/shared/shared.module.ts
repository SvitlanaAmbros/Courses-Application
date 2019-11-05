import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBtnComponent } from '@shared/components/action-btn/action-btn.component';
import { BorderColorDirective } from '@shared/directives/border-color.directive';

@NgModule({
  declarations: [
    ActionBtnComponent,
    BorderColorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActionBtnComponent,
    BorderColorDirective
  ]
})
export class SharedModule { }
