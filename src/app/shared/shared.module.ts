import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBtnComponent } from '@shared/components/action-btn/action-btn.component';

@NgModule({
  declarations: [
    ActionBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActionBtnComponent
  ]
})
export class SharedModule { }
